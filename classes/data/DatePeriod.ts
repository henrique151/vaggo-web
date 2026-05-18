export default class DatePeriod {
  // BUG for some reason, this #### keeps putting a day before or after you insert only the date, what the hell.
  // POSSIBLE CONCLUSION: this may be due to day really begins after 00h01
  constructor(
    public start: Date,
    public end: Date,
  ) {}

  public toString() {
    console.log(this.start, this.end);

    const convertDateString = (date: number, isMonth: boolean = true) => {
      const convertedDate = (isMonth ? date + 1 : date).toString();
      console.log(date);
      if (convertedDate.length == 1) {
        return `0${convertedDate}`;
      } else {
        return convertedDate;
      }
    };

    const startDate = convertDateString(this.start.getDate(), false);
    const startMonth = convertDateString(this.start.getMonth());
    const endDate = convertDateString(this.end.getDate(), false);
    const endMonth = convertDateString(this.end.getMonth());

    return {
      start: `${this.start.getFullYear()}-${startMonth}-${startDate}`,
      end: `${this.end.getFullYear()}-${endMonth}-${endDate}`,
    };
  }
}
