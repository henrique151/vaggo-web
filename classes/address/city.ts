import State from "./state";

export default class City {
  public id: number;
  public name: string;
  public state: State;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    console.log(data.state);
    if (typeof State == typeof data.state) {
      console.log("yes it is!");
      this.state = data.state;
    } else {
      if (data.state) {
        this.state = new State(data.state);
      }
    }
  }
}
