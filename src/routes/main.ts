import express from 'express';
const main = express.Router();
import * as cheerio from 'cheerio';

main.get('/', (_req, res) => {
    const htmlContent = `
<head>
    <title>Server Generated Page</title>
    <script type="module" src="main.script.js"></script>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
    `;
    const $ = cheerio.load(htmlContent, { quirksMode: false });
    res.send($.html());
});

export default main;
