import { useState, useEffect } from "react";

// {
// window: {component, show, hide},
//
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useWindow(windowComponent: any) {
  // return [window]
  const [window, setWindow] = useState(undefined);
  const [visible, setVisibility] = useState<boolean>(false);
  const component = windowComponent;
  const [returnProps, setReturnProps] = useState({
    component: undefined,
    show: () => {},
    hide: () => {},
  });

  // console.log("windowComponent");
  // console.log(component);

  function update() {
    setReturnProps({
      component: visible ? component : null,
      show: show,
      hide: hide,
    });
    console.log(returnProps);
  }

  function show() {
    console.log("showing window");
    setVisibility(true);
    // setWindow(component);
    update();
  }

  function hide() {
    console.log("hiding window");
    setVisibility(false);
    // setWindow(undefined);
    update();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReturnProps({
      component: visible ? component : undefined,
      show: show,
      hide: hide,
    });
  }, [visible]);

  // return [{ component: window, show: show, hide: hide }];
  return [returnProps];
}
