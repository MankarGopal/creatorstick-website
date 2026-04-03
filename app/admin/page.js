'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['bookings', 'careers', 'contacts', 'setup'];

function ExportButton({ type, label }) {
  const [downloading, setDownloading] = useState(false);

  async function handleExport() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/export?type=${type}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.headers.get('Content-Disposition')?.split('filename="')[1]?.replace('"', '') || `leads-${type}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Export failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={downloading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105"
      style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}
    >
      {downloading ? (
        <span className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      )}
      {downloading ? 'Exporting...' : `Export ${label} Excel`}
    </button>
  );
}

function SheetsSetupGuide() {
  const [copied, setCopied] = useState(false);

  const appsScript = `// ═══════════════════════════════════════════════════════════════
// CreatorStick Media — Google Sheets Webhook
// Paste this in Google Apps Script → Extensions → Apps Script
// ═══════════════════════════════════════════════════════════════

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ← Paste your Sheet ID

const SHEET_HEADERS = {
  'Bookings':             ['Submitted At','Name','Email','Phone','Company','Website','Services','Budget','Timeline','Project Details','Goals / KPIs','Target Audience','Referral','Preferred Date','Preferred Time'],
  'Career Applications':  ['Submitted At','Name','Email','Phone','Position Applied','Experience','Portfolio / LinkedIn','Resume Link','Cover Letter'],
  'Contact Messages':     ['Submitted At','Name','Email','Phone','Subject','Inquiry Type','Message'],
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheetName = payload.sheet;
    const rowData   = payload.data;

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let   sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = SHEET_HEADERS[sheetName] || Object.keys(rowData);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#FF6B00').setFontColor('#ffffff').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const headers = SHEET_HEADERS[sheetName] || Object.keys(rowData);
    const row     = headers.map(h => rowData[h] || '');
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('CreatorStick Sheets Webhook is running ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}`;

  function copyScript() {
    navigator.clipboard.writeText(appsScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const steps = [
    {
      num: '01',
      title: 'Create Google Sheet',
      desc: 'Go to sheets.google.com and create a new spreadsheet. Copy the Sheet ID from the URL (the long string between /d/ and /edit).',
      link: { label: 'Open Google Sheets', url: 'https://sheets.new' },
    },
    {
      num: '02',
      title: 'Open Apps Script',
      desc: 'In your Google Sheet, click Extensions → Apps Script. Delete all existing code and paste the script below.',
    },
    {
      num: '03',
      title: 'Paste your Sheet ID',
      desc: "Replace YOUR_SPREADSHEET_ID_HERE in line 6 of the script with the ID you copied in Step 1.",
    },
    {
      num: '04',
      title: 'Deploy as Web App',
      desc: "Click Deploy → New Deployment → Web App. Set 'Execute as' = Me, 'Who has access' = Anyone. Click Deploy and copy the Web App URL.",
    },
    {
      num: '05',
      title: 'Add URL to Vercel',
      desc: "In your Vercel dashboard → Settings → Environment Variables, add: GOOGLE_SHEETS_WEBHOOK_URL = (paste Web App URL). Redeploy.",
      link: { label: 'Open Vercel Dashboard', url: 'https://vercel.com/dashboard' },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,107,0,0.03))', border: '1px solid rgba(255,107,0,0.2)' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center flex-shrink-0">
            <span className="text-orange text-lg">⚡</span>
          </div>
          <div>
            <h3 className="font-bold font-montserrat mb-1" style={{ color: 'var(--heading)' }}>Connect Google Sheets — Live Lead Feed</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Every form submission (contact, booking, career) will instantly appear as a new row in your Google Sheet. Works from Vercel in production. Free, no extra accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-5 p-5 rounded-xl t-card"
          >
            <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/25 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-orange font-montserrat">{s.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold font-montserrat mb-1 text-sm" style={{ color: 'var(--heading)' }}>{s.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
              {s.link && (
                <a href={s.link.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-orange hover:underline">
                  {s.link.label} →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Apps Script Code */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold font-montserrat text-sm" style={{ color: 'var(--heading)' }}>Apps Script Code (paste in Step 02)</h3>
          <button
            onClick={copyScript}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,107,0,0.12)', border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(255,107,0,0.3)'}`, color: copied ? '#22c55e' : '#FF6B00' }}
          >
            {copied ? '✓ Copied!' : '⧉ Copy Script'}
          </button>
        </div>
        <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}>
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed" style={{ color: '#e6edf3', fontFamily: "'Fira Code', 'Cascadia Code', monospace" }}>
            {appsScript}
          </pre>
        </div>
      </div>

      {/* What you get */}
      <div className="rounded-2xl p-6 t-card">
        <h3 className="font-bold font-montserrat mb-4 text-sm" style={{ color: 'var(--heading)' }}>What you get after setup</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '📋', title: 'Live Spreadsheet', desc: '3 auto-created tabs — Bookings, Career Applications, Contact Messages' },
            { icon: '⚡', title: 'Real-Time', desc: 'Each submission appears in Google Sheets within seconds' },
            { icon: '📊', title: 'Excel Export', desc: 'Download any tab as .xlsx from this admin panel anytime' },
          ].map((f, i) => (
            <div key={i} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,107,0,0.04)', border: '1px solid rgba(255,107,0,0.1)' }}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--heading)' }}>{f.title}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [bookRes, careerRes, contactRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/careers'),
        fetch('/api/contact'),
      ]);
      const bd = await bookRes.json();
      const cd = await careerRes.json();
      const md = await contactRes.json();
      if (bd.success) setBookings(bd.data);
      if (cd.success) setApplications(cd.data);
      if (md.success) setContacts(md.data);
    } catch {
      setError('Failed to load data. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function parseServices(s) {
    try { return JSON.parse(s).join(', '); } catch { return s; }
  }

  function formatInquiry(t) {
    return (t || '-').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function filterRows(rows) {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(r =>
      Object.values(r).some(v => String(v || '').toLowerCase().includes(q))
    );
  }

  const tabs = [
    { key: 'bookings', label: `Bookings`, count: bookings.length },
    { key: 'careers', label: `Applications`, count: applications.length },
    { key: 'contacts', label: `Messages`, count: contacts.length },
    { key: 'setup', label: `⚙ Sheets Setup`, count: null },
  ];

  const totalLeads = bookings.length + applications.length + contacts.length;
  const todayLeads = [...bookings, ...applications, ...contacts].filter(r => {
    const d = new Date(r.created_at);
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-1" style={{ color: 'var(--heading)' }}>
              Lead <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>All form submissions from your website — live.</p>
          </div>
          <ExportButton type="all" label="All Leads" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-5 rounded-xl t-card">
            <div className="text-2xl font-bold font-montserrat text-orange">{totalLeads}</div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Total Leads</p>
          </div>
          <div className="p-5 rounded-xl t-card">
            <div className="text-2xl font-bold font-montserrat text-orange">{bookings.length}</div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Bookings</p>
          </div>
          <div className="p-5 rounded-xl t-card">
            <div className="text-2xl font-bold font-montserrat text-orange">{applications.length}</div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Applications</p>
          </div>
          <div className="p-5 rounded-xl t-card">
            <div className="text-2xl font-bold font-montserrat text-orange">{contacts.length}</div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Messages</p>
          </div>
          <div className="p-5 rounded-xl t-card flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold font-montserrat" style={{ color: '#22c55e' }}>{todayLeads}</div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Today</p>
            </div>
            <button onClick={fetchData}
              className="mt-3 w-full text-center bg-orange/10 hover:bg-orange/20 text-orange py-1.5 rounded-lg text-xs font-semibold transition-all border border-orange/20">
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Tabs + Search Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((t) => (
              <button key={t.key}
                onClick={() => { setActiveTab(t.key); setExpandedRow(null); setSearch(''); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === t.key ? 'bg-orange text-white' : ''}`}
                style={activeTab !== t.key ? { color: 'var(--muted)', border: '1px solid var(--border)', background: 'var(--glass-light-bg)' } : {}}>
                {t.label}{t.count !== null ? ` (${t.count})` : ''}
              </button>
            ))}
          </div>
          {activeTab !== 'setup' && (
            <div className="sm:ml-auto flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray/40 focus:border-orange/40 focus:outline-none transition-colors w-48"
              />
              <ExportButton
                type={activeTab === 'contacts' ? 'contacts' : activeTab}
                label={activeTab === 'bookings' ? 'Bookings' : activeTab === 'careers' ? 'Careers' : 'Messages'}
              />
            </div>
          )}
        </div>

        {/* Loading / Error */}
        {loading && activeTab !== 'setup' && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p style={{ color: 'var(--muted)' }}>Loading leads...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-red-400">
            <p>{error}</p>
            <button onClick={fetchData} className="mt-4 bg-orange text-white px-6 py-2 rounded-full text-sm font-semibold">Retry</button>
          </div>
        )}

        {/* Setup Tab */}
        {activeTab === 'setup' && <SheetsSetupGuide />}

        {/* Bookings */}
        {!loading && !error && activeTab === 'bookings' && (() => {
          const rows = filterRows(bookings);
          return rows.length === 0 ? (
            <div className="text-center py-20 rounded-2xl t-card">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{bookings.length === 0 ? 'No bookings yet' : 'No results found'}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Booking requests will appear here once submitted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map((b, i) => (
                <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl overflow-hidden t-card">
                  <button onClick={() => setExpandedRow(expandedRow === b.id ? null : b.id)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--heading)' }}>{b.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{b.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-orange">{b.budget || '-'}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{b.timeline || '-'}</p>
                      </div>
                      <div><p className="text-xs" style={{ color: 'var(--muted)' }}>{parseServices(b.services) || '-'}</p></div>
                      <div className="text-right"><p className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(b.created_at)}</p></div>
                    </div>
                    <span className="ml-4 text-orange text-lg">{expandedRow === b.id ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedRow === b.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ borderTop: '1px solid var(--border)' }}>
                          <div className="pt-4 space-y-2">
                            <p><span style={{ color: 'var(--muted)' }}>Phone:</span> <span style={{ color: 'var(--heading)' }}>{b.phone || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Company:</span> <span style={{ color: 'var(--heading)' }}>{b.company || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Website:</span> <span style={{ color: 'var(--heading)' }}>{b.website || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Audience:</span> <span style={{ color: 'var(--heading)' }}>{b.audience || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Referral:</span> <span style={{ color: 'var(--heading)' }}>{b.referral || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Consultation:</span> <span style={{ color: 'var(--heading)' }}>{b.preferred_date || '-'} {b.preferred_time || ''}</span></p>
                          </div>
                          <div className="pt-4 space-y-2">
                            <p style={{ color: 'var(--muted)' }}>Project Details:</p>
                            <p style={{ color: 'var(--heading)' }}>{b.project_details || '-'}</p>
                            <p style={{ color: 'var(--muted)' }}>Goals / KPIs:</p>
                            <p style={{ color: 'var(--heading)' }}>{b.goals || '-'}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          );
        })()}

        {/* Careers */}
        {!loading && !error && activeTab === 'careers' && (() => {
          const rows = filterRows(applications);
          return rows.length === 0 ? (
            <div className="text-center py-20 rounded-2xl t-card">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{applications.length === 0 ? 'No applications yet' : 'No results found'}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Career applications will appear here once submitted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl overflow-hidden t-card">
                  <button onClick={() => setExpandedRow(expandedRow === `c-${a.id}` ? null : `c-${a.id}`)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--heading)' }}>{a.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{a.email}</p>
                      </div>
                      <div><p className="text-xs font-medium text-orange">{a.position || '-'}</p></div>
                      <div><p className="text-xs" style={{ color: 'var(--muted)' }}>{a.experience ? `${a.experience} exp` : '-'}</p></div>
                      <div className="text-right"><p className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(a.created_at)}</p></div>
                    </div>
                    <span className="ml-4 text-orange text-lg">{expandedRow === `c-${a.id}` ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedRow === `c-${a.id}` && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ borderTop: '1px solid var(--border)' }}>
                          <div className="pt-4 space-y-2">
                            <p><span style={{ color: 'var(--muted)' }}>Phone:</span> <span style={{ color: 'var(--heading)' }}>{a.phone || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Portfolio:</span> {a.portfolio ? <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="text-orange underline break-all">{a.portfolio}</a> : <span style={{ color: 'var(--heading)' }}>-</span>}</p>
                            <p><span style={{ color: 'var(--muted)' }}>Resume:</span> {a.resume ? <a href={a.resume} target="_blank" rel="noopener noreferrer" className="text-orange underline break-all">{a.resume}</a> : <span style={{ color: 'var(--heading)' }}>-</span>}</p>
                          </div>
                          <div className="pt-4 space-y-2">
                            <p style={{ color: 'var(--muted)' }}>Cover Letter:</p>
                            <p style={{ color: 'var(--heading)', whiteSpace: 'pre-wrap' }}>{a.cover_letter || '-'}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          );
        })()}

        {/* Contact Messages */}
        {!loading && !error && activeTab === 'contacts' && (() => {
          const rows = filterRows(contacts);
          return rows.length === 0 ? (
            <div className="text-center py-20 rounded-2xl t-card">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>{contacts.length === 0 ? 'No messages yet' : 'No results found'}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Contact messages will appear here once submitted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl overflow-hidden t-card">
                  <button onClick={() => setExpandedRow(expandedRow === `m-${m.id}` ? null : `m-${m.id}`)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--heading)' }}>{m.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{m.email}</p>
                      </div>
                      <div><p className="text-xs font-medium text-orange">{m.subject || '-'}</p></div>
                      <div><p className="text-xs" style={{ color: 'var(--muted)' }}>{formatInquiry(m.inquiry_type)}</p></div>
                      <div className="text-right"><p className="text-xs" style={{ color: 'var(--muted)' }}>{formatDate(m.created_at)}</p></div>
                    </div>
                    <span className="ml-4 text-orange text-lg">{expandedRow === `m-${m.id}` ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedRow === `m-${m.id}` && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ borderTop: '1px solid var(--border)' }}>
                          <div className="pt-4 space-y-2">
                            <p><span style={{ color: 'var(--muted)' }}>Phone:</span> <span style={{ color: 'var(--heading)' }}>{m.phone || '-'}</span></p>
                            <p><span style={{ color: 'var(--muted)' }}>Inquiry Type:</span> <span style={{ color: 'var(--heading)' }}>{formatInquiry(m.inquiry_type)}</span></p>
                          </div>
                          <div className="pt-4 space-y-2">
                            <p style={{ color: 'var(--muted)' }}>Message:</p>
                            <p style={{ color: 'var(--heading)', whiteSpace: 'pre-wrap' }}>{m.message || '-'}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
