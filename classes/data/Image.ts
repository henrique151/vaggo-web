export class Image {
  constructor(public url: string) {}

  public static createFromList(list: string[]): Image[] {
    const images: Image[] = [];

    for (const image of list) {
      images.push(new Image(image));
    }

    return images;
  }
}
