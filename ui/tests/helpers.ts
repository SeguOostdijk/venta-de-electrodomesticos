export const TEST_USER = {
  name: 'Test E2E User',
  email: 'test_e2e@electroshop.com',
  password: 'Test1234!',
}

export const ADMIN_USER = {
  email: 'admin@electroshop.com',
  password: 'Admin1234!',
}

export function generateUniqueEmail(): string {
  return `test_${Date.now()}@electroshop.com`
}

export function generateTestUser() {
  return {
    name: 'Test User',
    email: generateUniqueEmail(),
    password: 'Test1234!',
  }
}
