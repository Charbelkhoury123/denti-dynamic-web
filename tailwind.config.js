```diff
--- a/tailwind.config.js
+++ b/tailwind.config.js
@@ -1,4 +1,5 @@
 /** @type {import('tailwindcss').Config} */
+const typography = require('@tailwindcss/typography');
 
 export default {
   darkMode: ["class"],
@@ -20,6 +21,9 @@
       },
     },
   },
-  plugins: [require("tailwindcss-animate")],
+  plugins: [
+    require("tailwindcss-animate"),
+    typography,
+  ],
 };
```