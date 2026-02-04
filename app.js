const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// REQUIRED: Health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        message: process.env.APP_MESSAGE || 'Default value',
        timestamp: new Date().toISOString(),
        nodeVersion: process.version
    });
});

// REQUIRED: Main page showing config value
app.get('/', (req, res) => {
    const configValue = process.env.APP_MESSAGE || 'Not configured';
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Azure DevOps Assessment</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .config { background: #f0f0f0; padding: 20px; border-radius: 5px; }
                .success { color: green; }
            </style>
        </head>
        <body>
            <h1>✅ Azure DevOps Assessment App</h1>
            <div class="config">
                <h2>Configuration Value:</h2>
                <p><strong>APP_MESSAGE = <span class="success">${configValue}</span></strong></p>
            </div>
            <p><a href="/health">View Health Check JSON</a></p>
            <hr>
            <p>Deployed via CI/CD Pipeline | Node.js ${process.version}</p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log('=========================================');
    console.log('Azure DevOps Assessment App');
    console.log(`Server running on port: ${port}`);
    console.log(`APP_MESSAGE: ${process.env.APP_MESSAGE || 'Not set'}`);
    console.log(`Node.js: ${process.version}`);
    console.log('=========================================');
});