import { PropertyClassInterface } from "@interfaces";

export default function map(d: any): PropertyClassInterface {
  // Encontra o dono da propriedade: prioriza quem tem role=DONO na junction table,
  // ou pega o primeiro da lista, ou fallback para campos diretos
  const ownerFromResidents = Array.isArray(d.residentsAndOwners)
    ? (d.residentsAndOwners.find((u: any) => u?.PropertyUser?.role === "DONO") ??
       d.residentsAndOwners[0])
    : undefined;
  const ownerId =
    ownerFromResidents?.id ??
    d.userId ??
    d.ownerId ??
    d.owner?.id ??
    d.user?.id;

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
    user: ownerId ? { id: ownerId } : undefined,
  };
}
