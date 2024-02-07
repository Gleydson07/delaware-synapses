import { DropDownContainer } from "./styles";
import { ReactNode, useState, useEffect, useRef } from "react";
import { onGetColorPhase } from "@/styles/color";
import { iconArrow } from "@/assets/iconsTSX/icons";

interface DropDownCards {
  title: string;
  projectName: string;
  children: ReactNode;
  isDropDown: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function DropDownCards({
  isOpen,
  projectName,
  title,
  isDropDown,
  children,
  onClick
}: DropDownCards) {
  return (
    <DropDownContainer $isOpen={isOpen} $color={onGetColorPhase(projectName).secondary}>
      <div className="phases-dropdown-title">
        <button onClick={onClick}>
          <h2>{title}</h2>{isDropDown && iconArrow(onGetColorPhase(projectName).secondary)}
        </button>
      </div>

      {isDropDown && <div className="dropdown">{children}</div>}
    </DropDownContainer>
  );
}
