import { test, expect } from '@playwright/test'
import { LoginPage } from './login-page'
import { TEST_USER } from '../helpers'

test.describe('Login', () => {
  test(
    'Usuario puede iniciar sesión con credenciales válidas',
    { tag: ['@critical', '@e2e', '@login', '@LOGIN-E2E-001'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()
      await loginPage.login({ email: TEST_USER.email, password: TEST_USER.password })
      await loginPage.verifyOnProductsPage()
    }
  )

  test(
    'Login con credenciales inválidas muestra error',
    { tag: ['@high', '@e2e', '@login', '@LOGIN-E2E-002'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()
      await loginPage.login({ email: 'noexiste@test.com', password: 'wrongpassword' })
      await loginPage.verifyErrorShown()

      await expect(page).toHaveURL(/\/login/)
    }
  )
})
