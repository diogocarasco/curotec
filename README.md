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

## Engineering Management Process

### 1. **Regular Debt Review**

* **Frequency & Responsibility**:
  * Weekly meetings dedicated to technical debt review.
  * Each team member is responsible for reviewing and addressing their assigned debt items.

* **Review Process**:
  * The team reviews the previous week’s items and identifies new debts automatically detected by the **TechnicalDebtService**.
  * Each item is classified by type and priority (High, Medium, Low).
  * Decisions regarding refactoring or mitigation are documented.

* **Supporting Tools**:
  * React Dashboard for real-time visualization of debt status.
  * Ticketing system or issue tracker to manage resolution of each debt item.

---

### 2. **Measurable Reduction Goals**

* **Goal Definition**:
  * Monthly targets for reducing high-priority items (e.g., reduce 20% of High priority items).
  * Quarterly targets for reducing medium and low priority debt, maintaining overall code health.

* **Monitoring**:
  * Metrics collected by **TechnicalDebtService** feed the real-time dashboard.
  * Metrics include:
    * Total technical debt items
    * Distribution by type (e.g., Missing Tests, Code Duplication)
    * Progress toward reduction goals

* **Accountability**:
  * Each developer or squad has clear responsibilities for addressing debt.
  * Automated reports can be generated for sprint reviews or team retrospectives.

---

### 3. **Cross-System QA Oversight**

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
* **PHPCPD**: Detects duplicate code blocks.
* **Custom Rules**: Implemented in `TechnicalDebtService.php` for test coverage and other project-specific checks.

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
* Integrate with **Bubble.io** for higher-level reporting and management dashboards.
* Expand technical debt detection to additional categories like performance issues, security gaps, and code complexity.


