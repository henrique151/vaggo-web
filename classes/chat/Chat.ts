import { Image } from "../data/Image";

export default class Chat {
  id: number;
  solicitationId: number;
  propertyId: number;
  lastContent: string;
  user: {
    name: string;
    avatar: Image;
    lastOnline: string;
  };
  subtitle: string;
  otherParticipantId: number;
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.solicitationId = data.solicitationId;
    this.propertyId = data.propertyId;
    this.lastContent = data.lastContent;
    this.user = {
      name: data.name,
      avatar: new Image(data.avatar_url),
      lastOnline: data.last_online,
    };
    this.subtitle = data.subtitle;
    this.otherParticipantId = data.otherParticipantId;
    this.updatedAt = data.updatedAt;
  }
}
