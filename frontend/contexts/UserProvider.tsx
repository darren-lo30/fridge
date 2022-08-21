import UserAPI from "@apiLayer/UserAPI";
import { User } from "@fridgeTypes/User";
import { GetServerSideProps } from "next";
import React, { Dispatch, useEffect, useState } from "react";
import { createCtx } from "./contextUtils";

type UserContextState = {
  user: User | null,
  setUser: Dispatch<User | null>
}

const [useUser, UserProviderCtx] = createCtx<UserContextState>();

export { useUser };

export const UserProvider = ({ children } : React.PropsWithChildren) => {  
  const [ user, setUser ] = useState<User | null >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    void (async() => {
      const response = await UserAPI.auth();
      setUser(response.user);

      setLoading(false);
    })();
  }, []);

  return (  
    <UserProviderCtx value={{ user, setUser }}>
      { loading ?  null : children }
    </UserProviderCtx>
  )
}
