const db = require('../config/db');

const getAllCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategoria = async (req, res) => {
  const { categoria, idestatus = 1 } = req.body;

  if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
    return res.status(400).json({
      error: 'El campo categoria es requerido y debe ser una cadena válida'
    });
  }

  const categoriaLimpia = categoria.trim();

  if (![1, 2].includes(Number(idestatus))) {
    return res.status(400).json({
      error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)'
    });
  }

  try {
    const [existingRows] = await db.query(
      'SELECT id FROM categorias WHERE LOWER(TRIM(categoria)) = ?',
      [categoriaLimpia.toLowerCase()]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({
        error: `Ya existe una categoría con el nombre "${categoriaLimpia}"`
      });
    }

    const [result] = await db.query(
      'INSERT INTO categorias (categoria, idestatus) VALUES (?, ?)',
      [categoriaLimpia, idestatus]
    );

    res.status(201).json({
      id: result.insertId,
      categoria: categoriaLimpia,
      idestatus
    });
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(500).json({
      error: 'Ocurrió un error interno al crear la categoría'
    });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { categoria, idestatus } = req.body;

  if (categoria === undefined && idestatus === undefined) {
    return res.status(400).json({
      error: 'Debe proporcionar al menos uno de los siguientes campos: categoria, idestatus'
    });
  }

  try {
    const [existing] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    let updates = [];
    let values = [];

    if (categoria !== undefined) {
      if (typeof categoria !== 'string' || categoria.trim() === '') {
        return res.status(400).json({
          error: 'El campo categoria debe ser una cadena válida'
        });
      }

      const categoriaLimpia = categoria.trim();

      const [duplicates] = await db.query(
        'SELECT id FROM categorias WHERE LOWER(TRIM(categoria)) = ? AND id != ?',
        [categoriaLimpia.toLowerCase(), id]
      );

      if (duplicates.length > 0) {
        return res.status(400).json({
          error: `Ya existe una categoría con el nombre "${categoriaLimpia}"`
        });
      }

      updates.push('categoria = ?');
      values.push(categoriaLimpia);
    }

    if (idestatus !== undefined) {
      if (typeof idestatus !== 'number' || ![1, 2].includes(idestatus)) {
        return res.status(400).json({
          error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)'
        });
      }
      updates.push('idestatus = ?');
      values.push(idestatus);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
    }

    values.push(id);

    const sql = `UPDATE categorias SET ${updates.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    const updatedFields = {};
    if (categoria !== undefined) updatedFields.categoria = categoria.trim();
    if (idestatus !== undefined) updatedFields.idestatus = idestatus;

    res.json(updatedFields);
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    res.status(500).json({
      error: 'Ocurrió un error interno al actualizar la categoría'
    });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
