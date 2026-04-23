export interface ApiResponse<T> {
  data: T
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
}

export type Role = 'USER' | 'ADMIN'

export interface TokenPayload {
  sub: string
  userId: number
  role: Role
  exp: number
}
