const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_DIR = '/app/data';
const FILE_PATH = path.join(DATA_DIR, 'orders.json');

if (!fs.existsSync(DATA_DIR)){
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

   
    if (req.url === '/orders' && req.method === 'GET') {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            return res.end(data || '[]');
        }
        return res.end('[]');
    }

    // 2. POST Route: Naya order add karne ke liye
    if (req.url === '/order' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            let currentOrders = [];
            if (fs.existsSync(FILE_PATH)) {
                const fileData = fs.readFileSync(FILE_PATH, 'utf8');
                currentOrders = fileData ? JSON.parse(fileData) : [];
            }
            
            const newOrder = JSON.parse(body);
            newOrder.timestamp = new Date();
            currentOrders.push(newOrder);

            // File me write kar do
            fs.writeFileSync(FILE_PATH, JSON.stringify(currentOrders, null, 2));
            res.writeHead(201);
            res.end(JSON.stringify({ message: "Order Saved Permanently!", order: newOrder }));
        });
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
    console.log("Server run ho gaya on port 3000");
});
