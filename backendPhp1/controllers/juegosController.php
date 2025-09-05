<?php
// controllers/JuegosController.php

require_once __DIR__ . '/../config/database.php';

class JuegosController {

    // GET /api/juegos
    public function getAll() {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM juegos ORDER BY nombre ASC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // GET /api/juegos/:id
    public function getById($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("SELECT * FROM juegos WHERE idjuego = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Juego no encontrado']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // POST /api/juegos
    public function create($data) {
        global $pdo;

        $nombre = $data['nombre'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $fechapublicacion = $data['fechapublicacion'] ?? null;
        $precio = $data['precio'] ?? null;
        $valoracion = $data['valoracion'] ?? null;
        $imagen = $data['imagen'] ?? null;
        $idgenero = $data['idgenero'] ?? null;
        $idestatus = $data['idestatus'] ?? 1;

        // Validaciones
        if (!$nombre || !is_string($nombre) || trim($nombre) === '') {
            http_response_code(400);
            echo json_encode(['error' => 'El campo nombre es requerido y debe ser una cadena válida']);
            return;
        }
        $nombreLimpio = trim($nombre);

        if (!$idgenero || !is_numeric($idgenero)) {
            http_response_code(400);
            echo json_encode(['error' => 'El campo idgenero es requerido y debe ser un número válido']);
            return;
        }

        if (!in_array($idestatus, [1, 2])) {
            http_response_code(400);
            echo json_encode(['error' => 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)']);
            return;
        }

        if ($fechapublicacion && !strtotime($fechapublicacion)) {
            http_response_code(400);
            echo json_encode(['error' => 'La fecha de publicación debe tener un formato válido (YYYY-MM-DD)']);
            return;
        }

        if ($precio !== null && (!is_numeric($precio) || $precio < 0)) {
            http_response_code(400);
            echo json_encode(['error' => 'El precio debe ser un número positivo o nulo']);
            return;
        }

        if ($valoracion !== null && (!is_numeric($valoracion) || $valoracion < 0 || $valoracion > 5)) {
            http_response_code(400);
            echo json_encode(['error' => 'La valoración debe ser un número entre 0 y 5']);
            return;
        }

        if ($imagen && !is_string($imagen)) {
            http_response_code(400);
            echo json_encode(['error' => 'La imagen debe ser una cadena válida (URL o ruta)']);
            return;
        }

        try {
            // Verificar si ya existe un juego con el mismo nombre (ignorando mayúsculas)
            $stmt = $pdo->prepare("SELECT 1 FROM juegos WHERE LOWER(TRIM(nombre)) = ? LIMIT 1");
            $stmt->execute([strtolower($nombreLimpio)]);
            if ($stmt->fetch()) {
                http_response_code(400);
                echo json_encode(['error' => "Ya existe un juego con el nombre \"{$nombreLimpio}\""]);
                return;
            }

            // Verificar que el género exista
            $stmt = $pdo->prepare("SELECT idgenero FROM generos WHERE idgenero = ?");
            $stmt->execute([$idgenero]);
            if (!$stmt->fetch()) {
                http_response_code(400);
                echo json_encode(['error' => 'El género especificado no existe']);
                return;
            }

            // Insertar
            $sql = "INSERT INTO juegos (nombre, descripcion, fechapublicacion, precio, valoracion, imagen, idgenero, idestatus) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $nombreLimpio,
                $descripcion,
                $fechapublicacion,
                $precio,
                $valoracion,
                $imagen,
                $idgenero,
                $idestatus
            ]);

            $id = $pdo->lastInsertId();

            // Respuesta
            http_response_code(201);
            echo json_encode([
                'idjuego' => $id,
                'nombre' => $nombreLimpio,
                'descripcion' => $descripcion,
                'fechapublicacion' => $fechapublicacion,
                'precio' => $precio,
                'valoracion' => $valoracion,
                'imagen' => $imagen,
                'idgenero' => $idgenero,
                'idestatus' => $idestatus
            ]);
        } catch (Exception $e) {
            error_log('Error al crear juego: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Ocurrió un error interno al crear el juego']);
        }
    }

    // PUT /api/juegos/:id
    public function update($id, $data) {
        global $pdo;

        $nombre = $data['nombre'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $fechapublicacion = $data['fechapublicacion'] ?? null;
        $precio = $data['precio'] ?? null;
        $valoracion = $data['valoracion'] ?? null;
        $imagen = $data['imagen'] ?? null;
        $idgenero = $data['idgenero'] ?? null;
        $idestatus = $data['idestatus'] ?? null;

        // Validar que se envíe al menos un campo
        if ($nombre === null && $descripcion === null && $fechapublicacion === null &&
            $precio === null && $valoracion === null && $imagen === null &&
            $idgenero === null && $idestatus === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Debe proporcionar al menos uno de los campos para actualizar']);
            return;
        }

        try {
            // Verificar si el juego existe
            $stmt = $pdo->prepare("SELECT idjuego FROM juegos WHERE idjuego = ?");
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['message' => 'Juego no encontrado']);
                return;
            }

            $updates = [];
            $values = [];

            // Nombre
            if ($nombre !== null && trim($nombre) !== '') {
                $nombreLimpio = trim($nombre);
                // Verificar duplicado (excepto este ID)
                $stmt = $pdo->prepare("SELECT idjuego FROM juegos WHERE LOWER(TRIM(nombre)) = ? AND idjuego != ?");
                $stmt->execute([strtolower($nombreLimpio), $id]);
                if ($stmt->fetch()) {
                    http_response_code(400);
                    echo json_encode(['error' => "Ya existe un juego con el nombre \"{$nombreLimpio}\""]);
                    return;
                }
                $updates[] = "nombre = ?";
                $values[] = $nombreLimpio;
            }

            // Descripción
            if ($descripcion !== null) {
                $updates[] = "descripcion = ?";
                $values[] = $descripcion;
            }

            // Fecha de publicación
            if ($fechapublicacion !== null && strtotime($fechapublicacion)) {
                $updates[] = "fechapublicacion = ?";
                $values[] = $fechapublicacion;
            } elseif ($fechapublicacion !== null) {
                http_response_code(400);
                echo json_encode(['error' => 'Fecha de publicación inválida']);
                return;
            }

            // Precio
            if ($precio !== null && is_numeric($precio) && $precio >= 0) {
                $updates[] = "precio = ?";
                $values[] = $precio;
            } elseif ($precio !== null) {
                http_response_code(400);
                echo json_encode(['error' => 'Precio inválido. Debe ser un número positivo o nulo']);
                return;
            }

            // Valoración
            if ($valoracion !== null && is_numeric($valoracion) && $valoracion >= 0 && $valoracion <= 5) {
                $updates[] = "valoracion = ?";
                $values[] = (int)$valoracion;
            } elseif ($valoracion !== null) {
                http_response_code(400);
                echo json_encode(['error' => 'Valoración debe estar entre 0 y 5']);
                return;
            }

            // Imagen
            if ($imagen !== null && is_string($imagen)) {
                $updates[] = "imagen = ?";
                $values[] = $imagen;
            }

            // Idgenero
            if ($idgenero !== null) {
                if (!is_numeric($idgenero)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'idgenero debe ser un número']);
                    return;
                }
                // Verificar que el género exista
                $stmt = $pdo->prepare("SELECT idgenero FROM generos WHERE idgenero = ?");
                $stmt->execute([$idgenero]);
                if (!$stmt->fetch()) {
                    http_response_code(400);
                    echo json_encode(['error' => 'El género especificado no existe']);
                    return;
                }
                $updates[] = "idgenero = ?";
                $values[] = (int)$idgenero;
            }

            // Idestatus
            if ($idestatus !== null) {
                if (!in_array((int)$idestatus, [1, 2])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'idestatus debe ser 1 (Activo) o 2 (Inactivo)']);
                    return;
                }
                $updates[] = "idestatus = ?";
                $values[] = (int)$idestatus;
            }

            // Si no hay cambios válidos
            if (empty($updates)) {
                http_response_code(400);
                echo json_encode(['error' => 'No hay datos válidos para actualizar']);
                return;
            }

            // Ejecutar UPDATE
            $values[] = $id;
            $sql = "UPDATE juegos SET " . implode(', ', $updates) . " WHERE idjuego = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);

            // Respuesta
            $response = array_filter([
                'nombre' => $nombre !== null ? $nombreLimpio : null,
                'descripcion' => $descripcion,
                'fechapublicacion' => $fechapublicacion,
                'precio' => $precio,
                'valoracion' => $valoracion,
                'imagen' => $imagen,
                'idgenero' => $idgenero,
                'idestatus' => $idestatus
            ]);

            echo json_encode($response);
        } catch (Exception $e) {
            error_log('Error al actualizar juego: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Ocurrió un error interno al actualizar el juego']);
        }
    }

    // DELETE /api/juegos/:id
    public function delete($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM juegos WHERE idjuego = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'Juego no encontrado']);
                return;
            }

            http_response_code(200);
            echo json_encode([
                'message' => 'Juego eliminado con éxito',
                'id' => (int)$id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}