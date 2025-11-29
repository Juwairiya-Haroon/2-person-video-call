"use client";

import { useEffect, useRef } from "react";
import { Room, RoomEvent, RemoteParticipant, RemoteTrackPublication } from "livekit-client";

export default function VideoPage() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Immediately join the room when the page loads
    joinRoom();
  }, []);

  async function joinRoom() {
    try {
      // 1. Request token from backend
      const res = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: "test-room",
          participantName: "Juwairiya",
        }),
      });

      const data = await res.json();

      if (!data.token) {
        console.error("Token error:", data);
        return;
      }

      // 2. Connect to LiveKit room
      const room = new Room();
      await room.connect(data.url, data.token);

      console.log("Connected to room!");

      // 3. Publish local camera
      const localTracks = await room.localParticipant.createTracks({
        audio: true,
        video: true,
      });

      // Attach your own camera to the local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = new MediaStream(
          localTracks.map((t) => t.mediaStreamTrack)
        );
        localVideoRef.current.play();
      }

      // 4. When a remote participant joins
      room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
        console.log("Participant connected:", participant.identity);
      });

      // 5. When remote participant publishes a track (camera/mic)
      room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log("Subscribed to track from:", participant.identity);

        if (track.kind === "video" && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = new MediaStream([track.mediaStreamTrack]);
          remoteVideoRef.current.play();
        }
      });
    } catch (err) {
      console.error("Join room error:", err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple 2-Person Video Call</h1>

      <h2>Your Camera</h2>
      <video ref={localVideoRef} autoPlay playsInline style={{ width: "400px" }} />

      <h2>Remote Participant</h2>
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "400px" }} />
    </div>
  );
}
