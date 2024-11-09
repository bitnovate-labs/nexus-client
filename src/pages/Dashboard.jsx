import { Row, Col } from "antd";
import {
  GroupTargetCard,
  HierarchyCard,
  LeaderboardCard,
  ListCard,
  PersonalTargetCard,
  ProfileCard,
} from "../components/Cards";

// Dummy data
import { recentActivities } from "../dummydata";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      {/* Dashboard Title */}
      <h1 className="text-2xl text-center md:text-left font-bold ml-2 dark:text-white sticky top-0 z-10 bg-inherit">
        Dashboard Overview
      </h1>

      {/* Row 1 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <ProfileCard />
        </Col>
        <Col xs={24} lg={8}>
          <PersonalTargetCard />
        </Col>
        <Col xs={24} lg={8}>
          <GroupTargetCard />
        </Col>
      </Row>

      {/* Row 2 */}
      <Row gutter={[16, 16]}>
        {/* Leaderboard Cards Column */}
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <LeaderboardCard />
            </Col>
            <Col xs={24}>
              <LeaderboardCard />
            </Col>
          </Row>
        </Col>
        {/* Hierarchy Card Column */}
        <Col xs={24} lg={12}>
          <HierarchyCard />
        </Col>
      </Row>

      {/* Row 3 */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <ListCard title="Recent Activities" data={recentActivities} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
