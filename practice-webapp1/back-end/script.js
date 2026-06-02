const http = require('http');

const menu = [
    { id: 1, name: "Paneer Butter Masala", price: 280, category: "Main", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400" },
    { id: 2, name: "Cheese Butter Pizza", price: 350, category: "Fast Food", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400" },
    { id: 3, name: "Hyderabadi Biryani", price: 320, category: "Main", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=400" },
    { id: 4, name: "Gulab Jamun (2pc)", price: 80, category: "Dessert", img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400" }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/api/menu' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(menu));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Backend Server chalu ho gaya hai on Port ${PORT}`);
});
