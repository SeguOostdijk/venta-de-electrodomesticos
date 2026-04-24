import { test } from '@playwright/test'
import { LoginPage } from '../login/login-page'
import { ProductsPage } from './products-page'
import { TEST_USER } from '../helpers'

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login({ email: TEST_USER.email, password: TEST_USER.password })
    await loginPage.verifyOnProductsPage()
  })

  test(
    'Usuario puede agregar un producto al carrito',
    { tag: ['@critical', '@e2e', '@products', '@PRODUCTS-E2E-001'] },
    async ({ page }) => {
      const productsPage = new ProductsPage(page)

      await productsPage.waitForProducts()
      await productsPage.addFirstProductToCart()
      await productsPage.verifyFirstProductInCart()
    }
  )
})
