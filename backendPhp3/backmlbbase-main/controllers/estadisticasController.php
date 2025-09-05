<?php
// controllers/estadisticasController.php

require_once __DIR__ . '/../config/database.php';

class EstadisticasController
{

    // GET /api/estadisticas/top-war
    public function topWar()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT * 
                FROM jugadores 
                WHERE war >=30
                ORDER BY CAST(war AS DECIMAL(4,2)) DESC 
 
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top WAR: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-avg
    public function topAvg()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE promedio_bateo >=0.280 and veces_al_bate>100
                ORDER BY CAST(promedio_bateo AS DECIMAL(4,3)) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-hr
    public function topHr()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE home_runs >= 100
                ORDER BY home_runs DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top Hr: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-dobles
    public function topDobles()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE dobles >= 100
                ORDER BY dobles DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top Dobles: ' . $e->getMessage()]);
        }
    }



    // GET /api/estadisticas/top-triples
    public function topTriples()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE triples >= 20
                ORDER BY triples DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top triples: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-ops
    public function topOps()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE ops >= 20
                ORDER BY ops DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top ops: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-rc (Runs Created)
    public function topRC()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE carreras_impulsadas >= 20
                ORDER BY carreras_impulsadas DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top carreras_impulsadas: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-iso (Isolated Power)
    public function topIso()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                    (porcentaje_slugging - promedio_bateo) AS iso 
                FROM jugadores 
                ORDER BY iso DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top iso: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-bb (Walk Percentage)
    public function topWP()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE bases_por_bolas >= 1000
                ORDER BY bases_por_bolas DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top bb: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-k (Strikeout Percentage)
    public function topSP()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                    ((ponches/veces_al_bate)*100) AS Strikeout_Percentage
                FROM jugadores 
                ORDER BY Strikeout_Percentage DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top SP: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-xbh (Extra-Base Hits)
    public function topEBH()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                    (dobles + triples + home_runs) AS Porcentaje_ExtraBaseHits
                FROM jugadores 
                ORDER BY Porcentaje_ExtraBaseHits DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top EBH: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-sb (Stolen Base Percentage)
    public function topSBP()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                    ((bases_robadas/(bases_robadas+atrapado_robando))*100) AS Strikeout_Percentage
                FROM jugadores 
                ORDER BY Strikeout_Percentage DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top SP: ' . $e->getMessage()]);
        }
    }




    // GET /api/estadisticas/top-tb (Total Bases)
    public function topTB()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                    (hits + 2*dobles+3*triples+4*home_runs)*100) AS total_bases
                FROM jugadores 
                ORDER BY  total_bases DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top tb: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-allstar
    public function topAS()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *
                FROM jugadores 
                WHERE all_star_appearances 
                ORDER BY  all_star_appearances DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top allstar: ' . $e->getMessage()]);
        }
    }

    // GET /api/mapa/ciudades
    public function topCity()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                ORDER BY lugar_nacimiento DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top city: ' . $e->getMessage()]);
        }
    }





    // GET /api/estadisticas/resumen
    public function resumen()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    COUNT(*) as total_jugadores,
                    SUM(home_runs) as total_hr,
                    AVG(CAST(war AS DECIMAL(4,2))) as avg_war,
                    MAX(CAST(war AS DECIMAL(4,2))) as max_war,
                    (SELECT nombre FROM jugadores ORDER BY CAST(war AS DECIMAL(4,2)) DESC LIMIT 1) as mejor_war
                FROM jugadores
            ");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener resumen: ' . $e->getMessage()]);
        }
    }




    public function destacados() {
    global $pdo;

    try {
        // 1. WAR más alto
        $stmt_war = $pdo->query("
            SELECT id, nombre, CAST(war AS DECIMAL(4,2)) as war, lugar_nacimiento 
            FROM jugadores 
            WHERE war IS NOT NULL 
            ORDER BY war DESC 
            LIMIT 1
        ");
        $war = $stmt_war->fetch(PDO::FETCH_ASSOC);

        // 2. Mejor AVG
        $stmt_avg = $pdo->query("
            SELECT id, nombre, promedio_bateo, lugar_nacimiento 
            FROM jugadores 
            WHERE promedio_bateo IS NOT NULL  AND veces_al_bate > 3000
            ORDER BY promedio_bateo DESC 
            LIMIT 1
        ");
        $avg = $stmt_avg->fetch(PDO::FETCH_ASSOC);

        // 3. Más apariciones en All-Star
        $stmt_all_star = $pdo->query("
            SELECT id, nombre, all_star_appearances, lugar_nacimiento 
            FROM jugadores 
            WHERE all_star_appearances IS NOT NULL 
            ORDER BY all_star_appearances DESC 
            LIMIT 1
        ");
        $all_star = $stmt_all_star->fetch(PDO::FETCH_ASSOC);

        // 4. Más triples
        $stmt_t3b = $pdo->query("
            SELECT id, nombre, triples, lugar_nacimiento 
            FROM jugadores 
            ORDER BY triples DESC 
            LIMIT 1
        ");
        $t3b = $stmt_t3b->fetch(PDO::FETCH_ASSOC);


       

        // Preparar respuesta
        $data = [
            'war_mas_alto' => [
                'id' => $war ? $war['id'] : null,
                'valor' => $war ? $war['war'] : null,
                'jugador' => $war ? $war['nombre'] : 'N/A',
                'ciudad' => $war ? $war['lugar_nacimiento'] : 'N/A'
            ],
            'mejor_avg' => [
                'id' => $avg ? $avg['id'] : null,
                'valor' => $avg ? number_format($avg['promedio_bateo'], 3) : '0.000',
                'jugador' => $avg ? $avg['nombre'] : 'N/A',
                'ciudad' => $avg ? $avg['lugar_nacimiento'] : 'N/A'
            ],
            'mas_all_star' => [
                'id' => $all_star ? $all_star['id'] : null,
                'valor' => $all_star ? $all_star['all_star_appearances'] : 0,
                'jugador' => $all_star ? $all_star['nombre'] : 'N/A',
                'ciudad' => $all_star ? $all_star['lugar_nacimiento'] : 'N/A'
            ],
              'lider_t3b' => [
                'id' => $t3b ? $t3b['id'] : null,
                'valor' => $t3b ? $t3b['triples'] : 0,
                'jugador' => $t3b ? $t3b['nombre'] : 'N/A',
                'ciudad' => $t3b ? $t3b['lugar_nacimiento'] : 'N/A'
            ]  

              ];

               // ✅ Imprimir el JSON (como hace resumen)
        echo json_encode($data);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener destacados: ' . $e->getMessage()]);
    }
}



}

