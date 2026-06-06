const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_DIR = '/app/database';
const FILE_PATH = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)){
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
    // CORS Headers taaki HTML bina block hue baat kar sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

    if (req.url === '/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        if (fs.existsSync(FILE_PATH)) {
            return res.end(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
        }
        return res.end('[]');
    }

    if (req.url === '/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            let users = [];
            if (fs.existsSync(FILE_PATH)) {
                const fileData = fs.readFileSync(FILE_PATH, 'utf8');
                users = fileData ? JSON.parse(fileData) : [];
            }
            users.push(JSON.parse(body));
            fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
        return;
    }

    res.writeHead(404); res.end();
});

server.listen(3000, () => console.log("Backend chalu on port 3000"));
