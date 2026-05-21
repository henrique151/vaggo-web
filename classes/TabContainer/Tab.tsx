export default class Tab {
  constructor(
    private label: {
      default: string;
      sidebar?: string;
      page?: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public page: any,
  ) {}

  //get label depending on type, fallbacks to default in case the selected type doens't exist on current object
  public getLabel(type: "default" | "sidebar" | "page" = "default") {
    return this.label[type] || this.label.default;
  }
}
