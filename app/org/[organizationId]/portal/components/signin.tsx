"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter(); // Initialize useRouter

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // API call for sign-in
            const response = await axios.post("http://localhost:3000/api/connection/signin", {
                username,
                password,
            }, {
                withCredentials: true, // Allows sending cookies
            });

            // Stocker le cognitoId dans le localStorage
            const { cognitoId } = response.data; // Assurez-vous que votre réponse inclut le cognitoId
            localStorage.setItem("qsid", cognitoId);

            setMessage("Sign in successful");
            router.push("/portal");
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Sign in failed");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Sign In</Button>
                        {message && <p className="mt-4 text-red-500">{message}</p>}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Signin;
