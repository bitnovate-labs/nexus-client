import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "../graphql/queries/branches";

export const useBranches = () => {
  const { data, loading, error } = useQuery(GET_BRANCHES);

  return {
    branches: data?.branches || [],
    loading,
    error,
  };
};
