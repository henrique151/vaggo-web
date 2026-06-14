import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
import { Reservation } from "@classes";
import { ReservationController } from "@controllers";
import { BrowserService } from "@services";
import { useState } from "react";

const handleSolicitation = async (
  id: number,
  mode: "approve" | "reject" | "cancel",
) => {
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
        <section id={`booking_solicitation_${reservation.id}`}>
          <ConfirmationEntityFrame
            title={reservation.info.spot.info.identifier}
            description={`Código: ${reservation.code} Solicitante: ${reservation?.info.user?.person?.name || "Desconhecido"
              }`}
            onConfirm={async () => {
              const res = await handleSolicitation(reservation.id, "approve");
              if (res) setVisible(false);
            }}
            onCancel={async () => {
              const res = await handleSolicitation(reservation.id, "reject");
              if (res) setVisible(false);
            }}
          />
        </section>
      )}
    </section>
  );
}

export function mapSolicitationFrames(d: Reservation) {
  return <SolicitationFrame reservation={d} />;
}

export function mapNextBookingCards(d: Reservation) {
  const propertyId = (d.info.spot as any)?.property?.id;
  const redirectTo = propertyId ? `/spot/${propertyId}` : "";
  return (
    <EntityCard
      key={`next_booking_${d.id}`}
      title={d.info.spot.info.identifier}
      description={`Data: ${d.info.date.period.start.toLocaleDateString()}, Status: ${d.status}`}
      redirectTo={redirectTo}
    />
  );
}

// BUG FIX: interface clara para o objeto window recebido pelo mapper
interface ReviewWindowHandle {
  windowSetter: (open: boolean) => void;
  reservationSetter: (id: number) => void;
}

export function mapLatestBookingCards(
  d: Reservation,
  window: ReviewWindowHandle,
) {
  const propertyId = (d.info.spot as any)?.property?.id;
  const redirectTo = propertyId ? `/spot/${propertyId}` : "";
  return (
    <LatestBookingCard
      key={`latest_booking_${d.id}`}
      id={d.id}
      identifier={d.info.spot.info.identifier}
      datePeriod={d.info.date.period}
      status={d.status}
      redirectTo={redirectTo}
      window={window}
    />
  );
}

interface LatestBookingCardProps {
  id: number;
  identifier: string;
  datePeriod: { start: Date; end?: Date };
  status: string;
  window: ReviewWindowHandle;
  redirectTo: string;
}

function LatestBookingCard({
  id,
  identifier,
  datePeriod,
  status,
  window,
  redirectTo,
}: LatestBookingCardProps) {
  return (
    <EntityCard
      key={`latest_booking_${id}`}
      title={identifier}
      description={`Data: ${datePeriod.start.toLocaleDateString()}, Status: ${status}`}
      redirectTo={redirectTo ?? ""}
    >
      {/* BUG FIX: botão Avaliar só aparece em reservas APROVADAS,
          e usa os setters corretamente */}
      {status === "APROVADA" && (
        <button
          onClick={() => {
            // Verifica se os setters existem antes de chamar
            if (typeof window?.windowSetter === "function") {
              window.windowSetter(true);
            }
            if (typeof window?.reservationSetter === "function") {
              window.reservationSetter(id);
            }
          }}
          className="text-sm text-primary font-medium hover:underline"
        >
          ✏️ Avaliar
        </button>
      )}
    </EntityCard>
  );
}