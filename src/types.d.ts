import { Dispatch, SetStateAction } from "react";

// Interface for teams present in matches.
export interface Team {
  teamId: number;
  teamName: string;
}

export interface SingleMatch {
  homeTeamId: number;
  awayTeamId: number;
  gameId: number;
  gameStatus: string;
  winnerId: number | null;
  round: number;
  gameNumber: number;
  advanceTo: number;
  year?: number;
  eventId: number;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
}

export interface PredictedMatch {
  homeTeamId?: number;
  awayTeamId?: number;
  round: number;
  gameNumber: number;
  advanceTo: number;
  advancingTeam?: "home" | "away";
  homeTeam?: Team;
  awayTeam?: Team;
  selectedWinnerId?: number;
}

export interface PickablePairingProps {
  match: PredictedMatch;
  rounds: number;
  gameNumber: number;
  round: number;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  showScores?: boolean;
  selectedColor?: string;
  pickMatches: Tournament;
  setPickMatches: Dispatch<SetStateAction<Tournament>>;
}

type OnPicksUpdate = (updatedPicks: Tournament) => void;

export interface SinglePicksProps {
  matches: SingleMatch[];
  rounds: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  previousPicks?: AlreadyPicked;
  onPicksUpdate?: OnPicksUpdate;
}

export interface AlreadyPicked {
  matches: PickMatchesByRound;
  winner?: Team;
}

export interface PickMatchesByRound {
  [round: string]: PredictedMatch[];
}

export interface Tournament {
  matches: PickMatchesByRound;
  winner?: Team;
}

export interface AdvanceTo {
  gameNumber: number;
  team: "home" | "away";
  round: number;
}

export interface Event {
  id: number;
  name: string;
  sport: string;
  league: string;
  rounds: number;
  year?: number;
  startDate?: string;
  [customPropertyName: string]: SingleMatch[] | any;
}

export interface NullMatch {
  round: number;
  gameNumber: number;
}

export interface SingleBracketProps {
  matches: SingleMatch[];
  rounds: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  showScores?: boolean;
  rounded?: boolean;
}

export interface SinglePairingProps {
  match: SingleMatch | NullMatch;
  gameNumber: number;
  round: number;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  showScores?: boolean;
}

export interface MatchesByRound {
  [round: string]: (SingleMatch | NullMatch)[];
}

export interface MLBTeamDetails {
  teamId: number;
  teamName: string;
  division: "AL" | "NL";
  seed: number;
}

export interface MLBSeriesDetails {
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
  team1?: MLBTeamDetails;
  team2?: MLBTeamDetails;
}

export interface MLBGameDetails {
  gameNumber: number;
  team1Score: number;
  team2Score: number;
  team1Id: number;
  team2Id: number;
  final: boolean;
  winner: number | null;
}

export interface MLBLeagueEvent {
  name: string;
  sport: string;
  league: string;
  rounds: number;
  year: number;
  startDate: string;
}

export interface MLBPlayerPicks {
  memberId: number;
  eventId: number;
  round: "ALW" | "NLW" | "ALDS" | "NLDS" | "ALCS" | "NLCS" | "WS";
  gameNumber: 1 | 2;
  winnerId: number;
  winIn: 2 | 3 | 4 | 5 | 6 | 7;
}

export interface MLBLeagueScoring {
  leagueId: number;
  round1: number;
  round2: number;
  round3: number;
  round4: number;
}

export interface MLBLeaderboardStats {
  memberId: number;
  round1: number;
  round2: number;
  round3: number;
  round4: number;
  totalScore: number;
}

export interface MLBBracketProps {
  bracketData: MLBBracketData;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  picks?: MLBBracketData;
  showScores?: boolean;
}

export interface MLBLeagueProps {
  type: "NL" | "AL";
  data: MLBBracketData;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  picks?: MLBBracketData;
  showScores?: boolean;
}

export interface MLBPairingProps {
  series: MLBSeriesDetails;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  pickSeries?: MLBSeriesDetails;
  showScores?: boolean;
}

export interface MLBBracketData {
  ALW: Record<1 | 2, MLBSeriesDetails>;
  NLW: Record<1 | 2, MLBSeriesDetails>;
  ALDS: Record<1 | 2, MLBSeriesDetails>;
  NLDS: Record<1 | 2, MLBSeriesDetails>;
  ALCS: MLBSeriesDetails;
  NLCS: MLBSeriesDetails;
  WS: MLBSeriesDetails;
}

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
