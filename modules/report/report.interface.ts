// import {  } from "../types";
import {
  DeepPartial,
  ImageClassInterface,
  PropertyClassInterface,
  SpotClassInterface,
  UserClassInterface,
} from "@interfaces";
// import {  } from "./property";

export type ReportClassInterface = Report;
export type ReportStructureInterface = DeepPartial<Report>;

interface Report {
  id: number;
  info: {
    description: string;
    status: string;
    reason: string;
    adminNote: string;
    images: ImageClassInterface[];
  };
  target: {
    id: number;
    type: "CHAT" | "SPOT";
  };
  date: {
    created: Date;
    updated: Date;
    reviewed: Date;
  };
  reporter: UserClassInterface;
  reported: UserClassInterface;
  spot?: SpotClassInterface;
  chat?: object;
}
