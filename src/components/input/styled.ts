import styled from "@emotion/styled";
import { theme } from "../../theme";

const InputStyledContainer = styled.div`
  margin-bottom: 15px;

  .input-field {
    display: block;
    box-sizing: border-box;
    font-size: 14px;
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 0 12px;
    border: 1px solid ${theme.borderColor};
    background-color: ${theme.bgColor};
    border-radius: 4px;
    color: ${theme.textColor};
    text-align: start;

    &:focus {
      outline: 2px solid ${theme.borderColor} !important;
    }

    &.input-error {
      border-color: ${theme.errorColor};
      outline-color: ${theme.errorColor} !important;
    }

    &::-webkit-input-placeholder {
      color: ${theme.hintColor};
    }

    &::-moz-placeholder {
      color: ${theme.hintColor};
    }

    &:-ms-input-placeholder {
      color: ${theme.hintColor};
    }
  }

  .phone-input-container {
    position: relative;

    input[type="number"] {
      padding-left: 48px;
    }

    &::before {
      content: "+998";
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      height: 18px;
      color: ${theme.textColor};
    }
  }

  /* For Chrome, Safari, Edge, and Opera */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default InputStyledContainer;
