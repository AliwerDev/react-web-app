import usePaginatedData from "../../hooks/use-paginated-data";
import Pagination from "../../components/pagination";
import PageTitle from "../../components/page-title";
import { unitsLabels } from "../../utils/constants";
import { formatMoney } from "../../utils/helpers";
import Table, { TableColumn } from "../../components/table/Table";

const SaleHistories = () => {
  const { data, loading, setPage, totalPages, page, size } = usePaginatedData("/selling-process/get-sale-history");

  const columns: TableColumn<Record<string, any>>[] = [
    { key: "index", label: "#", width: "30px", type: "index", align: "center", extra: page * size },
    {
      key: "client",
      label: "Mijoz",
      customColumn: (row: any) => `${row?.client?.firstName} ${row?.client?.lastName}`,
    },
    {
      key: "product",
      label: "Mahsulot",
      customColumn: (row: any) => row?.product?.name,
    },
    {
      key: "quantity",
      label: "Miqdori",
      width: "100px",
      customColumn: (row: any) => row?.quantity + unitsLabels[row?.product?.unitOfMeasurement]?.toLowerCase(),
    },
    {
      key: "unitPrice",
      label: "1 birlik narxi",
      width: "100px",
      customColumn: (row: any) => formatMoney(row?.unitPrice),
    },
    {
      key: "totalPrice",
      label: "Umumiy narxi",
      width: "100px",
      customColumn: (row: any) => formatMoney(row?.unitPrice * row?.quantity),
    },
    {
      key: "createdAt",
      label: "Vaqti",
      width: "150px",
      customColumn: (row: any) => new Date(row?.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <div className="main-container">
        <PageTitle label="Sotuvlar tarixi" />
      </div>
      <Table loading={loading} columns={columns} rows={data} />
      <Pagination initialPage={page} onChange={setPage} pageCount={totalPages} />
    </>
  );
};
export default SaleHistories;
