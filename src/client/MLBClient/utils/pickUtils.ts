import type {
  MLBPickData,
  MLBPickSeries,
  MLBNextRoundMapping,
} from "../types/pickTypes";

export const verifyBracket = (bracket: MLBPickData): boolean => {
  const ALW = bracket.ALW;
  const NLW = bracket.NLW;
  const ALDS = bracket.ALDS;
  const NLDS = bracket.NLDS;

  if (
    !ALW[1].team1Id ||
    !ALW[1].team2Id ||
    !NLW[1].team1Id ||
    !NLW[1].team2Id ||
    !ALW[2].team1Id ||
    !ALW[2].team2Id ||
    !NLW[2].team1Id ||
    !NLW[2].team2Id ||
    !ALDS[1].team2Id ||
    !ALDS[2].team2Id ||
    !NLDS[1].team2Id ||
    !NLDS[2].team2Id
  ) {
    return false;
  }
  return true;
};

const isSeriesWithGame = (
  series: "ALW" | "NLW" | "ALDS" | "NLDS" | "ALCS" | "NLCS" | "WS"
): series is "ALW" | "NLW" | "ALDS" | "NLDS" => {
  return (
    series === "ALW" ||
    series === "NLW" ||
    series === "ALDS" ||
    series === "NLDS"
  );
};

export const newPick = (
  bracket: MLBPickData,
  series: "ALW" | "NLW" | "ALDS" | "NLDS" | "ALCS" | "NLCS" | "WS",
  game: 1 | 2,
  winnerId: number
): MLBPickData => {
  const seriesData: MLBPickSeries = isSeriesWithGame(series)
    ? bracket[series][game]
    : bracket[series];

  const winnerObj =
    seriesData.team1Id === winnerId
      ? { ...seriesData.team1 }
      : { ...seriesData.team2 };

  const newSeriesData: MLBPickSeries = {
    ...seriesData,
    winner: winnerId,
  };

  if (series === "WS") {
    return {
      ...bracket,
      WS: newSeriesData,
    };
  }

  const nextMatchup = !isSeriesWithGame(series)
    ? nextRoundMapping[series]
    : nextRoundMapping[series][game];

  let data = bracket;

  const currentId =
    nextMatchup[0] === "WS" ||
    nextMatchup[0] === "NLCS" ||
    nextMatchup[0] === "ALCS"
      ? bracket[nextMatchup[0]][nextMatchup[2]]
      : bracket[nextMatchup[0]][nextMatchup[1] as 1 | 2][nextMatchup[2]];
  if (currentId && currentId !== winnerId) {
    data = removePicks(bracket, series, currentId);
  }

  const updatedNext = {
    ...(nextMatchup[0] === "NLCS" ||
    nextMatchup[0] === "ALCS" ||
    nextMatchup[0] === "WS"
      ? {
          [nextMatchup[0]]: {
            ...data[nextMatchup[0]],
            [nextMatchup[2]]: winnerId,
            [nextMatchup[3]]: winnerObj,
          },
        }
      : {
          [nextMatchup[0]]: {
            ...data[nextMatchup[0]],
            [nextMatchup[1] as 1 | 2]: {
              ...(data[nextMatchup[0]]
                ? data[nextMatchup[0]][nextMatchup[1] as 1 | 2]
                : {}),
              [nextMatchup[2]]: winnerId,
              [nextMatchup[3]]: winnerObj,
            },
          },
        }),
  };

  data = {
    ...data,
    ...updatedNext,
    ...(isSeriesWithGame(series)
      ? {
          [series]: {
            ...data[series],
            [game]: newSeriesData,
          },
        }
      : {
          [series]: newSeriesData,
        }),
  };
  return data;
};

const nextRoundMapping: MLBNextRoundMapping = {
  ALW: {
    1: ["ALDS", 1, "team1Id", "team1"],
    2: ["ALDS", 2, "team1Id", "team1"],
  },
  NLW: {
    1: ["NLDS", 1, "team1Id", "team1"],
    2: ["NLDS", 2, "team1Id", "team1"],
  },
  ALDS: {
    1: ["ALCS", 1, "team1Id", "team1"],
    2: ["ALCS", 1, "team2Id", "team2"],
  },
  NLDS: {
    1: ["NLCS", 1, "team1Id", "team1"],
    2: ["NLCS", 1, "team2Id", "team2"],
  },
  ALCS: ["WS", null, "team1Id", "team1"],
  NLCS: ["WS", null, "team2Id", "team2"],
};

export const removePicks = (
  bracket: MLBPickData,
  series: "ALW" | "NLW" | "ALDS" | "NLDS" | "ALCS" | "NLCS" | "WS",
  removeId: number
): MLBPickData => {
  // Creating a deep copy of the bracket object
  const updatedBracket = { ...bracket };

  if (series === "WS") {
    updatedBracket.WS = {
      ...updatedBracket.WS,
      ...(updatedBracket.WS.winner === removeId ? { winner: null } : {}),
    };
    return updatedBracket;
  }

  const seriesOrder = ["WS", "ALCS", "NLCS", "ALDS", "NLDS", "ALW", "NLW"];

  const removeTeamId = (
    seriesObj: MLBPickSeries,
    teamKey: "team1Id" | "team2Id"
  ) => {
    const teamObj = teamKey === "team1Id" ? "team1" : "team2";
    if (seriesObj[teamKey] === removeId) {
      delete seriesObj[teamKey];
      delete seriesObj[teamObj];
    }
  };

  for (const ser of seriesOrder) {
    if (ser === series) {
      if (ser === "ALCS" || ser === "NLCS") {
        if (updatedBracket[ser].winner === removeId) {
          updatedBracket[ser].winner = null;
        }
      } else {
        for (const game of Object.values(updatedBracket[ser])) {
          if (game.winner === removeId) {
            updatedBracket[ser][game.gameNumber as 1 | 2].winner = null;
            delete updatedBracket[ser][game.gameNumber as 1 | 2].winIn;
          }
        }
      }
      break;
    } else {
      if (ser === "ALCS" || ser === "NLCS" || ser === "WS") {
        if (updatedBracket[ser].winner === removeId) {
          updatedBracket[ser].winner = null;
          delete updatedBracket[ser].winIn;
        }
        if (series !== ser) {
          removeTeamId(updatedBracket[ser], "team1Id");
          removeTeamId(updatedBracket[ser], "team2Id");
        }
      } else if (
        ser === "ALW" ||
        ser === "NLW" ||
        ser === "ALDS" ||
        ser === "NLDS"
      ) {
        for (const game of Object.values(updatedBracket[ser])) {
          removeTeamId(game, "team1Id");
          removeTeamId(game, "team2Id");
          if (game.winner === removeId) {
            game.winner = null;
            delete game.winIn;
          }
        }
      }
    }
    // }
  }
  return updatedBracket;
};
