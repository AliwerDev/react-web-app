import React, { FC } from "react";
import styled from "@emotion/styled";
interface EmptyContentProps {
  title?: string;
  description?: string;
  height?: string;
  bg?: string;
}

const EmptyContent: FC<EmptyContentProps> = ({ title, description, height, bg }) => {
  return (
    <EmptyContentStyled height={height} bg={bg}>
      <img alt="empty" src={""} />
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </EmptyContentStyled>
  );
};

const EmptyContentStyled = styled.div<{ height?: string; bg?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: ${({ height }) => height || "58vh"};
  height: ${({ height }) => height || "400px"};
  background: ${({ bg }) => bg || "var(--light-gray)"};
  padding: 20px;
  text-align: center;
  border: 1px solid var(--container--br);
  border-radius: 12px;

  img {
    width: 200px;
    height: 200px;
  }

  h2 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    color: var(--text--grey);
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    color: var(--text--disable);
  }
`;

export default EmptyContent;
