import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, CalendarDays, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Headphones,
  LayoutDashboard, LogOut, Menu, MessageSquareText, MoreHorizontal,
  Phone, Plus, Search, Settings, SlidersHorizontal, Users, X
} from "lucide-react";
import "./styles.css";

const initialCalls = [
  { id: "CC-1048", name: "Olivia Rhye", initials: "OR", email: "olivia.rhye@example.com", phone: "+1 (555) 010-2234", type: "Incoming", subject: "Billing question", status: "Resolved", duration: "04:32", time: "10:42 AM", color: "lavender", note: "Explained the latest invoice and confirmed payment date." },
  { id: "CC-1047", name: "Phoenix Baker", initials: "PB", email: "phoenix.baker@example.com", phone: "+1 (555) 010-8812", type: "Outgoing", subject: "Plan upgrade", status: "Follow-up", duration: "07:18", time: "10:26 AM", color: "peach", note: "Interested in the Pro plan. Follow up tomorrow." },
  { id: "CC-1046", name: "Lana Steiner", initials: "LS", email: "lana.steiner@example.com", phone: "+1 (555) 010-0901", type: "Incoming", subject: "Technical support", status: "In progress", duration: "12:05", time: "10:08 AM", color: "mint", note: "Troubleshooting account access with customer." },
  { id: "CC-1045", name: "Demi Wilkinson", initials: "DW", email: "demi.wilkinson@example.com", phone: "+1 (555) 010-4412", type: "Incoming", subject: "Order status", status: "Resolved", duration: "03:46", time: "09:51 AM", color: "blue", note: "Shared tracking link and delivery estimate." },
  { id: "CC-1044", name: "Candice Wu", initials: "CW", email: "candice.wu@example.com", phone: "+1 (555) 010-7718", type: "Outgoing", subject: "Customer feedback", status: "Missed", duration: "00:00", time: "09:32 AM", color: "pink", note: "No answer. Try again after lunch." },
  { id: "CC-1043", name: "Natali Craig", initials: "NC", email: "natali.craig@example.com", phone: "+1 (555) 010-6398", type: "Incoming", subject: "Account access", status: "Resolved", duration: "05:21", time: "09:17 AM", color: "yellow", note: "Reset login details and verified access." },
  { id: "CC-1042", name: "Drew Cano", initials: "DC", email: "drew.cano@example.com", phone: "+1 (555) 010-5091", type: "Outgoing", subject: "Renewal reminder", status: "Follow-up", duration: "06:02", time: "08:58 AM", color: "mint", note: "Customer requested a callback next week." }
];

function App() {
  const [calls, setCalls] = useState(initialCalls);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [typeFilter, setTypeFilter] = useState("All calls");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", subject: "", type: "Incoming", status: "In progress", note: "" });

  const filteredCalls = useMemo(() => calls.filter(call => {
    const matchesQuery = `${call.name} ${call.id} ${call.subject} ${call.phone}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All statuses" || call.status === statusFilter;
    const matchesType = typeFilter === "All calls" || call.type === typeFilter;
    const matchesPage = activeNav !== "Customers" || true;
    return matchesQuery && matchesStatus && matchesType && matchesPage;
  }), [calls, query, statusFilter, typeFilter, activeNav]);

  const resolved = calls.filter(c => c.status === "Resolved").length;
  const followUps = calls.filter(c => c.status === "Follow-up").length;
  const answered = calls.filter(c => c.status !== "Missed").length;

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function addCall(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.subject.trim()) return;
    const name = form.name.trim();
    const newCall = {
      id: `CC-${1049 + calls.length - initialCalls.length}`,
      name, initials: name.split(/\s+/).map(p => p[0]).join("").slice(0, 2).toUpperCase(),
      email: "New customer", phone: form.phone.trim(), type: form.type, subject: form.subject.trim(),
      status: form.status, duration: "00:00", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      color: "blue", note: form.note.trim() || "No notes added yet."
    };
    setCalls(prev => [newCall, ...prev]);
    setShowAdd(false);
    setForm({ name: "", phone: "", subject: "", type: "Incoming", status: "In progress", note: "" });
    setQuery("");
    notify("Call record added successfully");
  }

  function changeStatus(id, status) {
    setCalls(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    notify(`Call marked as ${status.toLowerCase()}`);
  }

  const pageTitle = activeNav === "Customers" ? "Customers" : activeNav === "Call history" ? "Call history" : activeNav;
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Customers", icon: Users },
    { label: "Call history", icon: Phone }
  ];

  return (
    <div className="app-shell">
      {mobileNav && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Headphones size={21} strokeWidth={2.4} /></div>
          <span>calldesk<span className="brand-dot">.</span></span>
          <button className="icon-button sidebar-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19}/></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activeNav === label ? "active" : ""}`} onClick={() => { setActiveNav(label); setMobileNav(false); }}>
              <Icon size={19} /><span>{label}</span>
              {label === "Call history" && <span className="nav-count">{calls.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={18}/></div>
            <div><strong>Need a hand?</strong><p>Visit the help centre</p></div>
            <ChevronRight size={16} className="help-arrow"/>
          </div>
          <button className={`nav-item ${activeNav === "Settings" ? "active" : ""}`} onClick={() => { setActiveNav("Settings"); setMobileNav(false); }}><Settings size={19}/><span>Settings</span></button>
          <div className="profile">
            <div className="avatar avatar-profile">PK</div>
            <div className="profile-info"><strong>Prabhu Kumar</strong><span>Call centre agent</span></div>
            <button className="icon-button profile-more" aria-label="Profile options" onClick={() => notify("Signed in as Prabhu Kumar")}><MoreHorizontal size={19}/></button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={21}/></button>
            <div className="breadcrumb"><span>Workspace</span><ChevronRight size={15}/><strong>{pageTitle}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="online-status"><span className="online-dot"/><span>Available</span><ChevronDown size={14}/></div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify("You're all caught up")}><Bell size={19}/><span/></button>
            <div className="top-avatar">PK</div>
          </div>
        </header>

        <div className="page-content">
          {activeNav === "Settings" ? (
            <section className="settings-page">
              <div className="page-heading"><div><p className="eyebrow">PREFERENCES</p><h1>Settings</h1><p className="subheading">Manage your workspace preferences.</p></div></div>
              <div className="settings-card"><div className="settings-symbol"><Users size={20}/></div><div><h3>Agent profile</h3><p>Prabhu Kumar · Call centre agent</p></div><span className="setting-tag">Demo account</span></div>
              <div className="settings-card"><div className="settings-symbol"><Bell size={20}/></div><div><h3>Notifications</h3><p>In-app notifications are enabled for this demo.</p></div><span className="setting-tag green-tag">Enabled</span></div>
              <div className="settings-card"><div className="settings-symbol"><Activity size={20}/></div><div><h3>Workspace status</h3><p>Your current availability status.</p></div><span className="setting-tag green-tag">Available</span></div>
            </section>
          ) : (
            <>
              <div className="page-heading">
                <div><p className="eyebrow">{activeNav === "Dashboard" ? "MONDAY, OCTOBER 12, 2026" : "CUSTOMER SERVICE"}</p><h1>{activeNav === "Dashboard" ? "Good morning, Prabhu" : pageTitle}</h1><p className="subheading">{activeNav === "Dashboard" ? "Here's what's happening with your calls today." : activeNav === "Customers" ? "Find customer details and review their latest interactions." : "Review and manage your recent customer calls."}</p></div>
                <button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={18}/> Log a call</button>
              </div>

              {activeNav === "Dashboard" && (
                <>
                  <section className="stat-grid">
                    <StatCard title="Total calls today" value={String(calls.length + 31)} change="+12.8%" caption="vs. yesterday" icon={Phone} tone="blue-tone" trend="up"/>
                    <StatCard title="Calls answered" value={String(answered + 25)} change="+8.2%" caption="vs. yesterday" icon={Check} tone="green-tone" trend="up"/>
                    <StatCard title="Avg. call duration" value="04:38" change="-0:24" caption="vs. yesterday" icon={Clock3} tone="purple-tone" trend="down"/>
                    <StatCard title="Follow-ups" value={String(followUps + 3)} change="Needs attention" caption="open call records" icon={CalendarDays} tone="orange-tone" trend="neutral"/>
                  </section>
                  <section className="overview-grid">
                    <div className="panel performance-panel">
                      <div className="panel-header"><div><h2>Call activity</h2><p>Your call volume throughout the day</p></div><button className="select-button" onClick={() => notify("Showing today's call activity")}>Today <ChevronDown size={14}/></button></div>
                      <div className="chart-legend"><span><i className="legend-dot legend-blue"/> Incoming calls</span><span><i className="legend-dot legend-light"/> Outgoing calls</span></div>
                      <div className="chart">
                        <div className="chart-ylabels"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
                        <div className="chart-plot">
                          {[40,30,20,10,0].map(n => <div className="chart-gridline" key={n}><span>{n === 0 ? "" : ""}</span></div>)}
                          <svg viewBox="0 0 600 180" preserveAspectRatio="none" role="img" aria-label="Illustrative incoming and outgoing call activity line chart">
                            <defs><linearGradient id="areaBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4778f5" stopOpacity=".17"/><stop offset="100%" stopColor="#4778f5" stopOpacity="0"/></linearGradient></defs>
                            <path d="M0,130 C35,124 42,100 75,108 S125,78 150,92 S205,52 230,69 S280,86 305,57 S350,80 380,47 S430,59 455,39 S500,55 525,25 S575,40 600,17 L600,180 L0,180 Z" fill="url(#areaBlue)"/>
                            <path d="M0,130 C35,124 42,100 75,108 S125,78 150,92 S205,52 230,69 S280,86 305,57 S350,80 380,47 S430,59 455,39 S500,55 525,25 S575,40 600,17" fill="none" stroke="#4778f5" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round"/>
                            <path d="M0,153 C35,147 48,131 75,140 S125,115 150,127 S200,107 230,118 S280,98 305,111 S350,100 380,119 S430,87 455,103 S500,81 525,95 S575,70 600,82" fill="none" stroke="#a9bdfd" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeDasharray="5 4"/>
                            <circle cx="525" cy="25" r="5" fill="#4778f5" stroke="white" strokeWidth="3"/>
                          </svg>
                          <div className="chart-xlabels"><span>8 AM</span><span>9 AM</span><span>10 AM</span><span>11 AM</span><span>12 PM</span><span>1 PM</span><span>2 PM</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="panel goal-panel">
                      <div className="panel-header"><div><h2>Daily goal</h2><p>Keep up the great work!</p></div><button className="icon-button" aria-label="More goal options" onClick={() => notify("Daily goal: 50 calls")}><MoreHorizontal size={20}/></button></div>
                      <div className="goal-ring-wrap"><div className="goal-ring"><div className="goal-ring-inner"><strong>76%</strong><span>completed</span></div></div></div>
                      <div className="goal-caption"><strong>38 <span>/ 50 calls</span></strong><p>12 calls left to reach your goal</p></div>
                      <div className="progress-track"><div className="progress-fill"/></div>
                      <div className="goal-footer"><span><i className="legend-dot legend-blue"/> Completed</span><span>76%</span></div>
                    </div>
                  </section>
                </>
              )}

              <section className="panel calls-panel">
                <div className="panel-header calls-header"><div><h2>{activeNav === "Customers" ? "Customer directory" : "Recent calls"}</h2><p>{activeNav === "Customers" ? "Customers from your call records" : "Keep track of your latest interactions"}</p></div><button className="text-button" onClick={() => { setActiveNav("Call history"); setStatusFilter("All statuses"); setTypeFilter("All calls"); }}>View all <ArrowUpRight size={15}/></button></div>
                <div className="table-toolbar">
                  <div className="search-field"><Search size={17}/><input aria-label="Search calls" placeholder="Search name, call ID, or topic..." value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="Clear search" onClick={() => setQuery("")}><X size={14}/></button>}</div>
                  <div className="filter-controls"><label className="filter-select"><SlidersHorizontal size={15}/><select aria-label="Filter by status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>All statuses</option><option>Resolved</option><option>Follow-up</option><option>In progress</option><option>Missed</option></select></label><label className="filter-select"><select aria-label="Filter by call type" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}><option>All calls</option><option>Incoming</option><option>Outgoing</option></select><ChevronDown size={14}/></label></div>
                </div>
                <div className="table-scroll"><table><thead><tr><th>Customer</th><th>Call topic</th><th>Type</th><th>Status</th><th>Duration</th><th>Time</th><th></th></tr></thead>
                  <tbody>{filteredCalls.slice(0, activeNav === "Dashboard" ? 5 : 50).map(call => <tr key={call.id} onClick={() => setSelected(call)} className="clickable-row">
                    <td><div className="customer-cell"><div className={`avatar avatar-${call.color}`}>{call.initials}</div><div><strong>{call.name}</strong><span>{call.id}</span></div></div></td>
                    <td><span className="topic-text">{call.subject}</span></td>
                    <td><span className="call-type">{call.type === "Incoming" ? <ArrowDownLeft size={14} className="incoming-icon"/> : <ArrowUpRight size={14} className="outgoing-icon"/>}{call.type}</span></td>
                    <td><StatusPill status={call.status}/></td><td className="duration-cell">{call.duration}</td><td className="time-cell">{call.time}</td>
                    <td><button className="row-more" aria-label={`View ${call.name} call details`} onClick={e => { e.stopPropagation(); setSelected(call); }}><MoreHorizontal size={18}/></button></td>
                  </tr>)}</tbody>
                </table>
                {filteredCalls.length === 0 && <div className="empty-state"><Search size={24}/><strong>No calls found</strong><p>Try another search or change your filters.</p><button className="text-button" onClick={() => {setQuery("");setStatusFilter("All statuses");setTypeFilter("All calls");}}>Clear filters</button></div>}
                </div>
                <div className="table-footer"><span>Showing <strong>{Math.min(filteredCalls.length, activeNav === "Dashboard" ? 5 : 50)}</strong> of <strong>{filteredCalls.length}</strong> records</span><div className="pagination"><button aria-label="Previous page" disabled><ChevronLeft size={16}/></button><button className="page-number">1</button><button aria-label="Next page" disabled><ChevronRight size={16}/></button></div></div>
              </section>
              <footer className="page-footer"><span>© 2026 CallDesk. Staff workspace demo.</span><span><span className="footer-live-dot"/> All systems operational</span></footer>
            </>
          )}
        </div>
      </main>

      {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-call-title" onClick={e => e.stopPropagation()}>
        <div className="modal-heading"><div><p className="eyebrow">CALL RECORD</p><h2 id="add-call-title">Log a new call</h2><p>Add the customer and interaction details below.</p></div><button className="icon-button" aria-label="Close dialog" onClick={() => setShowAdd(false)}><X size={20}/></button></div>
        <form onSubmit={addCall} className="call-form">
          <label>Customer name<input required placeholder="e.g. Alex Morgan" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/></label>
          <label>Phone number<input required placeholder="+1 (555) 010-0000" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}/></label>
          <label>Call topic<input required placeholder="e.g. Billing question" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}/></label>
          <div className="form-row"><label>Call type<select value={form.type} onChange={e => setForm({...form, type:e.target.value})}><option>Incoming</option><option>Outgoing</option></select></label><label>Status<select value={form.status} onChange={e => setForm({...form, status:e.target.value})}><option>In progress</option><option>Resolved</option><option>Follow-up</option><option>Missed</option></select></label></div>
          <label>Notes <span className="optional-label">Optional</span><textarea rows="3" placeholder="Add a short summary of the conversation..." value={form.note} onChange={e => setForm({...form, note:e.target.value})}/></label>
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={17}/> Save call record</button></div>
        </form>
      </section></div>}

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={e => e.stopPropagation()}>
        <div className="detail-top"><button className="icon-button close-detail" aria-label="Close details" onClick={() => setSelected(null)}><X size={20}/></button><div className={`avatar avatar-${selected.color} detail-avatar`}>{selected.initials}</div><h2 id="detail-title">{selected.name}</h2><p>{selected.id} · {selected.phone}</p><StatusPill status={selected.status}/></div>
        <div className="detail-body"><div className="detail-line"><span>Call topic</span><strong>{selected.subject}</strong></div><div className="detail-line"><span>Call type</span><strong>{selected.type === "Incoming" ? "↙ " : "↗ "}{selected.type}</strong></div><div className="detail-line"><span>Time & duration</span><strong>{selected.time} · {selected.duration}</strong></div><div className="detail-notes"><span>Call notes</span><p>{selected.note || "No notes added yet."}</p></div>
          <label className="status-update">Update status<select value={selected.status} onChange={e => changeStatus(selected.id, e.target.value)}><option>In progress</option><option>Resolved</option><option>Follow-up</option><option>Missed</option></select></label>
        </div><div className="detail-actions"><button className="secondary-button" onClick={() => setSelected(null)}>Close</button><button className="primary-button" onClick={() => {setSelected(null);setShowAdd(true);}}> <Plus size={16}/> Log another call</button></div>
      </section></div>}

      {notice && <div className="toast"><span className="toast-check"><Check size={15}/></span>{notice}</div>}
    </div>
  );
}

function StatCard({ title, value, change, caption, icon: Icon, tone, trend }) {
  return <div className="stat-card"><div className="stat-top"><span>{title}</span><div className={`stat-icon ${tone}`}><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={`stat-change ${trend === "down" ? "change-down" : trend === "neutral" ? "change-neutral" : ""}`}>{trend === "up" ? <ArrowUpRight size={14}/> : trend === "down" ? <ArrowDownLeft size={14}/> : null}{change}</span><span>{caption}</span></div></div>;
}
function StatusPill({ status }) {
  const cls = status.toLowerCase().replace(" ", "-");
  return <span className={`status-pill status-${cls}`}><i/>{status}</span>;
}

createRoot(document.getElementById("root")).render(<App />);
