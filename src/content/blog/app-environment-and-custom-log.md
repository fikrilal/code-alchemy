---
title: "About App Environment and a Custom Log"
date: "2025-5-4"
author: "Ahmad Fikril"
description: "How I manage environment configurations and implement a custom logging system for Flutter applications to improve security and debugging."
readTime: "5 min read"
coverImage: "/images/blog/env‑config‑cover.png"
authorImage: "/images/avatar-2.jpg"
tags: [""]
featured: true
---

I used to manage API keys with a `.env` file and load them at runtime with the `dotenv` package.  
That approach is fine when you're solo on a small project, but it can bite hard as the codebase grows.

Runtime `.env` feels awesome: you create separate files for _dev_, _staging_, and _prod_, and the app loads whichever environment you set. No problem, right?  
Actually, big problem:

- The file is parsed after the APK is signed—meaning it can be tampered with.
- You end up shipping secrets in plaintext inside the asset bundle.

**Lesson learned:** If a value must _never_ change after compilation, don't read it at runtime.

---

## The new approach

As I gained new experience, I changed my approach to this:

```
env/
  dev.yaml
  stage.yaml
  prod.yaml
tool/
  gen_config.dart
lib/core/configs/
  build_config.dart
  build_config.g.dart ← generated
```

### Why this rocks

- **Single compile‑time flag** marks dev/stage/prod.
- A script generates a `.g.dart` file with `const` maps—the compiler tree‑shakes everything else.
- No extra assets, no unexpected runtime overrides.

So let’s dive into the implementation.

---

## 1 · Create the YAML files

First, you need to create a new folder called env in the root of your project. Fill it with `dev.yaml`, `staging.yaml`, `prod.yaml`, or whatever flavors you need. You can store each flavor's configuration inside it.

For example, here’s a basic use case:

```yaml
# env/dev.yaml
core: https://dev‑core.example.com
auth: https://dev‑auth.example.com
profile: https://dev‑profile.example.com
enableLogging: true # drives the custom logger
```

Duplicate and tweak for `stage.yaml` and `prod.yaml`.

---

## 2 · Write the config generator (tool/gen_config.dart)

Then you need to create the config generator. Place it under the tool folder and give it a name like `gen_config.dart` or any name you prefer.

```dart
void main(List<String> argv) {
  final env = (ArgParser()..addOption('env', abbr: 'e'))
      .parse(argv)['env'] as String? ?? 'dev';

  final yaml = loadYaml(File('env/$env.yaml').readAsStringSync()) as YamlMap;

  // Build hosts map
  String mapLiteral(String name, YamlMap map) =>
      map.entries
        .where((e) => e.key != 'enableLogging')
        .map((e) => "  ApiHost.${e.key}: '${e.value}',")
        .join('\n')
        .let((entries) => 'const Map<ApiHost, String> _$name = {\n$entries\n};');

  final buffer = StringBuffer()
    ..writeln('// GENERATED; do not edit.\n')
    ..writeln("part of 'build_config.dart';\n")
    ..writeln(mapLiteral('${env}Hosts', yaml))
    ..writeln(
        'const bool _${env}EnableLogging = ${yaml['enableLogging'] ?? false};');

  // Stub the other environments so the file always compiles.
  for (final other in ['dev', 'stage', 'prod']) {
    if (other == env) continue;
    buffer
      ..writeln(mapLiteral('${other}Hosts', YamlMap()))
      ..writeln('const bool _${other}EnableLogging = false;');
  }

  File('lib/core/configs/build_config.g.dart')
      .writeAsStringSync(buffer.toString());
}
```

You need to install the `yaml` and `args` packages, don’t forget that.

---

## 3 · Create build_config.dart

Then create the build_config file. I placed it under `lib/core/config`, but you can put it wherever you like based on your project architecture.

```dart
enum BuildEnv { dev, stage, prod }

class BuildConfig {
  static const _env = String.fromEnvironment('ENV', defaultValue: 'dev');
  static final env  = BuildEnv.values.firstWhere((e) => e.name == _env);

  /// Base URL for the requested host.
  static String apiUrl(ApiHost host) => switch (env) {
        BuildEnv.dev   => _devHosts[host]!,
        BuildEnv.stage => _stageHosts[host]!,
        BuildEnv.prod  => _prodHosts[host]!,
      };

  /// Verbose logs? Only if the YAML says so.
  static bool get logEnabled => switch (env) {
        BuildEnv.dev   => _devEnableLogging,
        BuildEnv.stage => _stageEnableLogging,
        BuildEnv.prod  => _prodEnableLogging,
      };
}
```

---

## 4 · Gradle Integration

Then we need to declare app flavors in build.gradle.kts. Add this inside the `android {}` tag:

```kotlin
/* ───── Flavours ───────────────────────────────────────────────── */
flavorDimensions += "environment"
productFlavors {
    create("dev") {
        dimension = "environment"
        applicationIdSuffix = ".dev"
        resValue("string", "app_name", "Starter Dev")
    }
    create("staging") {
        dimension = "environment"
        applicationIdSuffix = ".stg"
        resValue("string", "app_name", "Starter Staging")
    }
    create("prod") {
        dimension = "environment"
        resValue("string", "app_name", "Starter Project")
    }
}
```

We need to inject the config-generation task into each of those variants, keyed by flavor name (env). Add outside the `android {}` tag:

```kotlin
val dartBin: String = if (project.hasProperty("dartBin")) {
    project.property("dartBin") as String
} else {
    "dart"
}

afterEvaluate {
    android.applicationVariants
        .configureEach {
            val env = flavorName ?: "dev"

            val genTaskName = "generate${
                name.replaceFirstChar { char ->
                    char.uppercase()
                }
            }Config"

            val genConfig = tasks.register<Exec>(genTaskName) {
                group = "build"
                description = "Generate build_config.g.dart for $env"
                workingDir = rootProject.projectDir.parentFile
                commandLine(
                    dartBin,
                    "run",
                    "tool/gen_config.dart",
                    "--env", env
                )
                inputs.files(file("env/$env.yaml"), file("tool/gen_config.dart"))
                outputs.file(file("lib/core/configs/build_config.g.dart"))
            }

            preBuildProvider.configure {
                dependsOn(genConfig)
            }
        }
}

```

This keeps `build_config.g.dart` perfectly in sync with whatever flavor is being assembled, whether we run from the IDE, CI, or command line.

---

## 5 · Hooking it into Android Studio

Create a run configuration per flavour (start with dev).

In Additional run args set `--dart-define=ENV=dev`.

Build flavour → `dev`.

Repeat for stage and prod.

![Android Studio Run Debug Configuration](/images/blog/run-debug-config.png)

Under Before launch, add Run External Tool:

![Generate Config External Tool](/images/blog/gen-config.png)

- Point the “Program” to your SDK folder, specifically to the `dart.bat` file inside the bin folder
- Fill the “Arguments” field with the command: `run tool/gen_config.dart --env dev`. This will execute `gen_config.dart`, but you’ll need to change "dev" when creating a different flavor
- Lastly, for the “Working directory”, you can set it to `$ProjectFileDir$`

---

## 6 · That’s all.

You’re ready to go once you hit the Run button. It will execute the gen_config first before it builds your app.

---

But what’s the point of creating separate environments if they only hold different API keys?

Well, it’s not that simple. Another use case is that you can manage your logs differently in each environment.

Personally, I like to create a custom log setup for this, as it allows me to optionally add some analytics as well.

```dart
class Log {
  static const int _verbose = 0;
  static const int _debug = 1;
  static const int _info = 2;
  static const int _warning = 3;
  static const int _error = 4;
  static const int _wtf = 5;

  static const Map<int, String> _levelNames = {
    _verbose: 'VERBOSE',
    _debug: 'DEBUG',
    _info: 'INFO',
    _warning: 'WARNING',
    _error: 'ERROR',
    _wtf: 'CRITICAL',
  };

  static void debug(dynamic message, {String? name}) => _log(message, _debug, name: name);

  static void info(dynamic message, {String? name}) => _log(message, _info, name: name);

  static void warning(dynamic message, {String? name}) => _log(message, _warning, name: name);

  static void verbose(dynamic message, {String? name}) => _log(message, _verbose, name: name);

  static void error(
    dynamic message, [
    dynamic error,
    StackTrace? stackTrace,
    bool report = false,
    String? name,
  ]) => _log(message, _error, error: error, stackTrace: stackTrace, report: report, name: name);

  static void wtf(
    dynamic message, [
    dynamic error,
    StackTrace? stackTrace,
    bool report = false,
    String? name,
  ]) => _log(message, _wtf, error: error, stackTrace: stackTrace, report: report, name: name);

  static void _log(
    dynamic message,
    int level, {
    dynamic error,
    StackTrace? stackTrace,
    bool report = false,
    String? name,
  }) {
    final bool shouldLog = BuildConfig.logEnabled;
    final String levelName = _levelNames[level] ?? 'UNKNOWN';
    final String logMessage = '[$levelName] $message';
    final String logTag = name ?? AppConfig.instance.environment.toUpperCase();

    if (shouldLog) {
      developer.log(logMessage, name: logTag, error: error, stackTrace: stackTrace);

      if (level >= _error && kDebugMode) {
        developer.log('⚠️ $logMessage', name: logTag);
        if (error != null) developer.log('Error: $error', name: logTag);
        if (stackTrace != null) {
          developer.log('Stack trace:\n$stackTrace', name: logTag);
        }
      }
    }

    if (report && level >= _error) {
      FirebaseCrashlytics.instance.log("[$logTag] $logMessage");
      if (error != null && stackTrace != null) {
        FirebaseCrashlytics.instance.recordError(error, stackTrace);
      }
    }
  }
}
```

## Usage example:

```dart
try {
  await _repo.fetchUser();
} catch (e, s) {
  Log.error('Fetching user failed', e, s,
      report: true, name: 'ProfileBloc');
}
```

### What the wrapper buys me

- Namespace/tag → easy filtering when 17 modules scream at once.
- Level gating via BuildConfig.logEnabled → silent in prod, verbose in dev.
- Crashlytics opt‑in (`report: true`) → only actionable errors hit the dashboard.
- developer.log integration → timestamps + colour in the IDE console.

This will be a huge benefit if you’re building a production app, where you can add an optional Crashlytics reporter to your logs—since not all errors are automatically caught by Crashlytics, especially those inside a try-catch block.

The nice thing is that logging is automatically disabled in production, but Crashlytics remains active—and vice versa in development.

---

## Takeaways I wish I knew earlier

- If something mustn't change in prod, make it a const.
- IDEs love external tools—you don't need a heavyweight Gradle plugin.
- A tiny script today can save an entire weekend later.

---

## TL;DR

- BuildConfig is frozen at compile‑time; stores flavour, base URLs, log switch.
- AppConfig (optional) is runtime; good for tokens or tenant IDs.
- A 40‑line generator + one dart-define flag > fragile runtime dotenv.

Happy shipping everyone! 🎉
