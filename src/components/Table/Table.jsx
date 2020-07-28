import React, {Component} from "react";
import PropTypes from "prop-types";
import {Rows, Headers} from "./";
import {ColumnConfiguration} from "../../utils/column-configuration";

/**
 * The Table component provides table based API functionality for sorting,
 * filtering, searching, etc. It also renders the rows and columns based on the data received
 * Developers are responsible for passing proper data that can be displayed in a table.
 * Column configuration data is also required, which defines the columns that will be displayed.
 *
 * DOCS
 * 1. Width's of all columns provided should total => 100 - (arrow column width)
 * Arrow Column Width Amount by Viewtype:
 *  - Desktop: 2.5%
 *  - Tablet: 10%
 *  - Mobile: 7%
 */
const DEFAULT_KEY = "*";

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandAll: false,
      expandedRows: [],
      overridenSortAsc: undefined,
      sortMultiplier: props.defaultSortAsc ? 1 : -1,
      sortKey: undefined,
      sortType: "string",
      filterPairs: this.props.filterPairs
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.filterPairs !== prevProps.filterPairs && this.props.filterPairs !== this.state.filterPairs) {
      this.setState({filterPairs: this.props.filterPairs});
    }
  }

  /**
   * Expands a row based on the row index. If no row index is provided toggle expands all the rows.
   * Keep in mind that by default expandAll is false so if no rowIndex is provided then the expandAll is applied (set
   * to true).
   *
   * @param rowIndex
   */
  expand = rowIndex => {
    let {expandAll, expandedRows} = this.state;
    if (rowIndex || rowIndex === 0) {
      this.setState({
        expandedRows: expandedRows.includes(rowIndex)
          ? expandedRows.filter(item => item !== rowIndex)
          : [...expandedRows, rowIndex]
      });
    } else {
      this.setState({
        expandAll: !expandAll,
        expandedRows: !expandAll ? this.props.data.map((_, index) => index) : []
      });
    }
  };

  sortRows = (a, b) => {
    let {sortKey, overridenSortAsc, sortMultiplier, sortType} = this.state;
    const {defaultSortKey, defaultSortType} = this.props;

    let activeSortType = sortType || defaultSortType;
    let activeSortKey = sortKey || defaultSortKey;

    // Overriden sort asc is utilized by dropdowns and other sort invoking components that want to override the
    // sort order to match their behavior. See the third storybook for table.
    if (overridenSortAsc === true) {
      sortMultiplier = 1;
    } else if (overridenSortAsc === false) {
      sortMultiplier = -1;
    }

    let aVal;
    let bVal;

    // Date string types
    if (activeSortType === "date") {
      aVal = new Date(a[activeSortKey]).getTime();
      bVal = new Date(b[activeSortKey]).getTime();
    }
    // link element type
    else if (activeSortType === "linkElement") {
      aVal = a.linkElementSortValue;
      bVal = b.linkElementSortValue;
    }
    // All other types - strings and numbers
    else {
      aVal = a[activeSortKey];
      bVal = b[activeSortKey];
    }

    if (aVal > bVal) {
      return sortMultiplier;
    } else if (aVal < bVal) {
      return -sortMultiplier;
    } /* equality */ else {
      return 0;
    }
  };

  sort = (key, dataType = "string", overridenSortAsc = undefined) => {
    let {sortKey, sortMultiplier} = this.state;
    this.setState({
      overridenSortAsc,
      sortKey: key,
      sortMultiplier: sortKey === key ? sortMultiplier * -1 : 1,
      sortType: dataType
    });
  };

  // One level deep
  filter = (filterValue, filterKey = DEFAULT_KEY, filterType = "string") => {
    let {filterPairs} = this.state;
    let pairs = null;
    if (filterValue) {
      if (filterType === "string") {
        filterValue = filterValue.toLowerCase();
      }
      // Append the new filter key-value pair to the filtered pairs map and re-render the component
      pairs = {
        ...filterPairs,
        [filterKey]: {filterValue, filterType}
      };
      this.setState({
        filterPairs: pairs
      });
    } else {
      delete filterPairs[filterKey];
      this.setState({
        filterPairs
      });
    }
    return pairs ? pairs : this.state.filterPairs;
  };

  clear = () => {
    this.setState({
      filterPairs: []
    });
  };

  filterAll = filterKey => {
    const {expandableSubRowsKey} = this.props;
    return a => {
      if (!filterKey) {
        return true;
      }
      return Object.keys(a).find(b => {
        let topLevelMatch = this.compareRecord(a[b], filterKey);
        // If any lines match return true else return false
        let linesMatched = false;
        if (a[expandableSubRowsKey] && a[expandableSubRowsKey].length > 0) {
          linesMatched = a[expandableSubRowsKey]
            .map(record => {
              // If any key in the record equals the filter key return true
              return Object.keys(record).some(r => {
                return this.compareRecord(record[r], filterKey);
              });
            })
            .includes(true);
        }
        return topLevelMatch || linesMatched;
      });
    };
  };

  // If the record matches the filter key return true else return false
  compareRecord = (record, filterKey) => {
    if (record && !Array.isArray(record)) {
      return (
        record
          .toString()
          .toLowerCase()
          .indexOf(filterKey.toLowerCase()) > -1
      );
    }
    return false;
  };

  toggleExpandAll = () => {
    this.setState({expandAll: !this.state.expandAll});
  };

  render() {
    let {
      columnConfiguration,
      children,
      currencyCode,
      data = [],
      dataQa,
      defaultSortKey,
      defaultSortType,
      disableAlternatingRowColors,
      expandableSubRowsKey,
      hideHeadersTopBorder,
      loading,
      showExpandAll,
      sortEnabled
    } = this.props;
    let {expandAll, filterPairs, sortKey, sortMultiplier, overridenSortAsc} = this.state;
    let rows = Object.keys(filterPairs).reduce((acc, key) => {
      let filterValue = filterPairs[key].filterValue;
      let filterType = filterPairs[key].filterType;
      if (key === "*") {
        return acc.filter(this.filterAll(filterValue, filterType));
      } else {
        return acc.filter(item => {
          if (item[key]) {
            return (
              item[key]
                .toString()
                .toLowerCase()
                .indexOf(filterValue.toString().toLowerCase()) > -1
            );
          }
        });
      }
    }, data);

    if (columnConfiguration) {
      rows = rows.map(row => {
        return {...row, expanded: false};
      });
    }

    // If there is a sort key or default sort key apply that to the final set:
    if (sortEnabled && (sortKey || defaultSortKey)) {
      rows.sort(this.sortRows);
    }

    let sortAsc = sortMultiplier === 1;
    sortAsc = overridenSortAsc !== undefined ? overridenSortAsc : sortAsc;

    const renderTable = (viewType = "desktop") => {
      let columns = columnConfiguration.desktop;

      if ((viewType === "tablet" || viewType === "mobile") && columnConfiguration.tablet) {
        columns = columnConfiguration.tablet;
      }

      if (viewType === "mobile" && columnConfiguration.mobile) {
        columns = columnConfiguration.mobile;
      }

      return (
        <article>
          <Headers
            sort={sortEnabled ? this.sort : false}
            columnConfiguration={columns}
            expandAll={expandAll}
            toggleExpandAll={() => {
              this.toggleExpandAll();
            }}
            showExpandAll={showExpandAll}
            viewType={viewType}
            sortAsc={sortAsc}
            activeSortKey={sortKey || defaultSortKey}
            defaultSortType={defaultSortType}
            hideHeadersTopBorder={hideHeadersTopBorder}
          />
          {(rows && rows.length > 0) || loading ? (
              <Rows
                showExpandAll={showExpandAll}
                expandableSubRowsKey={expandableSubRowsKey}
                rows={rows}
                columnConfiguration={columns}
                currencyCode={currencyCode}
                expandAll={expandAll}
                viewType={viewType}
                loading={loading}
                disableAlternatingRowColors={disableAlternatingRowColors}
              />
            ) :
            <span>No results</span>
          }
        </article>
      );
    };

    // Return the children with the exposed Table API functions:
    return (
      <>
        {children &&
        children({
          expand: this.expand,
          expandedRows: this.state.expandedRows,
          rows,
          sort: this.sort,
          filter: this.filter,
          clear: this.clear,
          filterPairs: this.state.filterPairs
        })}
        {columnConfiguration && (<>{renderTable("desktop")}</>)}
      </>
    );
  }
}

/**
 * filterPairs starts off with an asterisk key and this represents no filtering (wildcard).
 *
 * @type {{defaultSortAsc: boolean, showExpandAll: boolean, expandableSubRowsKey: string, filterPairs: {"*": {filterValue: string, filterType: string}}, sortEnabled: boolean, defaultSortType: string}}
 */
Table.defaultProps = {
  defaultSortAsc: true,
  defaultSortType: "string",
  expandableSubRowsKey: "lines",
  filterPairs: {"*": {filterValue: "", filterType: "string"}},
  showExpandAll: true,
  sortEnabled: false,
};

Table.propTypes = {
  columnConfiguration: PropTypes.instanceOf(ColumnConfiguration),
  currencyCode: PropTypes.string,
  data: PropTypes.array,
  dataQa: PropTypes.string,
  defaultSortAsc: PropTypes.bool,
  defaultSortKey: PropTypes.string,
  defaultSortType: PropTypes.oneOf(["string", "date", "number"]),
  disableAlternatingRowColors: PropTypes.bool,
  expandableSubRowsKey: PropTypes.string,
  hideHeadersTopBorder: PropTypes.bool,
  loading: PropTypes.bool,
  noResultsBannerTitle: PropTypes.string,
  noResultsBannerText: PropTypes.string,
  noResultsBannerIsDismissible: PropTypes.bool,
  showExpandAll: PropTypes.bool,
  sortEnabled: PropTypes.bool
};
