import React from "react";
import renderer from "react-test-renderer";
import { Icon } from "../Icon";

describe("Icon", () => {
  const component = (
    <Icon
      name="triangleRight"
      toggleChildren={true}
      expand={true}
      onClick={() => {
        // noop
      }}
    >
      Here is a right triangle with toggle-able content.
    </Icon>
  );

  /**
   * On the first run of this test, Jest will generate a snapshot file automatically.
   * Run the following to update the snapshot (see package.json): npm run snapshot
   */
  it("renders successfully and matches snapshot", () => {
    const mounted = renderer.create(component).toJSON();
    expect(mounted).toMatchSnapshot();
  });
});
