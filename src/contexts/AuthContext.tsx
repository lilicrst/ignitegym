import { createContext } from "react";
import { USerDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: USerDTO
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);