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
        advanceTeam({ ...prevState }, advanceTo, advancingTeam, winner)
      ); // Set the updated bracket
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
          justifyContent: "space-between",
          cursor: "pointer",
          height: "4rem",
          borderColor: accentColor,
          backgroundColor: matchColor,
        }}
      >
        <div
          style={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            display: "flex",
            justifyContent: "center",
            height: "1.5rem",
            alignItems: "center",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            color: textColor,
            fontWeight: selected === match.homeTeamId ? "bold" : "normal",
          }}
          onClick={() => handlePick("home")}
        >
          {homeTeam?.teamName}
        </div>

        <div
          style={{
            width: "100%",
            borderBottom: "solid",
            borderWidth: "0.25",
            borderColor: accentColor,
          }}
        />

        <div
          style={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
            color: textColor,
            fontWeight: selected === match.awayTeamId ? "bold" : "normal",
          }}
          onClick={() => handlePick("away")}
        >
          {awayTeam?.teamName}
        </div>
      </div>
    </div>
  );
};

export default PickablePairing;
