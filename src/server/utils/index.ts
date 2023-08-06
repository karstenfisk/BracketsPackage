import { SingleMatch, MatchesByRound } from "../types/index";

// Finds a match in the matches array that matches the round and gameNumber
export const findMatch = (
  matches: SingleMatch[],
  round: number,
  gameNumber: number
): SingleMatch | undefined => {
  for (const match of matches) {
    if (match.round === round && match.gameNumber === gameNumber) {
      return match;
    }
  }
  return undefined;
};

// Creates an object with keys of round1, round2, round3, etc. with empty arrays as values
export const initializeEmptyMatches = (rounds: number): MatchesByRound => {
  const emptyMatches: MatchesByRound = {};
  for (let i = 1; i <= rounds; i++) {
    emptyMatches[`round${i}`] = [];
  }
  return emptyMatches;
};

// Calculates the spacing between each match in a round for centered alignment.
export const spacingFormula = (round: number, totalRounds: number) => {
  if (round === 1) return 0.5;

  const x = 2;

  //the formula (2^(n-1) - 1) * x
  const baseSpacing = (Math.pow(2, round - 1) - 1) * x;

  const matches = Math.pow(2, totalRounds - 1);

  const spacing = matches / Math.pow(2, totalRounds - round + 1);

  return baseSpacing + spacing;
};

export const getHighlightColor = (
  match: SingleMatch,
  pickedMatch: SingleMatch
) => {
  if (match.winnerId !== null && match.gameStatus === "complete") {
    return match.winnerId === pickedMatch.winnerId ? "#98fb98" : "#CD5C5C";
  }
  return "";
};
