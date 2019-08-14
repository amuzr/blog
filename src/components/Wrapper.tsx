import * as React from 'react';
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  max-width: 900px;
  padding: 0 2em;

  @media (max-width: 500px) {
    .wrapper_minimal {
      padding: 0 4vw;
    }
  }
`;

interface WrapperProps {
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => (
  <StyledWrapper className={className}>{children}</StyledWrapper>
);

export default Wrapper;
