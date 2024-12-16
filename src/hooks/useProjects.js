import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries/projects";
import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $company: String!
    $name: String!
    $developerId: ID!
    $developerPayTax: Boolean
    $stateId: ID!
    $description: String
    $active: Boolean!
  ) {
    createProject(
      company: $company
      name: $name
      developerId: $developerId
      developerPayTax: $developerPayTax
      stateId: $stateId
      description: $description
      active: $active
    ) {
      id
      company
      name
      developer {
        id
        name
      }
      developerPayTax
      state {
        id
        name
      }
      description
      active
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $company: String
    $name: String
    $developerId: ID
    $developerPayTax: Boolean
    $stateId: ID
    $description: String
    $active: Boolean
  ) {
    updateProject(
      id: $id
      company: $company
      name: $name
      developerId: $developerId
      developerPayTax: $developerPayTax
      stateId: $stateId
      description: $description
      active: $active
    ) {
      id
      company
      name
      developer {
        id
        name
      }
      developerPayTax
      state {
        id
        name
      }
      description
      active
    }
  }
`;

const DELETE_PROJECTS = gql`
  mutation DeleteProjects($ids: [ID!]!) {
    deleteProjects(ids: $ids)
  }
`;

export const useProjects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  const [createProjectMutation] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const [updateProjectMutation] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const [deleteProjectsMutation] = useMutation(DELETE_PROJECTS, {
    refetchQueries: [{ query: GET_PROJECTS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const createProject = async (projectData) => {
    try {
      const { data } = await createProjectMutation({
        variables: projectData,
      });
      return data.createProject;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const { data } = await updateProjectMutation({
        variables: { id, ...projectData },
      });
      return data.updateProject;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteProjects = async (ids) => {
    try {
      const { data } = await deleteProjectsMutation({
        variables: { ids },
      });
      return data.deleteProjects;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    projects: data?.projects || [],
    loading,
    error,
    createProject,
    updateProject,
    deleteProjects,
  };
};
