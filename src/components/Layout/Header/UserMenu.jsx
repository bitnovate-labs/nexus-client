import { Dropdown, Avatar } from "antd";

const UserMenu = ({ items, userName }) => {
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <span className="cursor-pointer flex items-center gap-2 ml-4">
        <Avatar
          size="default"
          src="https://api.dicebear.com/9.x/pixel-art/svg" // To insert user profile pic here!
          className="bg-blue"
        />
        <span className="hidden md:inline">{userName}</span>
      </span>
    </Dropdown>
  );
};

export default UserMenu;
