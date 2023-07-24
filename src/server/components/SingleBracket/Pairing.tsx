import { SinglePairingProps, SingleMatch } from "../../types/index";
import React from "react";

const Pairing = ({
  // SingleMatch or NullMatch object, color settings, and other props described in the SingleBracket component.
  match,
  textColor = "",
  accentColor = "",
  matchColor = "",
  showScores = false,
}: SinglePairingProps) => {
  // Extract team names from match object.
  const homeTeam: String | undefined = (match as SingleMatch)?.homeTeam
    ?.teamName;
  const awayTeam: String | undefined = (match as SingleMatch)?.awayTeam
    ?.teamName;

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
          }}
        >
          <span>{homeTeam}</span>
          {showScores && <span>{(match as SingleMatch).homeTeamScore}</span>}
        </div>

        <div
          style={{
            width: "100%",
            borderBottom: "solid",
            borderWidth: 0.5,
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
