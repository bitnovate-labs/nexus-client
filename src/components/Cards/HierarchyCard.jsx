import { useState } from "react";
import { Card, Avatar, Typography, Select, Input } from "antd";
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons";
import { hierarchyData } from "../../dummydata";

const { Text } = Typography;

const HierarchyCard = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [expandedNodes, setExpandedNodes] = useState(new Set([1]));

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderHierarchyItem = (item, index, isLast, depth = 0) => {
    const showItem =
      !searchText ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchText.toLowerCase());

    if (!showItem) return null;

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedNodes.has(item.id);

    return (
      <div key={item.id} className="relative">
        <div className="flex items-start">
          {/* Vertical Line Container */}
          {depth > 0 && (
            <div className="relative w-8">
              <div
                className={`
                  absolute left-0 top-0 w-full h-[28px] 
                  border-l-2 border-b-2 border-gray-300 dark:border-gray-600 
                  rounded-bl
                `}
              />
            </div>
          )}

          {/* Node Content */}
          <div className="flex-1">
            <div
              className={`
                relative flex items-center gap-3 p-2 
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 rounded-lg 
                shadow-sm hover:shadow-md 
                hover:border-blue-400 dark:hover:border-blue-500
                transition-all duration-200 mb-1
                ${hasChildren ? "cursor-pointer" : ""}
              `}
              onClick={() => hasChildren && toggleNode(item.id)}
            >
              {/* Toggle Button */}
              {hasChildren && (
                <div
                  className={`
                    absolute -left-3 top-1/2 -translate-y-1/2 
                    w-6 h-6 flex items-center justify-center rounded-full
                    bg-white dark:bg-gray-800 
                    border border-gray-200 dark:border-gray-700
                    hover:border-blue-400 dark:hover:border-blue-500
                    transition-all duration-200 z-20
                  `}
                >
                  <CaretRightOutlined
                    className={`
                      transition-transform duration-200
                      ${isExpanded ? "rotate-90" : ""}
                    `}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex items-center gap-3 w-full">
                <Avatar src={item.avatar} size={40} />
                <div className="min-w-0">
                  <Text strong className="block truncate" title={item.name}>
                    {item.name}
                  </Text>
                  <Text type="secondary" className="text-sm block truncate">
                    {item.designation} • L{item.level}
                  </Text>
                </div>
              </div>
            </div>

            {/* Children Container */}
            <div
              className={`
                ml-4 overflow-hidden transition-all duration-300
                ${
                  isExpanded
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              {hasChildren &&
                item.children.map((child, childIndex) =>
                  renderHierarchyItem(
                    child,
                    childIndex,
                    childIndex === item.children.length - 1,
                    depth + 1
                  )
                )}
            </div>
          </div>
        </div>

        {/* Vertical connector for siblings */}
        {!isLast && depth > 0 && (
          <div
            className={`
              absolute left-0 top-[28px] h-full 
              border-l-2 border-gray-300 dark:border-gray-600
            `}
          />
        )}
      </div>
    );
  };

  return (
    <Card
      title="Agent Hierarchy Chart"
      className="dark:bg-gray h-full shadow-lg"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
          padding: "20px 30px 0 30px",
        },
      }}
    >
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {/* Dropdown Input*/}
          <Select
            placeholder="Level"
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={[
              { value: "all", label: "All Levels" },
              { value: "1", label: "Level 1" },
              { value: "2", label: "Level 2" },
              { value: "3", label: "Level 3" },
            ]}
          />
          {/* Searchbar Input */}
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Chart Section */}
        <div className="overflow-y-auto scrollbar-hide p-4 max-h-[calc(100vh_-_100px)] lg:max-h-[calc(100vh_-_200px)]">
          {hierarchyData.map((item, index) =>
            renderHierarchyItem(
              item,
              index,
              index === hierarchyData.length - 1,
              0
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default HierarchyCard;
