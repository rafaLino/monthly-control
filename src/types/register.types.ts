export type Register = {
    id: string;
    name: string;
    value: number;
    checked: boolean;
}

export type RegisterType = 'incomes' | 'expenses' | 'investments';