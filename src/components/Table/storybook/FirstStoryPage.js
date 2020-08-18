import React, {Component} from "react";
import styled from '@emotion/styled'
import {Table} from "../Table";
import data from "./story_test_data.js";
import {ColumnConfiguration} from "../../../utils/column-configuration";

let Row = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

let Cell = styled.div`
    padding: 4px 8px;
`;

let Header = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

let Filter = styled.div`
  display: flex;
  & * {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

let Container = styled.div`
  padding: 0 50px 50px 50px;
`;

const TableWrapper = styled.div`
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 5px;
`;

/***
 * Only used in the storybook
 */
class FirstStoryPage extends Component {

  state = {
    data: data,
    filterText: "",
    filterKey: ""
  };

  /**
   * Expand a row callback
   *
   * @param id
   */
  expand = id => {
    let results = this.state.data.map(d => {
      if (d.id === id) d.expand = !d.expand;
      return d;
    });

    this.setState({
      data: results
    });
  };

  render() {
    let {data} = this.state;

    const tableConfiguration = [
      {
        key: "section",
        header: "Section",
        justifyContent: "flex-start",
        sortType: "string"
      },
      {
        key: "verse",
        header: "Verse",
        sortType: "number"
      },

      {
        key: "date",
        header: "Date",
        sortType: "date"
      },
      {
        key: "text",
        header: "Text",
        sortType: "string"
      }
    ];

    const columns = new ColumnConfiguration({
      desktop: tableConfiguration,
      tablet: tableConfiguration,
      mobile: tableConfiguration
    });

    return (
      <Container>
        <Table data={data} columnConfiguration={columns} showExpandAll={false} sortEnabled/>
      </Container>
    );
  }
}

export default FirstStoryPage;
