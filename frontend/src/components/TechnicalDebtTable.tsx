import React from 'react'

interface DebtItem {
  file: string
  type: string
  priority: string
}

interface Props {
  debts: DebtItem[]
}

export default function TechnicalDebtTable({ debts }: Props) {
  if (!debts || debts.length === 0) return <p>No technical debt found.</p>

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>File</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Type</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Priority</th>
        </tr>
      </thead>
      <tbody>
        {debts.map((debt, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{debt.file}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{debt.type}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{debt.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
