// pages/org/[id]/team.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Définir l'interface pour un utilisateur
interface User {
    userId: number; // ou string si c'est le cas
    username: string;
    email: string;
}

const Team = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]); // Typage de l'état users

    useEffect(() => {
        const fetchUsers = async () => {
            const cognitoId = localStorage.getItem('qsid'); // Récupérer le cognitoId du localStorage

            if (cognitoId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/organization/${cognitoId}/users`, {
                        withCredentials: true, // Pour envoyer les cookies avec la requête
                    });

                    setUsers(response.data); // Assurez-vous que la réponse correspond à l'interface User
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchUsers();
    }, []); // Pas besoin de dépendances ici

    return (
        <div>
            <h1>Team</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Team;
