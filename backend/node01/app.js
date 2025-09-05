const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(express.json()); // Parsea cuerpos JSON en peticiones
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// ... después de app.listen ...
db.getConnection()
    .then(conn => {
        console.log('Conexión a MySQL exitosa!');
        conn.release();
    })
    .catch(err => {
        console.error('Error de conexión a MySQL:', err);
    });

app.get('/generos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM generos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/plataformas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM plataformas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/juegos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM juegos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});