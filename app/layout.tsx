export const metadata = {
  title: "2-Person Video Call",
  description: "Simple 2-person video calling app using LiveKit",
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#111",
          color: "white",
          fontFamily: "Arial, sans-serif",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}

