import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/elements/Button'
import FieldGroup from '../components/elements/FieldGroup'

export default function Home() {
  return (
    <div className="wrapper">
      <Head>
        <title>Welcome, please log in</title>
      </Head>

      <main>
        <h1>Welcome to our site.</h1>
        <h2> Login </h2>
        <p>Please fill in your credentials to login.</p>
        <form action="/login" method="post" className="form">
  
          <FieldGroup id="username" label="Username" inputType="text"/>
          <FieldGroup id="password" label="Password" inputType="password"/>

        </form>
        <div className="form__group actions">
          <Button type="submit" text="Login"/>
        </div>
       
        <p>Don't have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
      </main>
    </div>
  )
}
