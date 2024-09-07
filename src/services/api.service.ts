import env from '@/lib/env';
import { Register } from '@/types/register.types';

type ResponseData = {
  ok: boolean;
  data: {
    id: string;
    date: string;
    records: {
      incomes: Array<Register>;
      expenses: Array<Register>;
      investments: Array<Register>;
    };
  };
};
export class ApiService {
  public async save(data: { incomes: Array<Register>; expenses: Array<Register>; investments: Array<Register> }) {
    return fetch(env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-secret': env.VITE_API_SECRET
      })
    });
  }

  public async get() {
    const response = await fetch(env.VITE_API_URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-secret': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return;

    const responseData = (await response.json()) as ResponseData;

    return responseData.data.records;
  }
}

export const apiService = new ApiService();
