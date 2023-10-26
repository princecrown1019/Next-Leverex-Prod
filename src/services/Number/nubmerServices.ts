export const roundNumber = (value: number, spread: number, roundDown: boolean) => {
  const roundedPrice = Math.floor(value);

  return roundDown ? roundedPrice - (roundedPrice % spread) : roundedPrice + (spread - (roundedPrice % spread));
};
