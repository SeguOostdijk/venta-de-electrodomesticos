import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../base-page'

export class ProductsPage extends BasePage {
  readonly heading: Locator
  readonly addToCartButtons: Locator
  readonly firstAddToCartButton: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.getByRole('heading', { name: 'Productos' })
    this.addToCartButtons = page.getByRole('button', { name: 'Agregar al carrito' })
    this.firstAddToCartButton = this.addToCartButtons.first()
  }

  async goto(): Promise<void> {
    await super.goto('/products')
  }

  async waitForProducts(): Promise<void> {
    await expect(this.firstAddToCartButton).toBeVisible({ timeout: 10000 })
  }

  async addFirstProductToCart(): Promise<void> {
    await this.firstAddToCartButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async verifyFirstProductInCart(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'En carrito' }).first()).toBeVisible({ timeout: 10000 })
  }
}
