import { Dispatch, SetStateAction } from "react";

export interface MLBTeam {
  teamId: number;
  teamName: string;
  division: "AL" | "NL";
  seed: number;
}

export interface MLBPickSeries {
  round: "ALW" | "NLW" | "ALDS" | "NLDS" | "ALCS" | "NLCS" | "WS";
  title: string;
  gameNumber: 1 | 2;
  bestOf: 3 | 5 | 7;
  team1Score?: number;
  team2Score?: number;
  team1Id?: number;
  team2Id?: number;
  final: boolean;
  winner: number | null;
  winIn?: 2 | 3 | 4 | 5 | 6 | 7;
  team1?: MLBTeam;
  team2?: MLBTeam;
}

export interface MLBPickGame {
  gameNumber: number;
  team1Score: number;
  team2Score: number;
  team1Id: number;
  team2Id: number;
  final: boolean;
  winner: number | null;
}

export interface MLBPickEvent {
  name: string;
  sport: string;
  league: string;
  rounds: number;
  year: number;
  startDate: string;
}

export interface MLBPickData {
  ALW: Record<1 | 2, MLBPickSeries>;
  NLW: Record<1 | 2, MLBPickSeries>;
  ALDS: Record<1 | 2, MLBPickSeries>;
  NLDS: Record<1 | 2, MLBPickSeries>;
  ALCS: MLBPickSeries;
  NLCS: MLBPickSeries;
  WS: MLBPickSeries;
}

type MLBNextRoundInfo = [
  "ALW" | "NLW" | "ALDS" | "NLDS" | "NLCS" | "ALCS" | "WS",
  1 | 2 | null,
  "team1Id" | "team2Id",
  "team1" | "team2"
];

type MLBKeys = 1 | 2;

export interface MLBNextRoundMapping {
  ALW: { [key in MLBKeys]: MLBNextRoundInfo };
  NLW: { [key in MLBKeys]: MLBNextRoundInfo };
  ALDS: { [key in MLBKeys]: MLBNextRoundInfo };
  NLDS: { [key in MLBKeys]: MLBNextRoundInfo };
  ALCS: MLBNextRoundInfo;
  NLCS: MLBNextRoundInfo;
}

type OnUpdate = (updatedPicks: MLBPickData) => void;

export interface MLBPickProps {
  bracketData: MLBPickData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  onUpdate?: OnUpdate;
}

export interface MLBPickPairingProps {
  series: MLBPickSeries;
  setData: Dispatch<SetStateAction<MLBPickData>>;
  data: MLBPickData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
}

export interface MLBPickLeagueProps {
  type: "NL" | "AL";
  setData: Dispatch<SetStateAction<MLBPickData>>;
  data: MLBPickData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
}
