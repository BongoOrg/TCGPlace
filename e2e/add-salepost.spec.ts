import { test, expect } from '@playwright/test';

test('add-salepost', async ({ page }) => {
  await page.goto('http://localhost:8100/tabs/home');
  await page.goto('http://localhost:8100/tabs/profil');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tim71380@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('tim71380');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.goto('http://localhost:8100/tabs/add');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('pika');
  await page.locator('ion-card').filter({ hasText: 'PikachuEX Tempête de sable' }).getByRole('img').first().click();
  await page.getByRole('heading', { name: 'EX Tempête de sable' }).click();
  await page.getByRole('spinbutton', { name: 'Prix' }).click();
  await page.getByRole('spinbutton', { name: 'Prix' }).fill('12');
  await page.getByText('Choisit un état, Etat').click();
  await page.locator('label').filter({ hasText: /^Neuf$/ }).click();
  await page.getByRole('heading', { name: 'Ajouter vos photos' }).click();
  await page.locator('.shutter-button').click();
  await page.getByText('Choose image').click();
  await page.locator('body').press('Escape');
  await page.getByRole('heading', { name: 'Ajouter vos photos' }).click();
  await page.locator('pwa-camera svg').click();
  await page.locator('body').setInputFiles('s-l1600.jpg');
  await page.getByRole('button', { name: 'Envoyer chevron forward circle outline' }).click();
  await page.locator('ion-col').filter({ hasText: '12 €PikachuEX Tempête de sable' }).click();
});