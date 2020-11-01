import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/elements/Button'
import FieldGroup from '../components/elements/FieldGroup'
import { useState } from "react";

export default function Home() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('http://php-project.test/api/login', {
      method: 'POST',
      body:formData
    }).then(response => response.json())
    .then(
      (result) => {

        if (result.missingUsername || result.missingPassword) {
          console.log('error');
          return;
        }

        if (result.username && result.password) {
          console.log('log me in');
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )
  
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Welcome, please log in</title>
      </Head>

      <main>
        <h1>Welcome to our site.</h1>
        <h2> Login </h2>
        <p>Please fill in your credentials to login.</p>
        <form onSubmit={handleSubmit} className="form">
  
          <FieldGroup 
            id="username"
            label="Username"
            inputType="text"
            value={username}
            setMethod={setUserName}/>
          <FieldGroup 
            id="password"
            label="Password"
            inputType="password"
            value={password}
            setMethod={setPassword}/>
          <div className="form__group actions">
            <Button type="submit" text="Login"/>
          </div>
        </form>
        <p>Don't have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
      </main>
    </div>
  )
}
