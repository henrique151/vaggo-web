import { Reservation } from "@classes";
import { ReservationController } from "@controllers";
import { BrowserService } from "@services";
import { useEffect, useState } from "react";

type hookReturnProps = [reservations: Reservation[], loaded: boolean];

export default function useGetReservations(): hookReturnProps;
export default function useGetReservations(
  fromProperties?: boolean,
): hookReturnProps {
  const [reservations, setReservations] = useState<Reservation[] | undefined>(
    undefined,
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const res = await ReservationController.get(BrowserService.getToken());

      const data = res.map((reservation) => {
        return new Reservation(reservation);
      });
      setReservations(data);
    };
    load();
  }, []);

  return [reservations, loaded];
}
