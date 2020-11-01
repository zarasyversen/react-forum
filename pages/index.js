import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome, please log in</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to our site.
        </h1>
        <h2> Login </h2>

        <p>Don't have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
      </main>
    </div>
  )
}
