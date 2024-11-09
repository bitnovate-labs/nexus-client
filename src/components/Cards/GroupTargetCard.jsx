import { Card, Typography, Progress } from "antd";

// Dummy data
import { targetGroup } from "../../dummydata";

const { Text, Title } = Typography;

const GroupTargetCard = () => {
  return (
    <Card
      title="Group Target"
      className="dark:bg-gray h-full shadow-lg"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
          padding: "20px 30px 0 30px",
        },
      }}
    >
      <div className="flex flex-col h-[200px] justify-between">
        {/* IF there's GOAL? - display this! */}
        {targetGroup.hasGoal ? (
          <>
            <div>
              <Title level={2}>RM {targetGroup.current.toLocaleString()}</Title>
              <Text type="secondary">
                of RM {targetGroup.total.toLocaleString()} target
              </Text>
            </div>
            <Progress
              percent={(targetGroup.current / targetGroup.total) * 100}
              showInfo={false}
              strokeColor="#1890ff"
              trailColor="#f0f0f0"
              className="mb-4"
            />
          </>
        ) : (
          // IF NO GOALS? - display this!
          <div className="flex flex-col justify-center h-full -mt-8">
            <Title level={2} className="!mb-2">
              No worries!
            </Title>
            <Text className="text-lg">
              You&apos;ve got no goals at this moment.
            </Text>
            <Text className="text-gray-400 mt-4">0 of 0</Text>
          </div>
        )}
        {/* Bottom Right Image */}
        <div className="absolute bottom-4 right-4">
          <img
            src="/src/assets/group-target.svg"
            alt="Group Target"
            className="w-16 h-16 opacity-20"
          />
        </div>
      </div>
    </Card>
  );
};

export default GroupTargetCard;
