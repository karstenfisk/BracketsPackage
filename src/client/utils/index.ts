import {
  SingleMatch,
  AdvanceTo,
  PickMatchesByRound,
  PredictedMatch,
  Team,
  Tournament,
} from "../types/index";

export const emptyPickMatches = (rounds: number): PickMatchesByRound => {
  const picks: PickMatchesByRound = {};

  let gameNumberCounter = 0;

  for (let i = 1; i <= rounds; i++) {
    picks[`round${i}`] = [];
    const matchesInThisRound = Math.pow(2, rounds - i);
    for (let j = 1; j <= matchesInThisRound; j++) {
      gameNumberCounter++; // Increment the game number counter for each match
      const nextMatchInfo = calculateNextMatch(rounds, gameNumberCounter);
      const pickMatch: PredictedMatch = {
        round: i,
        gameNumber: gameNumberCounter,
        advanceTo: nextMatchInfo.gameNumber,
        advancingTeam: nextMatchInfo.team,
      };
      picks[`round${i}`].push(pickMatch);
    }
  }

  return picks;
};

// Function to calculate which match winner will advance to.
export const calculateNextMatch = (
  rounds: number,
  gameNumber: number
): AdvanceTo => {
  const totalGames = Math.pow(2, rounds) - 1;

  if (gameNumber > totalGames) {
    throw new Error("Invalid game number");
  }

  const offset = Math.pow(2, rounds - 1);
  const advancingTeam = gameNumber % 2 === 1 ? "home" : "away";

  if (gameNumber <= offset) {
    return {
      round: rounds,
      gameNumber: offset + Math.ceil(gameNumber / 2),
      team: advancingTeam,
    };
  }

  return {
    round: rounds - 1,
    gameNumber: Math.ceil(gameNumber / 2) + offset,
    team: advancingTeam,
  };
};

// Function that will take a SingleMatch object and return it as a PredictedMatch object.
export const convertToPredictedMatch = (match: SingleMatch): PredictedMatch => {
  const advancingTeam = match.gameNumber % 2 === 0 ? "away" : "home";
  return {
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
    round: match.round,
    gameNumber: match.gameNumber,
    advanceTo: match.advanceTo,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    advancingTeam: advancingTeam,
  };
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

// Function that will take in a PickMatchesByRound object, the current gameNumber, and a teamId then remove that team from all selections in later rounds.
export const removeTeamFromLaterRounds = (
  bracket: Tournament,
  gameNumber: number,
  teamId: number
): Tournament => {
  let advanceTo: number | null = null;

  const totalGames = Math.pow(2, Object.keys(bracket.matches).length) - 1;

  if (gameNumber === totalGames) {
    return {
      matches: bracket.matches,
      winner: undefined,
    };
  }

  // Find the game and determine where the team would advance to.
  for (let roundKey in bracket.matches) {
    const round = bracket.matches[roundKey];
    for (let game of round) {
      if (game.gameNumber === gameNumber) {
        advanceTo = game.advanceTo;
        break;
      }
    }
    if (advanceTo !== null) break;
  }

  if (advanceTo !== null) {
    // Remove the team from subsequent games.
    for (let roundKey in bracket.matches) {
      const round = bracket.matches[roundKey];
      for (let game of round) {
        if (game.gameNumber >= advanceTo) {
          // Check and reset home team if necessary.
          if (game.homeTeamId === teamId) {
            game.homeTeamId = undefined;
            game.homeTeam = undefined;
          }

          // Check and reset away team if necessary.
          if (game.awayTeamId === teamId) {
            game.awayTeamId = undefined;
            game.awayTeam = undefined;
          }
        }
      }
    }
  }
  return bracket;
};

// Advance team to next round
export const advanceTeam = (
  bracket: Tournament,
  advanceTo: number,
  advanceTeam: "home" | "away" | undefined,
  winner: Team
): Tournament => {
  const immutableBracket = { ...bracket };
  const rounds = Object.keys(immutableBracket.matches).length;

  const winnerGameNum = Math.pow(2, rounds);

  if (advanceTo === winnerGameNum) {
    return {
      matches: immutableBracket.matches,
      winner: winner,
    };
  }

  for (const roundKey in immutableBracket.matches) {
    for (let game of immutableBracket.matches[roundKey]) {
      if (game.gameNumber === advanceTo) {
        if (advanceTeam === "home") {
          game.homeTeam = winner;
          game.homeTeamId = winner.teamId;
        } else if (advanceTeam === "away") {
          game.awayTeam = winner;
          game.awayTeamId = winner.teamId;
        }
      }
    }
  }

  return immutableBracket;
};
