import { useState } from "react";
import { Card, Avatar, Typography, Select, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Dummy data
import { leaderboardData10 } from "../../dummydata";

const { Text } = Typography;

const LeaderboardCard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(leaderboardData10.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleData = leaderboardData10.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card
      title="Top 10 Leaderboard"
      className="dark:bg-gray h-full shadow-lg"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
          padding: "20px 30px 0 30px",
        },
      }}
      extra={
        <div className="hidden md:flex items-center gap-2">
          <Select
            defaultValue="oct"
            style={{ width: 70 }}
            size="small"
            options={[
              { value: "oct", label: "Oct" },
              { value: "nov", label: "Nov" },
              { value: "dec", label: "Dec" },
            ]}
          />
          <Select
            defaultValue="2024"
            style={{ width: 80 }}
            size="small"
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
            ]}
          />
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            size="small"
            options={[
              { value: "all", label: "All Designation" },
              { value: "negotiator", label: "Negotiator" },
              { value: "leader", label: "Leader" },
              { value: "senior", label: "Senior Leader" },
            ]}
          />
        </div>
      }
    >
      <div className="relative px-8">
        {/* Navigation Buttons */}
        {!isFirstPage && (
          <Button
            type="text"
            icon={<LeftOutlined />}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 shadow-md z-10"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          />
        )}
        {!isLastPage && (
          <Button
            type="text"
            icon={<RightOutlined />}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 shadow-md z-10"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          />
        )}

        {/* Mobile Filters */}
        {/* <div className="md:hidden flex flex-wrap gap-2 mb-4">
          <Select
            defaultValue="oct"
            size="small"
            style={{ width: 80 }}
            options={[
              { value: "oct", label: "Oct" },
              { value: "nov", label: "Nov" },
              { value: "dec", label: "Dec" },
            ]}
          />
          <Select
            defaultValue="2024"
            size="small"
            style={{ width: 80 }}
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
            ]}
          />
          <Select
            defaultValue="all"
            size="small"
            style={{ width: 100 }}
            options={[
              { value: "all", label: "All" },
              { value: "negotiator", label: "Negotiator" },
              { value: "leader", label: "Leader" },
              { value: "senior", label: "Senior" },
            ]}
          />
        </div> */}

        {/* Leaderboard Items */}
        <div className="grid grid-cols-3 gap-6">
          {visibleData.map((agent, index) => (
            <div key={agent.id} className="flex flex-col items-center">
              <Avatar
                size={80}
                src={agent.avatar}
                className="mb-2 border-2 border-blue-500"
              />
              <Text
                className="font-medium text-sm text-center line-clamp-1"
                title={agent.name}
              >
                {agent.name}
              </Text>
              <Text type="secondary" className="text-xs mb-1">
                {agent.designation}
              </Text>
              <Text className="text-sm">
                RM{" "}
                {agent.amount.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text type="secondary" className="text-lg font-semibold">
                {startIndex + index + 1}
              </Text>
            </div>
          ))}
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardCard;
