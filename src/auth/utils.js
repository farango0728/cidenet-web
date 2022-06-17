import useJwt from "@/auth/jwt/useJwt";

export const isUserLoggedIn = () => {
  return (
    localStorage.getItem("userData") &&
    localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  );
};

export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "Empleado") return { name: "apps-employees-list" };

  return { name: "auth-login" };
};
