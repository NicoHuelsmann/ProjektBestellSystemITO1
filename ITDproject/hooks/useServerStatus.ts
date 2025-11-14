// useServerStatus.ts
import { useEffect, useState } from "react";
import {url} from "@/fetchRequests/config";

export default function useServerStatus(interval = 1000) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${url}/health`, { method: "HEAD" });
        setOnline(res.ok);
      } catch {
        setOnline(false);
      }
    };

    checkServer(); // direkt beim Laden prüfen
    const id = setInterval(checkServer, interval);
    return () => clearInterval(id);
  }, [interval]);

  return online;
}
