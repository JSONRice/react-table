import styled from '@emotion/styled'

export const Header = styled.div`
  display: flex;
  border-top: ${({ hideBorderTop }) =>
    hideBorderTop ? "none" : `1px solid black`};
  border-bottom: 1px solid black;
  text-transform: uppercase;
  padding: 0.7143em;
  > :nth-child(n + 3) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
