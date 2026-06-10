import { PropertyClassInterface } from "@interfaces";

export default function map(d: any): PropertyClassInterface {
  return {
    id: d.id,
    info: {
      name: d.name,
      type: d.type,
      description: d.description,
      totalCapacity: d.totalCapacity,
      images: d.images.map((image) => {
        return { url: image };
      }),
    },
    status: {
      active: d.isActive,
    },
    location: {
      latitude: d.latitude,
      longitude: d.longitude,
      address: {
        id: d.address.id,
        location: {
          street: d.address.street,
          neighborhood: d.address.neighborhood,
          number: d.address.number,
          zipCode: d.address.zipCode,
          complement: d.address.complement,
        },
        city: {
          id: d.address.city.id,
          name: d.address.city.name,
          state: {
            id: d.address.city.stateId,
            name: undefined,
            uf: undefined,
          },
        },
      },
    },
  };
}
