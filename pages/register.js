import Head from 'next/head'
import Link from 'next/link'
import RegisterForm from '../components/containers/RegisterForm'
import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter();
  useEffect(() => {

    if(localStorage.getItem('userToken')) {
      router.push("/welcome");
    }

  }, [])

  return (
    <div className="wrapper">
       <Head>
        <title>Sign Up</title>
      </Head>
      <h1>Sign Up</h1> 
      <RegisterForm />
      <p>Already have an account? <Link href="/"><a>Login here</a></Link>.</p>
    </div>

  )
}