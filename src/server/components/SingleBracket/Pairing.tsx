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
          cursor: "pointer",
          height: "4rem",
          padding: "0.5rem 0",
          borderColor: accentColor,
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            paddingLeft: "0.5rem",
            display: "flex",
            height: "1.5rem",
            alignItems: "center",
            color: textColor,
          }}
        >
          {homeTeam}
          <div
            style={{
              marginLeft: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {showScores ? (match as SingleMatch).homeTeamScore : null}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            borderBottom: "solid",
            borderColor: accentColor,
          }}
        />
        <div
          style={{
            paddingLeft: "0.5rem",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            color: textColor,
          }}
        >
          {awayTeam}
          <div
            style={{
              marginLeft: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {showScores ? (match as SingleMatch).awayTeamScore : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pairing;
