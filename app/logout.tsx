import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export default function LogOut() {

  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  // TODO logout from server 

  useEffect(() => {
    logOut();
    router.replace('/login');
  }, []);


  return (<></>);
}
