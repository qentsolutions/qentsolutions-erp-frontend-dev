"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const OrgPage = () => {
    const router = useRouter();

    useEffect(() => {
        const checkUserOrganization = async () => {
            try {
                // Récupération de l'ID Cognito depuis le localStorage
                const cognitoId = localStorage.getItem("qsid");
                if (!cognitoId) {
                    // Redirection vers la page de connexion si l'ID n'est pas présent
                    router.push("/login");
                    return;
                }
                
                // Appel à l'API pour obtenir les données utilisateur avec les cookies de session
                const response = await axios.get(`http://localhost:3000/api/user/${cognitoId}`, {
                    withCredentials: true, // Assure l'envoi des cookies de session
                });
                const userData = response.data;

                // Vérifiez si l'utilisateur a une organisation
                if (userData.organizationId) {
                    // Rediriger vers la page de l'organisation
                    router.push(`/org/${userData.organizationId}/portal`);
                } else {
                    // Rediriger vers la page pour rejoindre ou créer une organisation
                    router.push("/portal/org/join-or-create");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Gérer l'erreur, éventuellement rediriger vers une page d'erreur
            }
        };

        checkUserOrganization();
    }, [router]);

    return <div>Loading...</div>; // Vous pouvez afficher un loader ici
};

export default OrgPage;
