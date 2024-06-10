export interface KakaoParamsType {
    [key: string]: string; // 인덱스 시그니처 추가
    "client_id": string;
    "redirect_uri": string;
    "response_type": string;
  }
export interface GithubParamsType {
    [key: string]: string; // 인덱스 시그니처 추가
    "client_id": string;
    "redirect_uri": string;
    "scope": string;
  }