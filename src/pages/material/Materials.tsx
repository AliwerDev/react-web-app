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
import { Material } from "../../utils/models";
import { unitsLabels } from "../../utils/constants";

const Materials = () => {
  const webapp = useWebApp();
  const navigate = useNavigate();
  const { data, loading, setPage, totalPages, page, size } = usePaginatedData("/material/search?type=RAW");

  const showConfirm = useCallback(
    (id: string) => () => {
      webapp.showConfirm(`Rostdan ham ushbu sotuvchini o'chirmoqchimisiz?`, (confirmed) => {
        console.log(confirmed);
      });
    },
    [webapp]
  );

  const columns: TableColumn<Material>[] = [
    { key: "index", label: "#", width: "30px", type: "index", align: "center", extra: page * size },
    { key: "name", label: "Nomi" },
    { key: "unitOfMeasurement", label: "O'lchov birligi", customColumn: (row: Material) => unitsLabels[row.unitOfMeasurement] },
    {
      key: "actions",
      label: "Amallar",
      type: "actions",
      width: "80px",
      align: "center",
      customColumn: (row) => {
        return (
          <Flex gap="10px" align="center" justify="center">
            <Icon onClick={() => navigate(`/materials/edit/${row.id}`)} icon="icon-pencil" />
            <Icon onClick={showConfirm(row.id)} icon="icon-trash" color="red" />
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <div className="main-container">
        <PageTitle type="list" label="Hom ashyo" actions={<Button onClick={() => navigate("/materials/add")} size="small" icon={<Icon icon="icon-plus" color={theme.buttonTextColor} />} />} />
      </div>
      <Table loading={loading} columns={columns} rows={data} />
      <Pagination initialPage={page} onChange={setPage} pageCount={totalPages} />
    </>
  );
};
export default Materials;
