export default class DatePeriod {
  // BUG for some reason, this #### keeps putting a day before or after you insert only the date, what the hell.
  // POSSIBLE CONCLUSION: this may be due to day really begins after 00h01
  constructor(
    public start: Date,
    public end: Date,
  ) {}

  public toString() {
    return {
      start: `${this.start.getFullYear()}-${this.start.getMonth()}-${this.start.getDate()}`,
      end: `${this.end.getFullYear()}-${this.end.getMonth()}-${this.end.getDate()}`,
    };
  }
}
