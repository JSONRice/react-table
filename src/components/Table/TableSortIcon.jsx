import React from "react";
import styled from '@emotion/styled'
import PropTypes from "prop-types";
import { Icon } from "../Icon";

const Container = styled.div`
  padding: 0 3px;
  display: flex;
  align-items: center;
`;

export const TableSortIcon = ({ sortAsc }) => (
  <Container>
    <Icon name={sortAsc ? "arrowDown" : "arrowUp"} fontSize={12} color="black" />
  </Container>
);

TableSortIcon.propTypes = {
  sortAsc: PropTypes.bool.isRequired
};
