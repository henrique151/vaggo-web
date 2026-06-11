import {
  DatePeriodClassInterface,
  DatePeriodStructureInterface,
} from "@interfaces";

export class DatePeriod implements DatePeriodClassInterface {
  start: Date;
  end: Date;

  constructor(i: DatePeriodStructureInterface) {
    this.start = new Date(i.start as Date);
    this.end = new Date(i.end as Date);
  }

  public toSimpleISOFormat() {}

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
