import { test, expect } from '@playwright/test'

import { Account, Login } from './support/actions/login'

let login: Login

test.beforeEach(({page}) => {

    login = new Login(page)

})

test('deve logar com sucesso', async ({ page }) => {

    //Criando a interface informo que que a constante criada é do tipo String conforme interface implementada
    const account: Account = {
        username: 'qa',
        password: 'xperience'
    }

    await login.submit(account)
    await expect(
        await login.getPopupContent()
    ).toContainText('Suas credenciais são válidas :)')

    // O ; (ponto e vergula) não são obrigatórios
})

// Passando o valor only  a descrição do testes, somente ele é executado no prompt (test.only('nome do teste'))
test('não deve logar com senha incorreta', async ({ page }) => {

    const account: Account = {
        username: 'qa',
        password: '123abc'
    }

    await login.submit(account)
    await login.assertToast('Oops! Credenciais inválidas :(')

    // const toast = page.getByRole('status')

    // await expect(toast).toContainText('Oops! Credenciais inválidas :(');

    // //https://playwright.dev/docs/screenshots conforme Documentação podemos tirar um ScremShot de um elemento 
    // await toast.screenshot();
});

test('não deve logar sem informr o usuario e senha', async ({ page }) => {

    const account: Account = {
        username: '',
        password: ''
    }

    await login.submit(account)
    await login.assertToast('Informe o seu nome de usuário!')

    // await page.goto('/');
    // await page.getByRole('button', { name: 'Entrar' }).click();

    // const toast = page.getByRole('status')

    // await expect(toast).toContainText('Informe o seu nome de usuário!');
    // await toast.screenshot();
});

// Passando o valor only  a descrição do testes, somente ele é executado no prompt (test.only('nome do teste'))
test('não deve logar sem informa a senha', async ({ page }) => {

    const account: Account = {
        username: 'qa',
        password: ''
    }

    await login.submit(account)
    await login.assertToast('Informe a sua senha secreta!')

    // await page.goto('/');
    // await page.getByRole('textbox', { name: 'nome de usuário' }).fill('qa');
    // await page.getByRole('button', { name: 'Entrar' }).click();

    // const toast = page.getByRole('status')

    // await expect(toast).toContainText('Informe a sua senha secreta!');
    // await toast.screenshot();
});

test('não deve logar sem informa o usuário', async ({ page }) => {

    const account: Account = {
        username: '',
        password: 'xperience'
    }

    await login.submit(account)
    await login.assertToast('Informe o seu nome de usuário!')


    // await page.goto('/');
    // await page.getByRole('textbox', { name: 'senha secreta' }).fill('abc123');
    // await page.getByRole('button', { name: 'Entrar' }).click();

    // const toast = page.getByRole('status')

    // await expect(toast).toContainText('Informe o seu nome de usuário!');
    // await toast.screenshot();
});
