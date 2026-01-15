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

function BillsServiceMock() {
  let users: Array<User> = []
  let bills: Array<Bill> = []
  let fundParam: number = 0;

  function sleep() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
  async function save(bill: Bill) {
    console.debug('save bill ', bill);
    bills.push(bill);
  }

  async function get(): Promise<Array<Bill>> {
    await sleep();
    console.debug('get bills');
    return bills;
  }

  async function update(bill: Bill) {
    await sleep();
    console.debug('update bill ', bill);
    bills = bills.map(b => (b.id === bill.id ? bill : b));
  }

  async function remove(id: string) {
    await sleep();
    console.debug('remove bill ', id);
    bills = bills.filter(bill => bill.id !== id);
  }

  async function getUsers(): Promise<Array<User>> {
    await sleep();
    console.debug('get users');
    return users;
  }

  async function saveUser(user: Partial<User>): Promise<number> {
    await sleep();
    console.debug('save user ', user);
    const id = users.length + 1;
    users.push({ ...user, id: String(id) } as User);
    return id;
  }

  async function removeUser(id: string) {
    await sleep();
    console.debug('remove user ', id);
    users = users.filter(user => user.id !== id);
  }

  async function getFundParam(): Promise<number> {
    await sleep();
    return fundParam;
  }

  async function setFundParam(newFund: number): Promise<void> {
    await sleep();
    fundParam = newFund;
  }

  return {
    save,
    get,
    update,
    remove,
    getUsers,
    saveUser,
    removeUser,
    getFundParam,
    setFundParam
  }
}

export const billsService = env.VITE_ONLINE ? new BillsService() : BillsServiceMock();
