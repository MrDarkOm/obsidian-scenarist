import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['main.js', 'node_modules/**'],
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			// TypeScript
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			// General
			'no-console': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'eqeqeq': ['error', 'always'],
		},
	},
];
