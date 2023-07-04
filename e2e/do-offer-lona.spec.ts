import { test, expect } from '@playwright/test'

test('do-offer-lona', async ({ page }) => {
	await page.goto('http://localhost:8100/tabs/home')
	await page.goto('http://localhost:8100/tabs/profil')
	await page.getByRole('textbox', { name: 'Email' }).click()
	await page.getByRole('textbox', { name: 'Email' }).fill('tim71380@gmail.com')
	await page.getByRole('textbox', { name: 'Email' }).press('Tab')
	await page.getByRole('textbox', { name: 'Password' }).fill('tim71380')
	await page.getByRole('button', { name: 'Connexion' }).click()
	await page.goto('http://localhost:8100/tabs/store')
	await page.getByPlaceholder('Search').click()
	await page.getByPlaceholder('Search').fill('lona')
	await page
		.getByRole('banner')
		.filter({
			hasText: 'LonaRègne de GlaceLonaRègne de GlaceLonaRègne de GlaceLonaAstres RadieuxLonaZéni'
		})
		.getByRole('img')
		.nth(2)
		.click()
	await page
		.locator('ion-row')
		.filter({ hasText: /^35 €Lona$/ })
		.click()
	await page.getByRole('button', { name: 'Faire une offre pricetag outline' }).click()
	await page.getByRole('spinbutton', { name: 'Prix proposé' }).click()
	await page.getByRole('spinbutton', { name: 'Prix proposé' }).fill('34')
	await page.getByRole('button', { name: 'Valider' }).click()
	await page.locator('div').filter({ hasText: '34€35€ En cours' }).nth(1).isVisible()
})
