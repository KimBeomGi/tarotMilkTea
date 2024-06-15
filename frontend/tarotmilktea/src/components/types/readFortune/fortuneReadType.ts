export interface FortuneReadDataType {
  "fortuneType" : {
    "today" : FRDTType
    "love" : FRDTType
    "money" : FRDTType
    "health" : FRDTType
    "study" : FRDTType
    "work" : FRDTType
    "year" : FRDTType
  }
}

interface FRDTType{
  "name": string
  "kinds": ((string | number)[])[]
}

export interface GeminiAnsewrType {
  "greeting" : string
  "past" : string
  "present" : string
  "future" : string
  "advice" : string
  "conclusion" : string
}

export interface SaveTarotResultType{
  "tmt_token" : string
  "geminiAnswer" : GeminiAnsewrType
  "selectedCards" : number[]
  "selectedCardsName" : string[]
  "subject" : string
  "consulValue" : string
}

export interface tarotResultDataListType{
  "save_date": string
  "save_time": string
  "consulValue" : string
  "id" : number
  "selected_cards" : number[]
  "subject" : string
}

export interface GetTarotResultDetailDataType{
  "tarotResultId":number
  "token" :string
}

export interface TarotResultType{
  "save_date":string
  "save_time":string
  "greeting":string
  "past":string
  "present":string
  "future":string
  "advice":string
  "conclusion":string
  "selected_cards":number[]
  "selected_cards_name":string[]
  "subject":string
  "consulValue":string
}