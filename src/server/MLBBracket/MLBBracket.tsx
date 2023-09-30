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
    width: "16rem",
    minWidth: "16rem",
    fontWeight: 800,
    fontSize: "larger",
    letterSpacing: -1,
    textTransform: "uppercase",
    color: accentColor,
  };

  return (
    <div
      style={{
        width: "calc(100% - 24px)",
        overflowX: "auto",
        height: "100%",
        borderRadius: borderRadiusValue,
        backgroundColor: bgColor,
        color: textColor,
        padding: 12,
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
              height: 159,
              minWidth: 33,
              borderRadius: "0 8px 0 0",
              borderTop: "1px solid",
              borderRight: "1px solid",
              borderColor: accentColor,
              marginBottom: -69,
              backgroundColor: bgColor,
              zIndex: 1,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", maxHeight: 50 }}>
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
        <div style={{ minWidth: 25 }} />
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
        <div style={{ minWidth: 40 }} />
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
        <div style={{ minWidth: 40 }} />
        <div
          style={{
            minWidth: 20,
            maxWidth: 20,
            borderBottom: "1px solid",
            borderColor: accentColor,
            marginLeft: "1.28px",
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            marginBottom: -28,
          }}
        >
          <span
            style={{
              height: 20,
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
            series={bracketData.WS}
            accentColor={accentColor}
            textColor={textColor}
            matchColor={matchColor}
            pickSeries={picks?.WS ? picks.WS : undefined}
            showScores={showScores}
          />
          <div
            style={{
              width: "256px",
              border: "solid",
              borderWidth: "1px",
              borderRadius: "8px",
              borderColor: accentColor,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 30,
              marginTop: "16px",
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
              marginBottom: 89,
              height: 160,
              minWidth: 33,
              borderRadius: "0 0 8px 0",
              borderBottom: "1px solid",
              borderRight: "1px solid",
              borderColor: accentColor,
              backgroundColor: bgColor,
              zIndex: 1,
              marginTop: -71,
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
