export function toObject(form: FormData): object {
  return Object.fromEntries(form.entries());
}

export function toForm(data: Record<string, string | Blob | number>): FormData {
  const form = new FormData();

  for (const [key, value] of Object.entries(data)) {
    let parsedValue = undefined;

    switch (typeof value) {
      case "number":
        parsedValue = String(value);
        break;
    }

    form.set(key, parsedValue ?? value);
  }

  return form;
}
