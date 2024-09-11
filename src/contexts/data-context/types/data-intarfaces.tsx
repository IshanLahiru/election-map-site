export interface Division {
  divisionId: string;
  divisionName: string;
}

export interface Province {
  provinceId: string;
  provinceName: string;
}

export interface Party {
  partyCode: string;
  partyName: string;
  candidate: string;
  image: string;
  symbol: string;
  color: string;
}

export interface DataContextType {
  divisionArray: Division[];
  provinceArray: Province[];
  partyArray: Party[];
  divisionResultArray: ElectionResult[];
  provinceResultArray: ElectionResult[];
  allIslandResult: ElectionResult | undefined;
  divisionColorArray: ColorData[];
  provinceColorArray: ColorData[];
}

export interface PartyResult {
  party_code: string;
  votes: number;
  percentage: string;
  party_name: string;
  candidate: string;
}

export interface Summary {
  valid: number;
  rejected: number;
  polled: number;
  electors: number;
  percent_valid: string;
  percent_rejected: string;
  percent_polled: string;
}

export interface ElectionResult {
  timestamp: string;
  level: string;
  ed_code: string;
  ed_name: string;
  pd_code: string;
  pd_name: string;
  by_party: PartyResult[];
  summary: Summary;
  type: string;
  sequence_number: string;
}

export interface ColorData {
  id: string;
  color: string;
}
