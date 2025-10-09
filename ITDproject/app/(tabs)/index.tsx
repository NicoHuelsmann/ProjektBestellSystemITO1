import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9000/users");
        console.log("Antwortstatus:", response.status);
        const data = await response.json();
        console.log("Antwortdaten:", data);

        if (data.success) {
          setUsers(data.users);
        } else {
          setError("Server hat keine Benutzer geliefert");
        }
      } catch (err: any) {
        console.error("Fehler beim Abrufen:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Lade Benutzer...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Fehler: {error}</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Keine Benutzer gefunden.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      {users.map((user, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Benutzer: {user.username}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
