import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../base-page'

export interface RegisterData {
  name: string
  email: string
  password: string
}

export class RegisterPage extends BasePage {
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)
    this.nameInput = page.getByLabel('Nombre')
    this.emailInput = page.getByLabel('Email')
    this.passwordInput = page.getByLabel('Contraseña')
    this.submitButton = page.getByRole('button', { name: 'Crear cuenta' })
  }

  async goto(): Promise<void> {
    await super.goto('/register')
  }

  async register(data: RegisterData): Promise<void> {
    await this.nameInput.fill(data.name)
    await this.emailInput.fill(data.email)
    await this.passwordInput.fill(data.password)
    await this.submitButton.click()
  }

  async verifyOnProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products/, { timeout: 10000 })
  }
}
