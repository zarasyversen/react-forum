import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
  return (
    <div className="wrapper">
       <Head>
        <title>Sign Up</title>
      </Head>
      <h1>Sign Up</h1> 
      <p>Already have an account? <Link href="/"><a>Login here</a></Link>.</p>
    </div>

  )
}