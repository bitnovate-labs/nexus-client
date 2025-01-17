import { useEffect, useState } from "react";
import { Form, TimePicker, Upload, message, List, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEvents } from "../../../hooks/useEvents";
import { useEventAttachments } from "../../../hooks/useEventAttachments";
import BaseFormModal from "../../../components/modals/BaseFormModal";
import InputForm from "../../../components/forms/InputForm";
import SelectForm from "../../../components/forms/SelectForm";
import DatePickerForm from "../../../components/forms/DatePickerForm";
import { createDayjs } from "../../../utils/dateUtils";
import dayjs from "dayjs";
import { useUserRoles } from "../../../hooks/useUserRoles";

const EventFormModal = ({ visible, onCancel, event }) => {
  const [form] = Form.useForm();
  const [pendingFiles, setPendingFiles] = useState([]);
  const { createEvent, updateEvent } = useEvents();
  const {
    attachments,
    loading: attachmentsLoading,
    uploadAttachment,
    deleteAttachment,
  } = useEventAttachments(event?.id);
  const { userRoles, loading: rolesLoading } = useUserRoles();

  const roleOptions = userRoles
    .filter((role) => role.active)
    .map((role) => ({
      value: role.name,
      label: role.name,
    }));

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        ...event,
        date: createDayjs(event.date),
        time: event.time ? dayjs(event.time, "HH:mm") : null,
      });
    } else {
      form.resetFields();
    }
  }, [event, form]);

  const handleUpload = async ({ file }) => {
    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File must be smaller than 5MB!");
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only PDF, Word documents, and images are allowed."
        );
      }

      // Store file for later upload
      setPendingFiles((prev) => [...prev, file]);
      message.success("File queued for upload");
    } catch (error) {
      message.error("Failed to upload file: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttachment(id);
      message.success("File deleted successfully");
    } catch (error) {
      message.error("Failed to delete file: " + error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      let eventId;

      // Format time if it exists
      if (values.time) {
        values.time = values.time.format("HH:mm");
      }

      if (event) {
        await updateEvent(event.id, values);
        eventId = event.id;
        message.success("Event updated successfully");
      } else {
        const newEvent = await createEvent(values);
        eventId = newEvent.id;
        message.success("Event created successfully");
      }

      // Upload any pending files
      if (pendingFiles.length > 0 && eventId) {
        for (const file of pendingFiles) {
          const formData = new FormData();
          formData.append("file", file);
          try {
            await uploadAttachment({
              variables: {
                eventId,
                file,
              },
            });
          } catch (error) {
            message.error(`Failed to upload ${file.name}: ${error.message}`);
          }
        }
        setPendingFiles([]);
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Event form validation failed:", error);
      message.error(error.message || "Failed to save event");
    }
  };

  useEffect(() => {
    // Clear pending files when modal is closed
    if (!visible) {
      setPendingFiles([]);
    }
  }, [visible]);

  return (
    <BaseFormModal
      title={event ? "Edit Event" : "New Event"}
      open={visible}
      onClose={onCancel}
      onSubmit={handleSubmit}
      form={form}
    >
      <InputForm
        name="name"
        label="Name"
        required
        placeholder="Enter event name"
      />

      <DatePickerForm name="date" label="Date" required />

      <Form.Item name="time" label="Time">
        <TimePicker
          format="HH:mm"
          className="w-full"
          placeholder="Select time"
        />
      </Form.Item>

      <InputForm name="venue" label="Venue" placeholder="Enter event venue" />

      <InputForm
        name="speaker"
        label="Speaker"
        placeholder="Enter speaker name"
      />

      <InputForm name="topic" label="Topic" placeholder="Enter event topic" />

      <InputForm
        name="limitPax"
        label="Limit Pax"
        type="number"
        min={0}
        placeholder="Enter participant limit"
      />

      <SelectForm
        name="designation"
        label="Designation"
        options={roleOptions}
        loading={rolesLoading}
        placeholder="Select designation"
        allowClear
      />

      <InputForm name="branch" label="Branch" placeholder="Enter branch" />

      <InputForm
        name="description"
        label="Description"
        type="textarea"
        placeholder="Enter event description"
      />

      <Form.Item label="Attachments">
        <Upload
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          multiple={true}
          customRequest={({ file, onSuccess }) => {
            handleUpload({ file })
              .then(() => {
                onSuccess();
              })
              .catch((error) => {
                message.error(error.message);
              });
          }}
          showUploadList={{
            showRemoveIcon: true,
            removeIcon: (fileInfo) => (
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingFiles((prev) =>
                    prev.filter((f) => f.uid !== fileInfo.uid)
                  );
                }}
              />
            ),
          }}
          fileList={pendingFiles}
        >
          <Button icon={<UploadOutlined />}>Upload Files</Button>
        </Upload>
      </Form.Item>

      {event && (
        <>
          <List
            loading={attachmentsLoading}
            dataSource={attachments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <button
                    key="delete"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteOutlined />
                  </button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.filename}
                    </a>
                  }
                  description={`${(item.size / 1024).toFixed(2)} KB`}
                />
              </List.Item>
            )}
          />
        </>
      )}
    </BaseFormModal>
  );
};

export default EventFormModal;
