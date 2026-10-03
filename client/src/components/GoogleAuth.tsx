import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import UserDashboard from "./UserDashboard";

const API = import.meta.env.VITE_API_URL || "";

type GoogleUser = {
  email: string;
  name: string;
  picture: string;
};

export default function GoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => (r.ok ? r.json() : null))
      .then(d => d?.ok && setUser(d.user))
      .catch(() => {});
  }, []);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (data.ok) setUser(data.user);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  if (user) {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setDashboardOpen(true)}
            title="Open my account"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px 4px 4px",
              background: "#1e1e1e",
              border: "1px solid #2a2a2a",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              width={26}
              height={26}
              style={{ borderRadius: "50%" }}
            />
            <span style={{ fontSize: 11, color: "#f5e6c8", fontWeight: 500 }}>
              {user.name.split(" ")[0]}
            </span>
          </button>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 9,
              color: "#e8b96a",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            Logout
          </button>
        </div>
        <UserDashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      </>
    );
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google login failed")}
      theme="filled_black"
      shape="pill"
      size="medium"
      text="signin"
    />
  );
}