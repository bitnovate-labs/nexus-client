import { useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { format, addMonths, subMonths } from "date-fns";
import CalendarGrid from "./CalendarGrid";
import AgendaView from "./AgendaView";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card
          title="Calendar"
          extra={
            <div className="flex items-center gap-2">
              <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
              <span className="px-2">{format(currentDate, "MMMM yyyy")}</span>
              <Button icon={<RightOutlined />} onClick={handleNextMonth} />
            </div>
          }
        >
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <AgendaView selectedDate={selectedDate} />
      </Col>
    </Row>
  );
};

export default Calendar;
