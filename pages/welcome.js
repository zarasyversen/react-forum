import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from "react";



export default function Register() {

  const [isBusy, setBusy] = useState(true);
  const [activeUser, setActiveUser] = useState('');

  useEffect(() => {
    async function getData() {
  
      let token = localStorage.getItem('userToken');
      let headers = {"Content-Type": "application/json"};
      if (token) {
        headers["Authorization"] = `${token}`;
      }
  
      fetch('http://php-project.test/api/welcome', {
      method: 'POST',
      headers,
      credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(
        (result) => {
  
          if (result.error) {
            console.log(result.error);
          } else {
            setBusy(false)
            console.log(result);
            setActiveUser(result.activeUser.name);
          }
  
        }
      )
    }
  
    getData();
  }, [])


  return (
    <div className="wrapper">
       <Head>
        <title>Welcome</title>
      </Head>
      {isBusy ? (
       <p>Loading...</p>
      ) : (
        <h1>Hi {activeUser} Welcome to our site</h1> 
      )}
    </div>
  )
}