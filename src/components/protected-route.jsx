// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  let isAuthenticated = false;

  try {
    const authSession = localStorage.getItem("procurement-auth-session");
    if (authSession) {
      const parsedSession = JSON.parse(authSession);
      isAuthenticated = parsedSession?.state?.userData?.token ? true : false;
    }
  } catch (error) {
    console.error("Error parsing auth session:", error);
    isAuthenticated = false;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
