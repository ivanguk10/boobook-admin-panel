export class LoginModel{
  constructor(email: string, password: string) {
    this.email = email;
  }
  id!: number;
  email!: string;
  accessToken!: string;
  role!: number;
}
