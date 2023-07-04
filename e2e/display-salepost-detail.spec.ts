import { test, expect } from '@playwright/test'

test('display-salepost-detail', async ({ page }) => {
	await page.goto('http://localhost:8100/tabs/home')
	await page.goto('http://localhost:8100/tabs/store')
	await page
		.locator('ion-card')
		.filter({ hasText: '35 €LonaRègne de Glace' })
		.locator('img')
		.click()
	await page.locator('ion-title div').filter({ hasText: 'Détails article' }).isVisible()
	await page
		.locator('ion-grid')
		.filter({
			hasText: 'LonaNeuf35 €Règne de GlaceMise en ligne le 29/06/2023 à 20h53'
		})
		.getByRole('heading', { name: 'Lona' })
		.isVisible()
})
