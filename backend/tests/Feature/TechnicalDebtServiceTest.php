<?php

use App\Services\TechnicalDebtService;

it('detects missing tests in the codebase', function () {
    $service = new TechnicalDebtService();
    $service->analyzeCodebase();

    $debt = $service->getDebt();

    // Verifica se é um array
    expect($debt)->toBeArray();

    // Cada item deve ter file, type e priority
    foreach ($debt as $item) {
        expect($item)->toHaveKeys(['file', 'type', 'priority']);
    }

    // Verifica se as métricas resumidas batem
    $metrics = $service->getDebtMetrics();
    expect($metrics)->toHaveKeys(['total_items', 'by_type']);
    expect($metrics['total_items'])->toBe(count($debt));
});
