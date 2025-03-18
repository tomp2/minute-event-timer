const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const INPUT_HTML = './src/index.html';
const OUTPUT_HTML = './dist/index.html';

const AUDIO_FILES = fs.readdirSync('./src').filter(file => path.extname(file) === '.mp3');

const tailwindOutput = execSync(`tailwindcss -i ./src/input.css --minify -o -`).toString();
let indexHtmlContent = fs.readFileSync(INPUT_HTML, 'utf8');

indexHtmlContent = indexHtmlContent.replace('<link rel="stylesheet" href="output.css">', `<style>${tailwindOutput}</style>`);

encodedAudios = Object.fromEntries(AUDIO_FILES.map((file, i) => ([
    `Sound ${i + 1}`, `data:audio/mp3;base64,${fs.readFileSync(`./src/${file}`).toString('base64')}`
])))

indexHtmlContent = indexHtmlContent.replace('const sounds = {}', `const sounds = ${JSON.stringify(encodedAudios)}`);

fs.writeFileSync(OUTPUT_HTML, indexHtmlContent, 'utf8');

console.log(`✅ Build complete. Output: ${OUTPUT_HTML}`);