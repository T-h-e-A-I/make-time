const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Set content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Handle different routes
    if (req.url === '/') {
        // Serve the first page
        fs.readFile('page1.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
            res.statusCode = 200;
            res.end(data);
        });
    } else if (req.url === '/page2') {
        // Serve the second page
        fs.readFile('page2.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
            res.statusCode = 200;
            res.end(data);
        });
    } else if (req.url === '/page3') {
        // Serve the third page
        if (req.method === 'POST') {
            // Handle POST request for adding temporary data
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                // Parse the POST data
                const parsedData = new URLSearchParams(body);
                const highlight = parsedData.get('highlight');
                const tactic = parsedData.get('tactics');
                const tactic2 = parsedData.get('tactics-2');
                const laser = parsedData.get('laser');
                const energy = parsedData.get('energy');
                // Perform any required actions with the temporary data
                //console.log('Received data:', highlight, tactic, tactic2, laser, energy);
    
                // Create New Page with Highlight
                res.statusCode = 302;
                res.setHeader('Location', '/highlight');
                let updatedPage = fs.readFileSync('highlight.html', 'utf8');
                updatedPage = updatedPage.replace("{{highlight}}", highlight);
                updatedPage = updatedPage.replace("{{tactic}}", tactic);
                updatedPage = updatedPage.replace("{{tactic2}}", tactic2);
                updatedPage = updatedPage.replace("{{laser}}", laser);
                updatedPage = updatedPage.replace("{{energy}}", energy);
                res.statusCode = 200;
                res.end(updatedPage);
            });
        } else {
            // Serve the third page initially
            fs.readFile('page3.html', 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                    return;
                }
                res.statusCode = 200;
                res.end(data);
            });
        }
    } else if (req.url === '/resource/cover.jpg') {
        fs.readFile('public/resource/cover.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/jpg' })
            res.end(data, 'utf8')
        });
    }
    else {
        // Handle unknown routes
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Start the server
server.listen(8000, () => {
    console.log('Server is running on port 3000');
});
