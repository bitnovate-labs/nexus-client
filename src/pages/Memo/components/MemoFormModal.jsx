import { useEffect, useState } from "react";
import { Form, message, Upload, List, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMemos } from "../../../hooks/useMemos";
import { useMemoAttachments } from "../../../hooks/useMemoAttachments";
import BaseFormModal from "../../../components/modals/BaseFormModal";
import InputForm from "../../../components/forms/InputForm";
import SelectForm from "../../../components/forms/SelectForm";
import DatePickerForm from "../../../components/forms/DatePickerForm";
import { createDayjs } from "../../../utils/dateUtils";
import { useUserRoles } from "../../../hooks/useUserRoles";

const MemoFormModal = ({ visible, onCancel, memo }) => {
  const [form] = Form.useForm();
  const [pendingFiles, setPendingFiles] = useState([]);
  const { createMemo, updateMemo } = useMemos();
  const {
    attachments,
    loading: attachmentsLoading,
    uploadAttachment,
    deleteAttachment,
  } = useMemoAttachments(memo?.id);
  const { userRoles, loading: rolesLoading } = useUserRoles();

  const roleOptions = userRoles
    .filter((role) => role.active)
    .map((role) => ({
      value: role.name,
      label: role.name,
    }));

  useEffect(() => {
    if (memo) {
      form.setFieldsValue({
        ...memo,
        date: createDayjs(memo.date),
        validityFrom: createDayjs(memo.validityFrom),
        validityTo: createDayjs(memo.validityTo),
      });
    } else {
      form.resetFields();
    }
  }, [memo, form]);

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

      // Format the values for the mutation
      const formattedValues = {
        date: values.date.format("YYYY-MM-DD"),
        title: values.title?.trim(),
        validityFrom: values.validityFrom
          ? values.validityFrom.format("YYYY-MM-DD")
          : null,
        validityTo: values.validityTo
          ? values.validityTo.format("YYYY-MM-DD")
          : null,
        branch: values.branch || "",
        designation: values.designation || "",
        description: values.description || "",
      };

      // Validate required fields
      if (!formattedValues.date || !formattedValues.title) {
        throw new Error("Date and title are required fields");
      }

      console.log("Submitting memo with values:", formattedValues); // Debug log

      try {
        const response = memo
          ? await updateMemo(memo.id, formattedValues)
          : await createMemo(formattedValues);

        console.log("Mutation response:", response); // Debug log

        if (!response) {
          throw new Error("No response received from server");
        }

        if (!response.id) {
          throw new Error("Created memo is missing ID");
        }

        message.success(
          memo ? "Memo updated successfully" : "Memo created successfully"
        );

        // Handle file uploads
        if (pendingFiles.length > 0) {
          try {
            for (const file of pendingFiles) {
              await uploadAttachment({
                variables: {
                  memoId: response.id,
                  file,
                },
              });
            }
            message.success("Files uploaded successfully");
          } catch (error) {
            console.error("File upload error:", error);
            message.error("Some files failed to upload");
          }
        }

        setPendingFiles([]);
        form.resetFields();
        onCancel();
      } catch (error) {
        console.error("Mutation error:", error);
        throw new Error(
          `Failed to ${memo ? "update" : "create"} memo: ${error.message}`
        );
      }
    } catch (error) {
      console.error("Memo form error:", error);
      message.error(error.message || "Failed to save memo");
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
      title={memo ? "Edit Memo" : "New Memo"}
      open={visible}
      onClose={onCancel}
      onSubmit={handleSubmit}
      form={form}
    >
      <DatePickerForm name="date" label="Date" required />

      <InputForm
        name="title"
        label="Title"
        required
        placeholder="Enter memo title"
      />

      <DatePickerForm name="validityFrom" label="Validity From" />

      <DatePickerForm name="validityTo" label="Validity To" />

      <SelectForm
        name="branch"
        label="Branch"
        placeholder="Select branch"
        options={[
          { value: "Kuala Lumpur", label: "Kuala Lumpur" },
          { value: "Penang", label: "Penang" },
          { value: "Johor", label: "Johor" },
        ]}
      />

      <SelectForm
        name="designation"
        label="Designation"
        options={roleOptions}
        loading={rolesLoading}
        placeholder="Select designation"
        allowClear
      />

      <InputForm
        name="description"
        label="Description"
        type="textarea"
        placeholder="Enter memo description"
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

      {memo && (
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
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.filename}
                  </a>
                }
                description={`${(item.size / 1024).toFixed(2)} KB`}
              />
            </List.Item>
          )}
        />
      )}
    </BaseFormModal>
  );
};

export default MemoFormModal;
