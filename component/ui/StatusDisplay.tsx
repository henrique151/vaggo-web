/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes } from "react";

type stateColors = "green" | "yellow" | "red" | "gray";

const statusModes: Record<stateColors, string> = {
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  yellow: "",
  gray: "",
};

export default function StatusBadge({
  conditionValue,
  conditionTable,
  statusLabelTable,
  defaultValue,
}: {
  conditionValue: any;
  conditionTable: Record<any, stateColors>;
  statusLabelTable: Partial<Record<stateColors, string>>;
  defaultValue: stateColors;
}) {
  return (
    <span
      className={`
    px-3 py-1 rounded-full text-xs font-medium
    ${statusModes[conditionTable[conditionValue]] || statusModes[defaultValue]}
  `}
    >
      •{" "}
      {statusLabelTable[conditionTable[conditionValue]] ||
        statusLabelTable[defaultValue]}
    </span>
  );
}

// function Skok() {
//   return <StatusBadge></StatusBadge>;
// }
