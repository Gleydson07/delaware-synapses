export const onGetColorPhaseStatus = (status: number) => {
  const colorMap: Record<string, { primary: string; secundary: string }> = {
    1: { primary: "#ACACAC", secundary: "#dfdede" },
    2: { primary: "#FFC000", secundary: "#FFF2CC" },
    3: { primary: "#C42828", secundary: "#F3D4D4" },
    4: { primary: "#45A49E", secundary: "#DAEDEC" },
  };

  return colorMap[status] || { bg: "", color: "" };
};

export const onGetColorPhase = (phase: string) => {
  const colorMap: Record<string, { primary: string; secundary: string }> = {
    prepare: { primary: "#a5b3c5", secundary: "#69809f" },
    explore: { primary: "#f4b183", secundary: "#ed7d31" },
    realize: { primary: "#a9d18e", secundary: "#70AD47" },
    deploy: { primary: "#f66", secundary: "#FF0000" },
    run: { primary: "#ab74d5", secundary: "#7030A0" },
  };

  return colorMap[phase.toLocaleLowerCase()] || { primary: "", secundary: "" };
};