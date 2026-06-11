import ControllerStatus from "@/classes/controller/ControllerStatus";
// import {ControllerStatus} from "@classes";
import { useActionState, useEffect, useState } from "react";

export default function useForm(
  action,
  formInitialState?,
): [
  state: ControllerStatus,
  dispatchAction: CallableFunction,
  pending: boolean,
] {
  const initialState = formInitialState ?? new ControllerStatus({});
  const [state, dispatchAction, pending] = useActionState(action, initialState);
  const [controller, setController] = useState(state);

  useEffect(() => {
    // console.log("from useForm");
    setController(ControllerStatus.fromObject(state));
    // console.log(controller);
  }, [state]);
  // console.log(controller);
  return [controller, dispatchAction, pending];
}
