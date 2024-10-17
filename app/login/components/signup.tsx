import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

interface SignupProps {
    onVerified: () => void; 
}

const Signup: React.FC<SignupProps> = ({ onVerified }) => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [confirmationCode, setConfirmationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    // Charger l'état depuis le localStorage au démarrage
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedIsVerifying = localStorage.getItem("isVerifying") === "true";
        const storedConfirmationCode = JSON.parse(localStorage.getItem("confirmationCode") || "[]");
        const storedTimestamp = localStorage.getItem("timestamp");

        if (storedUsername && storedEmail && storedPassword) {
            if (storedTimestamp && Date.now() - Number(storedTimestamp) < 120000) {
                // Vérifie si moins de 2 minutes se sont écoulées
                setUsername(storedUsername);
                setEmail(storedEmail);
                setPassword(storedPassword);
                setIsVerifying(storedIsVerifying);
                setConfirmationCode(storedConfirmationCode);
            } else {
                // Si plus de 2 minutes, réinitialise le localStorage
                localStorage.clear();
            }
        }
    }, []);

    // Enregistrer l'état dans le localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("isVerifying", JSON.stringify(isVerifying));
        localStorage.setItem("confirmationCode", JSON.stringify(confirmationCode));
        localStorage.setItem("timestamp", Date.now().toString());
    }, [username, email, password, isVerifying, confirmationCode]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/connection/signup", {
                username,
                password,
                email,
            });
            setMessage(response.data.message);
            setIsVerifying(true);
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Sign up failed");
        }
    };

    const handleInputChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...confirmationCode];
            newCode[index] = value;
            setConfirmationCode(newCode);

            if (value && index < 5) {
                document.getElementById(`code-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !confirmationCode[index] && index > 0) {
            document.getElementById(`code-${index - 1}`)?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = confirmationCode.join('');
        try {
            await axios.post("http://localhost:3000/api/connection/confirm-signup", {
                confirmationCode: code,
                username,
            });
            toast.success("Your email has been verified.");
            onVerified(); // Appelle le callback pour rediriger vers Signin
            // Nettoyer le localStorage après vérification
            localStorage.clear();
        } catch (error: any) {
            toast.error("Verification failed");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new account to get started</CardDescription>
                </CardHeader>
                {!isVerifying ? (
                    <form onSubmit={handleSignup}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full">Sign Up</Button>
                            {message && <p className="mt-4 text-red-500">{message}</p>}
                        </CardFooter>
                    </form>
                ) : (
                    <form onSubmit={handleVerify}>
                        <CardContent className="space-y-4">
                            <Label htmlFor="confirmationCode">Enter Confirmation Code for <b className="text-blue-500">{username}</b></Label>
                            <div className="flex justify-between">
                                {confirmationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-2xl font-bold text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                                        pattern="[0-9]*"
                                    />
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full">Verify</Button>
                            <Button type="button" variant="outline" onClick={() => setIsVerifying(false)} className="w-full">
                                Cancel
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default Signup;
