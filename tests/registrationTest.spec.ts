import { test, expect } from '@playwright/test';
import { RegistrationData } from '../pages/registrationData';
import * as fs from 'fs'
const registrationDataJson = JSON.parse(fs.readFileSync('./data/testData.json', 'utf-8'));

test.describe('registerfunction', () => {
  let registrationData: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registrationData = new RegistrationData(page);
    await registrationData.registrationOpen();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Позитивний тест', async() => {
    const {name, email, password, confirmPassword}= registrationDataJson.valid;
  // const name='name';
  // const email='sdf@rrr.com';
  // const password='123Qwe123.';
  // const confirmPassword=password;
  await registrationData.fillForm(name,email, password,confirmPassword);
  await registrationData.acceptTerms();
  await registrationData.subscribe();
  await registrationData.submitForm();
  });

  test('Позитивний тест з використанням timestamp', async ({ page }) => {
    const { name, email, password } = registrationData.generateDataWithTimestamp();
    const confirmPassword = password;
    await registrationData.fillForm(name, email, password, confirmPassword); // Заповнюємо форму
    await registrationData.acceptTerms(); // Приймаємо умови
    await registrationData.subscribe(); // Підписуємося на розсилку
    await registrationData.submitForm(); // Надсилаємо форму
  });

  test('Негативний тест (паролі не співпадають)', async () => {
    const name = 'Nastya';
    const email = 'sdf@rreeer.comf';
    const password = '123Qwe123.';
    const confirmPassword = '123Qwe';
    await registrationData.fillForm(name, email, password, confirmPassword);
    await registrationData.acceptTerms();
    await registrationData.subscribe();
    await registrationData.submitForm();
    await registrationData.verifyErrorMessage('The password field confirmation does not match.');
  });

  test('Негативний тест (емейл існує)', async () => {
    const name = 'Nastya';
    const email = 'rrr@rr.cff';
    const password = '123Qwe123.';
    const confirmPassword = password;
    await registrationData.fillForm(name, email, password, confirmPassword);
    await registrationData.acceptTerms();
    await registrationData.subscribe();
    await registrationData.submitForm();
    // await registrationData.errorsEmailExist();
    await registrationData.verifyErrorMessage('The email has already been taken.');
  });

  test('Негативний тест (без обов.поля Нейм))', async () => {
    const {name, email, password, confirmPassword}= registrationDataJson.emptyName;
    // const name = '';
    // const email = 'rr32r@rr.cff';
    // const password = '123Qwe123.';
    // const confirmPassword = password;
    await registrationData.fillForm(name, email, password, confirmPassword);
    await registrationData.acceptTerms();
    await registrationData.subscribe();
    await registrationData.buttonDisable();
  });

  test('Негативний тест (без обов.поля Емейл))', async () => {
    const name = 'name1';
    const email = '';
    const password = '123Qwe123.';
    const confirmPassword = password;
    await registrationData.fillForm(name, email, password, confirmPassword);
    await registrationData.acceptTerms();
    await registrationData.subscribe();
    await registrationData.buttonDisable();
  });
  test('Негативний тест (невірний емейл))', async () => {
    const name = 'name1';
    const email = 'ааа';
    const password = '123Qwe123.';
    const confirmPassword = password;
    await registrationData.fillForm(name, email, password, confirmPassword);
    await registrationData.acceptTerms();
    await registrationData.signUpButton
    await registrationData.validationMessage();
  });

  test('Перевірка лого', async ({page}) => {
    await registrationData.checkLogo();
  });

  test('Перевірка Гуглу', async () => {
    await registrationData.checkGoogle();
  });

  test('Перевірка Фейсбуку', async () => {
    await registrationData.checkFacebook();
  });
// rjvvvvv
});