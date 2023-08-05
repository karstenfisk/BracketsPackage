import React, { useState, useEffect } from "react";
import {
  SinglePicksProps,
  SingleMatch,
  PickMatchesByRound,
  Tournament,
} from "../../types/index";
import {
  emptyPickMatches,
  convertToPredictedMatch,
  spacingFormula,
} from "../../utils/index";
import PickablePairing from "./PickablePairing";
// Single Bracket Component to make picks.
// Requirements for this component:
// 1. Takes in an matches and rounds as props.
// 2. Matches must at least fill the entire first round.
// 3. Matches must be in order by round and gameNumber.

// FunctionS that achieve this.
// 1. Creates an object with keys of round1, round2, round3, etc. with arrays of either SingleMatch objects or PredictedMatch objects as values.
const initializeMatchState = (
  rounds: number,
  roundOneMatches: SingleMatch[]
): Tournament => {
  const updatedRoundOneMatches = roundOneMatches.map((match) => {
    return convertToPredictedMatch(match);
  });
  const sortedRoundOneMatches = updatedRoundOneMatches.sort(
    (a, b) => a.gameNumber - b.gameNumber
  );
  const emptyMatches = emptyPickMatches(rounds);

  emptyMatches[`round${1}`] = sortedRoundOneMatches;
  return { matches: emptyMatches, winner: undefined };
};

// This component will only populate the matches in round one.
const SinglePicks = ({
  onPicksUpdate,
  matches,
  rounds,
  previousPicks,
  bgColor = "",
  matchColor = "",
  textColor = "",
  accentColor = "",
  rounded = false,
}: SinglePicksProps) => {
  const [pickMatches, setPickMatches] = useState<Tournament>({
    matches: {},
    winner: undefined,
  });

  useEffect(() => {
    if (previousPicks) {
      setPickMatches(previousPicks);
    } else {
      const matchesInRoundOne = Math.pow(2, rounds - 1);
      const roundOneMatches = matches.filter((match) => match.round === 1);

      if (roundOneMatches.length !== matchesInRoundOne) {
        throw new Error("Matches must at least fill the entire first round.");
      }
      setPickMatches(initializeMatchState(rounds, roundOneMatches));
    }
  }, [matches, rounds]);

  useEffect(() => {
    if (onPicksUpdate) {
      onPicksUpdate(pickMatches);
    }
  }, [pickMatches, onPicksUpdate]);

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
        {Object.keys(pickMatches.matches).map((round) => (
          <div
            key={round}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginRight: "0.25rem",
            }}
          >
            {pickMatches.matches[round].map((match) => (
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
                  <PickablePairing
                    match={match}
                    gameNumber={match.gameNumber}
                    round={match.round}
                    textColor={textColor}
                    accentColor={accentColor}
                    matchColor={matchColor}
                    pickMatches={pickMatches}
                    setPickMatches={setPickMatches}
                    rounds={rounds}
                  />
                  {match.round === rounds ? (
                    <div
                      style={{
                        width: "16rem",
                        border: "solid",
                        borderWidth: "1px",
                        borderRadius: "0.5rem",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        height: "2rem",
                        borderColor: accentColor,
                        backgroundColor: matchColor,
                        marginTop: "0.5rem",
                      }}
                    >
                      <span style={{ color: textColor }}>
                        {pickMatches?.winner?.teamName}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePicks;
