import Pairing from "./MLBPickablePairing";
import type { MLBPickLeagueProps } from "./types/pickTypes";
import React from "react";

export default function PickLeague({
  type,
  data,
  setData,
  textColor = "",
  accentColor = "",
  matchColor = "",
}: MLBPickLeagueProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Pairing
          series={type === "AL" ? data.ALW[1] : data.NLW[1]}
          setData={setData}
          data={data}
          matchColor={matchColor}
          accentColor={accentColor}
          textColor={textColor}
        />
        <div style={{ height: 20 }} />

        <Pairing
          series={type === "AL" ? data.ALW[2] : data.NLW[2]}
          setData={setData}
          data={data}
          matchColor={matchColor}
          accentColor={accentColor}
          textColor={textColor}
        />
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
            paddingTop: 50,
            paddingBottom: 49,
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
        <Pairing
          series={type === "AL" ? data.ALDS[1] : data.NLDS[1]}
          setData={setData}
          data={data}
          matchColor={matchColor}
          accentColor={accentColor}
          textColor={textColor}
        />
        <div style={{ height: 20 }} />
        <Pairing
          series={type === "AL" ? data.ALDS[2] : data.NLDS[2]}
          setData={setData}
          data={data}
          matchColor={matchColor}
          accentColor={accentColor}
          textColor={textColor}
        />
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
            paddingTop: 50,
            paddingBottom: 49,
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
            height: 1,
            maxHeight: 1,
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
        <Pairing
          series={type === "AL" ? data.ALCS : data.NLCS}
          setData={setData}
          data={data}
          matchColor={matchColor}
          accentColor={accentColor}
          textColor={textColor}
        />
      </div>
    </div>
  );
}
