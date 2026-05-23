export default class AccessToken {
  token: string;
  expiration: Date;
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.token = data.accessToken;
    this.expiration = new Date(data.expiresIn);
    this.id = data.user.id;
  }
}
