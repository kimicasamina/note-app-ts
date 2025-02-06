import axiosClient from "./apiClient";

export const getNotesApi = async () => {
  try {
    const response = await axiosClient.get("/api/notes/", {
      withCredentials: true,
    });
    console.log("RESPONSE: ", response.data);
    return response.data.notes;
  } catch (error) {
    console.log("Error fetching notes", error);
    throw error; // Ensure the error is thrown so the react-query can catch it
  }
};
