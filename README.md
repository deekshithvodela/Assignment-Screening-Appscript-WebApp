# Assignment Screening AppScript WebApp

## Folder Tree
```text
Assignment-Screening-Appscript-WebApp/
├── accept-reject-rubric-with-reevaluate/
│   ├── Code.gs
│   └── Index.html
├── accept-reject-rubric-without-reevaluate/
│   ├── Code.gs
│   └── Index.html
├── points-rubric/
│   ├── Code.gs
│   └── Index.html
├── screenshots/
│   ├── gsheet-images/
│   │   ├── source-sheet.png
│   │   └── rubric-sheet.png
│   ├── version-1-images/
│   │   ├── arr-mobile-view.jpeg
│   │   └── arr-windows-view.png
│   ├── version-2-images/
│   │   ├── arr-with-reevaluate.png
│   │   └── points-rubric.png
│   └── ideation.png
├── README.md
└── normalise-drive-url.gs
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
The GoogleSheet should have a sheet named 'Source' with the following columns: (case sensitive)
- Column A: Name
- Column B: Email
- Column C: Phone
- Column D: Department
- Column E: Drive Link
- Column F: Status

This sheet is the source of the information for our WebApp. This information will be used for displaying details on the WebApp. Make sure you Upload correct details here.

## Setting-up Appscript files
- Copy paste code from Code.gs file from your preferred version to your google spreadsheet's Code.gs file.
- Create a new 'Index.html' file (case sensitive) from the appscript dashboard. Copy paste html code.

## Formating Google Drive link for preview
Incase the drive link is of format other than:
" https://drive.google.com/file/d/${fileId}/preview '
Run normalise-drive-url.gs appscript. This is a manual trigger Appscript. It captures drive Id and normalises the link as above.

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

Sample Images of Google Spreadsheet set-up: [Gsheet](screenshots/gsheet-images/)

Sample Images of Accept Reject Rubric: [AR Rubric](screenshots/version-2-images/arr-with-reevaluate.png)

Sample Images of Points Rubric: [Points Rubric](screenshots/version-2-images/points-rubric.png)

