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
    Object.keys(series).length === 0 ||
    pickSeries.winner !== pickSeries.team1Id
      ? matchColor
      : series.winner === null || typeof series.winner !== "number"
      ? matchColor
      : typeof pickSeries.team1Id === "number" &&
        series.winner === pickSeries.team1Id &&
        pickSeries.team1Id === series.team1Id
      ? "rgba(98, 181, 98, 0.4)"
      : "rgba(205, 92, 92, 0.4)";

  const team2Color =
    !pickSeries ||
    Object.keys(pickSeries).length === 0 ||
    !series ||
    Object.keys(series).length === 0 ||
    pickSeries.winner !== pickSeries.team2Id
      ? matchColor
      : series.winner === null || typeof series.winner !== "number"
      ? matchColor
      : typeof pickSeries.team2Id === "number" &&
        series.winner === pickSeries.team2Id &&
        pickSeries.team2Id === series.team2Id
      ? "rgba(98, 181, 98, 0.4)"
      : "rgba(205, 92, 92, 0.4)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 4,
        paddingBottom: 4,
        color: textColor,
        width: 256,
        height: 64,
        fontSize: 16,
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
            height: 32,
            backgroundColor: team1Color,
            position: "relative",
          }}
        >
          {(pickSeries &&
            !series.winner &&
            pickSeries.winner === series.team1Id) ||
          (pickSeries &&
            !series.winner &&
            !series.team1 &&
            pickSeries.winner === pickSeries.team1Id) ? (
            <div
              style={{
                backgroundColor: accentColor,
                opacity:
                  !series.team1 &&
                  !series.winner &&
                  pickSeries &&
                  pickSeries.winner === pickSeries.team1Id
                    ? 0.2
                    : 0.4,
                height: 32,
                width: 256,
                marginLeft: -8,
                position: "absolute",
                borderRadius: "6px 6px 0 0", // Converted from 0.5rem
              }}
            ></div>
          ) : null}
          <span
            style={{
              zIndex: 1,
              opacity: series.team1 ? 1 : 0.6,
            }}
          >
            <span
              style={{
                fontSize: 14,
                opacity: 0.5,
                paddingRight: 3,
              }}
            >
              {!series.team1 && pickSeries
                ? pickSeries.team1?.seed
                : series.team1?.seed}
            </span>{" "}
            {!series.team1 && pickSeries
              ? pickSeries.team1?.teamName
              : series.team1?.teamName}
            {pickSeries &&
            pickSeries.winner === series.team1Id &&
            pickSeries.team1Id === series.team1Id ? (
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.8,
                  paddingLeft: 4,
                  fontWeight: "bold",
                  letterSpacing: -1,
                }}
              >
                ( in {pickSeries?.winIn} )
              </span>
            ) : null}
          </span>
          {showScores && series.team1 && series.team2 ? (
            <span>{series.team1Score}</span>
          ) : null}
        </div>

        <div
          style={{
            width: 256,
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
            height: 32,
            backgroundColor: team2Color,
            position: "relative",
          }}
        >
          {(pickSeries &&
            !series.winner &&
            pickSeries.winner === series.team2Id) ||
          (pickSeries &&
            !series.winner &&
            !series.team2 &&
            pickSeries.winner === pickSeries.team2Id) ? (
            <div
              style={{
                backgroundColor: accentColor,
                opacity:
                  !series.winner &&
                  !series.team2 &&
                  pickSeries.winner === pickSeries.team2Id
                    ? 0.2
                    : 0.4,
                height: 32,
                width: 256,
                marginLeft: -8,
                position: "absolute",
                borderRadius: "0 0 6px 6px", // Converted from 0.5rem
              }}
            ></div>
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: 1,
              opacity: series.team2 ? 1 : 0.6,
            }}
          >
            <span>
              <span
                style={{
                  fontSize: 14,
                  opacity: 0.5,
                  paddingRight: 3,
                }}
              >
                {pickSeries && !series.team2
                  ? pickSeries.team2?.seed
                  : series.team2?.seed}
              </span>{" "}
              {pickSeries && !series.team2
                ? pickSeries.team2?.teamName
                : series.team2?.teamName}
            </span>
            {pickSeries &&
            series.team2Id === pickSeries.team2Id &&
            pickSeries.winner === series.team2Id ? (
              <span
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                  paddingLeft: 4,
                  fontWeight: "bold",
                  letterSpacing: -1,
                }}
              >
                ( in {pickSeries.winIn} )
              </span>
            ) : series.round === "ALDS" || series.round === "NLDS" ? (
              <span style={{ fontSize: 12, opacity: 0.5, paddingLeft: 4 }}>
                (Bye)
              </span>
            ) : null}
          </div>
          {showScores && series.team1 && series.team2 ? (
            <span>{series.team2Score}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Pairing;
