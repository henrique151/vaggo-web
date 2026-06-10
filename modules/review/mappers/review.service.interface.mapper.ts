import { ReviewClassInterface } from "@interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function map(d: any): ReviewClassInterface {
  return {
    id: d.id,
    info: {
      rating: d.rating,
      comment: d.comment,
      author: {
        id: d.author?.id ?? d.user?.id,
        email: d.author?.email ?? d.user?.email,
        avatar: { url: d.author?.avatarUrl ?? d.user?.avatarUrl },
      },
    },
    date: {
      review: d.reviewDate,
    },
    property: {
      id: d.property?.id ?? d.propertyId,
      info: { name: d.property?.name },
    },
    spot: {
      id: d.spot?.id ?? d.spotId,
      info: { identifier: d.spot?.identifier },
    },
    reservation: {
      id: d.reservation?.id ?? d.reservationId,
      status: d.reservation?.status,
      info: {
        date: {
          period: {
            start: d.reservation?.startDate,
            end: d.reservation?.startDate,
          },
        },
      },
    },
  };
}
