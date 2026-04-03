import { NextResponse } from 'next/server';
import { pushEntry, getEntries, KEYS } from '../../../lib/redis';
import { appendToSheet } from '../../../lib/sheets';

export async function POST(request) {
  try {
    const data = await request.json();

    const entry = await pushEntry(KEYS.CONTACTS, {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      inquiry_type: data.inquiryType || '',
      message: data.message || '',
    });

    // Mirror to Google Sheets (non-blocking, optional)
    appendToSheet('Contact Messages', {
      'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      'Name': data.name || '',
      'Email': data.email || '',
      'Phone': data.phone || '',
      'Subject': data.subject || '',
      'Inquiry Type': (data.inquiryType || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      'Message': data.message || '',
    });

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await getEntries(KEYS.CONTACTS);
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
