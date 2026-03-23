/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "features-must-not-depend-on-app",
      severity: "error",
      from: { path: "^src/features/" },
      to: { path: "^src/app/" },
    },
    {
      name: "lib-must-not-depend-on-app-or-features",
      severity: "error",
      from: { path: "^src/lib/" },
      to: { path: "^src/(app|features)/" },
    },
    {
      name: "ui-must-not-depend-on-app-or-features",
      severity: "error",
      from: { path: "^src/components/ui/" },
      to: { path: "^src/(app|features)/" },
    },
    {
      name: "layout-must-not-depend-on-app-or-features",
      severity: "error",
      from: { path: "^src/components/layout/" },
      to: { path: "^src/(app|features)/" },
    },
  ],
  options: {
    includeOnly: {
      path: "^src/",
    },
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mdx"],
    },
    doNotFollow: {
      path: "node_modules",
    },
  },
};
