import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../base-page'

export interface LoginData {
  email: string
  password: string
}

export class LoginPage extends BasePage {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = page.getByLabel('Email')
    this.passwordInput = page.getByLabel('Contraseña')
    this.submitButton = page.getByRole('button', { name: 'Ingresar' })
    this.errorMessage = page.getByText('Email o contraseña incorrectos.')
  }

  async goto(): Promise<void> {
    await super.goto('/login')
  }

  async login(data: LoginData): Promise<void> {
    await this.emailInput.fill(data.email)
    await this.passwordInput.fill(data.password)
    await this.submitButton.click()
  }

  async verifyOnProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products/, { timeout: 10000 })
  }

  async verifyErrorShown(): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 })
  }
}
