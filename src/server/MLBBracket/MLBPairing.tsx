import type { MLBPairingProps } from "./types";
import React from "react";

const Pairing = ({
  series,
  textColor = "",
  accentColor = "",
  matchColor = "",
  pickSeries,
  showScores = false,
}: MLBPairingProps) => {
  const team1Color =
    !pickSeries ||
    Object.keys(pickSeries).length === 0 ||
    !series ||
    Object.keys(series).length === 0
      ? matchColor
      : series.winner === null || typeof series.winner !== "number"
      ? matchColor
      : typeof pickSeries.team1Id === "number" &&
        series.winner === pickSeries.team1Id
      ? "rgba(98, 181, 98, 0.4)"
      : "rgba(205, 92, 92, 0.4)";

  const team2Color =
    !pickSeries ||
    Object.keys(pickSeries).length === 0 ||
    !series ||
    Object.keys(series).length === 0
      ? matchColor
      : series.winner === null || typeof series.winner !== "number"
      ? matchColor
      : typeof pickSeries.team2Id === "number" &&
        series.winner === pickSeries.team2Id
      ? "rgba(98, 181, 98, 0.4)"
      : "rgba(205, 92, 92, 0.4)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 7,
        paddingBottom: 7,
        color: textColor,
      }}
    >
      <div
        style={{
          width: "256px",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "8px",
          borderColor: accentColor,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          cursor: "pointer",
          height: "64px",
          overflow: "hidden",
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "8px",
            paddingRight: "8px",
            alignItems: "center",
            height: "50%",
            backgroundColor: team1Color,
          }}
        >
          <span>{series.team1?.teamName}</span>
          {showScores ? <span>{series.team1Score}</span> : null}
        </div>

        <div
          style={{
            width: "100%",
            borderTop: "solid",
            borderBottom: "none",
            borderWidth: "1px",
            borderColor: accentColor,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "8px",
            paddingRight: "8px",
            alignItems: "center",
            height: "50%",
            backgroundColor: team2Color,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{series.team2?.teamName}</span>
            {series.round === "ALDS" || series.round === "NLDS" ? (
              <span style={{ fontSize: 12, opacity: 0.5, paddingLeft: 4 }}>
                (Bye)
              </span>
            ) : null}
          </div>
          {showScores ? <span>{series.team2Score}</span> : null}
        </div>
      </div>
    </div>
  );
};
export default Pairing;
