import classNames from "classnames";
import styled from "@emotion/styled";
import "./icon.css";
import { theme } from "../../theme";

const StyledIcon = styled.div`
  .ui__icon__wrapper {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: 0.2s linear;
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    overflow: hidden;

    &.hover:hover {
      background-color: ${theme.bgColor};
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 22px;
      height: 22px;
      transition: 0.15s linear;
      background-color: ${({ color }) => color || theme.textColor};
    }

    &.xs {
      width: 18px;
      height: 18px;

      .icon {
        width: 16px;
        height: 16px;
      }

      &.hover {
        width: 26px;
        height: 26px;
      }
    }

    &.sm {
      width: 20px;
      height: 20px;

      .icon {
        width: 18px;
        height: 18px;
      }

      &.hover {
        width: 28px;
        height: 28px;
      }
    }

    &.xmd {
      width: 22px;
      height: 22px;

      .icon {
        width: 20px;
        height: 20px;
      }

      &.hover {
        width: 30px;
        height: 30px;
      }
    }

    &.md {
      width: 24px;
      height: 24px;

      .icon {
        width: 22px;
        height: 22px;
      }

      &.hover {
        width: 42px;
        height: 42px;
      }
    }

    &.lg {
      width: 30px;
      height: 30px;

      .icon {
        width: 28px;
        height: 28px;
      }

      &.hover {
        width: 48px;
        height: 48px;
      }
    }

    &.xl {
      width: 38px;
      height: 38px;

      .icon {
        width: 36px;
        height: 36px;
      }

      &.hover {
        width: 56px;
        height: 56px;
      }
    }
  }
`;
const Icon = ({ icon = "icon-settings", color = "", size = "md", hover = false, disabled = false, onClick = () => {}, mainOnClick = () => {}, className = "", mainClassName = "", iconClassName = "", scale = 1, rotate = 0, ...rest }) => {
  return (
    <StyledIcon className={mainClassName} onClick={mainOnClick} color={color} {...rest} {...{ scale, rotate, size }}>
      <div
        className={classNames(`ui__icon__wrapper ${className}`, {
          xs: size === "xs",
          sm: size === "sm",
          xmd: size === "xmd",
          md: size === "md",
          lg: size === "lg",
          xl: size === "xl",
          hover,
          white: color === "white",
          dark: color === "dark",
          green: color === "green",
          info: color === "info",
          success: color === "success",
          warning: color === "warning",
          danger: color === "danger",
          disabled,
        })}
        onClick={onClick}
        {...rest}
      >
        <div className={`icon ${icon} ${iconClassName}`} {...rest} />
      </div>
    </StyledIcon>
  );
};

export default Icon;
