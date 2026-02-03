const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 10000;
const NODE_ENV = process.env.NODE_ENV || 'production';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'application/font-woff',
    '.woff2': 'font/woff2',
    '.ttf': 'application/font-ttf'
};

const server = http.createServer((req, res) => {
    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Log requests in development
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    // Handle routing
    let filePath = req.url;
    
    // Default route to signup page
    if (filePath === '/' || filePath === '' || filePath === '/index.html') {
        filePath = '/signup-pro.html';
    }

    // Remove leading slash and add website directory
    let fullPath = path.join(__dirname, 'website', filePath);
    
    // If file doesn't exist with .html, try adding it
    if (!path.extname(fullPath)) {
        fullPath += '.html';
    }

    // Get file extension
    const extname = String(path.extname(fullPath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    // Serve the file
    fs.readFile(fullPath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found - serve 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Page Not Found</title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px; 
                                background: #f5f5f5;
                            }
                            h1 { color: #333; margin-bottom: 20px; }
                            a { 
                                color: #4f46e5; 
                                text-decoration: none; 
                                padding: 10px 20px;
                                background: #4f46e5;
                                color: white;
                                border-radius: 5px;
                                display: inline-block;
                                margin-top: 20px;
                            }
                            a:hover { background: #3730a3; }
                            .container {
                                max-width: 500px;
                                margin: 50px auto;
                                background: white;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>404 - Page Not Found</h1>
                            <p>The requested page was not found.</p>
                            <a href="/signup-pro.html">Go to Home</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                // Server error
                console.error('Server error:', error);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Server Error</title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px; 
                                background: #f5f5f5;
                            }
                            h1 { color: #dc2626; margin-bottom: 20px; }
                            .container {
                                max-width: 500px;
                                margin: 50px auto;
                                background: white;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>500 - Server Error</h1>
                            <p>Something went wrong. Please try again later.</p>
                            <a href="/signup-pro.html">Go to Home</a>
                        </div>
                    </body>
                    </html>
                `);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Growth Tracker Server is running in ${NODE_ENV} mode!`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    
    if (NODE_ENV === 'development') {
        console.log('📱 Available pages:');
        console.log(`   • Sign Up: http://localhost:${PORT}/signup-pro.html`);
        console.log(`   • Dashboard: http://localhost:${PORT}/dashboard-pro.html`);
        console.log(`   • Tasks: http://localhost:${PORT}/tasks-pro.html`);
        console.log(`   • Analytics: http://localhost:${PORT}/analytics-pro.html`);
        console.log(`   • Badges: http://localhost:${PORT}/badges-pro.html`);
    }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
