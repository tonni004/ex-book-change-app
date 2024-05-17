const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ...
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/components/button.js",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
};