import React from "react";
import styled from '@emotion/styled'
import PropTypes from "prop-types";

const StyledIcon = styled.span`
  display: flex;
  cursor: ${props => (props.pointerCursor ? `pointer` : `default`)};
  flex-direction: ${props => props.flexDirection};
  justify-items: center;
  align-items: center;

  ::before {
    display: flex;
    font-size: 14px;
    color: ${props => props.color};
    content: '${props => props.content}';
    transform: ${props => props.expand && `rotate(${props.rotateDeg}deg)`};
  }
`;

export const Icon = ({
  children,
  color,
  content,
  expand,
  flexDirection,
  fontFamily,
  fontSize,
  hideChildren,
  name,
  onClick,
  pointerCursor,
  rotateDeg,
  className,
  transparent
}) => {
  return (
    <StyledIcon
      className={className}
      color={color}
      content={content}
      expand={expand}
      flexDirection={flexDirection}
      fontSize={fontSize}
      fontFamily={fontFamily}
      name={name}
      onClick={onClick}
      pointerCursor={pointerCursor}
      rotateDeg={rotateDeg}
      transparent={transparent}
    >
      <>{!hideChildren && children}</>
    </StyledIcon>
  );
};

Icon.propTypes = {
  color: PropTypes.string,
  content: PropTypes.string,
  expand: PropTypes.bool,
  flexDirection: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  hideChildren: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  pointerCursor: PropTypes.bool,
  rotateDeg: PropTypes.number,
  className: PropTypes.string,
  transparent: PropTypes.bool
};

Icon.defaultProps = {
  color: 'black',
  content: '>',
  expand: false,
  flexDirection: "row",
  fontSize: 10,
  hideChildren: false,
  pointerCursor: true,
  rotateDeg: 90,
  transparent: false
};
