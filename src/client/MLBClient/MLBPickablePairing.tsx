import type { MLBPickPairingProps } from "./types/pickTypes";
import { newPick, removePicks } from "./utils/pickUtils";
import React, { useState, useEffect } from "react";

type Selected = "team1Id" | "team2Id" | null;

const WINMAP: { [key: string]: number[] } = {
  ALW: [2, 3],
  NLW: [2, 3],
  ALDS: [3, 4, 5],
  NLDS: [3, 4, 5],
  ALCS: [4, 5, 6, 7],
  NLCS: [4, 5, 6, 7],
  WS: [4, 5, 6, 7],
};

const PickablePairing = ({
  series,
  setData,
  data,
  textColor = "",
  accentColor = "",
  matchColor = "",
}: MLBPickPairingProps) => {
  const [selected, setSelected] = useState<Selected>(
    series.winner === series.team1Id
      ? "team1Id"
      : series.winner === series.team2Id
      ? "team2Id"
      : null
  );
  const [options, setOptions] = useState<number[]>([]);
  const [defaultValue, setDefaultValue] = useState<
    2 | 3 | 4 | 5 | 6 | 7 | null
  >(null);

  useEffect(() => {
    switch (series.bestOf) {
      case 3:
        setOptions([2, 3]);
        if (series.winIn) {
          setDefaultValue(series.winIn);
        } else {
          setDefaultValue(3);
        }
        break;
      case 5:
        setOptions([3, 4, 5]);
        if (series.winIn) {
          setDefaultValue(series.winIn);
        } else {
          setDefaultValue(5);
        }
        break;
      case 7:
        setOptions([4, 5, 6, 7]);
        if (series.winIn) {
          setDefaultValue(series.winIn);
        } else {
          setDefaultValue(7);
        }
        break;
      default:
        setOptions([]);
        setDefaultValue(null);
    }
  }, [series.bestOf, series.winIn]);

  useEffect(() => {
    setSelected(
      series.winner === series.team1Id
        ? "team1Id"
        : series.winner === series.team2Id
        ? "team2Id"
        : null
    );
  }, [series]);

  const handleWinIn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWinIn = Number(e.target.value) as 2 | 3 | 4 | 5 | 6 | 7;
    const winInOptions = WINMAP[series.round];
    if (!winInOptions.includes(newWinIn)) {
      return;
    }
    const newData = { ...data };
    if (
      series.round === "ALDS" ||
      series.round === "NLDS" ||
      series.round === "ALW" ||
      series.round === "NLW"
    ) {
      newData[series.round][series.gameNumber].winIn = newWinIn;
    } else {
      newData[series.round].winIn = newWinIn;
    }
    setData({ ...newData });
  };
  // Return card containing match information.
  const handleClick = (team: "team1Id" | "team2Id") => {
    if (selected === team) {
      const removedData = removePicks(
        data,
        series.round,
        series[team] as number
      );
      setData({ ...removedData });
      setSelected(null);
    }
    if (selected === null || selected !== team) {
      const newData = newPick(
        data,
        series.round,
        series.gameNumber,
        series[team] as number
      );
      setData({ ...newData });
      setSelected(team);
    }
  };

  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        paddingTop: 7,
        paddingBottom: 7,
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
          borderRadius: "8px", // Converted from 0.5rem
          borderColor: accentColor,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          display: "flex",
          justifyContent: "space-around",
          cursor: "pointer",
          height: "64px",
          overflow: "hidden",
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            width: 210,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "64px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "8px", // Converted from 0.5rem
              paddingRight: "8px", // Converted from 0.5rem
              alignItems: "center",
              height: 32,
              fontWeight: selected === "team1Id" ? "bold" : "normal",
              width: 210,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            onClick={() => {
              if (series.team1Id) handleClick("team1Id");
            }}
          >
            <span>{series.team1?.teamName}</span>
          </div>

          <div
            style={{
              width: 210,
              borderTop: "none",
              borderBottom: "solid",
              borderWidth: 1,
              borderColor: accentColor,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "8px", // Converted from 0.5rem
              paddingRight: "8px", // Converted from 0.5rem
              alignItems: "center",
              height: 32,
              fontWeight: selected === "team2Id" ? "bold" : "normal",
              width: 210,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            onClick={() => {
              if (series.team2Id) handleClick("team2Id");
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{series.team2?.teamName}</span>
              {series.round === "ALDS" || series.round === "NLDS" ? (
                <span style={{ fontSize: 12, opacity: 0.5, paddingLeft: 4 }}>
                  (Bye)
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 46,
            borderLeft: "1px solid",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: 64,
            borderColor: accentColor,
          }}
        >
          <label
            htmlFor="winin"
            style={{
              fontSize: 10,
              fontWeight: 800,
              height: 10,
              paddingTop: 2,
              letterSpacing: 0.5,
            }}
          >
            Win In
          </label>
          <div style={{ height: 10 }} />
          <select
            name="winin"
            style={{
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
              color: textColor,
              height: 20,
              fontSize: 16,
              fontWeight: 400,
            }}
            title="Win in how many games?"
            value={defaultValue ? defaultValue : 0}
            onChange={handleWinIn}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default PickablePairing;
