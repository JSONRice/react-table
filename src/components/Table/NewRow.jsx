import React from "react";
import PropTypes from "prop-types";
import styled from '@emotion/styled'
import { Cell } from "./";
import { Icon } from "../Icon";
import { column } from "../../utils/prop-shapes/column";
import { ColumnConfigurationHelperFunctions } from "../../utils/column-configuration";

const Row = styled.div`
  display: flex;
  padding: 10px;

  min-height: 50px;
  align-items: center;
`;

const calcBalance = row => {
  return (
    row.budgetAssignedAmount + row.previousActivityAmount + row.incomeAmount + row.expenseAmount + row.transferAmount
  );
};

const getCellData = ({ row, data, column, options }) => {
  if (column.type) {
    switch (column.type) {
      case "link":
        if (
          options &&
          !options.line &&
          column.link &&
          column.link.linesOnlyLinkParentNotLink &&
          row &&
          row.lines &&
          row.lines.length > 0
        ) {
          return data;
        }
        let hooks;
        if (
          column.link &&
          column.link.href &&
          ((column.link.filterKey && column.link.filterLinkHooksRefKeys) || column.link.columnLinkHooksRefKeys)
        ) {
          let columnHooks = {};
          let filterHooks = {};
          // get keys from row
          if (column.link.columnLinkHooksRefKeys) {
            columnHooks = ColumnConfigurationHelperFunctions.getHooks(column.link.columnLinkHooksRefKeys, row);

            if (column.link.columnLinkHooksRefKeys.includes("onlyNullUnitSubcategory")) {
              columnHooks.onlyNullUnitSubcategory = row.unitSubcategoryName !== null && row.unitSubcategoryId === null;
            }
          }

          hooks = Object.assign(filterHooks, columnHooks);
        }

        return (
          <a href={column.link.href} target={column.link.newTab ? "_blank" : "_self"}>
            {data}
          </a>
        );
      default:
        return data;
    }
  }
  return data;
};

const NewRow = ({ row, columnConfiguration, currencyCode, expandedState, expand, line, viewType, showExpandAll }) => {
  let rowSpacingColumnWidth = "2.5%";
  if (viewType === "tablet") {
    rowSpacingColumnWidth = "10%";
  }
  if (viewType === "mobile") {
    rowSpacingColumnWidth = "7%";
  }
  return (
    <Row>
      {showExpandAll && (
        <Cell width={rowSpacingColumnWidth} onClick={expand}>
          {expandedState !== undefined && expand && <Icon name="triangleRight" expand={expandedState} />}
        </Cell>
      )}
      {columnConfiguration.map((column, index) => (
        <Cell
          key={`row_${(line || line === undefined) && column.lineKey ? column.lineKey : column.key}_${index}`}
          width={column.width ? column.width : `${100 / columnConfiguration.length}%`}
          justifyContent={column.justifyContent || "flex-start"}
        >
          {getCellData({
            data: row[column.lineKey && row[column.lineKey] ? column.lineKey : column.key],
            column,
            row,
            options: { currencyCode, line }
          })}
        </Cell>
      ))}
    </Row>
  );
};

NewRow.defaultProps = {
  line: false,
  showExpandAll: true
};

NewRow.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)),
  currencyCode: PropTypes.string,
  expandedState: PropTypes.bool,
  expand: PropTypes.func,
  line: PropTypes.bool,
  row: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
  showExpandAll: PropTypes.bool
};

export default NewRow;
