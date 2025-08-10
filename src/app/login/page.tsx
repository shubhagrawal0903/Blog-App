"use client"
import gqlClient from "@/services/gqlClient"
import { gql } from "graphql-request"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const LOG_IN = gql`
mutation SignUpUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
` 

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try{
      const data = await gqlClient.request(LOG_IN, { email, password }) as { loginUser: boolean };
      if(data.loginUser){
        router.push("/");
      } else{
        return false;
      }
    } catch(err){
      console.error("Error logging in:", err);
      return false;
    }
  }



  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Login</h1>
          <p className="text-black">Sign in to your account</p>
        </div>


        <div className="bg-white border border-black p-6">
          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full p-3 border border-black text-black bg-white"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full p-3 border border-black text-black bg-white"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 hover:bg-blue-600"
            >
              Login
            </button>
          </form>


          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-blue-500 hover:text-blue-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}