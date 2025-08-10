'use client'
import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SIGN_UP_USER = gql`
    mutation SignUpUser($name: String!, $email: String!, $password: String!) {
        signUpUser(name: $name, email: $email, password: $password) 
    }
`;

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = await gqlClient.request(SIGN_UP_USER, {
                name,
                email,
                password
            }) as { signUpUser: boolean };
            if (data.signUpUser) {
                router.push("/");
                alert("User signed up successfully!");
            } else {
                alert("User sign up failed.");
            }
        } catch (error) {
            console.error("Error signing up user:", error);
            alert("An error occurred during sign up.");
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Sign Up</h1>
                    <p className="text-black">Create your account</p>
                </div>


                <div className="bg-white border border-black p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-black text-black bg-white"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-black text-black bg-white"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-black text-black bg-white"
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </form>


                    <div className="mt-6 text-center">
                        <p className="text-sm text-black">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}