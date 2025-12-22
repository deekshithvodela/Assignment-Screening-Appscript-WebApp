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
        const rubricCriteria = data[i][6] || 'Relevance and significance,Scientific content and accuracy,Methodology or Case description,Clarity and structure of abstract.'; // Column G (index 6)

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
      sourceSheet.getRange(rowIndex, STATUS_COLUMN).setValue('Completed');
    }

    let rubricSheet = ss.getSheetByName(RUBRIC_SHEET);
    if (!rubricSheet) {
      rubricSheet = ss.insertSheet(RUBRIC_SHEET);
      const headerArray = criteria.split(',').map(c => c.trim());
      rubricSheet.appendRow(['Email', 'Phone', 'Name', ...headerArray]);
    }

    const values = [email, phone, name];
    const criteriaArray = criteria.split(',').map(c => c.trim());
    criteriaArray.forEach(c => values.push(scores[c] || ''));

    const targetRow = rowIndex;
    const lastColumn = values.length;
    const rubricData = rubricSheet.getDataRange().getValues();
    const currentRows = rubricData.length;

    if (targetRow > currentRows) {
      const rowsToAdd = targetRow - currentRows;
      for (let i = 0; i < rowsToAdd; i++) {
        const emptyRow = Array(lastColumn).fill('');
        rubricSheet.appendRow(emptyRow);
      }
    }

    rubricSheet.getRange(targetRow, 1, 1, lastColumn).setValues([values]);

    return { success: true, message: 'Scores saved successfully!' };
  } catch (error) {
    Logger.log('Error in saveRubricScores: ' + error);
    return { success: false, message: error.toString() };
  }
}

function clearRubricScores(email, rowIndex) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    const sourceSheet = ss.getSheetByName(SHEET_NAME);
    if (sourceSheet && rowIndex > 0) {
      sourceSheet.getRange(rowIndex, STATUS_COLUMN).clearContent();
    }

    const rubricSheet = ss.getSheetByName(RUBRIC_SHEET);
    if (rubricSheet) {
      rubricSheet.getRange(rowIndex, 1, 1, rubricSheet.getLastColumn()).clearContent();
    }

    return { success: true, message: 'Scores cleared.' };
  } catch (e) {
    Logger.log('Error in clearRubricScores: ' + e);
    return { success: false, message: e.toString() };
  }
}

function getCurrentUser() {
  return Session.getActiveUser().getEmail();
}
