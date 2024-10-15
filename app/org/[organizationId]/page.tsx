"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const JoinOrCreateOrgPage = () => {
    const [organizationId, setOrganizationId] = useState("");
    const [newOrgName, setNewOrgName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [isInOrganization, setIsInOrganization] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUserOrganization = async () => {
            const cognitoId = localStorage.getItem("qsid");
            if (cognitoId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/user/${cognitoId}`, { withCredentials: true });
                    const user = response.data;

                    if (user.organizationId) {
                        setIsInOrganization(true);
                        router.push(`/org/${user.organizationId}/portal`);
                    }
                } catch (error) {
                    console.error("Error fetching user organization:", error);
                }
            }
            // Simuler un temps de chargement de 5 secondes
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        checkUserOrganization();
    }, [router]);

    const handleJoinOrg = async (e:any) => {
        e.preventDefault();
        try {
            const cognitoId = localStorage.getItem("qsid");
            await axios.post(
                `http://localhost:3000/api/organization/add-user`,
                { cognitoId, organizationId },
                { withCredentials: true }
            );
            setMessage("Vous avez rejoint l'organisation avec succès.");
            setTimeout(() => {
                router.push(`/org/${organizationId}/portal`);
            }, 2000);
        } catch (error) {
            setMessage("Erreur lors de la tentative de rejoindre l'organisation.");
            console.error("Error joining organization:", error);
        }
    };

    const handleCreateOrg = async (e:any) => {
        e.preventDefault();
        try {
            const cognitoId = localStorage.getItem("qsid");
            const response = await axios.post(
                `http://localhost:3000/api/organization`,
                { name: newOrgName, cognitoId },
                { withCredentials: true }
            );
            const createdOrgId = response.data.id;
            setMessage("Organisation créée avec succès.");
            setTimeout(() => {
                router.push(`/org/${createdOrgId}/portal`);
            }, 2000);
        } catch (error) {
            setMessage("Erreur lors de la création de l'organisation.");
            console.error("Error creating organization:", error);
        }
    };

    if (loading) {
        return <div>...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-32">
            <h2 className="text-2xl font-semibold text-center mb-6">Rejoindre ou Créer une Organisation</h2>
            <form className="mb-6" onSubmit={handleJoinOrg}>
                <h3 className="text-lg font-medium mb-2">Rejoindre une Organisation</h3>
                <input
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="ID de l'organisation"
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    required
                />
                <button className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200" type="submit">Rejoindre</button>
            </form>

            {!isInOrganization && (
                <form onSubmit={handleCreateOrg}>
                    <h3 className="text-lg font-medium mb-2">Créer une Organisation</h3>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Nom de la nouvelle organisation"
                        value={newOrgName}
                        onChange={(e) => setNewOrgName(e.target.value)}
                        required
                    />
                    <button className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200" type="submit">Créer</button>
                </form>
            )}

            {message && <p className="text-center text-blue-500 mt-4">{message}</p>}
        </div>
    );
};

export default JoinOrCreateOrgPage;
