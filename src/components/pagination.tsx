import ReactPaginate from "react-paginate";
import styled from "@emotion/styled";
import React from "react";
import { theme } from "../theme";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 5px;
    cursor: pointer;

    &.selected a {
      background-color: ${theme.buttonColor};
      color: ${theme.buttonTextColor};
    }
  }

  a {
    padding: 8px 12px;
    border-radius: 4px;
    color: ${theme.buttonColor};
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${theme.buttonTextColor};
      color: ${theme.buttonColor};
    }
  }

  li:first-of-type a,
  li:last-of-type a {
    font-weight: bold;
  }
`;

type Props = {
  pageCount: number;
  onChange: (page: number) => void;
  initialPage?: number;
};

const Pagination: React.FC<Props> = ({ pageCount, onChange, initialPage = 0 }) => {
  if (pageCount <= 1) return null;

  return (
    <PaginationWrapper>
      <ReactPaginate initialPage={initialPage} previousLabel={"<"} nextLabel={">"} breakLabel={"..."} pageCount={pageCount} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={({ selected }) => onChange(selected)} />
    </PaginationWrapper>
  );
};

export default Pagination;
