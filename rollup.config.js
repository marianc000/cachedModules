export default {
    input: 'static/js/app/module1.js',
    output: [{
        entryFileNames: 'bundle.[format].[hash].js',
        format: 'esm',
        sourcemap: true,
        dir: 'static'
    }],
    plugins: [html()]
};