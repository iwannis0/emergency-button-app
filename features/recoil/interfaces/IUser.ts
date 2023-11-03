export interface IUser {
  id: string;
  name: string;
  surname: string;
  loggedIn: boolean;
  keepLoggedIn: boolean;
  token: string;
}
