import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.ts", "**/*.tsx"],
        plugins: {
            jsdoc,
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                node: true,
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
                System: "readonly",
                Server: "readonly",
                Properties: "readonly",
                VcPlugin: "readonly",
                LockingSystem: "readonly",
                RESTHostManager: "readonly",
                RESTAuthenticationManager: "readonly"
            }
        },
        rules: {
            // "jsdoc/require-example": "error",
            "indent": [
                "error",
                4,
                {
                    "FunctionDeclaration":
                    {
                        "parameters": "first"
                    },
                    "FunctionExpression":
                    {
                        "parameters": "first"
                    },
                    "CallExpression":
                    {
                        "arguments": "first"
                    }
                }
            ],
            "linebreak-style": [
                "error",
                "windows"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "always",
                {
                    "omitLastInOneLineBlock": true
                }
            ],
            "no-trailing-spaces": [
                "error"
            ],
            "no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxEOF": 0
                }
            ],
            "space-unary-ops": [
                2,
                {
                    "words": true,
                    "nonwords": false,
                    "overrides": {
                        "new": true,
                        "++": false,
                        "!": false,
                        "-": false
                    }
                }
            ],
            "space-infix-ops": [
                "error"
            ],
            "eqeqeq": [
                "error"
            ],
            "no-undef": [
                "error",
                {
                    "typeof": true
                }
            ],
            "eol-last": ["error", "never"],
            "padding-line-between-statements": [
                "error",
                { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
                { "blankLine": "never",  "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
                { "blankLine": "always", "prev": "function", "next": "*"},
                { "blankLine": "always", "prev": "*", "next": "return" }
            ],
            "no-caller": [
                "error"
            ]
        }
    }
];