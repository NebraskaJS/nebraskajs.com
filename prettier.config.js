import prettierConfig from '@nicknisi/standard/prettier';

export default {
	...prettierConfig,
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
};
