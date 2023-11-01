import {IUser} from '../../interfaces/IUser';

export class User implements IUser {
  name: string;
  username: string;
  loggedIn: boolean;
  token: string;

  constructor() {
    this.name = '';
    this.username = '';
    this.loggedIn = false;
    this.token = '';
  }
}
