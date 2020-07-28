import React from "react";
import PropTypes from "prop-types";
import { ExpandableRow, NewRow } from "./";
import styled from '@emotion/styled'
import { Spinner } from "../Spinner";
import { column } from "../../utils/prop-shapes/column";

const RowsContainer = styled.section`
  width: 100%;

  > :nth-child(odd) {
    background-color: ${({ disableAlternatingRowColors }) =>
      disableAlternatingRowColors ? "transparent" : "lightgrey"};
  }
  > :nth-child(even) {
    background-color: transparent;
  }
`;

const Rows = ({
  columnConfiguration,
  currencyCode,
  disableAlternatingRowColors,
  expandableSubRowsKey,
  expandAll,
  loading,
  rows,
  viewType,
  showExpandAll
}) => {
  if (!rows || rows.length === 0 || loading) {
    return <Spinner delay={300} />;
  }

  return (
    <RowsContainer disableAlternatingRowColors={disableAlternatingRowColors}>
      {rows.map((row, rowIndex) => {
        if (row && row[expandableSubRowsKey] && row[expandableSubRowsKey].length > 0) {
          return (
            <ExpandableRow
              showExpandAll={showExpandAll}
              row={row}
              columnConfiguration={columnConfiguration}
              currencyCode={currencyCode}
              expandAll={expandAll}
              expandableSubRowsKey={expandableSubRowsKey}
              key={`row${rowIndex}`}
              viewType={viewType}
            />
          );
        }
        return (
          <NewRow
            showExpandAll={showExpandAll}
            row={row}
            columnConfiguration={columnConfiguration}
            currencyCode={currencyCode}
            viewType={viewType}
            key={`row${rowIndex}`}
          />
        );
      })}
    </RowsContainer>
  );
};

Rows.defaultProps = {
  showExpandAll: true
};

Rows.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)).isRequired,
  currencyCode: PropTypes.string,
  disableAlternatingRowColors: PropTypes.bool,
  expandAll: PropTypes.bool,
  expandableSubRowsKey: PropTypes.string,
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  viewType: PropTypes.string.isRequired,
  showExpandAll: PropTypes.bool
};

export default Rows;
