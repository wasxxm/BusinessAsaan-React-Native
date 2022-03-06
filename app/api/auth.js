import client from "./client";

const login = (email, password, device_name) => client.post("/auth", { email, password, device_name });

export default {
  login,
};
