import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/appointments`;

// Create a new appointment (either as mentee or mentor)
export const submitAppointment = async (formData) => {
  const { date, time, reason, mentee, mentor } = formData;
  const receiverId = mentee || mentor; // Set the receiver as mentee or mentor based on role

  try {
    const response = await axios.post(
      API_URL,
      {
        date,
        time,
        reason,
        receiverId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating appointment');
  }
};
/*// Create a new appointment (either as mentee or mentor)
export const submitAppointment = async (formData) => {
  const { date, time, reason, mentee, mentor } = formData;

  // Check if mentee is defined
  if (!mentee) {
    console.error("Mentee is undefined or null");
    throw new Error("Mentee ID is required to create an appointment.");
  }

  const receiverId = mentee || mentor; // Set the receiver as mentee or mentor based on role

  console.log("Receiver ID:", receiverId); // Log the receiver ID for debugging

  try {
    const response = await axios.post(
      API_URL,
      {
        date,
        time,
        reason,
        receiverId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response); // Log error details for debugging
    throw new Error(error.response?.data?.message || 'Error creating appointment');
  }
};
*/
// Get appointments for the current user
export const fetchAppointments = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching appointments');
  }
};

// Update appointment status (Accept/Reject)
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${appointmentId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating appointment status');
  }
};
