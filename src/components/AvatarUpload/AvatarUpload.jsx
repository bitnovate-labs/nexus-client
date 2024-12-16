import { Upload, message } from "antd";
import { useMutation } from "@apollo/client";
import { UPLOAD_AVATAR } from "../../graphql/mutations/users";
import { GET_ME } from "../../graphql/queries/auth";

const AvatarUpload = ({ children }) => {
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleUpload = async ({ file }) => {
    try {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        message.error("Image must be smaller than 2MB!");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        message.error("You can only upload image files!");
        return;
      }

      await uploadAvatar({
        variables: { file },
      });

      message.success("Avatar updated successfully");
    } catch (error) {
      message.error("Failed to upload avatar");
      console.error("Upload error:", error);
    }
  };

  return (
    <Upload
      customRequest={({ file, onSuccess }) => {
        handleUpload({ file });
        onSuccess();
      }}
      showUploadList={false}
      accept="image/*"
    >
      {children}
    </Upload>
  );
};

export default AvatarUpload;
