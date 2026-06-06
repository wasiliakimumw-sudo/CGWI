import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Save, Plus, Trash2,
  Scissors, Stethoscope, Mic, Globe, Heart, Users,
  HandHeart, MessageCircle, FileText, Settings,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchAll, createRecord, updateRecord, deleteRecord,
  getAllSiteTexts, setSiteText, getContactInfo, updateContactInfo,
} from '../lib/api';

const programIcons = { Scissors, Stethoscope, Mic, Globe };

const tabs = [
  { id: 'site_texts', label: 'Site Texts', icon: FileText },
  { id: 'programs', label: 'Programs', icon: Scissors },
  { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
  { id: 'partners', label: 'Partners', icon: HandHeart },
  { id: 'team_members', label: 'Team', icon: Users },
  { id: 'contact_info', label: 'Contact', icon: Settings },
];

function Editor({ children, label, onSave, saving }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{label}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', rows }) {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <Tag
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors text-sm"
    />
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('site_texts');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Data states
  const [siteTexts, setSiteTexts] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [contact, setContact] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const [st, p, t, pt, tm, ci] = await Promise.all([
        getAllSiteTexts(),
        fetchAll('programs'),
        fetchAll('testimonials'),
        fetchAll('partners'),
        fetchAll('team_members'),
        getContactInfo(),
      ]);
      setSiteTexts(st);
      setPrograms(p);
      setTestimonials(t);
      setPartners(pt);
      setTeamMembers(tm);
      setContact(ci);
    } catch (err) {
      console.error('Load error:', err);
      showMessage('Database tables not found. Go to /admin/setup for instructions.');
    }
  }

  async function handleSaveSiteText(key, value) {
    setSaving(true);
    try {
      await setSiteText(key, value);
      showMessage('Saved!');
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setSaving(false);
  }

  async function handleSave(table, id, record) {
    setSaving(true);
    try {
      if (id) {
        await updateRecord(table, id, record);
      } else {
        await createRecord(table, record);
      }
      showMessage('Saved!');
      loadAll();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
    setSaving(false);
  }

  async function handleDelete(table, id) {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteRecord(table, id);
      showMessage('Deleted!');
      loadAll();
    } catch (err) {
      showMessage('Error: ' + err.message);
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  function getTextValue(key) {
    return siteTexts.find((t) => t.key === key)?.value || {};
  }

  function renderJSONEditor(key, label) {
    const val = getTextValue(key);
    const str = JSON.stringify(val, null, 2);
    return (
      <Field label={label}>
        <Input
          value={str}
          rows={6}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setSiteTexts((prev) =>
                prev.map((t) => (t.key === key ? { ...t, value: parsed } : t))
              );
            } catch { }
          }}
        />
      </Field>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 shrink-0 hidden lg:block">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Heart className="w-5 h-5" />
            </div>
            <span className="font-bold">CGWI Admin</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <span className="font-bold">CGWI Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
          <button onClick={handleLogout} className="text-red-500 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pt-0 pt-16">
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
          {message && (
            <div className="bg-primary/10 text-primary text-sm px-4 py-3 rounded-xl mb-6">
              {message}
            </div>
          )}

          {/* ===== Site Texts Tab ===== */}
          {activeTab === 'site_texts' && (
            <Editor label="Site Texts" onSave={() => { }} saving={false}>
              <p className="text-sm text-gray-500 mb-6">
                Edit JSON values for hero, about, stats content. Each field must be valid JSON.
              </p>
              <div className="space-y-4">
                {renderJSONEditor('hero', 'Hero Section')}
                {renderJSONEditor('about_vision', 'About Vision')}
                {renderJSONEditor('about_mission', 'About Mission')}
                {renderJSONEditor('about_story', 'About Story')}
                {renderJSONEditor('stats', 'Statistics')}
              </div>
              <div className="mt-6">
                <button
                  onClick={async () => {
                    for (const st of siteTexts) {
                      await setSiteText(st.key, st.value);
                    }
                    showMessage('All site texts saved!');
                  }}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
                >
                  <Save className="w-4 h-4" /> Save All Site Texts
                </button>
              </div>
            </Editor>
          )}

          {/* ===== Programs Tab ===== */}
          {activeTab === 'programs' && (
            <div>
              <Editor label="Programs" onSave={() => { }} saving={false}>
                {programs.map((prog, i) => {
                  const Icon = programIcons[prog.icon] || Heart;
                  return (
                    <div key={prog.id} className="border border-gray-100 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold">{prog.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Title">
                          <Input value={prog.title} onChange={(e) => {
                            setPrograms((prev) => prev.map((p) => p.id === prog.id ? { ...p, title: e.target.value } : p));
                          }} />
                        </Field>
                        <Field label="Icon name (Scissors, Stethoscope, Mic, Globe)">
                          <Input value={prog.icon} onChange={(e) => {
                            setPrograms((prev) => prev.map((p) => p.id === prog.id ? { ...p, icon: e.target.value } : p));
                          }} />
                        </Field>
                      </div>
                      <Field label="Description">
                        <Input value={prog.description} rows={3} onChange={(e) => {
                          setPrograms((prev) => prev.map((p) => p.id === prog.id ? { ...p, description: e.target.value } : p));
                        }} />
                      </Field>
                      <Field label="Features (JSON array)">
                        <Input value={JSON.stringify(prog.features)} rows={3} onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setPrograms((prev) => prev.map((p) => p.id === prog.id ? { ...p, features: parsed } : p));
                          } catch { }
                        }} />
                      </Field>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSave('programs', prog.id, prog)}
                          className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                        >
                          <Save className="w-4 h-4" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete('programs', prog.id)}
                          className="flex items-center gap-1 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={async () => {
                    const newP = await createRecord('programs', {
                      title: 'New Program', description: 'Description', features: [], icon: 'Heart',
                    });
                    setPrograms((prev) => [...prev, newP]);
                  }}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm mt-4"
                >
                  <Plus className="w-4 h-4" /> Add Program
                </button>
              </Editor>
            </div>
          )}

          {/* ===== Testimonials Tab ===== */}
          {activeTab === 'testimonials' && (
            <div>
              <Editor label="Testimonials" onSave={() => { }} saving={false}>
                {testimonials.map((t) => (
                  <div key={t.id} className="border border-gray-100 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Name"><Input value={t.name} onChange={(e) => {
                        setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, name: e.target.value } : x));
                      }} /></Field>
                      <Field label="Role"><Input value={t.role} onChange={(e) => {
                        setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, role: e.target.value } : x));
                      }} /></Field>
                    </div>
                    <Field label="Quote">
                      <Input value={t.quote} rows={3} onChange={(e) => {
                        setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, quote: e.target.value } : x));
                      }} />
                    </Field>
                    <Field label="Rating (1-5)">
                      <Input type="number" min="1" max="5" value={t.rating} onChange={(e) => {
                        setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, rating: +e.target.value } : x));
                      }} />
                    </Field>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSave('testimonials', t.id, t)}
                        className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
                        <Save className="w-4 h-4" /> Update
                      </button>
                      <button onClick={() => handleDelete('testimonials', t.id)}
                        className="flex items-center gap-1 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={async () => {
                  const newT = await createRecord('testimonials', { name: 'New Name', quote: 'Quote text', rating: 5 });
                  setTestimonials((prev) => [...prev, newT]);
                }}
                  className="flex items-center gap-2 text-primary font-medium text-sm mt-4">
                  <Plus className="w-4 h-4" /> Add Testimonial
                </button>
              </Editor>
            </div>
          )}

          {/* ===== Partners Tab ===== */}
          {activeTab === 'partners' && (
            <div>
              <Editor label="Partners" onSave={() => { }} saving={false}>
                {partners.map((p) => (
                  <div key={p.id} className="border border-gray-100 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Field label="Name"><Input value={p.name} onChange={(e) => {
                        setPartners((prev) => prev.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x));
                      }} /></Field>
                      <Field label="Tier">
                        <select value={p.tier} onChange={(e) => {
                          setPartners((prev) => prev.map((x) => x.id === p.id ? { ...x, tier: e.target.value } : x));
                        }}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 outline-none text-sm">
                          <option value="platinum">Platinum</option>
                          <option value="gold">Gold</option>
                          <option value="silver">Silver</option>
                          <option value="bronze">Bronze</option>
                        </select>
                      </Field>
                      <Field label="Description"><Input value={p.description} onChange={(e) => {
                        setPartners((prev) => prev.map((x) => x.id === p.id ? { ...x, description: e.target.value } : x));
                      }} /></Field>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSave('partners', p.id, p)}
                        className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
                        <Save className="w-4 h-4" /> Update
                      </button>
                      <button onClick={() => handleDelete('partners', p.id)}
                        className="flex items-center gap-1 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={async () => {
                  const newP = await createRecord('partners', { name: 'New Partner', tier: 'bronze', description: '' });
                  setPartners((prev) => [...prev, newP]);
                }}
                  className="flex items-center gap-2 text-primary font-medium text-sm mt-4">
                  <Plus className="w-4 h-4" /> Add Partner
                </button>
              </Editor>
            </div>
          )}

          {/* ===== Team Tab ===== */}
          {activeTab === 'team_members' && (
            <div>
              <Editor label="Team Members" onSave={() => { }} saving={false}>
                {teamMembers.map((m) => (
                  <div key={m.id} className="border border-gray-100 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Name"><Input value={m.name} onChange={(e) => {
                        setTeamMembers((prev) => prev.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x));
                      }} /></Field>
                      <Field label="Role"><Input value={m.role} onChange={(e) => {
                        setTeamMembers((prev) => prev.map((x) => x.id === m.id ? { ...x, role: e.target.value } : x));
                      }} /></Field>
                    </div>
                    <Field label="Bio">
                      <Input value={m.bio} rows={3} onChange={(e) => {
                        setTeamMembers((prev) => prev.map((x) => x.id === m.id ? { ...x, bio: e.target.value } : x));
                      }} />
                    </Field>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSave('team_members', m.id, m)}
                        className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
                        <Save className="w-4 h-4" /> Update
                      </button>
                      <button onClick={() => handleDelete('team_members', m.id)}
                        className="flex items-center gap-1 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={async () => {
                  const newM = await createRecord('team_members', { name: 'New Member', role: 'Role', bio: '' });
                  setTeamMembers((prev) => [...prev, newM]);
                }}
                  className="flex items-center gap-2 text-primary font-medium text-sm mt-4">
                  <Plus className="w-4 h-4" /> Add Team Member
                </button>
              </Editor>
            </div>
          )}

          {/* ===== Contact Tab ===== */}
          {activeTab === 'contact_info' && contact && (
            <Editor label="Contact Information" onSave={() => {}} saving={saving}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Address">
                  <Input value={contact.address} onChange={(e) => setContact((prev) => ({ ...prev, address: e.target.value }))} />
                </Field>
                <Field label="Phone">
                  <Input value={contact.phone} onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))} />
                </Field>
                <Field label="Email">
                  <Input value={contact.email} onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))} />
                </Field>
                <Field label="WhatsApp URL">
                  <Input value={contact.whatsapp} onChange={(e) => setContact((prev) => ({ ...prev, whatsapp: e.target.value }))} />
                </Field>
              </div>
              <Field label="Social Links (JSON array)">
                <Input value={JSON.stringify(contact.social_links)} rows={3} onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setContact((prev) => ({ ...prev, social_links: parsed }));
                  } catch { }
                }} />
              </Field>
              <button onClick={async () => {
                setSaving(true);
                try {
                  await updateContactInfo(contact.id, contact);
                  showMessage('Contact info saved!');
                } catch (err) {
                  showMessage('Error: ' + err.message);
                }
                setSaving(false);
              }}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm mt-4">
                <Save className="w-4 h-4" /> Save Contact Info
              </button>
            </Editor>
          )}
        </div>
      </div>
    </div>
  );
}
