import styled from '@emotion/styled'

export const Row = styled.div`
  display: flex;
  padding: 10px;

  background-color: ${props => !props.isLine ? props.id % 2 !== 0 ? "lightgrey" : "transparent" : props.parentIndex % 2 !== 0 ? "lightgrey" : "transparent"};
`;