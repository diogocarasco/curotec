<?php

namespace App\Services;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class TechnicalDebtService
{
    protected array $debts = [];

    /**
     * Executes all analyses and populates technical debts.
     */
    public function getTechnicalDebts(): array
    {
        $this->debts = [];

        $this->checkMissingTests();
        $this->checkDuplicateCode();
        $this->checkPhpstanIssues();

        return $this->debts;
    }

    /**
     * Resumed technical debt metrics
     */
    public function getDebtMetrics(): array
    {
        $metrics = [
            'total_items' => count($this->debts),
            'by_type' => [],
        ];

        foreach ($this->debts as $debt) {
            $metrics['by_type'][$debt['type']] = ($metrics['by_type'][$debt['type']] ?? 0) + 1;
        }

        return $metrics;
    }

    /**
     * Returns debts ordered by priority
     */
    public function prioritizeDebt(): array
    {
        $priorityMap = [
            'High' => 3,
            'Medium' => 2,
            'Low' => 1,
        ];

        usort($this->debts, function ($a, $b) use ($priorityMap) {
            return $priorityMap[$b['priority']] <=> $priorityMap[$a['priority']];
        });

        return $this->debts;
    }

    /**
     * Verify files without tests (best approach)
     */
    protected function checkMissingTests()
    {
        $files = glob(base_path('app/**/*.php'));

        foreach ($files as $file) {
            if (!str_contains($file, 'Test')) {
                $this->debts[] = [
                    'file' => str_replace(base_path() . '/', '', $file),
                    'type' => 'MissingTest',
                    'priority' => 'High',
                ];
            }
        }
    }

    /**
     * Executes PHPCPD to find duplicate code
     */
    protected function checkDuplicateCode()
    {
        $process = new Process(['vendor/bin/phpcpd', 'app', '--log-json', 'php://stdout']);
        $process->run();

        if (!$process->isSuccessful()) {
            return;
        }

        $output = $process->getOutput();
        $json = json_decode($output, true);

        if (!empty($json['files'])) {
            foreach ($json['files'] as $file => $lines) {
                $this->debts[] = [
                    'file' => str_replace(base_path() . '/', '', $file),
                    'type' => 'DuplicateCode',
                    'priority' => 'Medium',
                ];
            }
        }
    }

    /**
     * Executing PHPStan to find static analysis issues in the code
     */
    protected function checkPhpstanIssues()
    {
        $process = new Process(['vendor/bin/phpstan', 'analyse', 'app', '--error-format=json']);
        $process->run();

        if (!$process->isSuccessful()) {
            return;
        }

        $output = $process->getOutput();
        $json = json_decode($output, true);

        if (!empty($json['files'])) {
            foreach ($json['files'] as $file => $issues) {
                foreach ($issues as $issue) {
                    $this->debts[] = [
                        'file' => str_replace(base_path() . '/', '', $file),
                        'type' => 'PhpStanIssue',
                        'priority' => 'High',
                    ];
                }
            }
        }
    }
}
