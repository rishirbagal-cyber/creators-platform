import { useState } from "react";

function ConnectionTest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/health");
      const data = await res.json();

      setMessage("✅ Success: " + data.message);
    } catch (error) {
      setMessage("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h3>Backend Connection Test</h3>
      <button onClick={testConnection} disabled={loading}>
        {loading ? "Testing..." : "Test Connection"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ConnectionTest;