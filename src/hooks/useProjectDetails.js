import { useQuery, useMutation } from "@apollo/client";
// Projects
import { GET_PROJECT } from "../graphql/queries/projects";
// Project Unit Type
import {
  CREATE_PROJECT_UNIT_TYPE,
  UPDATE_PROJECT_UNIT_TYPE,
  DELETE_PROJECT_UNIT_TYPE,
} from "../graphql/mutations/projectUnitType";
// Project Attachment
import {
  UPLOAD_PROJECT_ATTACHMENT,
  DELETE_PROJECT_ATTACHMENT,
} from "../graphql/mutations/projectAttachment";
// Project Schedule
import {
  CREATE_PROJECT_SCHEDULE,
  UPDATE_PROJECT_SCHEDULE,
  DELETE_PROJECT_SCHEDULE,
} from "../graphql/mutations/projectSchedule";
// Project Commission Scheme
import {
  CREATE_PROJECT_COMMISSION_SCHEME,
  UPDATE_PROJECT_COMMISSION_SCHEME,
  DELETE_PROJECT_COMMISSION_SCHEME,
} from "../graphql/mutations/projectCommissionScheme";

export const useProjectDetails = (projectId) => {
  const { data: projectData, loading: projectLoading } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
    skip: !projectId,
    fetchPolicy: "network-only",
  });

  // PROJECT UNIT TYPES
  const [createUnitType] = useMutation(CREATE_PROJECT_UNIT_TYPE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const [updateUnitType] = useMutation(UPDATE_PROJECT_UNIT_TYPE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const [deleteUnitType] = useMutation(DELETE_PROJECT_UNIT_TYPE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  // PROJECT ATTACHMENTS
  const [uploadAttachment] = useMutation(UPLOAD_PROJECT_ATTACHMENT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const [deleteAttachment] = useMutation(DELETE_PROJECT_ATTACHMENT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  // PROJECT SCHEDULES
  const [createSchedule] = useMutation(CREATE_PROJECT_SCHEDULE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const [updateSchedule] = useMutation(UPDATE_PROJECT_SCHEDULE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  const [deleteSchedule] = useMutation(DELETE_PROJECT_SCHEDULE, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
  });

  // PROJECT COMMISSION SCHEMES
  const [createCommissionScheme] = useMutation(
    CREATE_PROJECT_COMMISSION_SCHEME,
    {
      refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
    }
  );

  const [updateCommissionScheme] = useMutation(
    UPDATE_PROJECT_COMMISSION_SCHEME,
    {
      refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
    }
  );

  const [deleteCommissionScheme] = useMutation(
    DELETE_PROJECT_COMMISSION_SCHEME,
    {
      refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
    }
  );

  return {
    project: projectData?.project,
    loading: projectLoading,
    unitTypes: {
      create: createUnitType,
      update: updateUnitType,
      delete: deleteUnitType,
    },
    attachments: {
      upload: uploadAttachment,
      delete: deleteAttachment,
    },
    schedules: {
      create: createSchedule,
      update: updateSchedule,
      delete: deleteSchedule,
    },
    commissionSchemes: {
      create: createCommissionScheme,
      update: updateCommissionScheme,
      delete: deleteCommissionScheme,
    },
  };
};
