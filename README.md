# HTML Table To CSV

# What's this?
This project is a lightweight Javascript library for exporting and importing data from HTML tables to CSV files.

# Requirements:
`JQuery (min. 2.1.1)`

# Setup:
The project is really simple to use. Just clone the repo and include the JHT-CSV-Worker.js in the <head> of your html and then in your javascript use the library. JQuery is NOT included, so you have to also reference it in the <head> of your code.

# Documentation:
To use it simply init a new instance of JHTCSVWorker:

`var worker = new JHTCSVWorker();`

# Functions:
```javascipt
(initializer) JHTCSVWorker()
```
initializes a new instance of JHTCSVWorker

***

```javascript
(string) JHTCSVWorker.exportToCSV(splicePos (int / int[]), spliceLength (int / int[]), selector (string), excludedColumns (int[]), lastCol (int), minusSubstitute (string), hasHeader (boolean);
```

Returns the string with data exported from a table specified by the **selector**, which is a selector for JQuery (e.g. "#id" or ".class"), also removing rows specified by **splicePos** and **spliceLength** (both int or both int[]), which are as follows: the first number or array of numbers for multiple rows to be excluded from export and the corresponding last number / array of numbers to be excluded (same as the Javascript's `string.splice(pos, length)` function). If **splicePos** is negative, the function counts from the last row to the first. The **excludedColumns** is an array of int, which contains numbers of columns (starting from 1) to be excluded from exporting. The **lastCol** is an int which is the total number of columns in the table. The **minusSubstitute** is the text to be placed instead of '-' characters which create coflicts with OpenOffice. The **hasHeader** is a boolean which, if it's true, indicates that the <table> has a <thead> header that is meant to be attached to the csv as columns header, or, if false, makes the script not to attach the <thead> to the exported csv.

# Sample code:
The following code downloads 'file.csv' with the contents of a table with id="table" excluding the last line:

```javascript
var worker = new JHTCSVWorker();
var result = worker.exportToCSV(-1, 1, "table", [5, 6, 7], 7);
var link = document.createElement('a');
link.download = "szafki-sosw.csv";
link.href =  result;
link.click();
```
