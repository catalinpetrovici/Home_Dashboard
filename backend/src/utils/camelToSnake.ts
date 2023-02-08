function camelToSnake<T = object>(object: object): T {
  const depositObject = {} as T;

  for (const [key, value] of Object.entries(object)) {
    const entry = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    depositObject[entry as keyof T] = value;
  }

  return depositObject;
}

function snakeToCamel<T = object>(object: object): T {
  const depositObject = {} as T;

  for (const [key, value] of Object.entries(object)) {
    const entry = key.replace(/[^a-zA-Z0-9]+(.)/g, (m, letter) =>
      letter.toUpperCase()
    );
    depositObject[entry as keyof T] = value;
  }

  depositObject;

  return depositObject;
}
function camelToSnakeArray(object: string[]): string[] {
  if (!Array.isArray(object)) return [];

  const depositArray = [] as string[];

  object.forEach((item) => {
    const parsedItem = item.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );
    depositArray.push(parsedItem);
  });

  return depositArray;
}
export { camelToSnake, snakeToCamel, camelToSnakeArray };
