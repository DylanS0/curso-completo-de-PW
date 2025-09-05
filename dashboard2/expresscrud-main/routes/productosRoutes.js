// routes/productoRoutes.js
const express = require('express');
const router = express.Router();

const {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productoController');

// Rutas RELATIVAS (sin /productos)
router.get('/', getAllProductos);            // → /api/productos
router.get('/:id', getProductoById);         // → /api/productos/:id
router.post('/', createProducto);             // → /api/productos
router.put('/:id', updateProducto);           // → /api/productos/:id
router.delete('/:id', deleteProducto);         // → /api/productos/:id

module.exports = router;
