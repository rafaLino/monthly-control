import { Bill, User } from '../types';
import { billsMock, usersMock } from '../types/mock';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
let id = 0;
export class BillsService {
  public async save(bill: Bill) {
    await sleep();
    console.info(bill);
  }

  public async get(): Promise<Array<Bill>> {
    await sleep();
    return billsMock;
  }

  public async update(bill: Bill) {
    await sleep();
    console.info('updating: ', bill);
  }

  public async remove(id: string) {
    await sleep();
    console.info('removing: ', id);
  }

  public async getUsers(): Promise<Array<User>> {
    await sleep();

    return usersMock;
  }

  public async saveUser(user: Partial<User>): Promise<number> {
    await sleep();
    console.info('saving user: ', user);
    id++;
    usersMock.push({ ...user, id: id.toString() } as User);

    return id;
  }

  public async removeUser(id: string) {
    await sleep();
    console.info('removing user: ', id);
  }
}

export const billsService = new BillsService();
