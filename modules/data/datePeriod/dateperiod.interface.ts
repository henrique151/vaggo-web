import { DeepPartial } from "@interfaces";

export type DatePeriodClassInterface = DatePeriod;
export type DatePeriodStructureInterface = DeepPartial<DatePeriod>;

interface DatePeriod {
  start: Date;
  end: Date;
}
