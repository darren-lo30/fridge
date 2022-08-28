import { useUser } from "@src/contexts/UserProvider";
import { nonAuthedRoutes } from "@src/configs/navConfig";
import { useRouter } from "next/router";
const RouterGuard = ({ children } : React.PropsWithChildren) => {
  const router = useRouter();
  const {user} = useUser();

  if(!user && !nonAuthedRoutes.includes(router.asPath)) {
    void router.push('/sign-in');
    return (<></>);
  } 

  return (<>{ children }</>)
  
}

export default RouterGuard;