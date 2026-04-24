import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../base-page'

export class CartPage extends BasePage {
  readonly heading: Locator
  readonly checkoutButton: Locator
  readonly cartLink: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.getByRole('heading', { name: 'Carrito' })
    this.checkoutButton = page.getByRole('button', { name: 'Confirmar compra' })
    this.cartLink = page.getByRole('link', { name: /Carrito/ })
  }

  async goto(): Promise<void> {
    await super.goto('/cart')
  }

  async goToCartViaNav(): Promise<void> {
    await this.cartLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifyHasItems(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 5000 })
    await expect(this.checkoutButton).toBeVisible()
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click()
  }

  async verifyOnMyOrdersPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/my-orders/, { timeout: 10000 })
  }
}
