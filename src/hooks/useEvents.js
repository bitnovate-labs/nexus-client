import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENTS } from "../graphql/queries/events";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENTS,
} from "../graphql/mutations/events";
import { formatDateForServer } from "../utils/dateUtils";

export const useEvents = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  const [createEventMutation] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const [updateEventMutation] = useMutation(UPDATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const [deleteEventsMutation] = useMutation(DELETE_EVENTS, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const validateAndTransformData = (values) => {
    // Required fields validation
    const requiredFields = ["name", "date"];
    const missingFields = requiredFields.filter(
      (field) => !values[field] && values[field] !== 0
    );
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Transform dates and values
    const transformedData = {
      name: values.name.trim(),
      date: formatDateForServer(values.date),
    };

    // Add optional fields only if they have values
    if (values.time) transformedData.time = values.time;
    if (values.venue) transformedData.venue = values.venue.trim();
    if (values.speaker) transformedData.speaker = values.speaker.trim();
    if (values.topic) transformedData.topic = values.topic.trim();
    if (values.limitPax !== undefined && values.limitPax !== null) {
      transformedData.limitPax = parseInt(values.limitPax, 10);
    }
    if (values.designation)
      transformedData.designation = values.designation.trim();
    if (values.branch) transformedData.branch = values.branch.trim();
    if (values.description)
      transformedData.description = values.description.trim();

    return transformedData;
  };

  const createEvent = async (eventData) => {
    try {
      const transformedData = validateAndTransformData(eventData);
      const { data } = await createEventMutation({
        variables: transformedData,
      });
      return data.createEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const transformedData = validateAndTransformData(eventData);
      const { data } = await updateEventMutation({
        variables: {
          id,
          ...transformedData,
        },
      });
      return data.updateEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteEvents = async (ids) => {
    try {
      const { data } = await deleteEventsMutation({
        variables: { ids },
      });
      return data.deleteEvents;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    events: data?.events || [],
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvents,
  };
};
