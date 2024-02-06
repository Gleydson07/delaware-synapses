export const onGetColorPhaseStatus = (status: number) => {
  const colorMap: Record<string, { primary: string; secondary: string }> = {
    1: { primary: "#eee", secondary: "#ACACAC" },
    2: { primary: "#FFF2CC", secondary: "#FFC000" },
    3: { primary: "#F3D4D4", secondary: "#C42828" },
    4: { primary: "#DAEDEC", secondary: "#45A49E" },
  };

  return colorMap[status] || { bg: "", color: "" };
};

export const onGetColorPhase = (phase: string) => {
  const colorMap: Record<string, { primary: string; secondary: string }> = {
    prepare: { primary: "#a5b3c5", secondary: "#69809f" },
    explore: { primary: "#f4b183", secondary: "#ed7d31" },
    realize: { primary: "#a9d18e", secondary: "#70AD47" },
    deploy: { primary: "#f66", secondary: "#FF0000" },
    run: { primary: "#ab74d5", secondary: "#7030A0" },
  };

  return colorMap[phase.toLocaleLowerCase()] || { primary: "", secondary: "" };
};