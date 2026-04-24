import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../base-page'

export interface ProductData {
  name: string
  brand: string
  price: string
  stock: string
  description: string
}

export class AdminProductsPage extends BasePage {
  readonly heading: Locator
  readonly newProductButton: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.getByRole('heading', { name: 'Productos' })
    this.newProductButton = page.getByRole('button', { name: '+ Nuevo producto' })
  }

  async goto(): Promise<void> {
    await super.goto('/admin/products')
  }

  async openCreateModal(): Promise<void> {
    await this.newProductButton.click()
  }

  async fillProductForm(data: ProductData): Promise<void> {
    await this.page.getByLabel('Nombre').fill(data.name)
    await this.page.getByLabel('Marca').fill(data.brand)
    await this.page.getByLabel('Precio').fill(data.price)
    await this.page.getByLabel('Stock').fill(data.stock)
    await this.page.getByLabel('Descripción').fill(data.description)
  }

  async submitProductForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Guardar' }).click()
  }

  async verifyProductInTable(name: string): Promise<void> {
    await expect(this.page.getByRole('cell', { name }).first()).toBeVisible({ timeout: 5000 })
  }
}
