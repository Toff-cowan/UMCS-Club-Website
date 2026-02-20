import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const API = "http://localhost:5000/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("executives");
  const [executives, setExecutives] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState({ exec: true, members: true, projects: true });
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const fetchExecutives = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/executives`);
      const data = await res.json();
      setExecutives(Array.isArray(data) ? data : []);
    } catch (e) { setExecutives([]); } finally { setLoading((l) => ({ ...l, exec: false })); }
  }, []);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/members`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (e) { setMembers([]); } finally { setLoading((l) => ({ ...l, members: false })); }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API}/admin/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) { setProjects([]); } finally { setLoading((l) => ({ ...l, projects: false })); }
  }, []);

  useEffect(() => {
    fetchExecutives();
    fetchMembers();
    fetchProjects();
  }, [fetchExecutives, fetchMembers, fetchProjects]);

  const handleBackToSite = () => {
    navigate("/");
  };

  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/admin/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.url) return data.url;
      throw new Error(data.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = async (e, field) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData((prev) => ({ ...prev, [field]: url }));
  };

  const saveExecutive = async () => {
    const { id, name, position, image, quote } = formData;
    try {
      const url = id ? `${API}/admin/executives/${id}` : `${API}/admin/executives`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, position, image: image || "", quote: quote || "" }),
      });
      if (res.ok) { setEditing(null); setFormData({}); await fetchExecutives(); }
    } catch (e) {}
  };

  const deleteExecutive = async (id) => {
    if (!confirm("Delete this executive?")) return;
    try {
      const res = await fetch(`${API}/admin/executives/${id}`, { method: "DELETE" });
      if (res.ok) await fetchExecutives();
    } catch (e) {}
  };

  const clearExecutives = async () => {
    if (!confirm("Clear all executives?")) return;
    try {
      const res = await fetch(`${API}/admin/executives/clear`, { method: "DELETE" });
      if (res.ok) await fetchExecutives();
    } catch (e) {}
  };

  const saveMember = async () => {
    const { id, name } = formData;
    try {
      const url = id ? `${API}/admin/members/${id}` : `${API}/admin/members`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) { setEditing(null); setFormData({}); await fetchMembers(); }
    } catch (e) {}
  };

  const deleteMember = async (id) => {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await fetch(`${API}/admin/members/${id}`, { method: "DELETE" });
      if (res.ok) await fetchMembers();
    } catch (e) {}
  };

  const clearMembers = async () => {
    if (!confirm("Clear all members?")) return;
    try {
      const res = await fetch(`${API}/admin/members/clear`, { method: "DELETE" });
      if (res.ok) await fetchMembers();
    } catch (e) {}
  };

  const saveProject = async () => {
    const { id, title, description, image, status } = formData;
    try {
      const url = id ? `${API}/admin/projects/${id}` : `${API}/admin/projects`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image: image || "", status: status || "Completed", sig: formData.sig || "", url: formData.url || "" }),
      });
      if (res.ok) { setEditing(null); setFormData({}); await fetchProjects(); }
    } catch (e) {}
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API}/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) await fetchProjects();
    } catch (e) {}
  };

  const clearProjects = async () => {
    if (!confirm("Clear all projects?")) return;
    try {
      const res = await fetch(`${API}/admin/projects/clear`, { method: "DELETE" });
      if (res.ok) await fetchProjects();
    } catch (e) {}
  };

  const startEdit = (type, item = null) => {
    setEditing(type);
    setFormData(item ? { ...item, id: item._id } : {});
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <button type="button" className="admin-refresh" onClick={() => window.location.reload()}>Refresh</button>
          <button type="button" className="admin-logout" onClick={handleBackToSite}>Back to site</button>
        </div>
      </header>

      <nav className="admin-tabs">
        <button type="button" className={activeTab === "executives" ? "active" : ""} onClick={() => setActiveTab("executives")}>Executives</button>
        <button type="button" className={activeTab === "members" ? "active" : ""} onClick={() => setActiveTab("members")}>Members</button>
        <button type="button" className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
      </nav>

      <main className="admin-content">
        {activeTab === "executives" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Executives</h2>
              <div className="admin-section-buttons">
                <button type="button" className="btn-add" onClick={() => startEdit("exec", null)}>+ Add</button>
                <button type="button" className="btn-clear" onClick={clearExecutives}>Clear All</button>
              </div>
            </div>
            {editing === "exec" && (
              <div className="admin-form">
                <input placeholder="Name" value={formData.name || ""} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                <input placeholder="Position" value={formData.position || ""} onChange={(e) => setFormData((p) => ({ ...p, position: e.target.value }))} />
                <input placeholder="Image URL (or upload)" value={formData.image || ""} onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))} />
                <label className="upload-label">{uploading ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" className="upload-input" onChange={(e) => handleImageSelect(e, "image")} disabled={uploading} />
                </label>
                <input placeholder="Quote" value={formData.quote || ""} onChange={(e) => setFormData((p) => ({ ...p, quote: e.target.value }))} />
                <div className="admin-form-actions">
                  <button type="button" onClick={saveExecutive}>Save</button>
                  <button type="button" className="btn-cancel" onClick={() => { setEditing(null); setFormData({}); }}>Cancel</button>
                </div>
              </div>
            )}
            {loading.exec ? <p>Loading…</p> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Position</th><th>Image</th><th>Actions</th></tr></thead>
                  <tbody>
                    {executives.map((e) => (
                      <tr key={e._id}>
                        <td>{e.name}</td>
                        <td>{e.position}</td>
                        <td>{e.image ? <img src={e.image} alt="" className="admin-thumb" /> : "—"}</td>
                        <td>
                          <button type="button" onClick={() => startEdit("exec", e)}>Edit</button>
                          <button type="button" className="btn-delete" onClick={() => deleteExecutive(e._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "members" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Members</h2>
              <div className="admin-section-buttons">
                <button type="button" className="btn-add" onClick={() => startEdit("member", null)}>+ Add</button>
                <button type="button" className="btn-clear" onClick={clearMembers}>Clear All</button>
              </div>
            </div>
            {editing === "member" && (
              <div className="admin-form">
                <input placeholder="Name" value={formData.name || ""} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                <div className="admin-form-actions">
                  <button type="button" onClick={saveMember}>Save</button>
                  <button type="button" className="btn-cancel" onClick={() => { setEditing(null); setFormData({}); }}>Cancel</button>
                </div>
              </div>
            )}
            {loading.members ? <p>Loading…</p> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Actions</th></tr></thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m._id}>
                        <td>{m.name}</td>
                        <td>
                          <button type="button" onClick={() => startEdit("member", m)}>Edit</button>
                          <button type="button" className="btn-delete" onClick={() => deleteMember(m._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "projects" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Projects</h2>
              <div className="admin-section-buttons">
                <button type="button" className="btn-add" onClick={() => startEdit("project", null)}>+ Add</button>
                <button type="button" className="btn-clear" onClick={clearProjects}>Clear All</button>
              </div>
            </div>
            {editing === "project" && (
              <div className="admin-form">
                <input placeholder="Title" value={formData.title || ""} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))} />
                <textarea placeholder="Description" value={formData.description || ""} onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} rows={3} />
                <input placeholder="SIG (e.g. Web, Game, AI)" value={formData.sig || ""} onChange={(e) => setFormData((p) => ({ ...p, sig: e.target.value }))} />
                <input placeholder="Project URL (site or GitHub)" value={formData.url || ""} onChange={(e) => setFormData((p) => ({ ...p, url: e.target.value }))} />
                <input placeholder="Image URL (or upload)" value={formData.image || ""} onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))} />
                <label className="upload-label">{uploading ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" className="upload-input" onChange={(e) => handleImageSelect(e, "image")} disabled={uploading} />
                </label>
                <select value={formData.status || "Completed"} onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="On-hold">On-hold</option>
                </select>
                <div className="admin-form-actions">
                  <button type="button" onClick={saveProject}>Save</button>
                  <button type="button" className="btn-cancel" onClick={() => { setEditing(null); setFormData({}); }}>Cancel</button>
                </div>
              </div>
            )}
            {loading.projects ? <p>Loading…</p> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Title</th><th>SIG</th><th>Status</th><th>URL</th><th>Image</th><th>Actions</th></tr></thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>{p.sig ? <span className="admin-sig-tag">{p.sig}</span> : "—"}</td>
                        <td>{p.status || "—"}</td>
                        <td>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="admin-project-link">Link</a> : "—"}</td>
                        <td>{p.image ? <img src={p.image} alt="" className="admin-thumb" /> : "—"}</td>
                        <td>
                          <button type="button" onClick={() => startEdit("project", p)}>Edit</button>
                          <button type="button" className="btn-delete" onClick={() => deleteProject(p._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
