import Pairing from "./MLBPairing";
import type { MLBLeagueProps } from "./types";
import React from "react";

export default function League({
  type,
  data,
  textColor = "",
  accentColor = "",
  matchColor = "",
  picks,
  showScores = false,
}: MLBLeagueProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: 256, height: 78 }}>
          <Pairing
            series={type === "AL" ? data.ALW[1] : data.NLW[1]}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
            showScores={showScores}
            pickSeries={
              picks ? (type === "AL" ? picks.ALW[1] : picks.NLW[1]) : undefined
            }
          />
        </div>
        <div style={{ height: 20 }} />
        <div style={{ width: 256, height: 78 }}>
          <Pairing
            series={type === "AL" ? data.ALW[2] : data.NLW[2]}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
            showScores={showScores}
            pickSeries={
              picks ? (type === "AL" ? picks.ALW[2] : picks.NLW[2]) : undefined
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 98,
            borderColor: accentColor,
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            width: 25,
            borderRightWidth: 0,
            borderLeftWidth: 0,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: 256, height: 78 }}>
          <Pairing
            series={type === "AL" ? data.ALDS[1] : data.NLDS[1]}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
            showScores={showScores}
            pickSeries={
              picks
                ? type === "AL"
                  ? picks.ALDS[1]
                  : picks.NLDS[1]
                : undefined
            }
          />
        </div>
        <div style={{ height: 20 }} />
        <div style={{ width: 256, height: 78 }}>
          <Pairing
            series={type === "AL" ? data.ALDS[2] : data.NLDS[2]}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
            showScores={showScores}
            pickSeries={
              picks
                ? type === "AL"
                  ? picks.ALDS[2]
                  : picks.NLDS[2]
                : undefined
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: 98,
            borderColor: accentColor,
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            width: 25,
            borderRightWidth: 1,
            borderLeftWidth: 0,
            borderRadius: "0 8px 8px 0", // Converted 0.5rem to 8px
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderColor: accentColor,
            borderStyle: "solid",
            borderTopWidth: 1,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            width: 15,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: 256, height: 78 }}>
          <Pairing
            series={picks && type === "AL" ? data.ALCS : data.NLCS}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
            showScores={showScores}
            pickSeries={
              picks ? (type === "AL" ? picks.ALCS : picks.NLCS) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
