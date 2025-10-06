<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TechnicalDebtService;

class TechnicalDebtController extends Controller
{
    public function index(TechnicalDebtService $service)
    {
        // Coleta todos os débitos técnicos com métricas
        $debts = $service->getTechnicalDebts();

        // Retorna diretamente
        return response()->json($debts);
    }
}
