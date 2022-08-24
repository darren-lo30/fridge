import FridgeAPI from "src/apiLayer/FridgeAPI";
import UserAPI from "src/apiLayer/UserAPI";
import { User } from "@fridgeTypes/User";
import React, { useEffect, useState } from "react";
import { createCtx } from "./contextUtils";

export interface StoredUser extends User { fridgeId: string }

interface UserContextState {
  user: StoredUser | null,
  setUser: (user: User | null) => Promise<void>
}


const [useUser, UserProviderCtx] = createCtx<UserContextState>();

export { useUser };

export const UserProvider = ({ children } : React.PropsWithChildren) => {  
  const [ user, setStoredUser ] = useState<StoredUser | null >(null);
  const [loading, setLoading] = useState(true);
  
  const setUser = async (user: User | null) => {
    if(user === null) return setStoredUser(null);

    try {
      const fridge = await FridgeAPI.showFridge(user.id);
      setStoredUser({ ...user, fridgeId: fridge.id });
    } catch (err) {
      setStoredUser(null);
    }
  }

  useEffect(() => {
    setLoading(true);
    
    void (async() => {
      try {
        const user = await UserAPI.auth();
        await setUser(user);
      } catch (err) {
        await setUser(null);
      }
      
      setLoading(false);
    })();
  }, []);

  return (  
    <UserProviderCtx value={{ user, setUser }}>
      { loading ?  null : children }
    </UserProviderCtx>
  )
}
