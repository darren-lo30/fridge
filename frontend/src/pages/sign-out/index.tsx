import UserAPI from "src/apiLayer/UserAPI";
import { useUser } from "@contexts/UserProvider";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOut: NextPage = () => {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function signOut () {
      await UserAPI.signOut();
      await setUser(null);
      await router.push('/');
    }

    void signOut();
  }, [router, setUser]);
  return null;
}


export default SignOut;