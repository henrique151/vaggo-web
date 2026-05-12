// // component/entity_card.tsx
// 'use client'

import { Image } from "@/interface/media";
import Link from "next/link";
import { useState } from "react";

// import { useState } from "react"
// import Link from "next/link"
// import BlurOverlay from "@/component/blur_overlay"
// import EditCard from "@/component/edit_card"

// import * as api from '@/app/api'
// import { VehicleResponse } from "@/interface/api/vehicle"

// type CardType = "vehicle" | "property" | "spot"

// interface VehicleData {
//   id: number
//   brand: string
//   model: string
//   color: string
//   licensePlate: string
//   manufactureYear: string
// }

// interface PropertyData {
//   name: string
//   type: string
//   description: string
//   totalCapacity: number
//   zipCode: string
// }

// interface SpotData {
//   size: string
//   status: "DISPONIVEL" | "INDISPONIVEL" | "OCUPADA" | any
//   identifier: string
//   isCovered: boolean
//   approvalStatus: "PENDENTE" | "APROVADA" | "RECUSADA" | any
//   allowedVehicles: any
//   operatingHours: any
// }

// interface EntityCardProps {
//   type: CardType
//   data: VehicleData | PropertyData | SpotData
//   editHref?: string
// }

// const Context = createContext(null);

interface EntityCardProps {
  children: React.ReactNode;
  editForm?: React.ReactNode;
  // data: never;
}

export default function EntityFrame({
  children,
  // data,
}: EntityCardProps) {
  return (
    <section className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}

type DefaultEntityFrameProps = {
  title: string;
  description: string;
  tagList?: string[];
};
export function DefaultEntityFrame({
  title,
  description,
  tagList,
}: DefaultEntityFrameProps) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="text-sm text-gray-500 mt-1">{description}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {tagList?.map((tag) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </div>
    </>
  );
}

export function EditableEntityFrame({
  children,
  editForm,
  // data,
}: EntityCardProps) {
  const [showEntityEditForm, setShowEntityForm] = useState(editForm);

  return (
    <section className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        {/*<Context.Provider value={data}>*/}
        <div className="flex-1">{children}</div>
        {/*</Context.Provider>*/}

        {editForm ? (
          // insert expression to popup editForm's window (possibly only accepts <FormCard>?)
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-black transition shrink-0">
            Editar
          </button>
        ) : null}

        {showEntityEditForm ? <>{editForm}</> : null}
      </div>
    </section>
  );
}

export function EntityCard({
  title,
  description,
  redirectTo,
  image,
  children,
}: {
  title: string;
  description: string;
  redirectTo: string;
  image?: Image;
  children?: React.ReactNode;
}) {
  // console.log(spot.images);
  return (
    <div
      className="
      w-65
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-sm
      hover:shadow-md
      transition
    "
      // overflow-hidden # this one keeps messy
    >
      {/*Imagem */}
      {image ? (
        <div className="w-full h-[160px] overflow-hidden">
          {/* TODO change to <Image> */}
          <img
            src={`${image.url}`}
            // src={`/`}
            alt={"Card name"}
            className="
            w-full h-full object-cover
            hover:scale-105
            transition duration-300
          "
          />
        </div>
      ) : null}

      {/* Conteúdo */}
      <div className="p-4">
        <Link href={`${redirectTo}`}>
          <h3
            className="
            font-semibold
            text-lg
            text-gray-900
            hover:text-black
            transition
          "
          >
            {title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-1">{description}</p>

        <div className="text-gray-900 font-semibold mt-3">{children}</div>
      </div>
    </div>
  );
}

// export default function EntityCard({
//   type,
//   data,
//   editHref = "#"
// }: EntityCardProps) {
//   const [openEdit, setOpenEdit] = useState(false)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>, endpoint:string) {
//     e.preventDefault()

//     const formData = new FormData(e.currentTarget)
//     const values = Object.fromEntries(formData)

//     const res = await api.call(endpoint, true, {body: JSON.stringify(values), method: "PUT", contentType:"json"})
//     // const res = await api.call(endpoint, true, {body: '{"color": "brancao", "model": "De marrom"}', method: "PUT", contentType:"json"})

//     console.log(res)

//     console.log("Dados editados:", values)

//     setOpenEdit(false)
//   }

//   function renderContent() {
//     if (type === "vehicle") {
//       const vehicle = data as VehicleData

//       return (
//         <>
//           <h3 className="text-lg font-semibold text-gray-900">
//             {vehicle.brand} {vehicle.model}
//           </h3>

//           <p className="text-sm text-gray-500 mt-1">
//             {vehicle.licensePlate}
//           </p>

//           <div className="flex gap-2 mt-3 flex-wrap">
//             <Tag>{vehicle.color}</Tag>
//             <Tag>
//               {vehicle.manufactureYear}
//             </Tag>
//           </div>
//         </>
//       )
//     }

//     if (type === "property") {
//       const property = data as PropertyData

//       return (
//         <>
//           <h3 className="text-lg font-semibold text-gray-900">
//             {property.name}
//           </h3>

//           <p className="text-sm text-gray-500 mt-1">
//             {property.type}
//           </p>

//           <div className="flex gap-2 mt-3 flex-wrap">
//             <Tag>{property.totalCapacity} vagas</Tag>
//             <Tag>ID {property.zipCode}</Tag>
//           </div>
//         </>
//       )
//     }

//     const spot = data as SpotData

//     return (
//       <>
//         <h3 className="text-lg font-semibold text-gray-900">
//           Vaga {spot.identifier}
//         </h3>

//         <p className="text-sm text-gray-500 mt-1">
//           {spot.operatingHours}
//         </p>

//         <div className="flex gap-2 mt-3 flex-wrap">
//           <Tag>{spot.status}</Tag>
//           <Tag>{spot.isCovered ? "Coberta" : "Descoberta"}</Tag>
//         </div>
//       </>
//     )
//   }

//   function renderPopup() {
//     if (type === "vehicle") {
//       console.log(`vehicle data:`, data)
//       return (
//         <EditCard
//           type="vehicle"
//           onSubmit={(e, data:any) => {handleSubmit(e, `vehicles/${data.id}`)}}
//           defaultValues={data}
//           hasBlur={true}
//         />
//       )
//     }

//     if (type === "property") {
//       return (
//         <EditCard
//           type="property"
//           onSubmit={(e, data:any) => {handleSubmit(e, `properties/${data.id}`)}}
//           defaultValues={data}
//           hasBlur={true}
//         />
//       )
//     }

//     if (type === "spot") {
//       return (
//         <EditCard
//           type="spot"
//           onSubmit={(e, data:any) => {handleSubmit(e, `spots/properties/${localStorage.getItem('userId')}/spots/${data.id}`)}}
//           defaultValues={data}
//           hasBlur={true}
//         />
//       )
//     }

//     return null
//   }

//   return (
//     <>
//       {/* CARD */}
//       <div
//         className="
//           border border-gray-200
//           rounded-2xl
//           p-5
//           bg-white
//           shadow-sm
//           hover:shadow-md
//           transition
//         "
//       >
//         <div className="flex items-start justify-between gap-4">

//           <div className="flex-1">
//             {renderContent()}
//           </div>

//           <button
//             onClick={() => setOpenEdit(true)}
//             className="
//               px-4 py-2
//               rounded-xl
//               text-sm
//               font-medium
//               bg-gray-900
//               text-white
//               hover:bg-black
//               transition
//               shrink-0
//             "
//           >
//             Editar
//           </button>

//         </div>
//       </div>

//       {/* POPUP */}
//       <BlurOverlay
//         show={openEdit}
//         onClick={() => setOpenEdit(false)}
//       />

//       {openEdit && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//           <div className="relative w-full max-w-lg">

//             {renderPopup()}

//             <button
//               onClick={() => setOpenEdit(false)}
//               className="
//                 absolute -top-3 -right-3
//                 w-9 h-9
//                 rounded-full
//                 bg-white
//                 border border-gray-200
//                 shadow-md
//                 hover:bg-gray-100
//               "
//             >
//               ✕
//             </button>

//           </div>
//         </div>
//       )}
//     </>
//   )
// }

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        px-3 py-1
        rounded-full
        text-xs
        bg-gray-100
        text-gray-700
      "
    >
      {children}
    </span>
  );
}
