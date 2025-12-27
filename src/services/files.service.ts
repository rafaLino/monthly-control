import env from '@/lib/env';
import { FileReponseData, TRefDate } from '@/types/refDate';

export class FileService {
  private saveCSV(ref: TRefDate, csv: string) {
    return fetch(`${env.VITE_WORKER_URL}/${ref}`, {
      method: 'PUT',
      body: csv,
      headers: new Headers({
        'Content-Type': 'text/csv',
        'x-api-key': env.VITE_API_SECRET
      })
    });
  }

  private removeCSV(ref: TRefDate) {
    return fetch(`${env.VITE_WORKER_URL}/${ref}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'text/csv',
        'x-api-key': env.VITE_API_SECRET
      })
    });
  }
  public async save(ref: TRefDate, csv: string) {
    const promise = fetch(`${env.VITE_FILES_URL}/files`, {
      method: 'POST',
      body: JSON.stringify({ ref }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    await Promise.all([this.saveCSV(ref, csv), promise]);
  }

  public async getAll(): Promise<Array<FileReponseData>> {
    const response = await fetch(`${env.VITE_FILES_URL}/files`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return [];

    return response.json();
  }

  public async get(ref: TRefDate): Promise<FileReponseData | undefined> {
    const response = await fetch(`${env.VITE_FILES_URL}/files/${ref}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return;

    return response.json() as Promise<FileReponseData>;
  }

  public async remove(ref: TRefDate): Promise<boolean> {
    const promise = fetch(`${env.VITE_FILES_URL}/files/${ref}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    const result = await Promise.allSettled([this.removeCSV(ref), promise]);

    return result.every((req) => req.status === 'fulfilled');
  }

  public async download(ref: TRefDate): Promise<string | undefined> {
    const response = await fetch(`${env.VITE_WORKER_URL}/${ref}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/csv',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return;

    return response.text();
  }
}

export const fileService = new FileService();
