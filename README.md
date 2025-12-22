# Assignment Screening AppScript WebApp

## Folder Tree
```text
Assignment-Screening-Appscript-WebApp/
├── accept_reject_rubric_with_reevaluate/
│   ├── Code.gs
│   └── Index.html
├── accept_reject_rubric_without_reevaluate/
│   ├── Code.gs
│   └── Index.html
├── points_rubric/
│   ├── Code.gs
│   └── Index.html
├── screenshots/
│   ├── gsheet_images/
│   │   ├── source_sheet.png
│   │   └── rubric_sheet.png
│   ├── version_1_images/
│   │   ├── ARR_MobileView.jpeg
│   │   └── ARR_WindowsView.png
│   ├── version_2_images/
│   │   ├── ARR_with_reevaluate.png
│   │   └── points_rubric.png
│   └── Ideation.png
├── README.md
└── normalise_drive_url.gs
```


## Introduction
This is an assignment screening Appscript Webapp used with GoogleSheets file for easy screening of assignments submitted through GoogleForms.

## Two Versions of the App (Update)
**Accept Reject Rubric**

The Simplest way to screen is by classifying the abstract as Accept or Reject through Accept Reject Rubric(ARR).

**Points Rubric**

But, to be more unbiased about screening, selecting Rubric criteria such as 

*"Relevance and significance, Scientific content and accuracy, Methodology or Case description and Clarity and structure of abstract"*

can hep standardise and eliminate bias to some extent.

## Primary GoogleSheet Set-up
The GoogleSheet should have a sheet named 'Source' with the following columns:
- Column A: Name
- Column B: Email
- Column C: Phone
- Column D: Department
- Column E: Drive Link
- Column F: Status

This sheet is the source of the information for our WebApp. This information will be used for displaying details on the WebApp. Make sure you Upload correct details here.

## Formating Google Drive link for preview
Incase the drive link is of format other than:
" https://drive.google.com/file/d/${fileId}/preview '
Run normalise_drive_url.gs appscript. This is a manual trigger Appscript. It captures drive Id and normalises the link as above.

## Deployment
Now Deploy the Appscript as a new WebApp and use the generated URL for Screening. Donot run the html file independently as the data in GoogleSheets cannot be accessed that way.

**Use URL generated from deployment only!**

## Usage Guide
- Open the WebApp link.(see screenshots folder for images of live webpage)
- Evaluate and score according to the rubric.
- The webpage automatically takes you to the next assignment after clicking on submit score.

**Using Re-evaluate button**

- Incase you want to change the scores of an assignment, go back with the help of previous button and click Re-evaluate. This will clear the scores from the database.
- Evaluate and score the assignment again. Click Submit score.

## Results Sheet
A Rubric sheet will be generated automatically with:
- Column A: Email
- Column B: Phone
- Column C: Name
- Column D: Decision (in ARR); Rubric Criteria (in Points Rubric)

## FootNotes
Author: [V Deekshith](mailto:deekshithvodela@gmail.com)

Sample Images of Google Spreadsheet set-up: [Gsheet](screenshots/gsheet_images/)

Sample Images of Accept Reject Rubric: [AR Rubric](screenshots/version_2_images/ARR_with_reevaluate.png)

Sample Images of Points Rubric: [Points Rubric](screenshots/version_2_images/points_rubric.png)

