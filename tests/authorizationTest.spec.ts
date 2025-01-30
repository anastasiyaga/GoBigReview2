import { test, expect } from '@playwright/test';
import { RegistrationData } from '../pages/registrationData';

test.describe('loginfunction', () => {
  let registrationData: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registrationData = new RegistrationData(page);
    await registrationData.authorization();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Позитивний тест', async({ page }) => {
  const email='sdf@rrr.com';
  const password='123Qwe123.';
  await registrationData.fillLoginForm(email, password);
  await registrationData.signIn();
  });

  test('Негативний з неправильним паролем', async() => {
    const email = 'sdf@rrr.com';
    const password = '123';
    await registrationData.fillLoginForm(email, password);
    await registrationData.signIn();
    await registrationData.invalidEmailPassword();
  });

  test('Невалідний емейл', async() => {
    const email = 'qwe456';
    const password = '123Qwe123/';
    await registrationData.fillLoginForm(email, password);
    await registrationData.signIn();
    await registrationData.verifyErrorMessage('The email field must be a valid email address.')
  });

  test('Пустий пароль', async() => {
    const email = 'qwe';
    const password = '';
    await registrationData.fillLoginForm(email, password);
    await registrationData.signInDisable();
  });

  test('Емейл пароль', async() => {
    const email = '';
    const password = '123Qwe123/';
    await registrationData.fillLoginForm(email, password);
    await registrationData.signInDisable();
  });
})