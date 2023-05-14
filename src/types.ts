export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Col = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface Square {
  row: Row;
  col: Col;
}
