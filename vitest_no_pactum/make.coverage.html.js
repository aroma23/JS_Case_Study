const fs = require('fs');
const path = require('path');

// Read JSON file
const jsonFilePath = path.join(__dirname, '/reports/users-coverage.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

function generateHTML(data) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Coverage Report</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 40px;
                padding: 20px;
                background: linear-gradient(to right, #ff7e5f, #feb47b);
                color: #333;
                text-align: center;
            }
            .container {
                max-width: 700px;
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                margin: auto;
            }
            h1 {
                color: #2c3e50;
                font-size: 28px;
                margin-bottom: 20px;
            }
            .stats {
                margin-bottom: 20px;
                font-size: 18px;
            }
            .covered-list {
                color: red;
                font-weight: bold;
                list-style: none;
                padding: 0;
            }
            .missed-list {
                color: red;
                font-weight: bold;
                list-style: none;
                padding: 0;
            }
            ul {
                padding-left: 0;
            }
            li2 {
                background:rgb(115, 234, 226);
                color: white;
                padding: 10px;
                margin: 5px;
                border-radius: 5px;
                display: inline-block;
            }
            li {
                background: #ff6b6b;
                color: white;
                padding: 10px;
                margin: 5px;
                border-radius: 5px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 API Coverage Report</h1>
            <div class="stats">
                <p><strong>Base Path:</strong> ${data.basePath || '/'}</p>
                <p><strong>Total APIs:</strong> ${data.totalApiCount}</p>
                <p><strong>Covered APIs:</strong> ${data.coveredApiCount}</p>
                <p><strong>Missed APIs:</strong> ${data.missedApiCount}</p>
                <p><strong>Coverage Percentage:</strong> ${data.coverage}%</p>
            </div>
            <h2>✅ Covered APIs</h2>
            <ul class="covered-list">
                ${data.coveredApiList.map(api => `<li2>${api}</li2>`).join('')}
            </ul>
            <h2>❌ Missed APIs</h2>
            <ul class="missed-list">
                ${data.missedApiList.map(api => `<li>${api}</li>`).join('')}
            </ul>
        </div>
    </body>
    </html>`;
}

// Generate HTML content
const htmlContent = generateHTML(jsonData);

// Write to an HTML file
const htmlFilePath = path.join(__dirname, '/reports/apiCoverageReport.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

console.log(`HTML report generated: ${htmlFilePath}`);
