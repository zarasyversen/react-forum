import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function LogOut() {
  const router = useRouter();

  useEffect(() => {

    localStorage.removeItem('userToken');
    router.push("/");

  }, [])

  return '';
}