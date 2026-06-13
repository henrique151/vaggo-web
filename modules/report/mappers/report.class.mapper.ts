import { Property, ReportData } from "@classes";
import { PropertyClassInterface, ReportClassInterface } from "@interfaces";

export default function map(d: ReportClassInterface): ReportData {
  return new ReportData(d);
}
