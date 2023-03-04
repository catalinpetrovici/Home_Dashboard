type ClientAndTopic = {
  client: string;
  topic: string;
};

export function separateClientAndTopic(string: string): ClientAndTopic {
  const stringArray = string.split('/');

  return {
    client: stringArray[0],
    topic: stringArray.slice(1, stringArray.length - 1).join('/'),
  };
}
