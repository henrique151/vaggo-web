export interface ImageInterface {
  url: string;
  file: File;
}

export default class Image implements Partial<ImageInterface> {
  url?: string;
  file?: File;

  constructor(i: Partial<ImageInterface>) {
    this.url = i.url;
    this.file = i.file;
  }
}