import styled from "@emotion/styled";
import { theme } from "../theme";

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children?: React.ReactNode | null;
  icon?: React.ReactNode | null;
};

const Button = ({ children = null, disabled = false, className, onClick, variant = "primary", size = "medium", fullWidth = false, icon = null }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} className={className} variant={variant} size={size} fullWidth={fullWidth}>
      {icon}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  fullWidth: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: ${({ size }) => (size === "small" ? "12px" : size === "large" ? "16px" : "14px")};
  padding: ${({ size }) => (size === "small" ? "8px 16px" : size === "large" ? "16px 24px" : "12px 20px")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border: none;
  border-radius: 4px;
  background-color: ${({ variant }) => (variant === "primary" ? theme.buttonColor : theme.secondaryBgColor)};
  color: ${({ variant }) => (variant === "primary" ? theme.buttonTextColor : theme.textColor)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant, disabled }) => (!disabled ? (variant === "primary" ? theme.buttonColor : theme.secondaryBgColor) : undefined)};
  }
`;

export default Button;
