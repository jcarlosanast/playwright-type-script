import { expect, Locator, type Page } from '@playwright/test';

//criando variaveis para armazenada dados que podem ser reaproveitados
export interface Account {
    username: string
    password: string
}

export class Login {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submit(account: Account) {

        await this.page.goto('/')

        //Foi clicado no ca
        // await page.getByRole('textbox', { name: 'nome de usuário' }).click();

        await this.page.getByPlaceholder('nome de usuário').fill(account.username)

        //Ele construi os testes todos a partir de cada ação então é necessário fazer uma refatoração
        // await page.getByRole('textbox', { name: 'nome de usuário' }).press('Tab');
        await this.page.getByPlaceholder('senha secreta').fill(account.password)
        await this.page.getByRole('button', { name: 'Entrar' }).click();

    }

    async getPopupContent(): Promise<Locator> {
        return this.page.locator('#swal2-html-container')

    }

    async assertToast(expectText: string) {
        const toast = this.page.getByRole('status')

        await expect(toast).toContainText(expectText);

        //https://playwright.dev/docs/screenshots conforme Documentação podemos tirar um ScremShot de um elemento 
        await toast.screenshot();
    }
}