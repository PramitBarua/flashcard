let localStorageServiceInstance: LocalStorageService;

class LocalStorageService {
  public getService() {
    if (!localStorageServiceInstance) localStorageServiceInstance = this;
    return localStorageServiceInstance;
  }

  public setToken(tokenObj: { refreshToken: string; token: string }) {
    localStorage.setItem('auth._token.local', tokenObj.token);
    localStorage.setItem('auth._refresh_token.local', tokenObj.refreshToken);
  }

  public getAccessToken() {
    return localStorage.getItem('auth._token.local');
  }

  public getRefreshToken() {
    return localStorage.getItem('auth._refresh_token.local');
  }

  public clearToken() {
    localStorage.removeItem('auth._token.local');
    localStorage.removeItem('auth._refresh_token.local');
  }
}

export default new LocalStorageService();
