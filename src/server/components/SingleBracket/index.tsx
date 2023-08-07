import {
  SingleBracketProps,
  SingleMatch,
  MatchesByRound,
  NullMatch,
} from "../../types/index";
import Pairing from "./Pairing";
import React from "react";
import {
  findMatch,
  initializeEmptyMatches,
  spacingFormula,
} from "../../utils/index";

function isSingleMatch(match: SingleMatch | NullMatch): match is SingleMatch {
  return "homeTeamId" in match && "awayTeamId" in match;
}

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
  picks,
  reversed = false,
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
            }}
          >
            {roundMatches[round].map((match) => {
              if (isSingleMatch(match) && picks) {
                const chosenGame = picks.find(
                  (pick) => pick.gameNumber === match.gameNumber
                );

                return (
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
                            borderWidth: "1px",
                            height: `${
                              spacingFormula(match.round, rounds) + 2
                            }rem`,
                          }}
                        />
                        <div
                          style={{
                            border: "solid",
                            borderBottom: "none",
                            width: "1rem",
                            borderWidth: "1px",
                            borderColor: accentColor,
                          }}
                        />
                      </>
                    )}
                    <div
                      style={{
                        paddingTop: `${spacingFormula(match.round, rounds)}rem`,
                        paddingBottom: `${spacingFormula(
                          match.round,
                          rounds
                        )}rem`,
                        color: textColor,
                        marginRight: `${match.round === rounds ? "2rem" : "0"}`,
                        marginTop: `${match.round === rounds ? "2.5rem" : "0"}`,
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
                        pickedMatch={chosenGame}
                        reversed={reversed}
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
                            {"homeTeamId" in match &&
                            match.winnerId === match.homeTeamId
                              ? match.homeTeam.teamName
                              : "awayTeamId" in match &&
                                match.winnerId === match.awayTeamId
                              ? match.awayTeam.teamName
                              : null}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              } else {
                return (
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
                            borderWidth: "1px",
                            borderRadius: "0 0.5rem 0.5rem 0",
                            borderLeft: "none",
                            borderColor: accentColor,
                            height: `${
                              spacingFormula(match.round, rounds) + 2
                            }rem`,
                          }}
                        />
                        <div
                          style={{
                            border: "solid",
                            borderBottom: "none",
                            borderWidth: "1px",
                            width: "1rem",
                            borderColor: accentColor,
                          }}
                        />
                      </>
                    )}
                    <div
                      style={{
                        paddingTop: `${spacingFormula(match.round, rounds)}rem`,
                        paddingBottom: `${spacingFormula(
                          match.round,
                          rounds
                        )}rem`,
                        color: textColor,
                        marginRight: `${match.round === rounds ? "2rem" : "0"}`,
                        marginTop: `${match.round === rounds ? "2.5rem" : "0"}`,
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
                            {"homeTeamId" in match &&
                            match.winnerId === match.homeTeamId
                              ? match.homeTeam.teamName
                              : "awayTeamId" in match &&
                                match.winnerId === match.awayTeamId
                              ? match.awayTeam.teamName
                              : null}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBracket;
