import express from 'express';
const main = express.Router();

main.get('/', (_req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Server Generated Page</title>
                <script type="module" src="main.script.js"></script>
            </head>
            <body>
                <h1>Hello, World!</h1>
            </body>
        </html>
    `;
    res.send(htmlContent);
});

export default main;
