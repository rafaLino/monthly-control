import env from '@/lib/env';
import { toFile } from '@/lib/utils';
import { FileReponseData, TRefDate } from '@/types/refDate';

export class FileService {
  public async save(ref: TRefDate, csv: string) {
    const formData = new FormData();
    formData.append('ref', ref);
    formData.append('csv', toFile(csv), ref);
    return fetch(`${env.VITE_FILES_URL}/files`, {
      method: 'POST',
      body: formData,
      headers: new Headers({
        'x-api-key': env.VITE_API_SECRET
      })
    });
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

  public async remove(ref: TRefDate) {
    return fetch(`${env.VITE_FILES_URL}/files/${ref}`, {
      method: 'DELETE',
      headers: new Headers({
        'x-api-key': env.VITE_API_SECRET
      })
    });
  }

  public async download(ref: TRefDate): Promise<string | undefined> {
    const response = await fetch(`${env.VITE_FILES_URL}/files/${ref}/download`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/csv',
        'x-api-key': env.VITE_API_SECRET
      })
    });

    if (!response.ok) return;
    const content = await response.text();
    return content ?? null;
  }
}

export const fileService = new FileService();
