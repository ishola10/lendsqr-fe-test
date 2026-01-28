import { useState, useEffect } from "react";
import { fetchUsers } from "@/lib/api";
import { User } from "@/types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const cachedUsers = localStorage.getItem("lendsqr_users");
        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
          setLoading(false);
        }

        const data = await fetchUsers();
        setUsers(data);
        localStorage.setItem("lendsqr_users", JSON.stringify(data));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch users");
        }
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading, error };
};
