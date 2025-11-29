export default function CaptionBox({ original, translated }) {
  return (
    <div style={{
      background: "#333",
      padding: 12,
      marginBottom: 8,
      borderRadius: 6,
      color: "white"
    }}>
      <p style={{ margin: 0 }}>{original}</p>
      <p style={{ margin: 0, color: "#33ff99", fontWeight: "bold" }}>
        {translated}
      </p>
    </div>
  );
}
