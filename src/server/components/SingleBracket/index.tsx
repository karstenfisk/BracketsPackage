import {
  SingleBracketProps,
  SingleMatch,
  MatchesByRound,
} from "../../types/index";
import Pairing from "./Pairing";
import React from "react";
import {
  findMatch,
  initializeEmptyMatches,
  spacingFormula,
} from "../../utils/index";

// Creates an object with keys of round1, round2, round3, etc. with arrays of either SingleMatch objects or NullMatch objects as values.
const createPairings = (
  rounds: number,
  matches: SingleMatch[]
): MatchesByRound => {
  const emptyMatches = initializeEmptyMatches(rounds);
  let gameNumber = 1;

  for (let i = 1; i <= rounds; i++) {
    const matchesInThisRound = Math.pow(2, rounds - i);

    for (let j = 1; j <= matchesInThisRound; j++) {
      const matchFound = findMatch(matches, i, gameNumber) || {
        round: i,
        gameNumber: gameNumber,
      };

      emptyMatches[`round${i}`].push(matchFound);
      gameNumber++;
    }
  }

  return emptyMatches;
};

// The SingleBracket component is responsible for rendering the entire bracket.
const SingleBracket = ({
  matches,
  rounds,
  bgColor = "",
  textColor = "",
  accentColor = "",
  matchColor = "",
  showScores = false,
  rounded = false,
}: SingleBracketProps) => {
  const roundMatches = createPairings(rounds, matches);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        borderRadius: `${rounded ? "0.5rem" : "0"}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {Object.keys(roundMatches).map((round) => (
          <div
            key={round}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginRight: "0.25rem",
            }}
          >
            {roundMatches[round].map((match) => (
              <div
                key={match.gameNumber}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {match.round > 1 && (
                  <>
                    <div
                      style={{
                        minHeight: "75%",
                        width: "2rem",
                        border: "solid",
                        borderRadius: "0 0.5rem 0.5rem 0",
                        borderLeft: "none",
                        borderColor: accentColor,
                        height: `${spacingFormula(match.round, rounds)}rem`,
                      }}
                    />
                    <div
                      style={{
                        border: "solid",
                        borderBottom: "none",
                        width: "1rem",
                        borderColor: accentColor,
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    paddingTop: `${spacingFormula(match.round, rounds)}rem`,
                    paddingBottom: `${spacingFormula(match.round, rounds)}rem`,
                    color: textColor,
                    marginRight: `${match.round === rounds ? "2rem" : "0"}`,
                  }}
                >
                  <Pairing
                    match={match}
                    gameNumber={match.gameNumber}
                    round={match.round}
                    textColor={textColor}
                    accentColor={accentColor}
                    matchColor={matchColor}
                    showScores={showScores}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBracket;
