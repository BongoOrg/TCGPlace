import { test, expect } from '@playwright/test'

test('filter-extension-from-home', async ({ page }) => {
	await page.goto('http://localhost:8100/tabs/home')
	await page
		.getByRole('group', { name: '1 / 148', exact: true })
		.locator('ion-card-content')
		.click()
	await page.getByText('base1').isVisible()
})
