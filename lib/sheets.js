/**
 * Google Sheets Integration Helper
 * 
 * This module sends form data to a Google Apps Script Web App,
 * which acts as a free webhook to write data into Google Sheets.
 * 
 * Setup: See the guide at /admin -> "Google Sheets Setup" tab
 */

const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

/**
 * Append a row to the connected Google Sheet.
 * @param {string} sheetName - The tab name in the spreadsheet (e.g. 'Bookings')
 * @param {Object} data - Key-value pairs to send as a row
 */
export async function appendToSheet(sheetName, data) {
  if (!SHEETS_WEBHOOK_URL) {
    // Silently skip if not configured — app works without it
    return { success: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL not set' };
  }

  try {
    const payload = { sheet: sheetName, data };
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Sheets webhook returned ${res.status}`);
    return { success: true };
  } catch (err) {
    console.error('[Google Sheets] Failed to append row:', err.message);
    return { success: false, reason: err.message };
  }
}
