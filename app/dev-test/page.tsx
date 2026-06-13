"use client";

import { useEffect } from "react";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
// import Image from "@/public/preview.jpg";

import {
  UserController,
  VehicleController,
  PropertyController,
  ReservationController,
  ReviewController,
  ReportController,
} from "@controllers";
import { APIService, BrowserService, ReviewService } from "@services";
import { User } from "@classes";
import { FormUtils } from "@utils";
import { StaticImageData } from "next/image";

async function convertToFile(image: StaticImageData) {
  const url: string = image.src;
  const file = await fetch(url);
  const blob = await file.blob();
  return new File([blob], "preview.jpg", { type: "image/jpg" });

  return file;
}

export default function Page() {
  const [propertyHook, loaded, refresh] = useGetPropertyDetails(1, true);
  // const test = convertToFile(Image);
  // console.log(test);

  useEffect(() => {
    const token = BrowserService.getToken();
    const load = async () => {
      // const file = await convertToFile(Image);
      // console.log(file);
      // const res = await UserController.countBlocked(token);
      const res = await UserController.get(token, true);
      console.log(res);
    };
    load();
  }, []);

  // useEffect(() => {
  //   console.log(propertyHook);
  //   // refresh();
  // }, [propertyHook]);

  return (
    <>
      <div className="flex flex-col">
        {/*<button
          onClick={async () => {
            const data = FormUtils.toForm({
              rating: "4",
              comment: "sla nn achei muito bom nn",
            });

            const res = await ReviewController.edit(
              BrowserService.getToken(),
              data,
              1,
            );

            console.log(res);
          }}
        >
          Editar Avaliação (OK)
        </button>

        <button
          onClick={async () => {
            const data = FormUtils.toForm({
              rating: "4",
              comment: "sla nn achei muito bom nn",
            });

            const res = await ReviewController.deleteById(
              BrowserService.getToken(),
              1,
            );

            console.log(res);
          }}
        >
          Deletar Avaliação (OK)
        </button>

        <form
          action={async (form: FormData) => {
            const data = FormUtils.toForm({
              name: "Usuário legal",
              cpf: "12345178904",
              gender: "M",
              phone: "11983756968",
              birthDate: "1998-05-20",
              email: "guilherme6@email.com",
              password: "Password123!",
            });
            data.set("avatarUrl", form.get("avatarUrl"));

            const res = await UserController.register(
              // BrowserService.getToken(),
              data,
              // 1,
            );

            console.log(res);
          }}
        >
          <input type="file" name="avatarUrl" />
          <input
            type="submit"
            value={"Criar Usuário (OK. CONFIGURAR LIMITE ENVIO DE ARQUIVO)"}
          />
        </form>

        <button
          onClick={async () => {
            const data = FormUtils.toForm({
              brand: "Honda",
              model: "CB 500",
              color: "Preto",
              licensePlate: "BBA2B44",
              manufactureYear: "2023",
              type: "CARRO",
              size: "MEDIO",
            });

            const res = await VehicleController.register(
              BrowserService.getToken(),
              data,
            );

            console.log(res);
          }}
        >
          Criar Veículo (OK)
        </button>

        <form
          action={async (form: FormData) => {
            const data = FormUtils.toForm({
              name: "Casa legal",
              type: "Residencial",
              description: "Casa legal que tem coisas",
              totalCapacity: "10",
              street: "Rua das Amoras",
              number: "19",
              complement: "Casa 405",
              neighborhood: "Bairo das morangueiras",
              zipCode: "08050150",
            });
            // {"weekdays":127,"startTime":"08:00","endTime":"18:00"}
            data.set("images", form.get("images"));
            // data.set("isActive", String(true));
            const res = await PropertyController.register(
              BrowserService.getToken(),
              data,
            );

            console.log(res);
          }}
        >
          <input type="file" name="images" multiple />
          <button type="submit">Criar Propriedade (OK)</button>
        </form>

        <form
          action={async (form: FormData) => {
            const data = FormUtils.toForm({
              count: "1",
              price: "10",
              size: "12.5",
              isCovered: "true",
              prefix: "Vaga-",
              allowedVehicles: "19",
            });
            data.set(
              "availability",
              '{"weekdays":127,"startTime":"08:00","endTime":"18:00"}',
            );

            data.set("allowedVehicles", '["CARRO"]');

            data.set("images", form.get("images"));
            // data.set("isActive", String(true));
            const res = await PropertyController.generateSpots(
              BrowserService.getToken(),
              1,
              data,
            );

            console.log(res);
          }}
        >
          <input type="file" name="images" multiple />
          <button type="submit">Criar Vagas (OK)</button>
        </form>

        <button
          onClick={async () => {
            const data = {
              address: "São Paulo",
            };

            const res = await PropertyController.search(data);

            console.log(res);
          }}
        >
          Pesquisar propriedades (OK)
        </button>
      </div>
      <div className="h-5" />
      <div className="flex flex-col">
        <button
          onClick={async () => {
            const res = await PropertyController.updateSpotStatus(
              BrowserService.getToken(),
              2,
              "DISPONIVEL",
            );

            console.log(res);
          }}
        >
          Mudar Status Spot (OK)
        </button>

        <form
          action={async (form: FormData) => {
            const data = FormUtils.toForm({
              isCovered: "true",
              price: "100",
              size: "10",
              allowedVehicles: '["CARRO"]',
              availability:
                '{"weekdays":127,"startTime":"08:00","endTime":"18:00"}',
              identifier: "VAGO=",
            });

            // {"weekdays":127,"startTime":"08:00","endTime":"18:00"}
            data.set("image", form.get("image"));
            // data.set("isActive", String(true));
            const res = await PropertyController.editSpot(
              BrowserService.getToken(),
              form,
              1,
              2,
            );

            console.log(res);
          }}
        >
          <input type="file" name="image" />
          <button type="submit">Editar Vaga (OK)</button>
        </form>

        <button
          onClick={async () => {
            const res = await PropertyController.deleteSpot(
              BrowserService.getToken(),
              1,
              3,
            );

            console.log(res);
          }}
        >
          Deletar vaga (OK?)
        </button>*/}
        <div className="flex flex-col items-center">
          <h1>ADMIN</h1>
          <div className="h-5" />
          {/*<button>entity: get all ()</button>
          <button>entity: get by id ()</button>
          <div className="h-5" />*/}
          {/*<button>user: get all (OK)</button>
          <div className="h-5" />

          <button>vehicles: get all (OK)</button>
          <button>vehicles: get by id (OK)</button>
          <div className="h-5" />

          <button>properties: get all (OK)</button>
          <button>properties: get by id (OK)</button>
          <div className="h-5" />

          <button>spots: get all (OK)</button>
          <div className="h-5" />

          <button>reservations: get all (OK)</button>
          <button>reservations: get by id (OK)</button>
          <div className="h-5" />

          <button>reviews: get all (OK)</button>
          <div className="h-5" />

          <button>reports: get all (OK)</button>
          <button>reports: get by id (OK)</button>*/}
        </div>
      </div>
    </>
  );
}

// const user = await UserController.get(token);
// const vehicle = await VehicleController.get(token);
// const property = await PropertyController.get(token);
// const spots = await PropertyController.getSpots(token, 1);
// const reservations = await ReservationController.get(token);
// const reviews = await ReviewController.get(token);
// const reports = await ReportController.get(token);
// const obj = new User(user);
// console.log(obj);
// console.log(vehicle);
// console.log(property);
// console.log(spots);
// console.log("reservations");
// console.log(reservations);
// console.log("reviews");
// console.log(reviews);
// console.log("reports");
// console.log(reports);

// const user = await APIService.genericEditRequest(
//   token,
//   "admin/users",
//   1,
//   FormUtils.toForm({
//     name: "common user",
//     gender: "M",
//     phone: "11983756968",
//     birthDate: "1999-06-12",
//     email: "user@example.com",
//     password: "Password123!",
//     permissionLevel: "1",
//   }),
//   "json",
//   true,
//   // 1,
// );
// console.log("user");
// console.log(user);

// const vehicles = await APIService.genericEditRequest(
//   token,
//   "admin/vehicles",
//   1,
//   FormUtils.toForm({
//     brand: "Toyota",
//     model: "Corollers",
//     color: "Brancaço",
//     licensePlate: "ABCD1234",
//     manufactureYear: "2000",
//     type: "CARRO",
//     size: "PEQUENO",
//   }),
//   "json",
//   true,
//   // 1,
// );
// console.log("vehicles");
// console.log(vehicles);

// const properties = await APIService.genericEditRequest(
//   token,
//   "admin/properties",
//   1,
//   FormUtils.toForm({
//     name: "Laranjeiras Doces",
//     type: "Residencialista",
//     description: "Residência muito legal com laranjas",
//     totalCapacity: String(1000),
//     isActive: String(true),
//     street: "Rua das Amoras",
//     number: "64",
//     complement: "Pomar 14",
//     neighborhood: "Bairro das Pitangas",
//     zipCode: "37553099",
//     cityId: String(1),
//     // imagesToRemove: "[]", //must not be included if no image
//   }),
//   "json",
//   true,
//   // 1,
// );
// console.log("properties");
// console.log(properties);

// console.log("prop");
// console.log(prop);
// const vehicle = await APIService.genericGetRequest(
//   token,
//   "admin/vehicles",
//   // 1,
// );
// console.log("vehicle");
// console.log(vehicle);
// const reservations = await APIService.genericGetRequest(
//   token,
//   "admin/reservations",
//   // 1,
// );
// console.log("reservations");
// console.log(reservations);
// const reports = await APIService.genericGetRequest(
//   token,
//   "admin/reports",
//   // 1,
// );
// console.log("reports");
// console.log(reports);
// const users = await APIService.genericGetRequest(
//   token,
//   "admin/users",
//   // 1,
// );
// console.log("users");
// console.log(users);
// const spots = await APIService.genericGetRequest(
//   token,
//   "admin/spots",
//   // 1,
// );
// console.log("spots");
// console.log(spots);
// const reviews = await APIService.genericGetRequest(
//   token,
//   "admin/reviews",
//   // 1,
// );
// console.log("reviews");
// console.log(reviews);
