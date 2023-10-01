import League from "./MLBLeague";
import Pairing from "./MLBPairing";
import React from "react";
import type { MLBBracketProps } from "./types";

const MLBBracket = ({
  bracketData,
  bgColor = "",
  textColor = "",
  accentColor = "",
  matchColor = "",
  rounded = false,
  picks,
  showScores = false,
}: MLBBracketProps) => {
  const borderRadiusValue = rounded ? "0.5rem" : "0";
  const labelStyle = {
    width: 256,
    fontWeight: 800,
    fontSize: "larger",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        display: "block",
        borderRadius: borderRadiusValue,
        backgroundColor: bgColor,
        color: textColor,
        padding: 12,
        fontFamily: "sans-serif",
        width: 1150,
        overflowX: "hidden",
        minHeight: 420,
        maxHeight: 420,
        boxSizing: "content-box",
      }}
    >
      <div
        style={{
          ...labelStyle,
          letterSpacing: -1,
          textTransform: "uppercase",
          color: accentColor,
          height: 25,
          width: 256,
          minWidth: 256,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        American League
      </div>
      <League
        data={bracketData}
        type={"AL"}
        accentColor={accentColor}
        textColor={textColor}
        matchColor={matchColor}
        picks={picks ? picks : undefined}
        showScores={showScores}
      />

      <div style={{ display: "flex", height: 50, overflowY: "visible" }}>
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
            width: 256,
            minWidth: 256,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Wildcard Round
        </div>
        <div style={{ width: 28, minWidth: 28 }} />
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
            width: 256,
            minWidth: 256,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Division Series
        </div>
        <div style={{ width: 38, minWidth: 38 }} />
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
            width: 256,
            minWidth: 256,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          League Championship
        </div>
        <div style={{ width: 25, minWidth: 25 }} />
        <div
          style={{
            width: 18,
            borderTop: "1px solid",
            borderColor: accentColor,
            zIndex: 0,
            minWidth: 18,
            marginTop: 25,
            marginLeft: -1,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 256,
            minWidth: 256,
            height: 130,
            marginTop: -40,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              height: 32,
              fontWeight: "bold",
              fontSize: "larger",
              letterSpacing: -1,
              textTransform: "uppercase",
              color: accentColor,
            }}
          >
            World Series
          </span>
          <Pairing
            matchColor={matchColor}
            series={bracketData.WS}
            showScores={showScores}
            pickSeries={picks?.WS}
            accentColor={accentColor}
            textColor={textColor}
          />

          <div
            style={{
              width: "256px", // 16rem -> 256px
              border: "solid",
              borderWidth: "1px",
              borderRadius: "8px", // 0.5rem -> 8px
              borderColor: accentColor,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 32,
              fontWeight: "bold",
              color: textColor,
              backgroundColor: matchColor,
            }}
          >
            <span>
              {bracketData.WS &&
              bracketData.WS.winner === bracketData.WS.team1Id
                ? bracketData.WS.team1?.teamName
                : bracketData.WS.winner === bracketData.WS.team2Id
                ? bracketData.WS.team2?.teamName
                : null}
            </span>
          </div>
        </div>
      </div>

      <League
        data={bracketData}
        type={"NL"}
        accentColor={accentColor}
        textColor={textColor}
        matchColor={matchColor}
        picks={picks ? picks : undefined}
        showScores={showScores}
      />

      <div
        style={{
          ...labelStyle,
          letterSpacing: -1,
          textTransform: "uppercase",
          color: accentColor,
          height: 25,
          width: 256,
          minWidth: 256,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        National League
      </div>
    </div>
  );
};

export default MLBBracket;
