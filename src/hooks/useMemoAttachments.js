import { useQuery, useMutation } from "@apollo/client";
import { GET_MEMO_ATTACHMENTS } from "../graphql/queries/memoAttachments";
import {
  UPLOAD_MEMO_ATTACHMENT,
  DELETE_MEMO_ATTACHMENT,
} from "../graphql/mutations/memoAttachments";

export const useMemoAttachments = (memoId) => {
  const { data, loading } = useQuery(GET_MEMO_ATTACHMENTS, {
    variables: { memoId },
    skip: !memoId,
  });

  const [uploadAttachment] = useMutation(UPLOAD_MEMO_ATTACHMENT, {
    refetchQueries: [{ query: GET_MEMO_ATTACHMENTS, variables: { memoId } }],
  });

  const [deleteAttachment] = useMutation(DELETE_MEMO_ATTACHMENT, {
    refetchQueries: [{ query: GET_MEMO_ATTACHMENTS, variables: { memoId } }],
  });

  const handleUpload = async (file) => {
    try {
      const { data } = await uploadAttachment({
        variables: {
          memoId,
          file,
        },
      });

      return data.uploadMemoAttachment;
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
      return data.deleteMemoAttachment;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    attachments: data?.memoAttachments || [],
    loading,
    uploadAttachment: handleUpload,
    deleteAttachment: handleDelete,
  };
};
