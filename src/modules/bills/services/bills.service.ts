import env from '@/lib/env';
import { Bill, User } from '../types';

export class BillsService {
  public async save(bill: Bill) {
    const response = await fetch(`${env.VITE_FILES_URL}/bills`, {
      method: 'POST',
      body: JSON.stringify(bill),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) throw new Error('Something went wrong!');
  }

  public async get(): Promise<Array<Bill>> {
    const response = await fetch(`${env.VITE_FILES_URL}/bills`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return [];

    return response.json();
  }

  public async update(bill: Bill) {
    const response = await fetch(`${env.VITE_FILES_URL}/bills/${bill.id}`, {
      method: 'PUT',
      body: JSON.stringify(bill),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) throw new Error('Something went wrong!');
  }

  public async remove(id: string) {
    const response = await fetch(`${env.VITE_FILES_URL}/bills/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) throw new Error('Something went wrong!');
  }

  public async getUsers(): Promise<Array<User>> {
    const response = await fetch(`${env.VITE_FILES_URL}/bills/users`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return [];

    return response.json();
  }

  public async saveUser(user: Partial<User>): Promise<number> {
    const response = await fetch(`${env.VITE_FILES_URL}/bills/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) throw new Error('Something went wrong!');

    const result = await response.json() as { id: string }
    return +result.id
  }

  public async removeUser(id: string) {
    const response = await fetch(`${env.VITE_FILES_URL}/bills/users/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) throw new Error('Something went wrong!');
  }
}

export const billsService = new BillsService();
