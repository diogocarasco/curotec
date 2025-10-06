<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TechnicalDebtService;

class TechnicalDebtController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/technical-debts",
     *     summary="Get all technical debts",
     *     tags={"Technical Debts"},
     *     @OA\Response(
     *         response=200,
     *         description="List of technical debts",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="file", type="string"),
     *                 @OA\Property(property="type", type="string"),
     *                 @OA\Property(property="priority", type="string")
     *             )
     *         )
     *     )
     * )
     */
    public function index(TechnicalDebtService $service)
    {
        // Coleta todos os débitos técnicos com métricas
        $debts = $service->getTechnicalDebts();

        // Retorna diretamente
        return response()->json($debts);
    }
}
