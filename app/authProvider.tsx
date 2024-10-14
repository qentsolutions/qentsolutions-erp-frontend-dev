import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId:
                process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        },
    },
});

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            inputProps: { required: true },
        },
        email: {
            order: 1,
            placeholder: "Enter your email address",
            label: "Email",
            inputProps: { type: "email", required: true },
        },
        password: {
            order: 3,
            placeholder: "Enter your password",
            label: "Password",
            inputProps: { type: "password", required: true },
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            inputProps: { type: "password", required: true },
        },
    },
};

const AuthProvider = ({ children }: any) => {
    const [userExists, setUserExists] = useState(false);

    // Fonction pour récupérer le token JWT
    const getToken = async () => {
        try {
            const session = await fetchAuthSession();
            return session.tokens?.accessToken;
        } catch (error) {
            console.error("Error getting token:", error);
            return null;
        }
    };

    const handleUserCreation = async (user: any) => {
        const cognitoId = user.username; // Cognito utilise 'username' pour l'ID utilisateur
        const token = await getToken(); // Récupère le JWT de l'utilisateur

        if (!token) {
            console.error("Unable to fetch JWT token.");
            return;
        }

        try {
            // Vérifiez si l'utilisateur existe
            const response = await axios.get(`http://localhost:3000/api/users/${cognitoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
                },
            });

            if (response.status === 200) {
                setUserExists(true); // Marque que l'utilisateur existe déjà
                return;
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                // L'utilisateur n'existe pas, donc on le crée
                try {
                    await axios.post(
                        "http://localhost:3000/api/users/add",
                        { username: user.username, cognitoId },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
                            },
                        }
                    );
                    setUserExists(true); // Marque que l'utilisateur a été créé
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            } else {
                console.error("Error fetching user:", error);
            }
        }
    };

    return (
        <div>
            <Authenticator formFields={formFields}>
                {({ user }: any) => {
                    if (user && !userExists) {
                        handleUserCreation(user); // Crée l'utilisateur si connecté
                    }

                    return user ? <div>{children}</div> : <h1>Please sign in</h1>;
                }}
            </Authenticator>
        </div>
    );
};

export default AuthProvider;
