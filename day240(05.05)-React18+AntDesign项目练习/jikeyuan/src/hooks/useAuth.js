import React from "react";
import { AuthContext } from "@/contexts/authContext";

export default function useAuth() {
  return React.useContext(AuthContext);
}
