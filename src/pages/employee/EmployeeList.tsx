import Table from "../../components/table/Table";

const employess = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    telegramId: "1234567890",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "991234567",
    roles: "ADMIN",
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    telegramId: "1234567891",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "991234568",
    roles: "USER",
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    telegramId: "1234567892",
    firstName: "Alice",
    lastName: "Johnson",
    phoneNumber: "991234569",
    roles: "ADMIN",
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    telegramId: "1234567893",
    firstName: "Bob",
    lastName: "Brown",
    phoneNumber: "991234570",
    roles: "USER",
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    telegramId: "1234567894",
    firstName: "Charlie",
    lastName: "Davis",
    phoneNumber: "991234571",
    roles: "ADMIN",
  },
];

const EmployeeList = () => {
  const columns = [
    { key: "telegramId", label: "ID", width: "150px" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "roles", label: "Role", width: "80px" },
  ];

  return (
    <div className="main-container">
      <h1>Hodimlar</h1>
      <p>Hodim qo'shish uchun quidagi malumotlarni to'ldiring:</p>

      <Table columns={columns} rows={employess} />
    </div>
  );
};
export default EmployeeList;
