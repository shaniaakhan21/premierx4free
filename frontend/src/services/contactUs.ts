import axios from "axios";

export const postContactUs = async (data: { message: string }) => {
  return (await axios.post('/contactUs', data)).data
}
