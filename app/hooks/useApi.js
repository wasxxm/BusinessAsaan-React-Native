import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    try {
      setLoading(true);
      const response = await apiFunc(...args);
      // console.log(response);
      setData(response.data);
      setLoading(false);
      setError(!response.ok);
      return response;
    } catch (e) {
      setLoading(false);
      setError(true);
    }
    return null;
  };

  return { data, error, loading, request };
};
