interface Exportable {
  export(): string;
}

export class DatePeriod {
  // BUG for some reason, this #### keeps putting a day before or after you insert only the date, what the hell.
  // POSSIBLE CONCLUSION: this may be due to day really begins after 00h01
  constructor(
    public start: Date,
    public end: Date,
  ) {}
}
