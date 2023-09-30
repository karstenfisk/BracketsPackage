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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          American League
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <League
            data={bracketData}
            type={"AL"}
            accentColor={accentColor}
            textColor={textColor}
            matchColor={matchColor}
            picks={picks ? picks : undefined}
            showScores={showScores}
          />
          <div
            style={{
              marginTop: 90,
              height: 160,
              minWidth: 33,
              borderRadius: "0 8px 0 0",
              borderTop: "1px solid",
              borderRight: "1px solid",
              borderColor: accentColor,
              marginBottom: -70,
              backgroundColor: bgColor,
              zIndex: 1,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", height: 50 }}>
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          Wildcard Round
        </div>
        <div style={{ width: 25 }} />
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          Division Series
        </div>
        <div style={{ width: 50 }} />
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          League Championship
        </div>
        <div style={{ width: 25 }} />
        <div
          style={{
            width: 25,
            borderTop: "1px solid",
            borderColor: accentColor,
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 256,
            marginTop: -28,
            marginBottom: -30,
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
          <div style={{ height: 78 }}>
            <Pairing
              matchColor={matchColor}
              series={bracketData.WS}
              showScores={showScores}
              pickSeries={picks?.WS}
              accentColor={accentColor}
              textColor={textColor}
            />
          </div>

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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
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
              marginBottom: 90,
              height: 160,
              minWidth: 33,
              borderRadius: "0 0 8px 0",
              borderBottom: "1px solid",
              borderRight: "1px solid",
              borderColor: accentColor,
              backgroundColor: bgColor,
              zIndex: 1,
              marginTop: -70,
            }}
          />
        </div>
        <div
          style={{
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          National League
        </div>
      </div>
    </div>
  );
};

export default MLBBracket;
