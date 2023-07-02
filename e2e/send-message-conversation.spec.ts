import { test, expect } from '@playwright/test';

test('send-message-in-conversation', async ({ page }) => {
  await page.goto('http://localhost:8100/tabs/home');
  await page.goto('http://localhost:8100/tabs/profil');
  await page.getByRole('textbox', { name: 'Email' }).fill('tim71380@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('tim71380');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.goto('http://localhost:8100/tabs/messages');
  await page.getByRole('listitem').filter({ hasText: 'flofloLona | Règne de Glace Vous avez fait une offre' }).click();
  await page.getByRole('textbox', { name: 'Saisissez votre message...' }).click();
  await page.getByRole('textbox', { name: 'Saisissez votre message...' }).fill('Bonjour');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await page.getByText('Bonjour', { exact: true }).isVisible();
});