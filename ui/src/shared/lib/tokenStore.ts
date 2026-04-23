let accessToken: string | null = null

export const tokenStore = {
  getAccess: () => accessToken,
  setAccess: (token: string) => { accessToken = token },
  clearAccess: () => { accessToken = null },

  getRefresh: () => localStorage.getItem('refreshToken'),
  setRefresh: (token: string) => localStorage.setItem('refreshToken', token),
  clearRefresh: () => localStorage.removeItem('refreshToken'),

  clear: () => {
    accessToken = null
    localStorage.removeItem('refreshToken')
  },
}
