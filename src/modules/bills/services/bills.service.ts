import env from '@/lib/env';
import { Bill, User } from '../types';
import { paramsService } from '@/services/params.service';
import { QueryKeys } from '@/types/queryKeys';

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

  public async getFundParam(): Promise<number> {
    const param = await paramsService.getParams(QueryKeys.emergencyFund)
    return param ? +param.value : 0;
  }

  public async setFundParam(newFund: number): Promise<void> {
    await paramsService.saveParams({
      name: QueryKeys.emergencyFund,
      value: newFund.toString(),
      type: 'number'
    })
  }
}

class BillsServiceMock {
  private users: Array<User> = []
  private bills: Array<Bill> = []
  private fundParam: number = 0;
  private sleep() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
  public async save(bill: Bill) {
    await this.sleep();
    console.debug('save bill ', bill);
    this.bills.push(bill);
  }

  public async get(): Promise<Array<Bill>> {
    await this.sleep();
    console.debug('get bills');
    return this.bills;
  }

  public async update(bill: Bill) {
    await this.sleep();
    console.debug('update bill ', bill);
    this.bills = this.bills.map(b => (b.id === bill.id ? bill : b));
  }

  public async remove(id: string) {
    await this.sleep();
    console.debug('remove bill ', id);
    this.bills = this.bills.filter(bill => bill.id !== id);
  }

  public async getUsers(): Promise<Array<User>> {
    await this.sleep();
    console.debug('get users');
    return this.users;
  }

  public async saveUser(user: Partial<User>): Promise<number> {
    await this.sleep();
    console.debug('save user ', user);
    const id = this.users.length + 1;
    this.users.push({ ...user, id: String(id) } as User);
    return id;
  }

  public async removeUser(id: string) {
    await this.sleep();
    console.debug('remove user ', id);
    this.users = this.users.filter(user => user.id !== id);
  }

  public async getFundParam(): Promise<number> {
    await this.sleep();
    return this.fundParam;
  }

  public async setFundParam(newFund: number): Promise<void> {
    await this.sleep();
    this.fundParam = newFund;
  }
}

export const billsService = env.VITE_ONLINE ? new BillsService() : new BillsServiceMock();
