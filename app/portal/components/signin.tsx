// components/Signin.tsx

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importer useRouter

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter(); // Initialiser useRouter

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Appel de l'API pour la connexion
            await axios.post("http://localhost:3000/api/users/signin", {
                username,
                password,
            }, {
                withCredentials: true, // Permet d'envoyer des cookies
            });
            setMessage("Sign in successful");

            router.push("/portal");
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Sign in failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSignin}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Sign In
                </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default Signin;
