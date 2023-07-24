import { Dispatch, SetStateAction } from "react";

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
}

// Props for single pairing component.
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

// Props for SinglePicks component.
export interface SinglePicksProps {
  matches: SingleMatch[];
  rounds: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  matchColor?: string;
  rounded?: boolean;
  onPicksUpdate?: OnPicksUpdate;
}

export interface PickMatchesByRound {
  [round: string]: PredictedMatch[];
}

export interface Tournament {
  matches: PickMatchesByRound;
  winner?: Team;
}

// MatchInfo State

// Interface that indicates where winner goes to.
export interface AdvanceTo {
  gameNumber: number;
  team: "home" | "away";
  round: number;
}
