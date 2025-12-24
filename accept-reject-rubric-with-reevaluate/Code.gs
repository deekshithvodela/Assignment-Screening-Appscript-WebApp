const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'Source';
const RUBRIC_SHEET = 'Rubric';
const STATUS_COLUMN = 6; // Column F (Status)

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    )
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDocuments() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return [];
    }

    const data = sheet.getDataRange().getValues();
    const documents = [];

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim()) {
        const status = data[i][5] || 'Pending'; // Column F (index 5)
        const rubricCriteria = data[i][6] || 'Decision'; // Column G (index 6)

        documents.push({
          id: i,
          name: data[i][0],      // Column A (index 0)
          email: data[i][1] || '', // Column B (index 1)
          phone: data[i][2] || '', // Column C (index 2)
          department: data[i][3] || '', // Column D (index 3)
          driveLink: data[i][4] || '', // Column E (index 4)
          status: status,
          rubricCriteria: rubricCriteria,
          rowIndex: i + 1
        });
      }
    }
    return documents;
  } catch (error) {
    Logger.log('Error in getDocuments: ' + error);
    return [];
  }
}

function getFileIdFromUrl(url) {
  if (!url) return null;
  let fileId = null;

  if (url.includes('/file/d/')) {
    fileId = url.split('/file/d/')[1].split('/')[0];
  } else if (url.includes('/document/d/')) {
    fileId = url.split('/document/d/')[1].split('/')[0];
  } else if (url.includes('/spreadsheets/d/')) {
    fileId = url.split('/spreadsheets/d/')[1].split('/')[0];
  }
  return fileId;
}

function getPreviewUrl(driveLink) {
  const fileId = getFileIdFromUrl(driveLink);
  if (!fileId) return null;
  return 'https://drive.google.com/file/d/' + fileId + '/preview';
}

function saveRubricScores(email, phone, name, scores, criteria, rowIndex) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    const sourceSheet = ss.getSheetByName(SHEET_NAME);
    if (sourceSheet && rowIndex > 0) {
      sourceSheet.getRange(rowIndex, 6).setValue('Completed'); // Column F (Status)
    }

    let rubricSheet = ss.getSheetByName(RUBRIC_SHEET);
    if (!rubricSheet) {
      rubricSheet = ss.insertSheet(RUBRIC_SHEET);
      const headerArray = criteria.split(',').map(c => c.trim());
      rubricSheet.appendRow(['Email', 'Phone', 'Name', ...headerArray]);
    }

    // CHANGE 1: Write to SAME row as source sheet
    const values = [email, phone, name];
    const criteriaArray = criteria.split(',').map(c => c.trim());
    criteriaArray.forEach(c => values.push(scores[c] || ''));

    // Get current last row
    const currentLastRow = rubricSheet.getLastRow();
    Logger.log('Current last row in Rubric: ' + currentLastRow + ', Target row: ' + rowIndex);

    // If target row is beyond current last row, expand sheet
    if (currentLastRow < rowIndex) {
      // Instead of appendRow([]), use insertRows to create blank rows
      const rowsNeeded = rowIndex - currentLastRow;
      rubricSheet.insertRows(currentLastRow + 1, rowsNeeded);
      Logger.log('Inserted ' + rowsNeeded + ' blank rows');
    }

    // Write to SAME row - no need to check if row exists now
    rubricSheet.getRange(rowIndex, 1, 1, values.length).setValues([values]);
    Logger.log('Wrote values to row ' + rowIndex);

    return { success: true, message: 'Decision saved successfully!' };
  } catch (error) {
    Logger.log('Error in saveRubricScores: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

function getCurrentUser() {
  return Session.getActiveUser().getEmail();
}

// CHANGE 2: Re-evaluate function - clear status and rubric row
function reevaluateRow(rowIndex) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sourceSheet = ss.getSheetByName(SHEET_NAME);
    const rubricSheet = ss.getSheetByName(RUBRIC_SHEET);

    if (!sourceSheet || !rubricSheet) {
      Logger.log('Error: Source or Rubric sheet not found');
      return { success: false, message: 'Source or Rubric sheet not found' };
    }

    // Clear status in Source sheet
    sourceSheet.getRange(rowIndex, STATUS_COLUMN).clearContent();
    Logger.log('Cleared status in Source sheet row ' + rowIndex);

    // Clear entire row in Rubric sheet
    const rubricLastCol = rubricSheet.getLastColumn();
    if (rubricLastCol > 0 && rowIndex <= rubricSheet.getLastRow()) {
      rubricSheet.getRange(rowIndex, 1, 1, rubricLastCol).clearContent();
      Logger.log('Cleared Rubric sheet row ' + rowIndex);
    }

    return { success: true, message: 'Row re-evaluated successfully' };
  } catch (error) {
    Logger.log('Error in reevaluateRow: ' + error.toString());
    return { success: false, message: 'Error: ' + error.toString() };
  }
}
