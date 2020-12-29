import React from "react";
import styled from "styled-components";

interface IButton {
  label: string;
  color: "red" | "green";
  clickHandler?: (param: any) => void;
}

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  font-size: 2rem;
  align-self: center;
`;

const Button: React.FC<IButton> = ({ label, color, clickHandler }) => {
  return (
    <StyledButton onClick={clickHandler} color={color}>
      {label}
    </StyledButton>
  );
};

export default Button;
