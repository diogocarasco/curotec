import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTechnicalDebts } from '../hooks/useTechnicalDebts';
import type { TechDebtItem } from '../hooks/useTechnicalDebts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard(): JSX.Element {
  const { data, isLoading, error } = useTechnicalDebts();

  // DEBUG: ver o que veio do backend (remova em produção)
  // console.log('raw technical-debt data:', data);

  // Normaliza: aceita tanto array direto quanto { items: [...] }
  const debts: TechDebtItem[] = Array.isArray(data)
    ? (data as TechDebtItem[])
    : data && Array.isArray((data as any).items)
    ? (data as any).items
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading technical debts</div>;
  if (debts.length === 0) return <div>No technical debt found.</div>;

  // Agrupa por tipo (dinâmico)
  const metrics = debts.reduce<Record<string, number>>((acc, debt) => {
    acc[debt.type] = (acc[debt.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(metrics).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard - Technical Debt</h1>

      {/* Gráfico (apenas se houver dados) */}
      {pieData.length > 0 && (
        <div style={{ width: '100%', maxWidth: 600, height: 300, marginBottom: 24 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Tabela */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>File</th>
            <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, idx) => (
            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{debt.file}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{debt.type}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{debt.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
