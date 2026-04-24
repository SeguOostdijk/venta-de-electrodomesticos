import { test, expect } from '@playwright/test'
import { LoginPage } from '../login/login-page'
import { AdminProductsPage } from './admin-page'
import { ADMIN_USER } from '../helpers'

test.describe('Admin — Productos', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login({ email: ADMIN_USER.email, password: ADMIN_USER.password })
    await expect(page).toHaveURL(/\/products|\/admin/, { timeout: 10000 })
  })

  test(
    'Admin puede crear un nuevo producto',
    { tag: ['@critical', '@e2e', '@admin', '@ADMIN-E2E-001'] },
    async ({ page }) => {
      const adminPage = new AdminProductsPage(page)

      await adminPage.goto()
      await expect(adminPage.heading).toBeVisible()

      await adminPage.openCreateModal()
      await adminPage.fillProductForm({
        name: 'Producto E2E Test',
        brand: 'Marca Test',
        price: '99999',
        stock: '10',
        description: 'Producto creado por test E2E',
      })
      await adminPage.submitProductForm()

      await adminPage.verifyProductInTable('Producto E2E Test')
    }
  )
})
