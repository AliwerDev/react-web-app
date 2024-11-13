import { useCallback } from "react";
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

const Providers = () => {
  const webapp = useWebApp();
  const navigate = useNavigate();
  const { data, loading, setPage, totalPages, page, size } = usePaginatedData("/provider/search");

  const showConfirm = useCallback(
    (id: string) => () => {
      webapp.showConfirm(`Rostdan ham ushbu sotuvchini o'chirmoqchimisiz?`, (confirmed) => {
        console.log(confirmed);
      });
    },
    [webapp]
  );

  const columns: TableColumn[] = [
    { key: "index", label: "#", width: "30px", type: "index", align: "center", extra: page * size },
    { key: "firstName", label: "Ismi" },
    { key: "lastName", label: "Familyasi" },
    { key: "phoneNumber", label: "Telefon" },
    {
      key: "actions",
      label: "Amallar",
      type: "actions",
      width: "80px",
      align: "center",
      customColumn: (row) => {
        return (
          <Flex gap="10px" align="center" justify="center">
            <Icon onClick={() => navigate(`/providers/edit/${row.id}`)} icon="icon-pencil" />
            <Icon onClick={showConfirm(row.id)} icon="icon-trash" color="red" />
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <div className="main-container">
        <PageTitle type="list" label="Hom ashyo sotuvchi" actions={<Button onClick={() => navigate("/providers/add")} size="small" icon={<Icon icon="icon-plus" color={theme.buttonTextColor} />} />} />
      </div>
      <Table loading={loading} columns={columns} rows={data} />
      <Pagination initialPage={page} onChange={setPage} pageCount={totalPages} />
    </>
  );
};
export default Providers;
