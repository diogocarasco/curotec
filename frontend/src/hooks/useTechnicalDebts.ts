import { useQuery } from 'react-query';
import axios from 'axios';

export interface TechDebtItem {
  file: string;
  type: string;
  priority: string;
}

/**
 * Retorna a resposta "crua" do endpoint.
 * Podemos receber:
 * - um array diretamente: TechDebtItem[]
 * - ou um objeto: { items: TechDebtItem[], metrics?: ... }
 */
export function useTechnicalDebts() {
  return useQuery<unknown>('technicalDebts', async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8000/api/technical-debt', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  });
}
