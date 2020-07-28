import React from "react";
import PropTypes from "prop-types";
import styled from '@emotion/styled'
import { TableSortIcon } from "./TableSortIcon";

let Cell = styled.div`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  text-transform: uppercase;
  width: 0;
  padding-left: ${props => props.indent};
  justify-content: ${props => (props.justifyContent ? `${props.justifyContent} !important` : "flex-start")};
  ${props =>
    props.width &&
    `
      min-width: ${props.width};
      max-width: ${props.width};
    `}
`;

/*
 * If this column is currently being sorted on (sortActive) and a sort function is passed in then the sort icons are displayed
 * and onClick will activate a sort on that column. The default sort type is a string.
 */
export const HeaderCell = ({
  children,
  indent,
  justifyContent,
  sortType,
  sortFunction,
  sortKey,
  sortActive,
  sortAsc,
  width
}) => {
  return (
    <Cell
      width={width}
      justifyContent={justifyContent}
      indent={indent}
      onClick={() => {
        if (sortFunction && sortKey) {
          sortFunction(sortKey, sortType);
        }
      }}
    >
      {children}
      {sortActive && sortFunction && <TableSortIcon sortAsc={sortAsc} />}
    </Cell>
  );
};

HeaderCell.defaultProps = {
  sortType: "string",
  width: "16.66%"
};

HeaderCell.propTypes = {
  indent: PropTypes.string,
  justifyContent: PropTypes.string,
  sortType: PropTypes.string,
  sortAsc: PropTypes.bool,
  sortFunction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sortKey: PropTypes.string,
  sortActive: PropTypes.bool,
  width: PropTypes.string
};
