import env from '@/lib/env';

type ResponseData = {
  data: number;
};
export class VersionService {
  private url: string;

  constructor() {
    this.url = `${env.VITE_PARAMS_API_URL}/version`;
  }

  public async get(): Promise<number> {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });
    if (!response.ok) return 0;

    const responseData = (await response.json()) as ResponseData;

    return responseData.data;
  }

  public async increment(): Promise<void> {
    fetch(this.url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': env.VITE_API_SECRET
      })
    });
  }
}

export const versionService = new VersionService();
