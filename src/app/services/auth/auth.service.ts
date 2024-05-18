import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";

const LOCAL_STORAGE_NAME = 'currentUser'
const LOCAL_STORAGE_TOKEN_NAME = 'accessToken'

const fetchHandler = (e: Response) => {
  if (e.status < 500) {
    console.log(e);
    return e.json()
  }
  return {error:'Something goes wrong'}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  private accessToken: string | null = null;

  constructor(
    private router: Router,
  ) {
    if (this.isAuthenticated) {
      return
    }
    const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    const storedToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) || 'null');
    if (storedUser) {
      this.userStorage.push(storedUser);
      this.auth(storedUser, storedToken)
    }
  }

  private getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }

  private auth(user: IUser, token: string, isRememberMe?: boolean) {
    this.currentUser = user;
    this.accessToken = token;
    if (isRememberMe) {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, JSON.stringify(token));
    }
  }

  private authAndRedirect(user: IUser, token: string, isRememberMe?: boolean) {
    this.auth(user, token, isRememberMe);
    this.router.navigate(['tickets']);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get user(): IUser | null {
    return this.currentUser;
  }

  get token(): string | null {
    return this.isAuthenticated ? this.accessToken : null;
  }

  async authUser(login: string, password: string, isRememberMe: boolean): Promise<true | string> {
    const result: { user: IUser, token: string, error: string} = await fetch( 'http://localhost:3000/users/auth', {
      body: JSON.stringify({ login, password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(fetchHandler);

    if (result.error) {
      return result.error
    }

    const user = result.user
    this.authAndRedirect(user, result.token, isRememberMe)
    return true;
  }

  async addUser(user: IUser, isRememberMe?: boolean): Promise<true | string> {
    const result: { user: IUser, token: string, error: string} = await fetch( 'http://localhost:3000/users/registration', {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(fetchHandler);

    if (result.error) {
      return result.error
    }

    this.authAndRedirect(result.user, result.token, isRememberMe)
    return true;
  }

  logout() {
    this.userStorage = this.userStorage.filter(({login}) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['auth']);
  }

  changePassword(password: string) {
    if (!this.currentUser) {
      return
    }
    this.currentUser.password = password;
    const dbUser = this.userStorage.find(({login}) => login === this.currentUser?.login)!;
    dbUser.password = password
  }
}
