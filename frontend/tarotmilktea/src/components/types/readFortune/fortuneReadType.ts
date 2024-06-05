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