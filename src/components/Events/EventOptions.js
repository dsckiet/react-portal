import React, { useState } from "react";
import { Button, Drawer, Divider, Select } from "antd";
import CreateEvent from "../Events/CreateEvent";
import { getRole } from "./../../utils/services";
const { Option } = Select;
export default (props) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [userData] = useState(getRole());
  const handleEventAdd = () => {
    setIsDrawerVisible(false);
    props.onAddEvent();
  };

  const handleChange = (val) => {
    props.onTypeChange(val);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      {userData.role === "lead" ? (
        <>
          <Button onClick={() => setIsDrawerVisible(true)}>Create Event</Button>
          <Divider type="vertical" />
        </>
      ) : null}

      <Select
        style={{ minWidth: 180 }}
        defaultValue="Upcoming Events"
        onChange={handleChange}
      >
        <Option value="upcoming">Upcoming Events</Option>
        <Option value="past">Past Events</Option>
        <Option value="running">Running Events</Option>
      </Select>

      <Drawer
        title="Create Event"
        placement="right"
        closable={true}
        width="40%"
        destroyOnClose={true}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <CreateEvent onAddEvent={handleEventAdd} />
      </Drawer>
    </div>
  );
};
