### Assignment Screening AppScript WebApp
## Introduction
This is an assignment screening Appscript Webapp used with GoogleSheets file for easy screening of assignments submitted through GoogleForms.
## Sheet Set-up
The GoogleSheet should have a sheet named 'Source' with the following columns:
- Column A: Name
- Column B: Email
- Column C: Phone
- Column D: Department
- Column E: Drive Link
- Column F: Status

This sheet is the source of the information for our WebApp. This information will be used for displaying details on the WebApp. Make sure you Upload correct details here.

Incase the drive link is of format other than:
" https://drive.google.com/file/d/${fileId}/preview '
Run normalise_drive_url.gs appscript. This is a manual trigger Appscript. It captures drive Id and normalises the link as above.

## Deployment
Now Deploy the Appscript as a new WebApp and use the generated URL for Screening. Donot run the html file independently as the data in GoogleSheets cannot be accessed that way.
**Use URL generated from deployment only!**

## Results Sheet
A Rubric sheet will be generated automatically with:
- Column A: Email
- Column B: Phone
- Column C: Name
- Column D: Decision

## FootNotes
Author: V Deekshith
Sample Link: [Link](https://script.google.com/macros/s/AKfycbzljyKnad34WoU9rB5XjvqC2502QKbQW2Mvar8sNtVwymc8mFLb81pfKKlqZwWcJQQ/exec)