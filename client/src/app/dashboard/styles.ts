'use client';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  height: 100vh;

  main{
    display: flex;

    flex: 1;
    width: 100%;
  }

  @media (max-width: 900px){
    main{
      flex-direction: column;
      
      gap: 20px;
      margin-top: 0;
    }
  }
`;
