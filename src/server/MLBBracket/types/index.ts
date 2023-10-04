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
  picks?: MLBPicks;
  showScores?: boolean;
}

export interface MLBLeagueProps {
  type: "NL" | "AL";
  data: MLBBracketData;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  picks?: MLBPicks;
  showScores?: boolean;
}

export interface MLBPairingProps {
  series: MLBSeriesDetails;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  pickSeries?: MLBPickSeriesDetails;
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

export interface MLBPickSeriesDetails {
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
  winIn?: 2 | 3 | 4 | 5 | 6 | 7;
}
interface MLBPicks {
  ALW: Record<1 | 2, MLBPickSeriesDetails>;
  NLW: Record<1 | 2, MLBPickSeriesDetails>;
  ALDS: Record<1 | 2, MLBPickSeriesDetails>;
  NLDS: Record<1 | 2, MLBPickSeriesDetails>;
  ALCS: MLBPickSeriesDetails;
  NLCS: MLBPickSeriesDetails;
  WS: MLBPickSeriesDetails;
}
