import { test } from '@playwright/test'
import { LoginPage } from '../login/login-page'
import { ProductsPage } from '../products/products-page'
import { CartPage } from './cart-page'
import { TEST_USER } from '../helpers'

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login({ email: TEST_USER.email, password: TEST_USER.password })
    await loginPage.verifyOnProductsPage()

    // Agrega un producto para tener algo en el carrito
    const productsPage = new ProductsPage(page)
    await productsPage.waitForProducts()
    await productsPage.addFirstProductToCart()
    await productsPage.verifyFirstProductInCart()
  })

  test(
    'Usuario puede confirmar una compra desde el carrito',
    { tag: ['@critical', '@e2e', '@cart', '@CART-E2E-001'] },
    async ({ page }) => {
      const cartPage = new CartPage(page)

      await cartPage.goToCartViaNav()
      await cartPage.verifyHasItems()
      await cartPage.checkout()
      await cartPage.verifyOnMyOrdersPage()
    }
  )
})
