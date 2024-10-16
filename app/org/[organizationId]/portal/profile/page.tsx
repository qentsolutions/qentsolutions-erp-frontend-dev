// app/profile/UserProfile.tsx
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card"; // Assurez-vous que le chemin est correct
import { Badge } from "@/components/ui/badge"; // Assurez-vous que le chemin est correct
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assurez-vous que le chemin est correct
import { motion } from "framer-motion";

const UserProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null); // Remplacez any par le type utilisateur approprié
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const cognitoId = localStorage.getItem('qsid'); // Récupérer cognitoId du localStorage

            if (!cognitoId) {
                setError("Cognito ID not found in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/user/${cognitoId}`, {
                    withCredentials: true, // Activer les cookies pour les requêtes
                });
                setUser(response.data);
            } catch (error) {
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []); // Pas besoin de dépendance car on ne dépend que de localStorage

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full overflow-hidden">
                <CardContent className="p-0">

                    <div className="pt-6 px-8 pb-8">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
                            <AvatarImage src={user.profilePictureUrl || '/default-avatar.png'} alt={`${user.username}'s profile`} />
                            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-3xl font-bold mt-4">{user.username}</h1>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">{user.email}</p>
                        <Badge variant="outline" className="text-sm py-1 mt-2">
                            {user.status}
                        </Badge>

                        <h2 className="text-lg font-semibold mt-4">Organization:</h2>
                        <p className="text-gray-600 mb-2">{user.organization?.name || 'No organization'}</p>

                        <h2 className="text-lg font-semibold mt-4">History:</h2>
                        <ul className="list-disc pl-5">
                            {user.history.map((item: any, index: number) => (
                                <li key={index} className="text-gray-600">{item}</li>
                            ))}
                        </ul>


                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;
