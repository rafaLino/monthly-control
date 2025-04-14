import { expect, Page } from "@playwright/test";

type Options = {
    type: 'incomes' | 'expenses' | 'investments',
    name: string,
    value: number,
    index?: number
}
export async function addNewRegister(page: Page, options: Options) {
    const { type, name, value, index = 0 } = options

    await page.getByRole('tab', { name: type }).click();

    const input = page.getByTestId('add_new')
    await input.click();
    await input.fill(name);
    await input.press('Enter');

    await page.getByTestId(`${index}_value`).getByRole('textbox').click();
    await page.getByRole('spinbutton').fill(String(value));
    await page.getByRole('spinbutton').press('Enter');
}