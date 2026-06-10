import { DeepPartial } from "@interfaces";

export type APIReturnClassInterface = APIReturnInterface;
export type APIReturnStructuralInterface = DeepPartial<APIReturnInterface>;

interface APIReturnInterface {
  success: boolean;
  message: string;
  data?: never;
  error?: string;
}
