'use client';
import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 500px;
  width: 400px;

  .toast{
    padding: 10px;
    font-size: 20px;

    font-family: 'Open Sans', sans-serif;
  }

  h1{
    font-family: 'Open Sans';
    font-size: 2.5rem;
  }

  .buttonsWrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 100%;
  }

  button, a{
    width: 100%;
    border: none;
  }

  .separator{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 100%;
  }

  .separator::before{
    content: '';

    width: 40%;
    height: 1px;

    background-color: black;
  }

  .separator::after{
    content: '';

    width: 40%;
    height: 1px;

    background-color: black;
  }

  @media(max-width: 300px){
    width: 100%;
  }

`;