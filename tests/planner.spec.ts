import { expect, test } from '@playwright/test';
import { addNewRegister } from './utils';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});


test.describe('add new registers', () => {
    test('add new income', async ({ page }) => {
        await addNewRegister(page, { type: 'incomes', name: 'new income', value: 1000 })
        await expect(page.getByTestId('data_table:total')).toContainText('R$ 1.000,00');
    });

    test('add new expense', async ({ page }) => {
        await addNewRegister(page, { type: 'expenses', name: 'new expense', value: 500 })
        await expect(page.getByTestId('data_table:total')).toContainText('R$ 500,00');
    });

    test('add new investment', async ({ page }) => {
        await addNewRegister(page, { type: 'investments', name: 'new investment', value: 300 })
        await expect(page.getByTestId('data_table:total')).toContainText('R$ 300,00');
    });

    test('add new item with value', async ({ page }) => {
        const input = page.getByTestId('add_new')
        await input.click();
        await input.fill('my new bonus 352.50');
        await input.press('Enter');
        await expect(page.getByTestId('data_table:total')).toContainText('R$ 352,50');
    })
})


test.describe('check received values', () => {

    test('check received incomes', async ({ page }) => {
        const expected_planned_value = 'R$ 3.039,31';
        const expected_received_value = 'R$ 1.289,99';

        const incomes = [{
            name: 'salary',
            value: 1249
        }, {
            name: 'bonus',
            value: 1289.99
        }, {
            name: 'freelance',
            value: 500.32
        }]

        for await (const [index, income] of incomes.entries()) {
            await addNewRegister(page, { ...income, type: 'incomes', index });
        }

        await page.getByTestId(`1_checked`).getByRole('checkbox').click();

        await expect(page.getByTestId('planned_value').first()).toContainText(expected_planned_value);
        await expect(page.getByTestId('received_value').first()).toContainText(expected_received_value)
    })

    test('check received expenses', async ({ page }) => {
        const expected_planned_value = 'R$ 6.550,39';
        const expected_received_value = 'R$ 4.245,90';

        const incomes = [{
            name: 'bills',
            value: 1900
        }, {
            name: 'credit card',
            value: 2304.49
        }, {
            name: 'trip',
            value: 2345.90
        }]

        for await (const [index, expense] of incomes.entries()) {
            await addNewRegister(page, { ...expense, type: 'expenses', index });
        }

        await page.getByTestId(`0_checked`).getByRole('checkbox').click();
        await page.getByTestId(`2_checked`).getByRole('checkbox').click();

        await expect(page.getByTestId('planned_value').nth(1)).toContainText(expected_planned_value);
        await expect(page.getByTestId('received_value').nth(1)).toContainText(expected_received_value)
    })

    test('check received investments', async ({ page }) => {
        const expected_planned_value = 'R$ 4.573,27';
        const expected_received_value = 'R$ 3.399,29';

        const investments = [{
            name: 'savings',
            value: 2000
        }, {
            name: 'emergency found',
            value: 1399.29
        }, {
            name: 'crypto',
            value: 1173.98
        }]

        for await (const [index, investment] of investments.entries()) {
            await addNewRegister(page, { ...investment, type: 'investments', index });
        }

        await page.getByTestId(`0_checked`).getByRole('checkbox').click();
        await page.getByTestId(`1_checked`).getByRole('checkbox').click();

        await expect(page.getByTestId('planned_value').nth(2)).toContainText(expected_planned_value);
        await expect(page.getByTestId('received_value').nth(2)).toContainText(expected_received_value)
    })
})

test.describe('check totals', () => {

    test('check balance', async ({ page }) => {
        const expectedBalance = 'R$ 3.513,38';
        const expectedDone = 'R$ 15.965,52';
        const expectedCost = 'R$ 13.181,51';
        const expectedCostDone = 'R$ 429,37';

        await addNewRegister(page, { type: 'incomes', name: 'wage', value: 16394.89 })
        await addNewRegister(page, { type: 'incomes', name: 'bonus', value: 300, index: 1 })
        await addNewRegister(page, { type: 'expenses', name: 'personal loan', value: 12752.14 })
        await addNewRegister(page, { type: 'investments', name: 'saving', value: 429.37 })

        //check first investment
        await page.getByTestId(`0_checked`).getByRole('checkbox').click();

        //check first income
        await page.getByRole('tab', { name: 'incomes' }).click();
        await page.getByTestId(`0_checked`).getByRole('checkbox').click();


        await expect(page.getByTestId('balance_card:balance')).toContainText(expectedBalance);
        await expect(page.getByTestId('balance_card:done')).toContainText(expectedDone);
        await expect(page.getByTestId('balance_card:cost')).toContainText(expectedCost);
        await expect(page.getByTestId('balance_card:cost_done')).toContainText(expectedCostDone);
    })

    test('check goals', async ({ page }) => {
        const expectedIncomeGoal = '72%';
        const expectedExpenseGoal = '8%';
        const expectedInvestmentGoal = '20%';

        await addNewRegister(page, { type: 'incomes', name: 'wage', value: 500 })
        await addNewRegister(page, { type: 'expenses', name: 'mobile', value: 39.99 })
        await addNewRegister(page, { type: 'investments', name: 'ethereum', value: 100 })

        await page.getByTestId(`0_checked`).getByRole('checkbox').click();

        await page.getByRole('tab', { name: 'expenses' }).click();
        await page.getByTestId(`0_checked`).getByRole('checkbox').click();

        await page.getByRole('tab', { name: 'incomes' }).click();
        await page.getByTestId(`0_checked`).getByRole('checkbox').click();


        await expect(page.getByTestId('goal_card:income')).toContainText(expectedIncomeGoal);
        await expect(page.getByTestId('goal_card:expense')).toContainText(expectedExpenseGoal);
        await expect(page.getByTestId('goal_card:investment')).toContainText(expectedInvestmentGoal);
    })

    test('goals not ok', async ({ page }) => {
        const expected = 'NOK'

        await addNewRegister(page, { type: 'incomes', name: 'wage', value: 500 })
        await addNewRegister(page, { type: 'expenses', name: 'mobile', value: 39.99 })
        await addNewRegister(page, { type: 'investments', name: 'ethereum', value: 100 })

        await expect(page.getByTestId('goal_card:result')).toHaveAccessibleName(expected)
    })

    test('goals warning', async ({ page }) => {
        const expected = 'WARNING'

        await addNewRegister(page, { type: 'incomes', name: 'wage', value: 500 })
        await addNewRegister(page, { type: 'expenses', name: 'mobile', value: 50 })
        await addNewRegister(page, { type: 'investments', name: 'ethereum', value: 200 })

        await expect(page.getByTestId('goal_card:result')).toHaveAccessibleName(expected)
    })

    test('goals ok', async ({ page }) => {
        const expected = 'OK'

        await addNewRegister(page, { type: 'incomes', name: 'wage', value: 500 })
        await addNewRegister(page, { type: 'expenses', name: 'mobile', value: 200 })
        await addNewRegister(page, { type: 'investments', name: 'ethereum', value: 290 })

        await expect(page.getByTestId('goal_card:result')).toHaveAccessibleName(expected)
    })
})

