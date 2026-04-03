import { NextResponse } from 'next/server';
import { getEntries, KEYS } from '../../../lib/redis';
import * as XLSX from 'xlsx';

function parseServices(str) {
  try { return JSON.parse(str).join(', '); } catch { return str || ''; }
}

function formatInquiry(str) {
  return (str || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  const wb = XLSX.utils.book_new();

  if (type === 'bookings' || type === 'all') {
    const rows = await getEntries(KEYS.BOOKINGS);
    const data = rows.map(r => ({
      'ID': r.id,
      'Submitted At': r.created_at,
      'Name': r.name,
      'Email': r.email,
      'Phone': r.phone || '',
      'Company': r.company || '',
      'Website': r.website || '',
      'Services': parseServices(r.services),
      'Budget': r.budget || '',
      'Timeline': r.timeline || '',
      'Project Details': r.project_details || '',
      'Goals / KPIs': r.goals || '',
      'Target Audience': r.audience || '',
      'Referral Source': r.referral || '',
      'Preferred Date': r.preferred_date || '',
      'Preferred Time': r.preferred_time || '',
    }));
    const ws = XLSX.utils.json_to_sheet(data.length ? data : [{ 'Note': 'No bookings yet' }]);
    ws['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 22 }, { wch: 30 }, { wch: 16 },
      { wch: 22 }, { wch: 32 }, { wch: 36 }, { wch: 22 }, { wch: 18 },
      { wch: 42 }, { wch: 36 }, { wch: 28 }, { wch: 16 }, { wch: 16 }, { wch: 14 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
  }

  if (type === 'careers' || type === 'all') {
    const rows = await getEntries(KEYS.CAREERS);
    const data = rows.map(r => ({
      'ID': r.id,
      'Submitted At': r.created_at,
      'Name': r.name,
      'Email': r.email,
      'Phone': r.phone || '',
      'Position Applied': r.position || '',
      'Experience': r.experience || '',
      'Portfolio / LinkedIn': r.portfolio || '',
      'Resume Link': r.resume || '',
      'Cover Letter': r.cover_letter || '',
    }));
    const ws = XLSX.utils.json_to_sheet(data.length ? data : [{ 'Note': 'No applications yet' }]);
    ws['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 22 }, { wch: 30 }, { wch: 16 },
      { wch: 30 }, { wch: 14 }, { wch: 42 }, { wch: 42 }, { wch: 60 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Career Applications');
  }

  if (type === 'contacts' || type === 'all') {
    const rows = await getEntries(KEYS.CONTACTS);
    const data = rows.map(r => ({
      'ID': r.id,
      'Submitted At': r.created_at,
      'Name': r.name,
      'Email': r.email,
      'Phone': r.phone || '',
      'Subject': r.subject || '',
      'Inquiry Type': formatInquiry(r.inquiry_type),
      'Message': r.message || '',
    }));
    const ws = XLSX.utils.json_to_sheet(data.length ? data : [{ 'Note': 'No messages yet' }]);
    ws['!cols'] = [
      { wch: 6 }, { wch: 22 }, { wch: 22 }, { wch: 30 }, { wch: 16 },
      { wch: 32 }, { wch: 24 }, { wch: 60 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Messages');
  }

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  const now = new Date().toISOString().slice(0, 10);
  const filename = `creatorstick-leads-${type}-${now}.xlsx`;

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
