import { test, expect } from '@playwright/test'

test('apply-extension-filter', async ({ page }) => {
	await page.goto('http://localhost:8100/tabs/home')
	await page.goto('http://localhost:8100/tabs/store')
	await page.getByRole('img', { name: 'funnel' }).locator('path').click()
	await page.getByText('Extensions').click()
	await page.locator('label').filter({ hasText: 'Set de Base' }).click()
	await page.getByRole('button', { name: '✔' }).click()
	await page.getByText('base1').isVisible()
})
