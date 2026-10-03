import { useEffect, useState } from "react";
import { X, Package, Heart, MapPin, Mail, Phone, LogOut } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "";

type Props = {
  open: boolean;
  onClose: () => void;
};

type User = {
  email: string;
  name: string;
  picture: string;
};

export default function UserDashboard({ open, onClose }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<"profile" | "orders" | "wishlist">("profile");

  useEffect(() => {
    if (!open) return;
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(r => (r.ok ? r.json() : null))
      .then(d => d?.ok && setUser(d.user))
      .catch(() => {});
  }, [open]);

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    onClose();
    window.location.reload();
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1c1c1c",
          color: "#f5e6c8",
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 20,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 28px",
          borderBottom: "1px solid #2a2a2a",
        }}>
          <h3 className="serif" style={{ fontSize: 24, letterSpacing: 2 }}>
            My Account
          </h3>
          <button
            onClick={onClose}
            style={{ color: "#f5e6c8", cursor: "pointer", padding: 4, background: "none", border: "none" }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {user && (
          <div style={{
            padding: "28px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            borderBottom: "1px solid #2a2a2a",
          }}>
            <img
              src={user.picture}
              alt={user.name}
              width={70}
              height={70}
              style={{ borderRadius: "50%", border: "2px solid #e8b96a" }}
            />
            <div>
              <p className="serif" style={{ fontSize: 26, marginBottom: 4 }}>
                {user.name}
              </p>
              <p style={{ fontSize: 13, opacity: 0.75 }}>{user.email}</p>
            </div>
          </div>
        )}

        <div style={{
          display: "flex",
          gap: 24,
          padding: "18px 28px 0",
          borderBottom: "1px solid #2a2a2a",
        }}>
          {[
            { id: "profile", label: "Profile" },
            { id: "orders", label: "Orders" },
            { id: "wishlist", label: "Wishlist" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                paddingBottom: 12,
                color: tab === t.id ? "#e8b96a" : "rgba(245,230,200,0.5)",
                borderBottom: tab === t.id ? "2px solid #e8b96a" : "2px solid transparent",
                cursor: "pointer",
                background: "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "28px" }}>
          {tab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Row icon={<Mail size={16} />} label="Email" value={user?.email || "—"} />
              <Row icon={<Phone size={16} />} label="Phone" value="+91 80889 33427" />
              <Row
                icon={<MapPin size={16} />}
                label="Address"
                value="Shivapur Badavane, Byadgi, Dist: Haveri, Karnataka 581106"
              />
              <button
                onClick={handleLogout}
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#5c0a1e",
                  color: "#f5e6c8",
                  padding: "12px 24px",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}

          {tab === "orders" && (
            <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.6 }}>
              <Package size={32} style={{ marginBottom: 14, opacity: 0.5 }} />
              <p style={{ fontSize: 13 }}>No orders yet.</p>
              <p style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>
                Your orders will appear here once you place one.
              </p>
            </div>
          )}

          {tab === "wishlist" && (
            <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.6 }}>
              <Heart size={32} style={{ marginBottom: 14, opacity: 0.5 }} />
              <p style={{ fontSize: 13 }}>Your wishlist is empty.</p>
              <p style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>
                Tap the ♡ on any saree to save it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ color: "#e8b96a", paddingTop: 2 }}>{icon}</div>
      <div>
        <p style={{
          fontSize: 10,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: 0.55,
          marginBottom: 4,
        }}>
          {label}
        </p>
        <p style={{ fontSize: 14 }}>{value}</p>
      </div>
    </div>
  );
}