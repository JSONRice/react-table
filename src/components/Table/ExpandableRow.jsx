import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from '@emotion/styled'
import { NewRow } from "./";

const ExpandableSection = styled.section`
  > summary {
    list-style: none;
    cursor: pointer;
  }

  > summary::-webkit-details-marker {
    display: none;
  }
`;

const Lines = styled.section`
  > div > :nth-child(2) {
    padding-left: 20px;
  }
`;

const ExpandableRow = ({
  columnConfiguration,
  currencyCode,
  expandAll,
  expandableSubRowsKey,
  row,
  viewType,
  showExpandAll
}) => {
  const [open, toggleOpen] = useState(false);
  const startExpanded = row.expanded === true;
  if (startExpanded && !open) {
    toggleOpen(true);
  }

  // an effect that watches the expandAll and runs when that updates
  useEffect(() => {
    toggleOpen(expandAll);
  }, [expandAll]);

  return (
    <ExpandableSection>
      <NewRow
        showExpandAll={showExpandAll}
        row={row}
        columnConfiguration={columnConfiguration}
        currencyCode={currencyCode}
        expandedState={open}
        expand={() => toggleOpen(!open)}
        viewType={viewType}
      />
      {open && (
        <Lines>
          {row[expandableSubRowsKey].map((line, lineIndex) => (
            <NewRow
              showExpandAll={showExpandAll}
              row={line}
              columnConfiguration={columnConfiguration}
              currencyCode={currencyCode}
              line
              key={`rowLine_${lineIndex}`}
              viewType={viewType}
            />
          ))}
        </Lines>
      )}
    </ExpandableSection>
  );
};

ExpandableRow.defaultProps = {
  showExpandAll: true
};

ExpandableRow.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencyCode: PropTypes.string,
  expandableSubRowsKey: PropTypes.string,
  expandAll: PropTypes.bool,
  row: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
  showExpandAll: PropTypes.bool
};

export default ExpandableRow;
