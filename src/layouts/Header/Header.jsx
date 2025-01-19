import { Layout } from "antd";
import HeaderActions from "./HeaderActions";

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header className="px-8 sticky top-0 z-40 w-full md:ml-4 md:rounded-bl-md bg-white dark:bg-gray flex items-center justify-end shadow-md">
      <HeaderActions />
    </Header>
  );
};

export default DashboardHeader;
