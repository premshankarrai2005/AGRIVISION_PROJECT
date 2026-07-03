export const storage = {
  setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }

    return null;
  },

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};