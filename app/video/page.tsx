"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

export default function VideoPage() {
  const [token, setToken] = useState<string | null>(null);
  const [livekitUrl, setLivekitUrl] = useState<string | null>(null);

  useEffect(() => {
    async function joinRoom() {
      const res = await fetch("/api/token", {
        method: "POST",
        body: JSON.stringify({
          roomName: "demo-room",
          participantName: "User-" + Math.floor(Math.random() * 1000),
        }),
      });

      const data = await res.json();
      setToken(data.token);
      setLivekitUrl(data.url);
    }

    joinRoom();
  }, []);

  if (!token || !livekitUrl) return <div>Loading...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={livekitUrl}
      connect={true}
      audio={true}
      video={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}

