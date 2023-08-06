import { SinglePairingProps, SingleMatch } from "../../types/index";
import React from "react";
import { getHighlightColor } from "../../utils";

const Pairing = ({
  // SingleMatch or NullMatch object, color settings, and other props described in the SingleBracket component.
  match,
  textColor = "",
  accentColor = "",
  matchColor = "",
  showScores = false,
  pickedMatch,
}: SinglePairingProps) => {
  // Extract team names from match object.
  const homeTeam = (match as SingleMatch)?.homeTeam?.teamName;
  const awayTeam = (match as SingleMatch)?.awayTeam?.teamName;

  let homeTeamBgColor = "";
  let awayTeamBgColor = "";

  if (pickedMatch && "winnerId" in match) {
    const winLoss = getHighlightColor(match as SingleMatch, pickedMatch);
    if (match.winnerId === match.homeTeamId) {
      homeTeamBgColor = winLoss;
    } else if (match.winnerId === match.awayTeamId) {
      awayTeamBgColor = winLoss;
    }
  }

  // Return card containing match information.
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "16rem",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          cursor: "pointer",
          height: "4rem",
          borderColor: accentColor,
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            alignItems: "center",
            color: textColor,
            height: "50%",
            backgroundColor: homeTeamBgColor,
          }}
        >
          <span>{homeTeam}</span>
          {showScores && <span>{(match as SingleMatch).homeTeamScore}</span>}
        </div>

        <div
          style={{
            width: "100%",
            borderBottom: "solid",
            borderWidth: "0.25px",
            borderColor: accentColor,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            alignItems: "center",
            color: textColor,
            height: "50%",
            backgroundColor: awayTeamBgColor,
          }}
        >
          <span>{awayTeam}</span>
          {showScores && <span>{(match as SingleMatch).awayTeamScore}</span>}
        </div>
      </div>
    </div>
  );
};
export default Pairing;
