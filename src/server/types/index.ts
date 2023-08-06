// Interface for teams present in matches.
export interface Team {
  teamId: number;
  teamName: string;
}

// Single match interface containing relevant and useful information for the match.
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

// Event interface containing relevant and useful information for the event.
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

// Dummy match for pairings that are not set yet.
export interface NullMatch {
  round: number;
  gameNumber: number;
}

// Props for single bracket component.
export interface SingleBracketProps {
  matches: SingleMatch[];
  rounds: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  showScores?: boolean;
  rounded?: boolean;
  picks?: SingleMatch[];
}

// Props for single pairing component.
export interface SinglePairingProps {
  match: SingleMatch | NullMatch;
  gameNumber: number;
  round: number;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  showScores?: boolean;
  pickedMatch?: SingleMatch;
}

// interface containing round number and array of matches
export interface MatchesByRound {
  [round: string]: (SingleMatch | NullMatch)[];
}
