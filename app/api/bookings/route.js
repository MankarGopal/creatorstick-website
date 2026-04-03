import { NextResponse } from 'next/server';
import { pushEntry, getEntries, KEYS } from '../../../lib/redis';
import { appendToSheet } from '../../../lib/sheets';

export async function POST(request) {
  try {
    const data = await request.json();

    const entry = await pushEntry(KEYS.BOOKINGS, {
      services: JSON.stringify(data.services || []),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      company: data.company || '',
      website: data.website || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      project_details: data.projectDetails || '',
      goals: data.goals || '',
      audience: data.audience || '',
      referral: data.referral || '',
      preferred_date: data.date || '',
      preferred_time: data.time || '',
    });

    // Mirror to Google Sheets (non-blocking, optional)
    appendToSheet('Bookings', {
      'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      'Name': data.name || '',
      'Email': data.email || '',
      'Phone': data.phone || '',
      'Company': data.company || '',
      'Website': data.website || '',
      'Services': (data.services || []).join(', '),
      'Budget': data.budget || '',
      'Timeline': data.timeline || '',
      'Project Details': data.projectDetails || '',
      'Goals / KPIs': data.goals || '',
      'Target Audience': data.audience || '',
      'Referral': data.referral || '',
      'Preferred Date': data.date || '',
      'Preferred Time': data.time || '',
    });

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (error) {
    console.error('Booking POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await getEntries(KEYS.BOOKINGS);
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Booking GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
