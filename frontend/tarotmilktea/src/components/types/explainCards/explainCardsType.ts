export interface TarotNumbersType {
  cards: {
    [key: string]: string;
  };
}

export interface TarotExplainDataType {
  card_name : string
  card_num : number
  is_major: boolean;
  distinguish: number;
  card_means :  string[]
  card_r_means : string[]
}