import { DeepPartial } from "@/interfaces/types";

export type ImageClassInterface = Image;
export type ImageStructureInterface = DeepPartial<Image>;

interface Image {
  url: string;
  file: File;
}
