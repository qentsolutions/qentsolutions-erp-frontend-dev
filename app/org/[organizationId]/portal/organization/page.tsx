"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Interface pour un utilisateur
interface User {
  userId: number; // ou string si nécessaire
  username: string;
  email: string;
  profilePictureUrl?: string;
  status: string;
  role: string;
}

const Team = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const cognitoId = localStorage.getItem('qsid'); // Récupère le cognitoId du localStorage

      if (cognitoId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/organization/${cognitoId}/users`, {
            withCredentials: true, // Pour envoyer les cookies avec la requête
          });

          setUsers(response.data); // Assure-toi que la réponse correspond à l'interface User
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false); // Fin du chargement même en cas d'erreur
        }
      }
    };

    fetchUsers();
  }, []);

  // Gestion de la pagination
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // Fonction pour changer le rôle de l'utilisateur
  const changeUserRole = async (userId: number, newRole: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${userId}/role`, { role: newRole });
      // Mettre à jour l'état des utilisateurs
      setUsers(users.map(user => (user.userId === userId ? { ...user, role: newRole } : user)));
      console.log(response.data);
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  // Fonction pour retirer un membre
  const removeMember = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId)); // Mettre à jour l'état des utilisateurs
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2" />
            Organization Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Avatar</th>
                    <th className="border border-gray-300 px-4 py-2">Username</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-100 transition duration-200">
                      <td className="border border-gray-300 px-4 py-2">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.profilePictureUrl || undefined} alt={user.username} />
                          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={user.role}
                          onChange={(e) => changeUserRole(user.userId, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="USER">User</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer">•••</DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => removeMember(user.userId)}>
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;
