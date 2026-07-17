import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    {
        ignores: [
            "node_modules"
        ]
    },

    js.configs.recommended,

    prettier,

    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    }
];
