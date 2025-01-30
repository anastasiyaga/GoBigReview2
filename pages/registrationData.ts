import {Page,Locator, expect} from '@playwright/test';
// import { faker } from '@faker-js/faker';
export class RegistrationData{
readonly page:Page;
readonly nameInput:Locator;
readonly emailInput:Locator;
readonly passwordInput:Locator;
readonly repeatPasswordInput:Locator;
readonly accept:Locator;
readonly newsletter:Locator;
readonly signUpButton:Locator;
readonly loginButton:Locator;
readonly logo:Locator;
readonly googleSignIn:Locator;
readonly facebookSignIn:Locator;
readonly errorMassege:Locator;
readonly errorEmailPassword:Locator;

constructor(page:Page){

    this.page=page;
    this.nameInput=page.locator('input[name="name"]');
    this.emailInput=page.locator('input[name="email"]');
    this.passwordInput=page.locator('input[name="password"]');
    this.repeatPasswordInput=page.locator('input[name="confirm-password"]');
    this.accept=page.locator('input[name="toc"]');
    this.newsletter=page.locator('input.form-check-input.font-weight-light');
    this.signUpButton=page.locator('button[type="submit"]');
    this.loginButton=page.locator('button.btn.btn-primary:has-text("Sign in")')
    this.logo = page.locator('a[href="/"] img[alt="Logo"]');
    this.googleSignIn = page.locator('a[href="/auth/google"]');
    this.facebookSignIn = page.locator('a[href="/auth/facebook"]');
    this.errorMassege = page.locator('.text-danger.errors-field');
    this.errorEmailPassword = page.locator('.text-danger', { hasText: 'Invalid email or password' } );

}
async registrationOpen(){
    await this.page.goto('https://gobigreviews.com/register')
}
async authorization(){
    await this.page.goto('https://gobigreviews.com/login')
}
async fillForm(name:string, email:string, password:string, confirmPassword:string){
await this.nameInput.fill (name);
await this.emailInput.fill (email);
await this.passwordInput.fill (password);
await this.repeatPasswordInput.fill (confirmPassword);
}

async fillLoginForm(email:string, password:string){
    await this.emailInput.fill (email);
    await this.passwordInput.fill (password);
}
async submitForm(){
await this.signUpButton.click(); 
}
async signIn(){
    await this.loginButton.click();
}
async checkLogo(){
await expect(this.logo).toHaveAttribute('src', /GoBigReviews-logo\.png/);
await expect(this.logo).toBeVisible();
}
async checkGoogle(){
    await expect(this.googleSignIn).toHaveAttribute('href', '/auth/google');
    await expect(this.googleSignIn).toBeVisible();
}
async checkFacebook(){
    await expect(this.facebookSignIn).toHaveAttribute('href', '/auth/facebook');
    await expect(this.facebookSignIn).toBeVisible();
}
async acceptTerms(){
await this.accept.check()
}
async subscribe(){
    await this.newsletter.check()
}
async errorsMessage(){
    await expect(this.errorMassege).toBeVisible();
    await expect(this.errorMassege).toHaveText('The password field confirmation does not match.');
}
async errorsEmailExist(){
    await expect(this.errorMassege).toBeVisible();
    await expect(this.errorMassege).toHaveText('The email has already been taken.'); 
}
async invalidEmailPassword(){
    await expect(this.errorEmailPassword).toBeVisible();
    await expect(this.errorEmailPassword).toHaveText('Invalid email or password');
}
async verifyErrorMessage(error:string){
    await expect(this.errorMassege).toBeVisible();
    await expect(this.errorMassege).toHaveText(error);
}

async buttonDisable(){
    await expect(this.signUpButton).toBeDisabled(); 
}
async signInDisable(){
    await expect(this.loginButton).toBeDisabled();
}
generateDataWithTimestamp() {
    const timestamp = Date.now(); // Унікальний timestamp
    return {
        name: `User_${timestamp}`, // Унікальне ім'я
        email: `user_${timestamp}@example.com`, // Унікальний email
        password: `Pass${timestamp}Q!`, // Унікальний пароль
    };
}
async fillFormWithTimestamp() {
    const { name, email, password } = this.generateDataWithTimestamp();
    await this.fillForm(name, email, password, password);
}
async autoRegisterWithTimestamp() {
    const { name, email, password } = this.generateDataWithTimestamp();
    await this.registrationOpen();
    await this.fillForm(name, email, password, password);
    await this.acceptTerms();
    await this.submitForm();
}

// generateTestData() {
//     return {
//         name: faker.name.firstName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(10),
//     };
// }
// async fillFormWithRandomData() {
//     const { name, email, password } = this.generateTestData();
//     await this.fillForm(name, email, password, password);
// }
// async autoRegister() {
//     const { name, email, password } = this.generateTestData();
//     await this.registrationOpen();
//     await this.fillForm(name, email, password, password);
//     await this.acceptTerms();
//     await this.submitForm();
// }

}
