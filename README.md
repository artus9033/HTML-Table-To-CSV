# JQuery-HTML-Table-CSV-Export-Import

# What's this?
This project is a lightweight Javascript library for exporting and importing data from HTML tables to CSV files.

# Requirements:
`- JQuery`

# Setup:
The project is really simple to use. Just clone the repo and include the JHT-CSV-Worker.js in the <head> of your html and then in your javascript use the library. JQuery is NOT included, so you have to also reference it in the <head> of your code.

# Documentation:

To use it simply init:

`JHTCSVWorker worker = new JHTCSVWorker();`

# Functions:

`(string) JHTCSVWorker.exportToCSV(splicePos (int / int[]), spliceLength (int / int[]), tableSelector (string);`
Returns the string with data exported from a table specified by the tableSelector, which is a selector for JQuery (e.g. "#id" or ".class"), also removing rows specified by splicePos and spliceLength (both int or both int[]), which are as follows: the first number or array of numbers for multiple lines to be excluded from export and the corresponding last number / array of numbers to be excluded (same as the JS string.splice(pos, length) function). Negative number as splicePos counts from the last row to the first.

# Sample code:
The following code downloads 'file.csv' with the contents of a table with id="table" excluding the last line:

`JHTCSVWorker worker = new JHTCSVWorker();
var result = worker.exportToCSV(-1, 1, "#table");
var link = document.createElement('a');
link.download = "file.csv";
link.href =  result;
link.click();`
