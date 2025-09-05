<?php
// routes/juegosRoutes.php

require_once __DIR__ . '/../controllers/JuegosController.php';
require_once __DIR__ . '/../core/core.php';

$controller = new JuegosController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// Extraer el ID de la URL si existe (ej: /api/juegos/5)
$matches = [];
preg_match('/\/api\/juegos\/(\d+)$/', $_SERVER['REQUEST_URI'], $matches);
if (!empty($matches)) {
    $id = (int)$matches[1];
}

// Decodificar datos del cuerpo (solo si es POST o PUT)
$data = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if ($id) {
            $controller->getById($id);
        } else {
            $controller->getAll();
        }
        break;

    case 'POST':
        $controller->create($data);
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido en la URL para actualizar']);
            break;
        }
        $controller->update($id, $data);
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido en la URL para eliminar']);
            break;
        }
        $controller->delete($id);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
?>