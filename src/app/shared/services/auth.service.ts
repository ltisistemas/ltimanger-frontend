import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface IUser {
  id?: number | null,
  name?: string | null,
  email?: string | null,
  reset_token?: any | null,
  profile?: string | null,
  last_logged_at?: any | null,
  deleted_at?: any | null,
  created_at?: Date | null,
  updated_at?: Date | null,
  token?: string,
  company_id?: any | null,
  avatarUrl?: string | null,
}

const defaultPath = '/';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = {}; // defaultUser;
  get loggedIn(): boolean {
    return this.userLogged;
  }

  public get userLogged(): any {
    const u: any = localStorage.getItem('user_logged')
    const usr = JSON.parse(u)

    return !!usr ? true : false
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(email: string, password: string) {

    try {
      // Send request
      const url = `${environment.base_url}login`
      const { data, code }: any = await this.http.post<IUser>(url, { email, password }).toPromise()

      const avatarUrl = 'https://milvus.online/wp-content/uploads/2017/05/avatar-default.jpg'
      this._user = { ...data, avatarUrl };
      localStorage.setItem('user_logged', JSON.stringify(this._user))
      localStorage.setItem('user_token', this._user?.token ?? '')

      if (code !== 200) {
        return {
          isOk: false,
          message: "Usuário / Senha não encontrados"
        };
      }

      this.router.navigate([this._lastAuthenticatedPath]);
      return {
        isOk: true,
        data: this._user,
        message: "Login realizado com sucesso"
      };
    }
    catch {
      return {
        isOk: false,
        message: "Usuário / Senha não encontrados"
      };
    }
  }

  public get getUserLogged(): IUser {
    const u = JSON.parse(localStorage.getItem('user_logged') || '')
    return u === '' ? null : u
  }

  public get isAdmin() {
    const userLogged = this.getUserLogged;

    return !!!userLogged.hasOwnProperty('company_id')
  }
  public get isCompanyUser() {
    const userLogged = this.getUserLogged;

    return userLogged.profile === 'COMPANY_ADMIN'
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: JSON.parse(localStorage.getItem('user_logged') || '')
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    localStorage.removeItem('user_logged')
    localStorage.removeItem('user_token')
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userLogged = this.authService.getUserLogged;

    return !!userLogged.hasOwnProperty('company_id')
  }
}
