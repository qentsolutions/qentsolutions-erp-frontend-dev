import React from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/signout", {}, { withCredentials: true });

      if (response.status === 200) {
        // Rediriger ou mettre à jour l'état de l'application ici
        window.location.reload(); // Optionnel : recharger la page après la déconnexion
      } else {
        throw new Error("Failed to sign out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out."); // Message d'erreur simple
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center"
    >
      <LogOut className="mr-2 h-4 w-4 text-red-500" />
      <span>Log out</span>
    </button>
  );
};

export default LogoutButton;
