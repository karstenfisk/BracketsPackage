import PickLeague from "./MLBPickLeague";
import Pairing from "./MLBPickablePairing";
import type { MLBPickProps, MLBPickData } from "./types/pickTypes";
import { verifyBracket } from "./utils/pickUtils";
import React, { useState, useEffect } from "react";

const formatBrackets = (bracketData: MLBPickData): MLBPickData => {
  const formattedData = { ...bracketData };
  for (const round of Object.values(formattedData)) {
    if (
      "round" in round &&
      (round.round === "WS" || round.round === "ALCS" || round.round === "NLCS")
    ) {
      if (!round.winIn) {
        round.winIn = 7;
      }
    } else {
      for (const game of Object.values(round)) {
        if (!game.winIn) {
          game.winIn = game.round === "NLDS" || game.round === "ALDS" ? 5 : 3;
        }
      }
    }
  }
  return formattedData;
};

const MLBPicks = ({
  bracketData,
  bgColor = "",
  textColor = "",
  accentColor = "",
  matchColor = "",
  rounded = false,
  onUpdate,
}: MLBPickProps) => {
  const borderRadiusValue = rounded ? "0.5rem" : "0";
  const labelStyle = {
    width: "16rem",
    minWidth: "16rem",
    fontWeight: 800,
    fontSize: "larger",
    letterSpacing: 0,
  };

  if (verifyBracket(bracketData) !== true) {
    throw new Error(
      "Invalid bracket, please ensure all of wildcard and bye teams are provided."
    );
  }
  const [data, setData] = useState(formatBrackets(bracketData));

  useEffect(() => {
    setData(formatBrackets(bracketData));
  }, [bracketData]);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(data);
    }
  }, [data, onUpdate]);

  return (
    <div
      style={{
        width: "calc(100% - 24px)",
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
            display: "inline-block",
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          American League
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PickLeague
            data={data}
            type={"AL"}
            setData={setData}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
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
            matchColor={matchColor}
            series={data.WS}
            setData={setData}
            data={data}
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
              height: 30,
              marginTop: "16px", // 1rem -> 16px
              fontWeight: "bold",
              color: textColor,
              backgroundColor: matchColor,
            }}
          >
            <span>
              {data.WS && data.WS.winner === data.WS.team1Id
                ? data.WS.team1?.teamName
                : data.WS.winner === data.WS.team2Id
                ? data.WS.team2?.teamName
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
          <PickLeague
            data={data}
            type={"NL"}
            setData={setData}
            matchColor={matchColor}
            accentColor={accentColor}
            textColor={textColor}
          />
          <div
            style={{
              marginBottom: 89,
              height: 160,
              minWidth: 33,
              borderRadius: "0 0 8px 0",
              borderBottom: "1px solid ",
              borderRight: "1px solid ",
              borderColor: accentColor,
              backgroundColor: bgColor,
              zIndex: 1,
              marginTop: -71,
            }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
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

export default MLBPicks;
