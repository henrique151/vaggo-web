import { Image } from "./data/Image";

export default class Review {
  id: number;
  rating: number;
  comment: string;
  date: Date;
  user: {
    id: number;
    email: string;
    avatar: Image;
  };
  spot: {
    id: number;
    identifier: string;
  };
  reservation: {
    id: number;
  };
  property: {
    id: number;
    name: string;
  };

  constructor(data: any) {
    this.id = data.id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.date = new Date(data.reviewDate);
    this.user = {
      id: data.userId,
      email: (data.user?.email || data.author?.email) ?? undefined,
      avatar: new Image(data.user?.avatarUrl || data.author?.avatarUrl),
    };
    this.spot = {
      id: data.spotId,
      identifier: data.spot?.identifier ?? undefined,
    };
    this.reservation = {
      id: data.reservationId,
    };
    this.property = {
      id: data?.property?.id ?? undefined,
      name: data?.property?.id ?? undefined,
    };
  }
}
