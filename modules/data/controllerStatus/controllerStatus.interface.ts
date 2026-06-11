export type ControllerStatusClassInterface = ControllerStatus;
export type ControllerStatusStructureInterface = Partial<ControllerStatus>;

export type ControllerFieldStatusClassInterface = ControllerFieldStatus;

export interface ControllerStatus {
  success: boolean;
  message: string; //possibly more for internal messages or smth, check later if it get unused or not
  pending: boolean;
  error?: ControllerError; //global message for forms or anything else
  fields: Record<string, ControllerFieldStatus>; //field properties and individual error messages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface ControllerError {
  message?: string;
}

interface ControllerFieldStatus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  error?: ControllerError;
}
