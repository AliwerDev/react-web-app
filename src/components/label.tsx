import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../theme";

type LabelProps = {
  htmlFor?: string;
  error?: boolean;
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
};

const Label = ({ className, children, ...rest }: LabelProps) => {
  return (
    <Styled className={className} {...rest}>
      {children}
    </Styled>
  );
};

Label.Error = ({ message }: { message: string }) => {
  return (
    <Label error className="error-message">
      {message}
    </Label>
  );
};

const Styled = styled.label<LabelProps>`
  color: ${theme.textColor};
  font-size: 14px;
  display: block;
  margin-bottom: 4px;

  &.error-message {
    display: inline-block;
    font-size: 12px;
    margin-top: 2px;
  }

  ${({ error }) =>
    error &&
    css`
      color: ${theme.errorColor};
    `}

  ${({ required }) =>
    required &&
    css`
      &::after {
        content: "*";
        color: ${theme.errorColor};
        margin-left: 2px;
      }
    `}
`;

export default Label;
