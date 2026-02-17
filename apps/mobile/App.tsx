import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { checkEmailAvailability, getHealth } from "./src/lib/api-client";

export default function App() {
  const [message, setMessage] = useState("Checking API health...");
  const [authMessage, setAuthMessage] = useState("Checking auth endpoint...");

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        const result = await getHealth();
        const authResult = await checkEmailAvailability("demo@example.com");
        if (isMounted) {
          setMessage(`API healthy: ${result.service}`);
          setAuthMessage(
            `Email ${authResult.email} available: ${String(authResult.available)}`
          );
        }
      } catch {
        if (isMounted) {
          setMessage("API unavailable. Start apps/api and retry.");
          setAuthMessage("Auth endpoint unavailable.");
        }
      }
    }

    loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View>
      <Text>{message}</Text>
      <Text>{authMessage}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
