import axios from "axios";

export const getResult = async (domain, formData) => {
  const res = await axios.post(domain, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return res;
};
