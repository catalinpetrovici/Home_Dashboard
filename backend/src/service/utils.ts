type ClientAndTopic = {
  family: string;
  client: string;
  topic: string;
};

export function separateFamilyClientAndTopic(string: string): ClientAndTopic {
  const stringArray = string.split('/');

  return {
    family: stringArray[0],
    client: stringArray[1],
    topic: stringArray.slice(1, stringArray.length).join('/'),
  };
}
