import React  from "react";
import styled from '@emotion/styled'
import { Table } from "../Table";
import { ColumnConfiguration } from "../../../utils/column-configuration";

let Container = styled.div`
  padding: 0 50px 50px 50px;
`;

const tableConfiguration = [
  {
    key: "name",
    header: "Name",
    justifyContent: "flex-start",
    sortType: "string"
  },
  {
    key: "date",
    header: "Date",
    sortType: "date"
  },
  {
    key: "number",
    header: "Number",
    sortType: "number"
  },
  {
    key: "link",
    header: "Simple Link",
    sortType: "string",
    link: {
      href: "/",
      columnLinkHooksRefKeys: ["name", "number"],
      newTab: true
    },
    type: "link"
  },
  {
    key: "special_link",
    header: "Special Link",
    sortType: "linkElement"
  }
];

const special_link = (
  <div>
    <span>
      <a href="www.google.com">PDF Image and text or something</a>
    </span>
  </div>
);

const data = [
  {
    name: "Hello There",
    date: "May 25, 1977",
    number: 62,
    link: "A Link Text",
    special_link,
    linkElementSortValue: 1
  },
  {
    name: "Tragedy of DP the Wise",
    date: "May 19, 2005",
    number: 59,
    link: "Could be anything",
    special_link,
    linkElementSortValue: 3
  },
  {
    name: "Like my father before me",
    date: "May 25, 1983",
    number: 26,
    link: "Even this",
    special_link,
    linkElementSortValue: 2
  }
];

export const TableSorting = () => {
  const columns = new ColumnConfiguration({
    desktop: tableConfiguration,
    tablet: tableConfiguration,
    mobile: tableConfiguration
  });

  return (
    <Container>
      <Table data={data} columnConfiguration={columns} showExpandAll={false} sortEnabled />
    </Container>
  );
};
