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
      <PickLeague
        data={data}
        type={"AL"}
        setData={setData}
        matchColor={matchColor}
        accentColor={accentColor}
        textColor={textColor}
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
            marginTop: -39,
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
              width: 256,
              minWidth: 256,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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

export default MLBPicks;
