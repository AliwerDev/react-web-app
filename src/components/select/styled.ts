import styled from "@emotion/styled";
import { theme } from "../../theme";

const StyledSelectContainer = styled.div`
  margin-bottom: 15px;

  .react-select-error {
    .react-select__control {
      border: 1px solid ${theme.errorColor} !important;
    }
  }

  .react-select__control {
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
    color: ${theme.textColor} !important;
    border: 1px solid ${theme.borderColor} !important;
    background-color: ${theme.bgColor} !important;
    box-shadow: none !important;

    .react-select__input {
      color: ${theme.textColor} !important;
    }

    &:hover {
      border-color: ${theme.linkColor};
    }
  }

  .react-select__control--is-focused {
    outline: 2px solid ${theme.borderColor} !important;
  }

  .react-select__placeholder {
    color: ${theme.hintColor} !important;
  }
  .react-select__single-value {
    color: ${theme.textColor} !important;
  }

  .react-select__value-container {
    padding-inline: 12px !important;
  }

  .react-select__multi-value {
    background-color: ${theme.bgColor} !important;
    border: 1px solid ${theme.borderColor} !important;
    border-radius: 2px;
    padding: 2px 6px;

    .react-select__multi-value__label {
      color: ${theme.textColor} !important;
    }

    .react-select__multi-value__remove {
      color: ${theme.textColor} !important;

      &:hover {
        background-color: ${theme.linkColor} !important;
        color: white;
      }
    }
  }

  .react-select__menu {
    background-color: ${theme.bgColor} !important;
    border: 1px solid ${theme.borderColor} !important;
  }

  .react-select__option {
    color: ${theme.textColor} !important;
    background-color: ${theme.bgColor} !important;

    &.react-select__option--is-selected {
      color: ${theme.bgColor};
      background-color: ${theme.borderColor} !important;
    }

    &:hover {
      background-color: ${theme.linkColor} !important;
      color: white;
    }
  }
`;

export default StyledSelectContainer;
