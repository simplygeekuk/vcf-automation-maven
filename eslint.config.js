import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import jasmine from "eslint-plugin-jasmine";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import orchestratorGlobals from "./eslint/orchestrator-globals.js";
import jasmineGlobals from "./eslint/jasmine-globals.js";

export default [
    // Ignore files globally
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "**/target/**",
            "eslint.config.js",
        ],
    },

    // Base config for normal JS files (non-test)
    {
        ...js.configs.recommended,
        ...jsdoc.configs.recommended,
        files: [["**/*.js", "!**/*.test.js"]],

        plugins: {
            jsdoc,
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                ...orchestratorGlobals,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...jsdoc.configs.recommended.rules,
            "jsdoc/require-description": "warn",
            "jsdoc/valid-types": "off",
            "jsdoc/no-undefined-types": "off",
            "jsdoc/check-alignment": "error", // Enforce JSDoc comments alignment
            "jsdoc/check-param-names": "error", // Checks that parameter names match those in the function declaration
            "jsdoc/check-tag-names": "error", // Ensure that JSDoc tags exist
            "jsdoc/check-types": "error", // Enforces using consistent types
            "jsdoc/require-jsdoc": [
                "error",
                {
                    // Require JSDoc comments for certain nodes
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                    },
                },
            ],
            "max-len": [
                "error",
                {
                    code: 80,
                    tabWidth: 4,
                    ignoreTrailingComments: true,
                    ignoreRegExpLiterals: true,
                    ignoreComments: true,
                    ignoreStrings: true,
                },
            ],
            indent: [
                "error",
                4,
                {
                    FunctionDeclaration: {
                        parameters: "first",
                    },
                    FunctionExpression: {
                        parameters: "first",
                    },
                    CallExpression: {
                        arguments: "first",
                    },
                },
            ],
            "linebreak-style": ["error", "windows"],
            "lines-around-comment": [
                "error",
                {
                    // require a blank line *before* block comments:
                    beforeBlockComment: false,
                    // disallow a blank line *after* block comments:
                    afterBlockComment: false,

                    // but allow comments at the very start/end of blocks:
                    // allowBlockStart: true,
                    // allowBlockEnd:   true

                    // (you can tune allowObjectStart, allowArrayStart, etc. as needed)
                },
            ],
            quotes: ["error", "double"],
            semi: [
                "error",
                "always",
                {
                    omitLastInOneLineBlock: true,
                },
            ],
            "no-trailing-spaces": ["error"],
            "no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                    maxEOF: 1,
                },
            ],
            "no-multi-spaces": [
                "error",
                {
                    exceptions: {
                        Property: false,
                    },
                },
            ],
            "space-before-blocks": "error",
            "space-before-function-paren": [
                "error",
                {
                    named: "never",
                },
            ],
            "space-unary-ops": [
                2,
                {
                    words: true,
                    nonwords: false,
                    overrides: {
                        new: true,
                        "++": false,
                        "!": false,
                        "-": false,
                    },
                },
            ],
            "space-infix-ops": ["error"],
            eqeqeq: ["error"],
            "no-undef": [
                "error",
                {
                    typeof: true,
                },
            ],
            "eol-last": ["error", "always"],
            "padding-line-between-statements": [
                "error",
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*",
                },
                {
                    blankLine: "never",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"],
                },
                { blankLine: "always", prev: "function", next: "*" },
                { blankLine: "always", prev: "*", next: "return" },
                // Always blank line after an if (i.e. between the closing '}' and the next statement)
                { blankLine: "always", prev: "if", next: "*" },
            ],
            "no-caller": ["error"],
        },
    },

    // Jasmine config for test files
    {
        files: ["**/*.test.js", "**/*.spec.js"],
        plugins: {
            jasmine,
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                ...jasmineGlobals,
            },
        },
        rules: {
            ...jasmine.configs.recommended.rules,
            "no-undef": "off", // if Jasmine globals conflict
        },
    },

    // Disable ESLint rules that conflict with Prettier
    eslintConfigPrettier,
];
