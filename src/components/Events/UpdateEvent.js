import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  DatePicker,
  TimePicker,
  Row,
  Checkbox,
  Col,
  Skeleton,
  Upload,
  message,
  Icon,
} from "antd";
import moment from "moment";

import "./style.css";
import { getEventService, updateEventService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const UpdateEvent = (props) => {
  const format = "h:mm a";
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [venue, setVenue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isRegistrationRequired, setIsRegReqd] = useState(null);
  const [isRegistrationOpened, setIsRegOpen] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const { getFieldDecorator } = props.form;
  const uploadprops = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setImage(info.file.originFileObj);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    (async () => {
      setShowSkeleton(true);
      try {
        const id = props.eventId;
        const res = await getEventService(id);
        console.log(res);
        if (res.message === "success") {
          setEvent(res.data);
          setShowSkeleton(false);
        } else {
          _notification("warning", "Error", res.message);
        }
      } catch (err) {
        _notification("error", "Error", err.message);
      }
    })();
  }, [props.eventId]);

  console.log(event);
  useEffect(() => {
    if (event) {
      let {
        startDate,
        endDate,
        time,
        title,
        description,
        isRegistrationOpened,
        isRegistrationRequired,
        venue,
      } = event;

      startDate = startDate.split("T")[0];
      endDate = endDate.split("T")[0];

      setTitle(title);
      setDescription(description);
      setVenue(venue);
      setIsRegOpen(isRegistrationOpened);
      setIsRegReqd(isRegistrationRequired);
      setStartDate(startDate);
      setStartTime(time.split(" to ")[0]);
      setEndDate(endDate);
      setEndTime(time.split(" to ")[1]);

      props.form.setFieldsValue({
        startTime: moment(time.split(" to ")[0], format),
        endTime: moment(time.split(" to ")[1], format),
        dates: [moment(startDate, "YYYY-MM-DD"), moment(endDate, "YYYY-MM-DD")],
        title,
        description,
        isRegistrationOpened,
        isRegistrationRequired,
        venue,
      });
    }
  }, [event]);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const onDateRangeChange = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  function onSTChange(time, timeString) {
    setStartTime(timeString);
  }

  function onETChange(time, timeString) {
    setEndTime(timeString);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegistrationRequired === false) {
      setIsRegOpen(false);
    }
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          let days = endDate.split("-")[2] - startDate.split("-")[2];
          let xtime = startTime + " to " + endTime;

          const formData = new FormData();
          formData.append("image", image);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("startDate", startDate);
          formData.append("endDate", endDate);
          formData.append("time", xtime);
          formData.append("venue", venue);
          formData.append("isRegistrationRequired", isRegistrationRequired);
          formData.append("isRegistrationOpened", isRegistrationOpened);
          formData.append("days", days);
          let params = props.eventId;

          const res = await updateEventService(formData, params);
          if (res.message === "success") {
            _notification("success", "Success", "Event Updated");
            props.onUpdateEvent();
          } else {
            _notification("error", "Error", res.message);
          }
          setIsLoading(false);
        } catch (err) {
          _notification("error", "Error", err.message);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Skeleton loading={showSkeleton} active>
      <Form onSubmit={handleSubmit} layout="vertical">
        <Form.Item label="Event Title" required>
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input event title!",
              },
            ],
          })(
            <Input
              type="text"
              placeholder="Event title"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </Form.Item>
        <Form.Item label="Description" required>
          {getFieldDecorator("description", {
            rules: [
              {
                require: true,
                message: "Please enter description!",
              },
            ],
          })(
            <TextArea
              rows={4}
              placeholder="Enter event description"
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </Form.Item>

        {event ? (
          <img
            width="100%"
            style={{ borderRadius: 4, marginBottom: 8 }}
            src={event.image}
            alt={event.name}
          />
        ) : null}

        <Form.Item label="Update Picture" required>
          <Upload {...uploadprops} listType="picture">
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Event Venue" required>
          {getFieldDecorator("venue", {
            rules: [
              {
                required: true,
                message: "Please input event venue!",
              },
            ],
          })(
            <Input
              type="text"
              placeholder="Event venue"
              onChange={(e) => setVenue(e.target.value)}
            />
          )}
        </Form.Item>

        <Form.Item label="Event Dates" required>
          {getFieldDecorator("dates", {
            rules: [
              {
                required: true,
                message: "Please select event dates!",
              },
            ],
          })(
            <RangePicker
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
              onChange={onDateRangeChange}
            />
          )}
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Time" required>
              {getFieldDecorator("startTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select event timings!",
                  },
                ],
              })(
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  onChange={onSTChange}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Time" required>
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select event timings!",
                  },
                ],
              })(
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  onChange={onETChange}
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator(
                "isRegistrationRequired",
                {}
              )(
                <Checkbox
                  checked={isRegistrationRequired}
                  onChange={(e) => setIsRegReqd(e.target.checked)}
                >
                  Is Registration Required?
                </Checkbox>
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item hidden={isRegistrationRequired === false ? true : false}>
              {getFieldDecorator(
                "isRegistrationOpened",
                {}
              )(
                <Checkbox
                  checked={isRegistrationOpened}
                  onChange={(e) => setIsRegOpen(e.target.checked)}
                >
                  Is Registration Open?
                </Checkbox>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Modify Event Details
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
};

const UpdateEventForm = Form.create({ name: "event_form" })(UpdateEvent);

export default UpdateEventForm;
