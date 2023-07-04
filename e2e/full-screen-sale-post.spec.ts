import { test, expect } from '@playwright/test'

test('full-screen-sale-post', async ({ page }) => {
	await page.goto('http://localhost:8100/tabs/store')
	await page.locator('ion-col').filter({ hasText: '35 €LonaRègne de Glace' }).locator('img').click()
	await page.locator('ion-title').filter({ hasText: 'Détails article' }).locator('div').click()
	await page
		.locator('ion-grid')
		.filter({ hasText: 'LonaNeuf35 €Règne de Glace' })
		.getByRole('heading', { name: 'Lona' })
		.isVisible()
})
