import { Avatar, Upload, message } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { UPLOAD_AGENT_AVATAR } from "../../../graphql/mutations/agents";
import { GET_AGENTS } from "../../../graphql/queries/agents";

const AgentAvatar = ({ agent }) => {
  const [uploadAvatar, { loading }] = useMutation(UPLOAD_AGENT_AVATAR, {
    update(cache, { data: { uploadAgentAvatar } }) {
      // Update the agent in the cache
      cache.modify({
        id: cache.identify({ __typename: "Agent", id: agent.id }),
        fields: {
          avatarUrl() {
            return uploadAgentAvatar.avatarUrl;
          },
        },
      });

      // Update the agents list cache if needed
      const { agents } = cache.readQuery({ query: GET_AGENTS }) || {
        agents: [],
      };
      cache.writeQuery({
        query: GET_AGENTS,
        data: {
          agents: agents.map((a) =>
            a.id === agent.id
              ? { ...a, avatarUrl: uploadAgentAvatar.avatarUrl }
              : a
          ),
        },
      });
    },
    onError: (error) => {
      message.error("Failed to upload avatar: " + error.message);
    },
    onCompleted: () => {
      message.success("Avatar updated successfully");
    },
  });

  const handleUpload = async ({ file }) => {
    try {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        message.error("Image must be smaller than 2MB!");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        message.error("You can only upload JPG, PNG or GIF files!");
        return;
      }

      await uploadAvatar({
        variables: {
          id: agent.id,
          file,
        },
      });
    } catch (error) {
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
      accept="image/jpeg,image/png,image/gif"
      disabled={loading}
    >
      <div className="relative cursor-pointer group">
        <Avatar
          size={120}
          src={agent.avatarUrl}
          icon={<UserOutlined />}
          className={`border-2 border-gray-200 ${loading ? "opacity-50" : ""}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <CameraOutlined className="text-white text-2xl" />
        </div>
      </div>
    </Upload>
  );
};

export default AgentAvatar;
