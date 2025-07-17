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
            "eslint.config.js",
            "prettier.config.js",
        ],
    },

    // Base config for normal JS files (non-test)
    {
        ...js.configs.recommended,
        ...jsdoc.configs.recommended,
        files: [["**/*.js", "!**/*.test.js"]],

        plugins: {
            jsdoc,
        },
        languageOptions: {
            ecmaVersion: 2015,
            globals: {
                Atomics: "writable",
                SharedArrayBuffer: "writable",
                System: "writable",
                Server: "writable",
                Properties: "writable",
                LockingSystem: "writable",
                ActiveDirectory: "writable",
                AD_Computer: "writable",
                AD_Group: "writable",
                AD_Host: "writable",
                AD_HostManager: "writable",
                AD_OrganizationalUnit: "writable",
                AD_PluginOptions: "writable",
                AD_ServerConfiguration: "writable",
                AD_Unknown: "writable",
                AD_User: "writable",
                AD_UserGroup: "writable",
                ConfigurationManager: "writable",
                LdapAttribute: "writable",
                LdapClient: "writable",
                LdapClientFactory: "writable",
                LdapDeleteRequest: "writable",
                LdapDereferencePolicy: "writable",
                LdapDN: "writable",
                LdapEntry: "writable",
                LdapFilter: "writable",
                LdapLoadBalancingMode: "writable",
                LdapModification: "writable",
                LdapModificationType: "writable",
                LdapRDN: "writable",
                LdapResult: "writable",
                LdapSearchRequest: "writable",
                LdapSearchResult: "writable",
                LdapSearchResultReference: "writable",
                LdapSearchScope: "writable",
                LdapSimplePagedResultsControl: "writable",
                LdapSubtreeDeleteRequestControl: "writable",
                AuthorizationValue: "writable",
                HTTPBasicAuthentication: "writable",
                RESTAuthentication: "writable",
                RESTAuthenticationManager: "writable",
                RESTCookie: "writable",
                RESTHost: "writable",
                RESTHostManager: "writable",
                RESTOperation: "writable",
                RESTRequest: "writable",
                RESTRequestOptions: "writable",
                RESTResponse: "writable",
                RESTUtils: "writable",
                VcPlugin: "writable",
                VcVirtualDisk: "writable",
                VcNamePasswordAuthentication: "writable",
                VcGuestProgramSpec: "writable",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...jsdoc.configs.recommended.rules,
            "jsdoc/require-description": "warn",
            "jsdoc/valid-types": "off",
            "jsdoc/no-undefined-types": "off",
            "jsdoc/check-alignment": "error", // Example rule: enforce JSDoc comments alignment
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
                jasmine: true,
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            ...jasmine.configs.recommended.rules,
            "no-console": "off", // example override
            "no-undef": "off", // if Jasmine globals conflict
        },
    },
];
