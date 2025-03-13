import { expect } from '@playwright/test'
import { test } from '../../base'

test.describe('SQL Editor', () => {
  test('should check if SQL editor can run simple commands', async ({
    page,
  }) => {
    await page.goto('project/default/sql/1');

    // fill up sql
    await page.getByText('select * from (select version').click();
    await page.getByLabel('Editor content;Press Alt+F1').fill('select now();');
    await page.getByRole('button', { name: 'Run CTRL' }).click();

    // verify
    await expect(page.getByRole('code')).toContainText('select now();');
    await expect(page.getByRole('columnheader')).toContainText('now');
  })
})
