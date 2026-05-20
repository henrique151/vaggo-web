export default class State {
  public id: number;
  public name: string;
  public uf: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.uf = data.uf;
  }

  public static getFromList(id: number, list: State[]) {
    for (const state of list) {
      if (state.id == id) {
        return state;
      }
    }
  }
}
