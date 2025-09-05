const db = require('../config/db');

const getAllProductos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProducto = async (req, res) => {
  let {
    idestatus = 1,
    idcategoria,
    nombre,
    preciodouble,
    stock,
    imagen,
    descripcion
  } = req.body;

  // Validaciones básicas
  if (idcategoria === undefined || typeof idcategoria !== 'number' || idcategoria <= 0) {
    return res.status(400).json({ error: 'El campo idcategoria es requerido y debe ser un número positivo' });
  }

  // Validar idestatus si está presente
  if (![1, 2].includes(Number(idestatus))) {
    return res.status(400).json({ error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)' });
  }

  if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim() === '')) {
    return res.status(400).json({ error: 'El campo nombre debe ser una cadena válida si se proporciona' });
  }

  if (preciodouble !== undefined && (typeof preciodouble !== 'number' || isNaN(preciodouble) || preciodouble < 0)) {
    return res.status(400).json({ error: 'El campo preciodouble debe ser un número mayor o igual a 0 si se proporciona' });
  }

  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    return res.status(400).json({ error: 'El campo stock debe ser un entero mayor o igual a 0 si se proporciona' });
  }

  if (imagen !== undefined && imagen !== null && typeof imagen !== 'string') {
    return res.status(400).json({ error: 'El campo imagen debe ser una cadena si se proporciona' });
  }

  if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
    return res.status(400).json({ error: 'El campo descripcion debe ser una cadena si se proporciona' });
  }

  // Limpiar datos opcionales
  nombre = nombre ? nombre.trim() : null;
  imagen = imagen ? imagen.trim() : null;
  descripcion = descripcion ? descripcion.trim() : null;

  try {
    // Opcional: validar que la categoría exista
    const [categoriaRows] = await db.query('SELECT id FROM categorias WHERE id = ?', [idcategoria]);
    if (categoriaRows.length === 0) {
      return res.status(400).json({ error: 'La categoría especificada no existe' });
    }

    // Insertar nuevo producto
    const [result] = await db.query(
      `INSERT INTO productos 
        (idestatus, idcategoria, nombre, preciodouble, stock, imagen, descripcion) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [idestatus, idcategoria, nombre, preciodouble, stock, imagen, descripcion]
    );

    res.status(201).json({
      id: result.insertId,
      idestatus,
      idcategoria,
      nombre,
      preciodouble,
      stock,
      imagen,
      descripcion,
    });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).json({
      error: 'Ocurrió un error interno al crear el producto'
    });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const {
    idestatus,
    idcategoria,
    nombre,
    preciodouble,
    stock,
    imagen,
    descripcion
  } = req.body;

  // Validar que haya al menos un campo para actualizar
  if (
    idestatus === undefined &&
    idcategoria === undefined &&
    nombre === undefined &&
    preciodouble === undefined &&
    stock === undefined &&
    imagen === undefined &&
    descripcion === undefined
  ) {
    return res.status(400).json({
      error: 'Debe proporcionar al menos un campo para actualizar'
    });
  }

  try {
    // Verificar que el producto exista
    const [existing] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    let updates = [];
    let values = [];

    if (idestatus !== undefined) {
      if (typeof idestatus !== 'number' || ![1, 2].includes(idestatus)) {
        return res.status(400).json({ error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)'});
      }
      updates.push('idestatus = ?');
      values.push(idestatus);
    }

    if (idcategoria !== undefined) {
      if (typeof idcategoria !== 'number' || idcategoria <= 0) {
        return res.status(400).json({ error: 'El campo idcategoria debe ser un número positivo' });
      }
      // Validar que la categoría exista
      const [categoriaRows] = await db.query('SELECT id FROM categorias WHERE id = ?', [idcategoria]);
      if (categoriaRows.length === 0) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }
      updates.push('idcategoria = ?');
      values.push(idcategoria);
    }

    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'El campo nombre debe ser una cadena válida' });
      }
      updates.push('nombre = ?');
      values.push(nombre.trim());
    }

    if (preciodouble !== undefined) {
      if (typeof preciodouble !== 'number' || isNaN(preciodouble) || preciodouble < 0) {
        return res.status(400).json({ error: 'El campo preciodouble debe ser un número mayor o igual a 0' });
      }
      updates.push('preciodouble = ?');
      values.push(preciodouble);
    }

    if (stock !== undefined) {
      if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({ error: 'El campo stock debe ser un entero mayor o igual a 0' });
      }
      updates.push('stock = ?');
      values.push(stock);
    }

    if (imagen !== undefined) {
      if (imagen !== null && typeof imagen !== 'string') {
        return res.status(400).json({ error: 'El campo imagen debe ser una cadena o null' });
      }
      updates.push('imagen = ?');
      values.push(imagen ? imagen.trim() : null);
    }

    if (descripcion !== undefined) {
      if (descripcion !== null && typeof descripcion !== 'string') {
        return res.status(400).json({ error: 'El campo descripcion debe ser una cadena o null' });
      }
      updates.push('descripcion = ?');
      values.push(descripcion ? descripcion.trim() : null);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
    }

    values.push(id); // para la cláusula WHERE

    const sql = `UPDATE productos SET ${updates.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    // Preparar campos actualizados para la respuesta
    let updatedFields = {};
    if (idestatus !== undefined) updatedFields.idestatus = idestatus;
    if (idcategoria !== undefined) updatedFields.idcategoria = idcategoria;
    if (nombre !== undefined) updatedFields.nombre = nombre.trim();
    if (preciodouble !== undefined) updatedFields.preciodouble = preciodouble;
    if (stock !== undefined) updatedFields.stock = stock;
    if (imagen !== undefined) updatedFields.imagen = imagen ? imagen.trim() : null;
    if (descripcion !== undefined) updatedFields.descripcion = descripcion ? descripcion.trim() : null;

    res.json(updatedFields);
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({
      error: 'Ocurrió un error interno al actualizar el producto'
    });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
