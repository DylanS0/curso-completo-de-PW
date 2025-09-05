<?php
// routes/estadisticasRoutes.php

require_once __DIR__ . '/../controllers/estadisticasController.php';
require_once __DIR__ . '/../core/core.php'; // Maneja CORS, funciones auxiliares, etc.

$controller = new EstadisticasController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Asegurar CORS para todas las rutas


if ($method === 'GET') {
    // === TOP JUGADORES POR ESTADÍSTICA ===
    if (preg_match('/^\/api\/estadisticas\/top-war/', $path)) {
        $controller->topWar();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-avg/', $path)) {
        $controller->topAvg();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-hr/', $path)) {
        $controller->topHr();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-dobles/', $path)) {
        $controller->topDobles();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-triples/', $path)) {
        $controller->topTriples();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-ops/', $path)) {
        $controller->topOps();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-rc/', $path)) {
        $controller->topRC();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-iso/', $path)) {
        $controller->topIso();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-bb/', $path)) {
        $controller->topWP();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-k/', $path)) {
        $controller->topSP();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-xbh/', $path)) {
        $controller->topEBH();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-tb/', $path)) {
        $controller->topTB();
    } 
    elseif (preg_match('/^\/api\/estadisticas\/top-allstar/', $path)) {
        $controller->topAS();
    } 
    elseif (preg_match('/^\/api\/mapa\/ciudades/', $path)) {
        $controller->topCity();
    } 



    // === RESUMEN GENERAL ===
    elseif (preg_match('/^\/api\/estadisticas\/resumen/', $path)) {
        $controller->resumen();
    } 
     elseif (preg_match('/^\/api\/estadisticas\/destacados/', $path)) {
        $controller->destacados();
    } 


    

    // === RUTA NO ENCONTRADA ===
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta de estadísticas no encontrada']);
    }





} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET.']);
}
?>