export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

export class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next = (): number => this.seed ? ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random()

  nextInt = (min: number, max: number): number => Math.floor(this.next() * (max - min + 1) + min)
}