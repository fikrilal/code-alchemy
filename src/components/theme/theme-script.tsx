import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme";

const themeInitScript = `(function(){try{var theme=localStorage.getItem("${THEME_STORAGE_KEY}");if(theme==="light"){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}else{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="${DEFAULT_THEME}";}}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="${DEFAULT_THEME}";}})();`;

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}