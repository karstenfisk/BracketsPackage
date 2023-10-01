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
    <div
      style={{
        display: "flex",
        height: 160,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 537,
          minWidth: 537,
          height: 160,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            minHeight: 66,
            maxHeight: 66,
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <div
            style={{
              width: 25,
              borderTop: "1px solid",
              borderTopColor: accentColor,
            }}
          />
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
        <div style={{ height: 28 }} />
        <div
          style={{
            minHeight: 66,
            maxHeight: 66,
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <div
            style={{
              width: 25,
              borderTop: "1px solid",
              borderTopColor: accentColor,
            }}
          />
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
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: 94,
            marginTop: 33,
            marginBottom: 33,
            width: 20,
            borderColor: accentColor,
            borderStyle: "solid",
            borderWidth: "1px 1px 1px 0",
            borderRadius: "0 8px 8px 0",
          }}
        />
      </div>
      <div
        style={{
          width: 18,
          borderTop: "1px solid",
          borderTopColor: accentColor,
        }}
      />
      <Pairing
        series={type === "AL" ? data.ALCS : data.NLCS}
        matchColor={matchColor}
        accentColor={accentColor}
        textColor={textColor}
        showScores={showScores}
        pickSeries={
          picks ? (type === "AL" ? picks.ALCS : picks.NLCS) : undefined
        }
      />
      {/* </div> */}
      <div
        style={{
          width: 25,
          borderStyle: "solid",
          borderWidth: type === "AL" ? "1px 1px 0 0" : "0 1px 1px 0",
          borderColor: accentColor,
          height: 160,
          marginBottom: type === "AL" ? -160 : 160,
          borderRadius: type === "AL" ? "0 8px 0 0" : "0 0 8px 0",
        }}
      />
    </div>
  );
}
