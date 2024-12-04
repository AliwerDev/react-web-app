import { FC } from "react";
import Flex from "./flex";

type Props = {
  type?: "list" | "create" | "edit";
  label: string;
  actions?: React.ReactNode;
};

const PageTitle: FC<Props> = ({ type, label, actions = null }) => {
  if (type === "create") label = label + " qoshish";
  else if (type === "edit") label = label + "ni tahrirlash";
  else if (type === "list") label = label + "lar ro'yxati";

  return (
    <Flex mb="10px" align="center" justify="space-between">
      <h1 style={{ marginBlock: 0 }}>{label}</h1>
      {actions}
    </Flex>
  );
};

export default PageTitle;
