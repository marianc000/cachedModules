import html from '@rollup/plugin-html';
import { readFileSync } from 'fs';

function template({ bundle }) {
    const html = readFileSync('static/manyModules.html', 'utf8');
    const bundleName = Object.keys(bundle)[0];
    return html.replace('js/app/module1.js', bundleName);
};


export default {
    input: 'static/js/app/module1.js',
    output: [{
        entryFileNames: 'bundle.[hash].js',
        format: 'esm',
        sourcemap: true,
        dir: 'static'
    }],
    plugins: [html({ fileName: 'manyModulesBundled.html', template })]
};