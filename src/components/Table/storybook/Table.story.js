import React from "react";
import { storiesOf } from "@storybook/react";
import FirstStoryPage from "./FirstStoryPage";
import SecondStoryPage from "./SecondStoryPage";
import ThirdStoryPage from "./ThirdStoryPage";
import { TableSorting } from "./TableSorting";

storiesOf("Table", module)
  .add("Default with column configuration", () => <FirstStoryPage />)
  .add("Multi-level Filtering", () => <SecondStoryPage />)
  .add("Default sorting with custom data types (date)", () => <ThirdStoryPage />)
  .add("Table with links", () => <TableSorting />);
