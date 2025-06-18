import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import jasmine from "eslint-plugin-jasmine";

export default [
    // Ignore files globally
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "**/target/**",
            "**/scripts/**",
            "eslint.config.js"
        ]
    },
    
    // Base config for normal JS files (non-test)
    {
        ...js.configs.recommended,
        ...jsdoc.configs.recommended,
        files: [
            ["**/*.js", "!**/*.test.js"]
        ],
        
        plugins: {
            jsdoc
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                Atomics: "writable",
                SharedArrayBuffer: "writable",
                System: "writable",
                Server: "writable",
                Properties: "writable",
                VcPlugin: "writable",
                LockingSystem: "writable",
                RESTHostManager: "writable",
                RESTAuthenticationManager: "writable",
                VcVirtualDisk: "writable",
                AD_HostManager: "writable",
                ActiveDirectory: "writable",
                VcNamePasswordAuthentication: "writable",
                VcGuestProgramSpec: "writable"
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            ...jsdoc.configs.recommended.rules,
            "jsdoc/check-access": "warn",
            "jsdoc/require-description": "warn",
            "jsdoc/valid-types": "off",
            "jsdoc/no-undefined-types": "off",
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
            "no-multi-spaces": [
                "error",
                {
                    exceptions: {
                        "Property": false
                    }
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
                { "blankLine": "never", "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
                { "blankLine": "always", "prev": "function", "next": "*"},
                { "blankLine": "always", "prev": "*", "next": "return" }
            ],
            "no-caller": [
                "error"
            ]
        }
    },

    // Jasmine config for test files
    {
        files: ["**/*.test.js", "**/*.spec.js"],
        plugins: {
            jasmine
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                jasmine: true,
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly"
            }
        },
        rules: {
            ...jasmine.configs.recommended.rules,
            "no-console": "off", // example override
            "no-undef": "off" // if Jasmine globals conflict
        }
    }
];