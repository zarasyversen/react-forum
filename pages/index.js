import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../components/containers/LoginForm'
import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  useEffect(() => {

    if (localStorage.getItem('userToken')) {
      router.push("/welcome");
    }

  }, [])
  
  return (
    <div className="wrapper">
      <Head>
        <title>Welcome, please log in</title>
      </Head>
      <main>
        <h1>Welcome to our site.</h1>
        <LoginForm />
        <p>Don't have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
      </main>
    </div>
  )
}
