import styled, { css } from "styled-components";

const buttonVariants = {
  primary: "purple",
  secondary: "blue",
  success: "green",
  danger: "red",
};

export type ButtonVariant = keyof typeof buttonVariants;

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 2px;
  margin: 5px;

  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};

  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }} */
`;
