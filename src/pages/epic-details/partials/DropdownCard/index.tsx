// import { DropDownContainer } from "./styles";
// import { ReactNode, useState, useEffect, useRef } from "react";
// import { onGetColorPhase } from "@/styles/color";

// interface DropDownCards {
//   title: string;
//   projectName: string;
//   children: ReactNode;
//   isDropDown: boolean;
// }

// const iconArrow = (color: string) => (
//   <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" overflow="hidden">
//     <g transform="translate(-415 -110)">
//       <path d="M431.823 113.82 424.5 125.18 417.177 113.82Z" fill={color} />
//     </g>
//   </svg>
// );

// export function DropDownCards({ projectName, title, isDropDown, children }: DropDownCards) {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const dropDownRef = useRef<HTMLDivElement>(null); // Adicionando tipo explícito

//   const isOpenDropDown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <DropDownContainer ref={dropDownRef} $isOpen={isOpen} $color={onGetColorPhase(projectName).secundary}>
//       <div className="phases-dropdown-title">
//         <button onClick={() => isOpenDropDown()}>
//           <h2>{title}</h2>{isDropDown && iconArrow(onGetColorPhase(projectName).secundary)}
//         </button>
//       </div>

//       {isDropDown && <div className="dropdown">{children}</div>}
//     </DropDownContainer>
//   );
// }


import { DropDownContainer } from "./styles";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { onGetColorPhase } from "@/styles/color";

interface DropDownCards {
  title: string;
  projectName: string;
  children: ReactNode;
  isDropDown: boolean;
}

const iconArrow = (color: string) => (
  <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" overflow="hidden">
    <g transform="translate(-415 -110)">
      <path d="M431.823 113.82 424.5 125.18 417.177 113.82Z" fill={color} />
    </g>
  </svg>
);


// ...

export function DropDownCards({ projectName, title, isDropDown, children }: DropDownCards) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const isOpenDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropDownContainer ref={dropDownRef} $isOpen={isOpen} $color={onGetColorPhase(projectName).secundary}>
      <div className="phases-dropdown-title">
        <button onClick={() => isOpenDropDown()}>
          <h2>{title}</h2>{isDropDown && iconArrow(onGetColorPhase(projectName).secundary)}
        </button>
      </div>

      {isDropDown && (
        <div className="dropdown">
          {React.Children.map(children, (child) => {
            return child ? React.cloneElement(child as React.ReactElement, { onClick: handleItemClick }) : null;
          })}
        </div>
      )}
    </DropDownContainer>
  );
}

