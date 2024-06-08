import styled from "styled-components";

export const CountdownContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};

  display: flex;
  gap: 1rem;

  span {
    font-family: "Roboto Mono", monospace;
    font-size: 10rem;
    line-height: 8rem;

    background-color: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;

  padding: 2rem 0;
  color: ${(props) => props.theme["green-500"]};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
