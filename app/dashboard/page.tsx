"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { cognitoUserPoolsTokenProvider, getCurrentUser } from "@aws-amplify/auth/cognito";
import { defaultStorage, sessionStorage } from "aws-amplify/utils";
import WeeklyCalendar from "./components/weekly-calendar";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour récupérer les utilisateurs avec le token JWT
    const fetchUsers = async () => {
        try {
            // Récupère le JWT de Cognito
            cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);
            const session = await fetchAuthSession();
            const token = session.tokens?.accessToken;
            const cognitoId = session.tokens?.accessToken.payload.username;
            const user = getCurrentUser();
            console.log(user);
            // Effectue la requête API pour récupérer les utilisateurs
            const response = await axios.get(`http://localhost:3000/api/users/${cognitoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
                },
            });

            setUsers(response.data); // Stocke les utilisateurs dans l'état
        } catch (err: any) {
            setError(`Error fetching users: ${err.message}`);
        }
    };

    useEffect(() => {
        // Appelle la fonction pour récupérer les utilisateurs au montage du composant
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
