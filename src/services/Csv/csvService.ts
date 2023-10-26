const SEPARATOR = ',';

export const prepareForCsv = (header: string[], body: string[][]) => {
  const formattedBody = body.map((row) => row.map((cell) => JSON.stringify(cell)).join(SEPARATOR));

  return `${header.join(SEPARATOR)}\n${formattedBody.join('\n')}`;
};
