import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 0 20px;

  width: 100%;
  height: 40px;

  border: none;
  border-bottom: 1px solid #e1e1e1;
  background-color: white;

  font-family: 'Montserrat';
  font-weight: 400;

  cursor: pointer;
  transition: filter .3s;
  &:hover{
    filter: brightness(0.9);
  }
`;
