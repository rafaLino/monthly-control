import env from '@/lib/env';

type ResponseVersionData = {
  data: number;
};

type Parameter = {
  id?: number;
  name: string;
  type: string;
  value: string;
};

type ResponseParamsData<T = Parameter> = {
  data: T;
};

type Options = {
  param?: string;
  query?: string;
};
export class ParamsService {
  private readonly url: string;

  constructor() {
    this.url = `${env.VITE_PARAMS_API_URL}`;
  }

  private getVersionUrl(): string {
    return `${this.url}/version`;
  }
  private getParamsUrl(options?: Options): string {
    let url = `${this.url}/parameters`;
    const { param, query } = options || {};
    if (param) {
      url += `/${param}`;
    }
    if (query) {
      url += `?${query}`;
    }
    return url;
  }

  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'x-api-key': env.VITE_API_SECRET,
      'x-proj-key': 'mcproj'
    });
  }

  public async getVersion(): Promise<number> {
    const response = await fetch(this.getVersionUrl(), {
      method: 'GET',
      headers: this.getHeaders()
    });
    if (!response.ok) return 0;

    const responseData = (await response.json()) as ResponseVersionData;

    return responseData.data;
  }

  public async incrementVersion(): Promise<void> {
    fetch(this.getVersionUrl(), {
      method: 'POST',
      headers: this.getHeaders()
    });
  }

  public async getParams(name: string): Promise<Parameter | undefined> {
    const response = await fetch(this.getParamsUrl({ param: name }), {
      method: 'GET',
      headers: this.getHeaders()
    });
    if (!response.ok) return;

    const responseData = (await response.json()) as ResponseParamsData<Parameter>;

    return responseData.data;
  }

  public async saveParams(param: Parameter): Promise<void> {
    fetch(this.getParamsUrl(), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(param)
    });
  }

  public async deleteParams(id: number): Promise<void> {
    fetch(this.getParamsUrl({ param: String(id) }), {
      method: 'DELETE',
      headers: this.getHeaders()
    });
  }
}

export const paramsService = new ParamsService();
