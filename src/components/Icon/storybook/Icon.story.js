import {storiesOf} from "@storybook/react";
import React, {useState} from "react";
import styled from '@emotion/styled'
import {Icon} from "../Icon";

const StoryContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: start;
  margin-top: 30px;
  padding: 15px;
`;

const GroupedWithIcon = styled.div`
  display: flex;
`;

const IconStory = () => {
  let [ toggle, setToggle ] = useState(false);

  return (
    <>
      <StoryContainer>
        <Icon
          content={">"}
          toggleChildren={toggle}
          expand={toggle}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          &nbsp;Here is a right triangle with toggle-able content.
        </Icon>
        <br/>
        <Icon content={"V"} color="red">
          &nbsp;Here is a bottom red triangle
        </Icon>
        <br/>
        <GroupedWithIcon>
          <Icon content={">"}/>
          <div>&nbsp;This right arrow (chevron) fits nicely next to this text but is in its own element.</div>
        </GroupedWithIcon>
      </StoryContainer>
    </>
  )
}

storiesOf("Icon", module).add("Icon example", () => <IconStory />)
