import { Image } from "./data/Image";

export class Report {
  id: number;
  description: string;
  reason: string;
  status: string;
  adminNote: string | null;
  target: {
    id: number;
    type: string;
  };
  images: Image[];
  date: {
    created: Date;
    updated: Date;
    reviewed: Date;
  };
  user: {
    reporter: {
      id: number;
      email: string;
      avatar: Image;
    };
    reported: {
      id: number;
    };
  };
  spot: {
    id: number;
    identifier: string;
    status: string;
    active: boolean;
    property: {
      id: number;
      name: string;
    };
  };

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.reason = data.reason;
    this.status = data.status;
    this.adminNote = data.adminNote ?? undefined;
    this.target = {
      id: data.targetId,
      type: data.targetType,
    };
    this.images = Image.createFromList(data.images);
    this.date = {
      created: data.createdAt ? new Date(data.createdAt) : new Date(),
      updated: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      reviewed: new Date(data.reviewedAt) ?? null,
    };
    this.user = {
      reporter: data.reporter ? {
        id: data.reporter.id,
        email: data.reporter.email,
        avatar: data.reporter.avatarUrl ? new Image(data.reporter.avatarUrl) : undefined,
      } : undefined,
      reported: {
        id: data.reportedUserId,
      },
    };

    this.spot = data.spot ? {
      id: data.spot.id,
      identifier: data.spot.identifier,
      status: data.spot.status,
      active: data.spot.isActive,
      property: data.spot.property ? {
        id: data.spot.property.id,
        name: data.spot.property.name,
      } : undefined,
    } : undefined;
  }
}
