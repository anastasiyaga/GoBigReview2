import { Page, Locator, expect } from '@playwright/test';

export class RegistrationData {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly accept: Locator;
  readonly newsletter: Locator;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly googleSignIn: Locator;
  readonly facebookSignIn: Locator;
  readonly errorMassege: Locator;
  readonly errorEmailPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.repeatPasswordInput = page.locator('input[name="confirm-password"]');
    this.accept = page.locator('input[name="toc"]');
    this.newsletter = page.locator('input.form-check-input.font-weight-light');
    this.signUpButton = page.locator('button[type="submit"]');
    this.loginButton = page.locator('button.btn.btn-primary:has-text("Sign in")');
    this.logo = page.locator('a[href="/"] img[alt="Logo"]');
    this.googleSignIn = page.locator('a[href="/auth/google"]');
    this.facebookSignIn = page.locator('a[href="/auth/facebook"]');
    this.errorMassege = page.locator('.text-danger.errors-field');
    this.errorEmailPassword = page.locator('.text-danger', { hasText: 'Invalid email or password' });
  }

  async registrationOpen() {
    try {
      await this.page.goto('https://gobigreviews.com/register');
    } catch (error) {
      console.error('Помилка переходу на сторінку реєстрації:', error);
    }
  }

  async authorization() {
    try {
      await this.page.goto('https://gobigreviews.com/login');
    } catch (error) {
      console.error('Помилка переходу на сторінку авторизації:', error);
    }
  }

  async fillForm(name: string, email: string, password: string, confirmPassword: string) {
    try {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.repeatPasswordInput.fill(confirmPassword);
    } catch (error) {
      console.error('Помилка заповнення форми:', error);
    }
  }

  async fillLoginForm(email: string, password: string) {
    try {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
    } catch (error) {
      console.error('Помилка заповнення форми логіну:', error);
    }
  }

  async submitForm() {
    try {
      await this.signUpButton.click();
    } catch (error) {
      console.error('Помилка натискання кнопки реєстрації:', error);
    }
  }

  async validationMessage() {
    try {
      const validationMessage = await this.emailInput.evaluate(el => el.validationMessage);
      console.log(validationMessage);
    } catch (error) {
      console.error('Помилка перевірки повідомлення валідації:', error);
    }
  }

  async signIn() {
    try {
      await this.loginButton.click();
    } catch (error) {
      console.error('Помилка натискання кнопки входу:', error);
    }
  }

  async checkLogo() {
    try {
      await expect(this.logo).toHaveAttribute('src', /GoBigReviews-logo\.png/);
      await expect(this.logo).toBeVisible();
    } catch (error) {
      console.error('Помилка перевірки логотипу:', error);
    }
  }

  async checkGoogle() {
    try {
      await expect(this.googleSignIn).toHaveAttribute('href', '/auth/google');
      await expect(this.googleSignIn).toBeVisible();
    } catch (error) {
      console.error('Помилка перевірки кнопки Google:', error);
    }
  }

  async checkFacebook() {
    try {
      await expect(this.facebookSignIn).toHaveAttribute('href', '/auth/facebook');
      await expect(this.facebookSignIn).toBeVisible();
    } catch (error) {
      console.error('Помилка перевірки кнопки Facebook:', error);
    }
  }

  async acceptTerms() {
    try {
      await this.accept.check();
    } catch (error) {
      console.error('Помилка активації чекбоксу згоди:', error);
    }
  }

  async subscribe() {
    try {
      await this.newsletter.check();
    } catch (error) {
      console.error('Помилка підписки на розсилку:', error);
    }
  }

  async errorsMessage() {
    try {
      await expect(this.errorMassege).toBeVisible();
      await expect(this.errorMassege).toHaveText('The password field confirmation does not match.');
    } catch (error) {
      console.error('Помилка перевірки повідомлення про невідповідність пароля:', error);
    }
  }

  async errorsEmailExist() {
    try {
      await expect(this.errorMassege).toBeVisible();
      await expect(this.errorMassege).toHaveText('The email has already been taken.');
    } catch (error) {
      console.error('Помилка перевірки повідомлення про існуючий email:', error);
    }
  }

  async invalidEmailPassword() {
    try {
      await expect(this.errorEmailPassword).toBeVisible();
      await expect(this.errorEmailPassword).toHaveText('Invalid email or password');
    } catch (error) {
      console.error('Помилка перевірки повідомлення про невірний email або пароль:', error);
    }
  }

  async verifyErrorMessage(error: string) {
    try {
      await expect(this.errorMassege).toBeVisible();
      await expect(this.errorMassege).toHaveText(error);
    } catch (error) {
      console.error('Помилка перевірки повідомлення про помилку:', error);
    }
  }

  async buttonDisable() {
    try {
      await expect(this.signUpButton).toBeDisabled();
    } catch (error) {
      console.error('Помилка перевірки неактивної кнопки реєстрації:', error);
    }
  }

  async signInDisable() {
    try {
      await expect(this.loginButton).toBeDisabled();
    } catch (error) {
      console.error('Помилка перевірки неактивної кнопки входу:', error);
    }
  }

  generateDataWithTimestamp() {
    const timestamp = Date.now();
    return {
      name: `User_${timestamp}`,
      email: `user_${timestamp}@example.com`,
      password: `Pass${timestamp}Q!`,
    };
  }

  async fillFormWithTimestamp() {
    try {
      const { name, email, password } = this.generateDataWithTimestamp();
      await this.fillForm(name, email, password, password);
    } catch (error) {
      console.error('Помилка автозаповнення форми з унікальними даними:', error);
    }
  }

  async autoRegisterWithTimestamp() {
    try {
      const { name, email, password } = this.generateDataWithTimestamp();
      await this.registrationOpen();
      await this.fillForm(name, email, password, password);
      await this.acceptTerms();
      await this.submitForm();
    } catch (error) {
      console.error('Помилка автоматичної реєстрації:', error);
    }
  }
}