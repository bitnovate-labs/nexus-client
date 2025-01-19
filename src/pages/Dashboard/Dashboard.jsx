import { Row, Col } from "antd";
import {
  // GroupTargetCard,
  // HierarchyCard,
  // LeaderboardCard,
  // RecentActivitiesCard,
  // PersonalTargetCard,
  ProfileCard,
} from "./components";

// Dummy data
// import { recentActivities } from "../../dummydata";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      {/* ---------------------------------------------------------------------- */}
      {/* MAIN CONTENT SECTION */}

      {/* Row 1 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <ProfileCard />
        </Col>
        {/* CODE FOR FUTURE USE */}
        {/* <Col xs={24} lg={8}>
          <PersonalTargetCard />
        </Col>
        <Col xs={24} lg={8}>
          <GroupTargetCard />
        </Col> */}
      </Row>

      {/* Row 2 */}
      <Row gutter={[16, 16]}>
        {/* CODE FOR FUTURE USE */}
        {/* Leaderboard Cards Column */}
        {/* <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <LeaderboardCard />
            </Col>
            <Col xs={24}>
              <LeaderboardCard />
            </Col>
          </Row>
        </Col> */}
        {/* Hierarchy Card Column */}
        {/* <Col xs={24} lg={12}>
          <HierarchyCard />
        </Col> */}
      </Row>

      {/* Row 3 */}
      {/* <Row gutter={[16, 16]}>
        <Col xs={24}>
          <RecentActivitiesCard
            title="Recent Activities"
            data={recentActivities}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
