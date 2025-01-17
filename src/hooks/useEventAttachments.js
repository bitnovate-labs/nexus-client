import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT_ATTACHMENTS } from "../graphql/queries/eventAttachments";
import {
  UPLOAD_EVENT_ATTACHMENT,
  DELETE_EVENT_ATTACHMENT,
} from "../graphql/mutations/eventAttachments";

export const useEventAttachments = (eventId) => {
  const { data, loading } = useQuery(GET_EVENT_ATTACHMENTS, {
    variables: { eventId },
    skip: !eventId,
  });

  const [uploadAttachment] = useMutation(UPLOAD_EVENT_ATTACHMENT, {
    refetchQueries: [{ query: GET_EVENT_ATTACHMENTS, variables: { eventId } }],
  });

  const [deleteAttachment] = useMutation(DELETE_EVENT_ATTACHMENT, {
    refetchQueries: [{ query: GET_EVENT_ATTACHMENTS, variables: { eventId } }],
  });

  const handleUpload = async (file) => {
    try {
      const { data } = await uploadAttachment({
        variables: {
          eventId,
          file,
        },
      });

      return data.uploadEventAttachment;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(error.message || "Failed to upload file");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteAttachment({
        variables: { id },
      });
      return data.deleteEventAttachment;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    attachments: data?.eventAttachments || [],
    loading,
    uploadAttachment: handleUpload,
    deleteAttachment: handleDelete,
  };
};
