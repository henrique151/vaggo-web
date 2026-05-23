import User from "../user";

export default class Message {
  author: User;
  content: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.author = data.author;
    this.content = data.content;
  }
}
