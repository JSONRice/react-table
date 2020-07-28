import React from "react";
import PropTypes from "prop-types";
import styled from '@emotion/styled'
import { Header, HeaderCell } from "./";
import { Cell } from "./Cell";
import { Icon } from "../Icon";
import { column } from "../../utils/prop-shapes/column";

const ExpandAllCell = styled(Cell)`
  cursor: pointer;
`;

const Headers = ({
  columnConfiguration,
  expandAll,
  showExpandAll,
  sort,
  sortAsc,
  activeSortKey,
  toggleExpandAll,
  viewType,
  defaultSortType,
  hideHeadersTopBorder
}) => {
  let expandAllWidth = "2.5%";
  if (viewType === "tablet") {
    expandAllWidth = "10%";
  }
  if (viewType === "mobile") {
    expandAllWidth = "7%";
  }
  return (
    <Header hideBorderTop={hideHeadersTopBorder}>
      {showExpandAll && (
        <ExpandAllCell onClick={toggleExpandAll} width={expandAllWidth}>
          <Icon name="triangleRight" expand={expandAll} />
        </ExpandAllCell>
      )}
      {columnConfiguration.map(column => (
        <HeaderCell
          key={column.key}
          width={column.width ? column.width : `${100 / columnConfiguration.length}%`}
          justifyContent={column.justifyContent || "flex-start"}
          sortFunction={sort}
          sortAsc={sortAsc}
          sortActive={column.key === activeSortKey}
          sortKey={column.key}
          sortType={column.sortType || defaultSortType}
        >
          {typeof column.header === "function" ? column.header() : column.header}
        </HeaderCell>
      ))}
    </Header>
  );
};

Headers.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)).isRequired,
  expandAll: PropTypes.bool,
  showExpandAll: PropTypes.bool,
  sort: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sortAsc: PropTypes.bool,
  toggleExpandAll: PropTypes.func,
  viewType: PropTypes.string.isRequired,
  activeSortKey: PropTypes.string,
  defaultSortType: PropTypes.string,
  hideHeadersTopBorder: PropTypes.bool
};

export default Headers;
