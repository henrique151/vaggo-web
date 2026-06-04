import { useActionState } from "react";

export default function useForm(action, initialState) {
  const [state, dispatchAction, pending] = useActionState(action, initialState);

  return [state, dispatchAction, pending];
}
