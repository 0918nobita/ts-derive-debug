/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: {
        es2021: true,
    },
    ignorePatterns: ['dist'],
    parserOptions: {
        sourceType: 'module',
    },
    /*
    overrides: [
        {
            files: "*.ts",
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
        },
    ],
    */
};
