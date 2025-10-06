# Technical Debt Management Framework

## Overview

 This project implements a **Technical Debt Management Framework** to track, visualize, and reduce technical debt across a Laravel-based codebase. It demonstrates cross-system QA leadership by providing:

* Automated detection of technical debt items.
* Metrics and prioritization rules for actionable insights.
* A React dashboard for visualization.
* Engineering processes to monitor and reduce debt over time.

---

## Features

### Backend (Laravel)

* **TechnicalDebtService**:
  A service class that scans the codebase for technical debt, including missing tests, code duplication, and other quality issues.
* **Metrics**:

  * Total number of debt items.
  * Distribution of debts by type.
  * Prioritization rules (High, Medium, Low).
* **API Endpoint**:
  `/api/technical-debts` returns:

  ```json
  [
      { "file": "app/Models/User.php", "type": "MissingTest", "priority": "High" },
      { "file": "app/Services/TechnicalDebtService.php", "type": "CodeDuplication", "priority": "Medium" }
  ]
  ```

## API Documentation

The Technical Debt Manager backend exposes the following endpoints. The API is documented using **OpenAPI/Swagger**.

### Authentication

**POST /api/login**

Authenticate a user and return a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secret"
}
````

**Responses:**

* **200 OK**

```json
{
  "token": "your-jwt-token"
}
```

* **401 Unauthorized**

```json
{
  "error": "Invalid credentials"
}
```

### Technical Debts

**GET /api/technical-debts**

Retrieve a list of technical debts in the codebase.

**Response:**

* **200 OK**

```json
[
  {
    "file": "app/Console/Kernel.php",
    "type": "MissingTest",
    "priority": "High"
  },
  {
    "file": "app/Exceptions/Handler.php",
    "type": "MissingTest",
    "priority": "High"
  }
  // ... other items
]
```

**Notes:**

* `file` — Path to the file with technical debt.
* `type` — Category of the technical debt (e.g., MissingTest, DeprecatedCode).
* `priority` — Debt prioritization (High, Medium, Low).

### Swagger/OpenAPI

The API is fully documented using OpenAPI annotations. You can view the interactive documentation at:

```
http://localhost:8000/api/documentation
```

This allows you to explore endpoints, view request/response examples, and test API calls directly from the browser.

### Frontend (React + Vite)

* **Dashboard Component**:
  Visualizes technical debt distribution across system components.

  * **Table**: Lists debt items with file, type, and priority.
  * **Pie Chart**: Summarizes debt by type.
* **Hooks**: `useTechnicalDebts` handles API fetching and state management.
* **Authentication**: Login page stores JWT token in local storage and redirects to dashboard.

---

Com certeza! Abaixo está a versão em inglês das melhorias propostas para a seção de Engenharia e Gestão de Equipe.

O texto foca em **Accountability (Responsabilidade)**, **Métricas Quantificáveis (KPIs)** e o **Framework de Comunicação para *Founders* (Non-Technical Stakeholders)**, conforme solicitado.

---

# Engineering Management and Accountability

## 1. Sustainable Technical Debt Management Process

We establish clear processes to ensure technical quality is a **continuous effort** and not a reactive task, balancing feature delivery with quality maintenance.

| Process Step | Details and Frequency | Accountability Measures |
| :--- | :--- | :--- |
| **Weekly Debt Review** | Dedicated 30-minute meeting to review high-priority items identified by the `TechnicalDebtService`. **Frequency:** Weekly, led by a rotating engineer. | Decisions on refactoring or mitigation are **documented and assigned** as tickets in the sprint backlog. |
| **Time-Box Allocation** | A **fixed time-box of 15%** of the engineering capacity in every sprint is dedicated to addressing technical debt. | This guarantees that quality maintenance is built into the workflow, preventing debt accumulation and aligning with **sustainable development**. |
| **Debt Prioritization** | Debt items are classified based on **Impact x Likelihood** and tagged in the ticketing system (High: System Crash Risk; Medium: Maintainability Blocker; Low: Code Style/Cleanup). | Ensures team effort is focused on the debt that poses the highest business risk. |

---

## 2. Team Accountability and Quantifiable Success Metrics

We define success not only by reducing debt but by establishing a measurable framework for continuous quality improvement.

### A. Quantifiable Key Performance Indicators (KPIs)

Success for the Technical Debt Framework is measured via the following **quantifiable KPIs**:

| KPI | Target | Measurement |
| :--- | :--- | :--- |
| **High-Priority Debt Reduction Rate** | **$\geq 20\%$** reduction month-over-month (MoM). | Tracks the team’s ability to proactively eliminate critical codebase risks. |
| **Technical Debt Health Score Stability** | Score must be maintained at **$\geq 85/100$** across all major releases. | A simplified, holistic metric for overall system health (see Communication below). |
| **Accountability & Ownership** | Debt items assigned must be resolved at a rate of **$\geq 90\%$** per engineer by the end of the sprint. | Ensures equitable distribution of quality work and individual ownership. |

### B. Individual and Team Accountability

* **Goal Setting:** The team's monthly goal (e.g., $20\%$ reduction) is broken down into **individual OKRs or weekly assignments**.
* **Performance Review:** Automated reports track the **volume of debt assigned vs. debt resolved per engineer**, enabling data-driven discussions during 1:1s and sprint retrospectives.

---

## 3. Clear Framework for Non-Technical Founder Updates (Bonus)

To bridge the gap between technical complexity and business strategy, we use a single, simplified metric for our non-technical stakeholders.

### The "Debt Health Score" (DHS)

Instead of overwhelming founders with bug counts or code complexity metrics, we consolidate all technical debt into a **single, easy-to-understand score (0 to 100)**.

* **Purpose:** The score provides a clear, objective input for **roadmap prioritization** and budgeting discussions regarding technical maintenance.
* **Calculation (Weighted Average):** The score is derived by heavily **weighting High-Priority items** over others.
    
    DHS = 100 - (Weight_High * Count_High) - (Weight_Medium * Count_Medium) - ...
  
    *(Example: High items count as 10x impact, Medium as 5x, Low as 1x.)*
* **Communication:** Engineering provides a **bi-weekly status update** only on the **current DHS and the trend (up/down)**, allowing founders to quickly assess the long-term sustainability of the product.
  
### 4. **Cross-System QA Oversight**

* **Debt Classification Standardization**:
  * The same set of rules is applied across backend (Laravel) and frontend (React).
  * Examples:
    * Missing Tests → High Priority
    * Code Duplication → Medium Priority
    * Linter Violations → Low Priority

* **CI/CD Integration**:
  * Build fails or an alert is generated if new high-priority debt is detected.
  * Ensures critical debt is reviewed before new commits are merged.

* **Visibility & Transparency**:
  * Dashboard allows managers and QA to see debt status across the entire application.
  * Enables data-driven decisions for refactoring, new features, and backlog prioritization.

 **Overall Success:**  
A solution is considered successful when technical debt is tracked accurately, visualized effectively, and continuously reduced through team-led processes, resulting in a more maintainable and high-quality codebase.

---

## Setup Instructions

### Backend

1. Install dependencies:

   ```bash
   composer install
   ```
2. Run migrations and seeders if needed:

   ```bash
   php artisan migrate
   ```
3. Start the Laravel server:

   ```bash
   php artisan serve
   ```
4. Test API endpoint:

   ```
   GET http://localhost:8000/api/technical-debts
   ```

### Frontend

1. Install dependencies:

   ```bash
   npm install
   ```
2. Start the Vite development server:

   ```bash
   npm run dev
   ```
3. Open the app at `http://localhost:5173` (or the URL provided by Vite).

---

## Technical Debt Detection Tools

* **PHPStan**: Static analysis for PHP.
   ```php
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
   ```

* **PHPCPD**: Detects duplicate code blocks.
   ```php
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
   ```
* **Custom Rules**: Implemented in `TechnicalDebtService.php` for test coverage and other project-specific checks.
```php
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
```

---

## File Structure

```
backend/
├─ app/Services/TechnicalDebtService.php
├─ app/Http/Controllers/Api/TechnicalDebtController.php
frontend/
├─ src/pages/Dashboard.tsx
├─ src/pages/LoginPage.tsx
├─ src/components/TechnicalDebtTable.tsx
├─ src/hooks/useTechnicalDebts.ts
```

---

## Dependencies

**Backend**

* PHP >= 8.1
* Laravel 11
* Composer dependencies: `phpstan/phpstan`, `sebastian/phpcpd`

**Frontend**

* Node.js >= 20.19
* React 18
* Vite 5
* Recharts (for charts)
* Axios (for API calls)
* React Query (for data fetching)

---

## Usage

1. Login with a valid user.
2. Dashboard displays real-time technical debt metrics.
3. Use the table and chart to identify high-priority debt.
4. Team members address debts according to prioritization rules.

---

## Future Improvements

* Add filtering and sorting options in dashboard.
* Add automated CI/CD checks to fail builds on new high-priority debt.
* This implementation is ready to integrate with **Bubble.io** for higher-level reporting and management dashboards.
* Expand technical debt detection to additional categories like performance issues, security gaps, and code complexity.


