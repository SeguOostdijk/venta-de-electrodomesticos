import { Page, expect } from '@playwright/test'

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path)
    await this.page.waitForLoadState('networkidle')
  }

  async waitForRedirectTo(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path), { timeout: 10000 })
  }
}
