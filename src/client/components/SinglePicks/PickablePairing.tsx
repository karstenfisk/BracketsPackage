import { PickablePairingProps } from "../../types/index";
import React, { useState } from "react";
import { removeTeamFromLaterRounds, advanceTeam } from "../../utils/index";

const PickablePairing = ({
  rounds,
  match,
  textColor = "",
  accentColor = "",
  matchColor = "",
  setPickMatches,
  pickMatches,
}: PickablePairingProps) => {
  const [selected, setSelected] = useState<Number | null>();

  const {
    homeTeam,
    awayTeam,
    round,
    advanceTo,
    advancingTeam,
    homeTeamId,
    awayTeamId,
    gameNumber,
  } = match;

  const handlePick = (selectedTeam: "home" | "away") => {
    const currentPick = selected;

    const clicked = selectedTeam === "home" ? homeTeamId : awayTeamId;
    const otherTeam = selectedTeam === "home" ? awayTeamId : homeTeamId;

    if (currentPick === clicked && clicked) {
      setPickMatches((prevState) =>
        removeTeamFromLaterRounds({ ...prevState }, match.gameNumber, clicked)
      ); // Set the updated bracket
      setSelected(null);
      return;
    }

    if (currentPick === otherTeam && otherTeam) {
      setPickMatches((prevState) =>
        removeTeamFromLaterRounds({ ...prevState }, match.gameNumber, otherTeam)
      );
      setSelected(clicked);
    }

    // Send advanceTo, advancingTeam, and winning team to the next round.
    const winner = clicked === homeTeam?.teamId ? homeTeam : awayTeam;
    if (winner) {
      setPickMatches((prevState) =>
        advanceTeam(
          { ...prevState },
          advanceTo,
          advancingTeam,
          winner,
          gameNumber
        )
      );
      setSelected(winner.teamId); // Update selected state
    }
    return;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "16rem",
          border: "solid",
          borderWidth: "1px",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          cursor: "pointer",
          height: "4rem",
          borderColor: accentColor,
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            alignItems: "center",
            color: textColor,
            fontWeight: selected === match.homeTeamId ? "bold" : "normal",
            height: "50%",
          }}
          onClick={() => handlePick("home")}
        >
          <span>{homeTeam?.teamName}</span>
        </div>

        <div
          style={{
            width: "100%",
            borderBottom: "solid",
            borderWidth: "0.25px",
            borderColor: accentColor,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            alignItems: "center",
            color: textColor,
            fontWeight: selected === match.awayTeamId ? "bold" : "normal",
            height: "50%",
          }}
          onClick={() => handlePick("away")}
        >
          <span>{awayTeam?.teamName}</span>
        </div>
      </div>
    </div>
  );
};

export default PickablePairing;
