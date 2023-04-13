import { createContext, ReactNode, useState } from "react";
import { USerDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: USerDTO
}

export type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  const [user, setUser] = useState({
    id: '1',
    name: 'Rodrigo',
    email: 'rodrigo@email.com',
    avatar: 'rodrigo.png'
  });

  return(
    <AuthContext.Provider value={{ user }
    } >
      {children}
    </AuthContext.Provider>
  );
}