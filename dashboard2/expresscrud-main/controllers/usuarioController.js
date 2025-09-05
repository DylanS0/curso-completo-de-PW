const db = require('../config/db');
//const bcrypt = require('bcrypt'); // Para encriptar password, se recomienda usar bcrypt

const SALT_ROUNDS = 10;

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT idusuario, nombre, email, rol, fechacreacion, activo FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por id
const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT idusuario, nombre, email, rol, fechacreacion, activo FROM usuarios WHERE idusuario = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
const createUsuario = async (req, res) => {
  let { nombre, email, password, rol = 'cliente', activo = 1 } = req.body;

  // Validaciones
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El campo nombre es requerido y debe ser una cadena válida' });
  }
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'El campo email es requerido y debe ser una cadena válida' });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'El campo password es requerido y debe tener al menos 6 caracteres' });
  }
  const rolValidos = ['cliente', 'admin'];
  if (!rolValidos.includes(rol)) {
    return res.status(400).json({ error: `El campo rol debe ser uno de: ${rolValidos.join(', ')}` });
  }
  activo = Number(activo);
  if (![0, 1].includes(activo)) {
    return res.status(400).json({ error: 'El campo activo debe ser 0 o 1' });
  }

  const nombreLimpio = nombre.trim();
  const emailLimpio = email.trim().toLowerCase();

  try {
    // Verificar si ya existe un usuario con ese email
    const [existingUsers] = await db.query('SELECT idusuario FROM usuarios WHERE LOWER(email) = ?', [emailLimpio]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: `Ya existe un usuario con el email "${emailLimpio}"` });
    }

    // Encriptar la password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insertar usuario
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?, ?, ?, ?, ?)',
      [nombreLimpio, emailLimpio, hashedPassword, rol, activo]
    );

    res.status(201).json({
      idusuario: result.insertId,
      nombre: nombreLimpio,
      email: emailLimpio,
      rol,
      activo
    });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Ocurrió un error interno al crear el usuario' });
  }
};

// Actualizar usuario
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol, activo } = req.body;

  if (!nombre && !email && !password && !rol && activo === undefined) {
    return res.status(400).json({
      error: 'Debe proporcionar al menos uno de los siguientes campos: nombre, email, password, rol, activo'
    });
  }

  const rolValidos = ['cliente', 'admin'];

  try {
    // Verificar que el usuario existe
    const [existingUsers] = await db.query('SELECT * FROM usuarios WHERE idusuario = ?', [id]);
    if (existingUsers.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    let updates = [];
    let values = [];

    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: 'El campo nombre debe ser una cadena válida' });
      }
      updates.push('nombre = ?');
      values.push(nombre.trim());
    }

    if (email !== undefined) {
      if (typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ error: 'El campo email debe ser una cadena válida' });
      }
      const emailLimpio = email.trim().toLowerCase();

      // Verificar que no exista otro usuario con el mismo email
      const [emailDuplicates] = await db.query(
        'SELECT idusuario FROM usuarios WHERE LOWER(email) = ? AND idusuario != ?',
        [emailLimpio, id]
      );
      if (emailDuplicates.length > 0) {
        return res.status(400).json({ error: `Ya existe un usuario con el email "${emailLimpio}"` });
      }

      updates.push('email = ?');
      values.push(emailLimpio);
    }

    if (password !== undefined) {
      if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'El campo password debe tener al menos 6 caracteres' });
      }
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (rol !== undefined) {
      if (!rolValidos.includes(rol)) {
        return res.status(400).json({ error: `El campo rol debe ser uno de: ${rolValidos.join(', ')}` });
      }
      updates.push('rol = ?');
      values.push(rol);
    }

    if (activo !== undefined) {
      const activoNum = Number(activo);
      if (![0, 1].includes(activoNum)) {
        return res.status(400).json({ error: 'El campo activo debe ser 0 o 1' });
      }
      updates.push('activo = ?');
      values.push(activoNum);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
    }

    values.push(id);
    const sql = `UPDATE usuarios SET ${updates.join(', ')} WHERE idusuario = ?`;
    await db.query(sql, values);

    // Para la respuesta, enviar solo los campos actualizados (excepto password)
    let updatedFields = {};
    if (nombre !== undefined) updatedFields.nombre = nombre.trim();
    if (email !== undefined) updatedFields.email = email.trim().toLowerCase();
    if (rol !== undefined) updatedFields.rol = rol;
    if (activo !== undefined) updatedFields.activo = Number(activo);

    res.json(updatedFields);
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Ocurrió un error interno al actualizar el usuario' });
  }
};

// Eliminar usuario
const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM usuarios WHERE idusuario = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
