"use client";

import React, { useState } from "react";
import Signin from "../org/[organizationId]/portal/components/signin";
import Signup from "../org/[organizationId]/portal/components/signup";
import { Navbar } from "../(marketing)/components/navbar";

const Home: React.FC = () => {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(true);

    const handleToggle = () => {
        setIsSigningIn(!isSigningIn);
    };

    const handleVerified = () => {
        setIsSigningIn(true); // Switch to Signin after verification
    };

    return (
        <div className="flex min-h-screen ">
            <Navbar />
            <div className="flex-1 bg-cover bg-center bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="flex flex-col items-center justify-center h-full p-8">
                    <h1 className="text-white text-4xl font-bold mb-4">Welcome to Our App</h1>
                    <p className="text-white text-lg text-center mb-6">
                        Découvrez une plateforme qui facilite votre quotidien. Que vous soyez ici pour gérer vos tâches,
                        collaborer avec d'autres, ou simplement rester organisé, nous avons tout ce qu'il vous faut.
                    </p>
                    <h2 className="text-white text-2xl font-semibold mb-2">Pourquoi choisir notre application ?</h2>
                    <ul className="text-white text-lg list-disc list-inside mb-4">
                        <li>🚀 **Performances rapides** : Profitez d'une expérience utilisateur fluide et réactive.</li>
                        <li>🔒 **Sécurité renforcée** : Vos données sont protégées grâce à nos protocoles de sécurité avancés.</li>
                        <li>📱 **Accessible partout** : Accédez à votre compte depuis n'importe quel appareil.</li>
                        <li>🤝 **Support dédié** : Notre équipe est là pour vous aider, à tout moment.</li>
                    </ul>
                    <p className="text-white text-lg text-center">
                        Prêt à commencer ? Connectez-vous ou inscrivez-vous pour profiter de toutes nos fonctionnalités.
                    </p>
                </div>
            </div>


            <div className="flex-1 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isSigningIn ? "Sign In" : "Sign Up"}
                    </h2>
                    {isSigningIn ? <Signin /> : <Signup onVerified={handleVerified} />}
                    <button
                        onClick={handleToggle}
                        className="w-full mt-4 py-2 px-4 rounded"
                    >
                        <span className="text-black">
                            {isSigningIn ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <span className="text-blue-500 font-semibold">
                            {isSigningIn ? "Sign Up" : "Sign In"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
