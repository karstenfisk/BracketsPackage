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
        display: "block",
        borderRadius: borderRadiusValue,
        backgroundColor: bgColor,
        color: textColor,
        padding: 12,
        fontFamily: "sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          height: 220,
        }}
      >
        <div
          style={{
            height: 32,
            display: "inline-block",
            ...labelStyle,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          American League
        </div>
        <div style={{ display: "flex", alignItems: "center", height: 188 }}>
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
              height: 160,
              width: 33,
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 50,
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
            marginBottom: -32,
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
              series={data.WS}
              setData={setData}
              data={data}
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
          height: 220,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: 188 }}>
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
              marginBottom: 90,
              height: 160,
              width: 33,
              borderRadius: "0 0 8px 0",
              borderBottom: "1px solid ",
              borderRight: "1px solid ",
              borderColor: accentColor,
              backgroundColor: bgColor,
              zIndex: 1,
              marginTop: -70,
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
            marginBottom: 5,
            height: 32,
          }}
        >
          National League
        </div>
      </div>
    </div>
  );
};

export default MLBPicks;
