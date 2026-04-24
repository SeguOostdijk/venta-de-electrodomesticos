import { test } from '@playwright/test'
import { RegisterPage } from './register-page'
import { generateTestUser } from '../helpers'

test.describe('Register', () => {
  test(
    'Usuario puede registrarse con datos válidos',
    { tag: ['@critical', '@e2e', '@register', '@REGISTER-E2E-001'] },
    async ({ page }) => {
      const registerPage = new RegisterPage(page)
      const user = generateTestUser()

      await registerPage.goto()
      await registerPage.register(user)
      await registerPage.verifyOnProductsPage()
    }
  )
})
