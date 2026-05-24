import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
import { changeBookingSolicitationStatus } from "@/services/booking.service";

const handleSolicitation = async (
  id: number,
  mode: "approve" | "reject" | "cancel",
) => {
  const res = await changeBookingSolicitationStatus(id, mode);

  if (res) {
    console.log(
      `This solicitation has been ${mode}. The following data is from api (which actually is only a boolean at the moment)`,
    );
    console.log(res);
    return true;
  }
  return false;
};

export function mapSolicitationFrames(d: any) {
  return (
    <section
      key={`booking_solicitation_${d.id}`}
      id={`booking_solicitation_${d.id}`}
    >
      <ConfirmationEntityFrame
        title={d.spot.identifier}
        description={`Código: ${d.code} Solicitante: ${d?.user?.person?.name || "Desconhecido"}`}
        onConfirm={async (e) => {
          const res = await handleSolicitation(d.id, "approve");
          if (res) e.currentTarget.style.display = "none";
        }}
        onCancel={async (e) => {
          const res = await handleSolicitation(d.id, "reject");
          if (res) console.log(e);
        }}
      />
    </section>
  );
}

export function mapNextBookingCards(d: any) {
  return (
    <EntityCard
      key={`next_booking_${d.id}`}
      title={d.spot.identifier}
      description={`Data: ${d.datePeriod.start.toLocaleDateString()}, Status: ${d.status}`}
      redirectTo={""}
    />
  );
}

export function mapLatestBookingCards(d: any, window: any) {
  // export function mapLatestBookingCards(d: any) {
  return (
    <LatestBookingCard
      id={d.id}
      identifier={d.spot.identifier}
      datePeriod={d.datePeriod}
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
