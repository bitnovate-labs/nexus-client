import { useQuery, useMutation } from "@apollo/client";
import { GET_AGENTS } from "../graphql/queries/agents";
import {
  CREATE_AGENT,
  UPDATE_AGENT,
  DELETE_AGENTS,
  UPLOAD_AGENT_AVATAR,
} from "../graphql/mutations/agents";
import { formatDateForServer } from "../utils/dateUtils";

export const useAgents = () => {
  const { data, loading, error } = useQuery(GET_AGENTS);

  const [createAgentMutation] = useMutation(CREATE_AGENT, {
    refetchQueries: [{ query: GET_AGENTS }],
  });

  const [updateAgentMutation] = useMutation(UPDATE_AGENT, {
    refetchQueries: [{ query: GET_AGENTS }],
  });

  const [deleteAgentsMutation] = useMutation(DELETE_AGENTS, {
    refetchQueries: [{ query: GET_AGENTS }],
  });

  const [uploadAvatarMutation] = useMutation(UPLOAD_AGENT_AVATAR, {
    refetchQueries: [{ query: GET_AGENTS }],
  });

  const validateAndTransformData = (values) => {
    // Required fields validation
    const requiredFields = [
      "name",
      "displayName",
      "email",
      "mobile",
      "branch",
      "designation",
      "joinDate",
    ];

    const missingFields = requiredFields.filter((field) => !values[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Transform dates
    const transformedData = {
      ...values,
      joinDate: formatDateForServer(values.joinDate),
      resignDate: values.resignDate
        ? formatDateForServer(values.resignDate)
        : null,
      renExpiredDate: values.renExpiredDate
        ? formatDateForServer(values.renExpiredDate)
        : null,
      // Set default values
      active: values.active ?? true,
      withholdingTax: values.withholdingTax ?? false,
      leaderboard: values.leaderboard ?? false,
      commissionPercentage: values.commissionPercentage ?? 70,
      branch: values.branch || "Kuala Lumpur",
      designation: values.designation || "Agent",
    };

    // Remove undefined/null values for optional fields
    Object.keys(transformedData).forEach((key) => {
      if (transformedData[key] === undefined) {
        delete transformedData[key];
      }
    });

    return transformedData;
  };

  const createAgent = async (agentData) => {
    try {
      const transformedData = validateAndTransformData(agentData);
      const { data } = await createAgentMutation({
        variables: transformedData,
      });
      return data.createAgent;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateAgent = async (id, agentData) => {
    try {
      const transformedData = validateAndTransformData({
        ...agentData,
        joinDate: agentData.joinDate || agentData.agent?.joinDate,
      });

      const { data } = await updateAgentMutation({
        variables: {
          id,
          ...transformedData,
        },
      });
      return data.updateAgent;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const uploadAvatar = async (id, file) => {
    try {
      const { data } = await uploadAvatarMutation({
        variables: { id, file },
      });
      return data.uploadAgentAvatar;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteAgents = async (ids) => {
    try {
      const { data } = await deleteAgentsMutation({
        variables: { ids },
      });
      return data.deleteAgents;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    agents: data?.agents || [],
    loading,
    error,
    createAgent,
    updateAgent,
    uploadAvatar,
    deleteAgents,
  };
};
