import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

function loadStories() {
  const req = require.context("../src/components", true, /.story.js$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <>
    {story()}
  </>
));

const mountPointIds = [
  "popovers",
  "modals",
  "toasts"
];

mountPointIds.forEach(function(mountPointId) {
  if (document.getElementById(mountPointId) == null) {
    const $mountPoint = document.createElement("div");
    $mountPoint.setAttribute("id", mountPointId);
    document.body.append($mountPoint)
  }
});

configure(loadStories, module);

// See: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#addon-viewport-uses-parameters
addParameters({
  viewport: {
    /**
     * name to display in the dropdown
     * @type {String}
     */
    name: "Responsive",

    /**
     * Inline styles to be applied to the story (iframe).
     * styles is an object whose key is the camelCased version of the style name, and whose
     * value is the style’s value, usually a string
     * @type {Object}
     */
    styles: {
      width: "100%",
      height: "100%"
    },

    /**
     * type of the device (e.g. desktop, mobile, or tablet)
     * @type {String}
     */
    type: "desktop",

    viewports: {
      ...INITIAL_VIEWPORTS,
      /* Add any additional custom viewports here. Just follow the same format as is in INITIAL_VIEWPORTS. */
    }
  }
});
