import { createContext, ReactNode } from "react";
import { USerDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: USerDTO
}

export type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  return(
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Rodrigo',
        email: 'rodrigo@email.com',
        avatar: 'rodrigo.png'
      }
    }
    } >
      {children}
    </AuthContext.Provider>
  );
}