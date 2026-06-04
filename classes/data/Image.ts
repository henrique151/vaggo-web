export class Image {
  public url: string;
  constructor(url: string) {
    this.url = url;
  }

  public static createFromList(list: string[]): Image[] {
    const images: Image[] = [];

    for (const url of list) {
      console.log(url);
      const image = new Image(url);
      console.log(image);

      images.push(image);
    }

    return images;
  }
}
