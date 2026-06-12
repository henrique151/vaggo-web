"use client";

import { useEffect } from "react";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
import Image from "@/public/preview.jpg";

import {
  UserController,
  VehicleController,
  PropertyController,
  ReservationController,
  ReviewController,
  ReportController,
} from "@controllers";
import { BrowserService, ReviewService } from "@services";
import { User } from "@classes";
import { FormUtils } from "@utils";

export default function Page() {
  const [propertyHook, loaded, refresh] = useGetPropertyDetails(1, true);

  useEffect(() => {
    const token = BrowserService.getToken();
    const load = async () => {
      const user = await UserController.get(token);
      const vehicle = await VehicleController.get(token);
      const property = await PropertyController.get(token);
      const spots = await PropertyController.getSpots(token, 1);
      const reservations = await ReservationController.get(token);
      const reviews = await ReviewController.get(token);
      const reports = await ReportController.get(token);

      const obj = new User(user);
      console.log(obj);
      console.log(vehicle);
      console.log(property);
      console.log(spots);
      console.log("reservations");
      console.log(reservations);
      console.log("reviews");
      console.log(reviews);
      console.log("reports");
      console.log(reports);
    };
    load();
  }, []);

  useEffect(() => {
    console.log(propertyHook);
    // refresh();
  }, [propertyHook]);

  return (
    <>
      <div className="flex flex-col">
        <button
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
        </button>
      </div>
    </>
  );
}
