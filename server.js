const http = require('http');
const fs = require('fs');
const path = require('path');

// Production configuration
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DIRECTORY = 'website';

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.woff2': 'font/woff2',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Cache control for static assets
const getCacheControl = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const staticAssets = ['.css', '.js', '.png', '.jpg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.ico', '.webp'];
    
    if (staticAssets.includes(ext)) {
        return NODE_ENV === 'production' ? 'public, max-age=31536000, immutable' : 'public, max-age=3600';
    }
    return 'public, max-age=3600';
};

const server = http.createServer((req, res) => {
    // Log requests in development
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    // Set security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Handle CORS
    const allowedOrigins = NODE_ENV === 'production' 
        ? ['https://your-app-name.onrender.com'] 
        : ['http://localhost:8080', 'http://127.0.0.1:8080'];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Parse URL and handle routing
    let filePath = '.' + req.url;
    
    // Default route to signup page
    if (filePath === './' || filePath === './index.html') {
        filePath = './website/signup-pro.html';
    }

    // Handle directory requests
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    // Security check - prevent directory traversal
    if (filePath.includes('..') || filePath.includes('//')) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 Forbidden</h1><p>Access denied.</p>');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    // Set cache control
    res.setHeader('Cache-Control', getCacheControl(filePath));

    // Try to serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, try to serve from website directory
                const websitePath = path.join(DIRECTORY, filePath.replace('./', ''));
                fs.readFile(websitePath, (err, websiteContent) => {
                    if (err) {
                        // Try to serve from website root
                        const rootPath = path.join(DIRECTORY, path.basename(filePath));
                        fs.readFile(rootPath, (rootErr, rootContent) => {
                            if (rootErr) {
                                // 404 - File not found
                                res.writeHead(404, { 'Content-Type': 'text/html' });
                                res.end(`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <title>404 - Page Not Found</title>
                                        <style>
                                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                                            h1 { color: #333; }
                                            a { color: #4f46e5; text-decoration: none; }
                                        </style>
                                    </head>
                                    <body>
                                        <h1>404 - Page Not Found</h1>
                                        <p>The requested page was not found.</p>
                                        <a href="/signup-pro.html">Go to Home</a>
                                    </body>
                                    </html>
                                `);
                            } else {
                                // Serve file from website root
                                res.writeHead(200, { 'Content-Type': mimeType });
                                res.end(rootContent, 'utf-8');
                            }
                        });
                    } else {
                        // Serve file from website directory
                        res.writeHead(200, { 'Content-Type': mimeType });
                        res.end(websiteContent, 'utf-8');
                    }
                });
            } else {
                // 500 - Server error
                console.error('Server error:', error);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Server Error</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #dc2626; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - Internal Server Error</h1>
                        <p>Something went wrong. Please try again later.</p>
                        <a href="/signup-pro.html">Go to Home</a>
                    </body>
                    </html>
                `);
            }
        } else {
            // 200 - Success
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Growth Tracker Server is running in ${NODE_ENV} mode!`);
    console.log(`📁 Serving directory: ${DIRECTORY}`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    
    if (NODE_ENV === 'development') {
        console.log('');
        console.log('📱 Available pages:');
        console.log(`   • Sign Up: http://localhost:${PORT}/signup-pro.html`);
        console.log(`   • Dashboard: http://localhost:${PORT}/dashboard-pro.html`);
        console.log(`   • Tasks: http://localhost:${PORT}/tasks-pro.html`);
        console.log(`   • Analytics: http://localhost:${PORT}/analytics-pro.html`);
        console.log(`   • Badges: http://localhost:${PORT}/badges-pro.html`);
        console.log(`   • Profile: http://localhost:${PORT}/profile-pro.html`);
        console.log(`   • Settings: http://localhost:${PORT}/settings-pro.html`);
        console.log('');
        console.log('🔄 To restart: Press Ctrl+C and run "node server.js" again');
        console.log('🛑 To stop: Press Ctrl+C');
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
