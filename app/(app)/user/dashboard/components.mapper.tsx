import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
import { changeBookingSolicitationStatus } from "@/services/booking.service";
import { Reservation } from "@classes";
import { ReservationController } from "@controllers";
import { BrowserService, ReservationService } from "@services";
import { useState } from "react";

const handleSolicitation = async (
  id: number,
  mode: "approve" | "reject" | "cancel",
) => {
  // const res = await changeBookingSolicitationStatus(id, mode);
  const res = await ReservationController.changeApprovalStatus(
    BrowserService.getToken(),
    id,
    mode,
  );

  if (res) {
    console.log(
      `This solicitation has been ${mode}. The following data is from api (which actually is only a boolean at the moment)`,
    );
    console.log(res);
    return true;
  }
  return false;
};

function SolicitationFrame({ reservation }: { reservation: Reservation }) {
  const [visible, setVisible] = useState(true);
  return (
    <section>
      {visible && (
        <>
          <section id={`booking_solicitation_${reservation.id}`}>
            <ConfirmationEntityFrame
              title={reservation.info.spot.info.identifier}
              description={`Código: ${reservation.code} Solicitante: ${reservation?.info.user?.person?.name || "Desconhecido"}`}
              onConfirm={async (e) => {
                const res = await handleSolicitation(reservation.id, "approve");
                if (res) setVisible(false);
              }}
              onCancel={async (e) => {
                const res = await handleSolicitation(reservation.id, "reject");
                // if (res) console.log(e);
                if (res) setVisible(false);
              }}
            />
          </section>
        </>
      )}
    </section>
  );
}

export function mapSolicitationFrames(d: Reservation) {
  return <SolicitationFrame reservation={d} />;
}

export function mapNextBookingCards(d: Reservation) {
  return (
    <EntityCard
      key={`next_booking_${d.id}`}
      title={d.info.spot.info.identifier}
      description={`Data: ${d.info.date.period.start.toLocaleDateString()}, Status: ${d.status}`}
      redirectTo={""}
    />
  );
}

export function mapLatestBookingCards(d: Reservation, window: any) {
  // export function mapLatestBookingCards(d: any) {
  return (
    <LatestBookingCard
      id={d.id}
      identifier={d.info.spot.info.identifier}
      datePeriod={d.info.date.period}
      status={d.status}
      window={window}
    />
  );
}

function LatestBookingCard({ id, identifier, datePeriod, status, window }) {
  return (
    <>
      <EntityCard
        key={`next_booking_${id}`}
        title={identifier}
        description={`Data: ${datePeriod.start.toLocaleDateString()}, Status: ${status}`}
        redirectTo={""}
      >
        {status === "APROVADA" && (
          <button
            onClick={() => {
              window.windowSetter(true);
              window.reservationSetter(id);
            }}
          >
            Avaliar
          </button>
        )}
      </EntityCard>
    </>
  );
}
