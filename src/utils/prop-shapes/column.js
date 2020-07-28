import PropTypes from "prop-types";

export const column = {
  columnLinkHooksRefKeys: PropTypes.array, // represents hooks for the href
  key: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  justifyContent: PropTypes.string,
  lineKey: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
  }),
  type: PropTypes.oneOf(["link", "percent"]),
  width: PropTypes.string
};
