/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
