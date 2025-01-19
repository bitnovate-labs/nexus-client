import { useQuery, useMutation } from "@apollo/client";
import { GET_MEMOS } from "../graphql/queries/memos";
import {
  CREATE_MEMO,
  UPDATE_MEMO,
  DELETE_MEMOS,
} from "../graphql/mutations/memos";
import { formatDateForServer } from "../utils/dateUtils";

export const useMemos = () => {
  const { data, loading, error } = useQuery(GET_MEMOS);

  const [createMemoMutation] = useMutation(CREATE_MEMO, {
    refetchQueries: [{ query: GET_MEMOS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const [updateMemoMutation] = useMutation(UPDATE_MEMO, {
    refetchQueries: [{ query: GET_MEMOS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const [deleteMemosMutation] = useMutation(DELETE_MEMOS, {
    refetchQueries: [{ query: GET_MEMOS }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const validateAndTransformData = (values) => {
    // Required fields validation
    const requiredFields = ["date", "title"];
    const missingFields = requiredFields.filter((field) => {
      const value = values[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Transform dates and values
    const transformedData = {
      date: formatDateForServer(values.date),
      title: values.title.trim(),
    };

    // Add optional fields only if they have values
    if (values.validityFrom) {
      transformedData.validityFrom = formatDateForServer(values.validityFrom);
    }
    if (values.validityTo) {
      transformedData.validityTo = formatDateForServer(values.validityTo);
    }
    if (values.branch) {
      transformedData.branch = values.branch.trim();
    }
    if (values.designation) {
      transformedData.designation = values.designation.trim();
    }
    if (values.description) {
      transformedData.description = values.description.trim();
    }

    return transformedData;
  };

  const createMemo = async (memoData) => {
    console.log("Creating memo with values:", memoData); // Debug log

    try {
      const transformedData = validateAndTransformData(memoData);
      const response = await createMemoMutation({
        variables: transformedData,
      });
      console.log("Mutation response:", response); // Debug log
      return response.data.createMemo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateMemo = async (id, memoData) => {
    try {
      const transformedData = validateAndTransformData(memoData);
      const response = await updateMemoMutation({
        variables: {
          id,
          ...transformedData,
        },
      });
      return response.data.updateMemo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteMemos = async (ids) => {
    try {
      const response = await deleteMemosMutation({
        variables: { ids },
      });
      return response.data.deleteMemos;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    memos: data?.memos || [],
    loading,
    error,
    createMemo,
    updateMemo,
    deleteMemos,
  };
};
