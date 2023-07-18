'use client';

import { useState, useEffect } from "react";
import Header from "../_components/header";
import ClockDisplay from "./_components/clock";
import PunchSelect from "./_components/punchSelect";
import PunchId from "./_components/punchId";
import PunchConfirm from "./_components/punchConfirm";

export default function Punches(): JSX.Element {
  const [punchChoice, setPunchChoice] = useState("in");
  const [visibleComponent, setVisibleComponent] = useState("punchSelect");

  return (
    <div className="h-screen space-y-16 p-6">
      <div className="flex justify-between">
        <Header />
        <ClockDisplay />
      </div>

      {visibleComponent === "punchSelect" && (
        <PunchSelect
          setPunchChoice={setPunchChoice}
          setVisibleComponent={setVisibleComponent}
        />
      )}
      {visibleComponent === "punchId" && (
        <PunchId setVisibleComponent={setVisibleComponent} />
      )}
      {visibleComponent === "punchConfirm" && (
        <PunchConfirm
          punchChoice={punchChoice}
          setVisibleComponent={setVisibleComponent}
        />
      )}
    </div>
  );
}
