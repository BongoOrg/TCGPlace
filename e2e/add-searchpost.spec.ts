import { test, expect } from '@playwright/test';

test('add-searchpost', async ({ page }) => {
  await page.goto('http://localhost:8100/tabs/home');
  await page.getByRole('img', { name: 'person outline' }).getByRole('img').click();
  await page.goto('http://localhost:8100/tabs/profil');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tim71380@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('tim71380');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.goto('http://localhost:8100/tabs/add');
  await page.locator('ion-segment-button').filter({ hasText: 'Recherche' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('pika');
  await page.locator('ion-col').filter({ hasText: 'PikachuEX Tempête de sable' }).getByRole('img').first().click();
  await page.getByRole('spinbutton', { name: 'Prix' }).click();
  await page.getByRole('spinbutton', { name: 'Prix' }).click();
  await page.getByRole('spinbutton', { name: 'Prix' }).fill('12');
  await page.getByText('Choisit un état, Etat').click();
  await page.locator('label').filter({ hasText: /^Neuf$/ }).click();
  await page.getByRole('button', { name: 'Envoyer chevron forward circle outline' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('pik');
  await page.locator('div').filter({ hasText: 'PikachuEX Tempête de sable' }).click();
  await page.getByText('12 €PikachuNeuf').isVisible();
});