import { Spot, User } from "@classes";
import {
  ImageClassInterface,
  ReportClassInterface,
  ReportStructureInterface,
} from "@interfaces";

export class ReportData implements ReportClassInterface {
  id: number;
  info: {
    description: string;
    status: string;
    reason: string;
    adminNote: string;
    images: ImageClassInterface[];
  };
  target: { id: number; type: "CHAT" | "SPOT" };
  date: { created: Date; updated: Date; reviewed: Date };
  reporter: User;
  reported: User;
  spot?: Spot;
  chat?: object;

  constructor(i: ReportStructureInterface) {
    this.id = i.id;
    this.info = {
      description: i.info.description,
      status: i.info.status,
      reason: i.info.reason,
      adminNote: i.info.adminNote,
      images: i.info.images as ImageClassInterface[],
    };
    this.target = { id: i.target?.id, type: i.target?.type };
    this.date = {
      created: i.date.created && new Date(i.date.created as Date),
      updated: i.date.updated && new Date(i.date.updated as Date),
      reviewed: i.date.reviewed && new Date(i.date.reviewed as Date),
    };
    this.reporter = i.reporter && new User(i.reporter);
    this.reported = i.reported && new User(i.reported);
    this.spot = i.spot && new Spot(i.spot);
    this.chat = undefined;
  }
}
