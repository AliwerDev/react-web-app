import { useCallback, useMemo } from "react";
import Flex from "../../components/flex";
import Icon from "../../components/icon/icon";
import Table, { TableColumn } from "../../components/table/Table";
import useWebApp from "../../hooks/use-webapp";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { theme } from "../../theme";
import usePaginatedData from "../../hooks/use-paginated-data";
import Pagination from "../../components/pagination";
import PageTitle from "../../components/page-title";
import { User } from "../../utils/models";

const Employees = () => {
  const webapp = useWebApp();
  const navigate = useNavigate();
  const { data, loading, setPage, totalPages, error, page, size } = usePaginatedData("/user/search");

  const showConfirm = useCallback(
    (id: string) => () => {
      webapp.showConfirm(`Rostan ham ushbu hodimni o'chirmoqchimisiz?`, (confirmed) => {
        console.log(confirmed);
      });
    },
    [webapp]
  );

  const columns: TableColumn<User>[] = useMemo(
    () => [
      { key: "index", label: "#", width: "30px", type: "index", align: "center", extra: page * size },
      { key: "firstName", label: "Ismi" },
      { key: "lastName", label: "Familyasi" },
      {
        key: "roles",
        label: "Rollar",
        customColumn: (row) => row.roles?.join(", "),
      },
      {
        key: "actions",
        label: "Amallar",
        type: "actions",
        width: "80px",
        align: "center",
        customColumn: (row) => {
          return (
            <Flex gap="10px" align="center" justify="center">
              <Icon onClick={() => navigate(`/employees/edit/${row?.id}`)} icon="icon-pencil" />
              <Icon onClick={showConfirm(row.id)} icon="icon-trash" color="red" />
            </Flex>
          );
        },
      },
    ],
    [navigate, showConfirm, page, size]
  );

  return (
    <>
      <div className="main-container">
        {error && JSON.stringify(error)}
        <PageTitle type="list" label="Hodim" actions={<Button onClick={() => navigate("/employees/add")} size="small" icon={<Icon icon="icon-plus" color={theme.buttonTextColor} />} />} />
      </div>
      <Table loading={loading} columns={columns} rows={data} />
      <Pagination initialPage={page} onChange={setPage} pageCount={totalPages} />
    </>
  );
};
export default Employees;
