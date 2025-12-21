function convertDriveLinksToPreview() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return;

  const range = sheet.getRange(1, 5, lastRow, 1); // Column E
  const values = range.getValues();

  const updated = values.map(row => {
    const url = row[0];
    if (!url || typeof url !== 'string') return [url];

    let fileId = '';

    // Case 1: open?id=FILE_ID
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }

    // Case 2: file/d/FILE_ID
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      fileId = fileMatch[1];
    }

    if (!fileId) return [url];

    return [`https://drive.google.com/file/d/${fileId}/preview`];
  });

  range.setValues(updated);
}
