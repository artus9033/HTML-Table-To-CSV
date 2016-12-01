var scriptsLoaded = function(){
	console.log("JHT-CSV-Worker (aka JQuery-HTML-Table-CSV-Export-Import) by artus9033 succesfully loaded");
	console.log("Repository on GitHub: https://github.com/artus9033/JQuery-HTML-Table-CSV-Export-Import");
};

function loadScripts(path)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = path;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

loadScripts("DataEnc.js", scriptsLoaded);

function checkColumn(index, arr){
	var chk = true;
	arr.forEach(function(entry) {
		if(index == entry){
			chk = false;
		}
	});
}

function JHTCSVWorker(){

}
JHTCSVWorker.prototype{
	exportToCSV : function(splicePos, spliceLength, selector, excludedColumns){
		var arr = new Array();
		var mCt = 0;
		var klucz = 0;
		var delimiterKolumn = ",";
		$(selector + ' tbody').children().each(function(){
			$(this).children().each(function(index, elem){
				mCt++;
				if(checkColumn(mCt, excludedColumns)){
					arr[klucz] += $(this).text();
					if(mCt != 4){
						arr[klucz] += delimiterKolumn;
					}
				}
				if(mCt == 7){
					mCt = 0;
					klucz++;
				}
			});
		});
		arr.splice(splicePos, spliceLength);
		for(var i=0; i < arr.length; i++) {
			arr[i] = arr[i].replace('undefined', ''); //removes 'undefined'
		}
		var csv;
		$.each(arr, function(index, value) {
			csv += value + "\r\n";
		});
		csv = csv.substring(9);
		csv.replace("undefined", "");
		var encoder = new DataEnc({
		    mime   : 'text/csv',
		    charset: 'UTF-16BE',
		    bom    : true
		});
		encoder.enc(csv);
		var result = encoder.pay();
		return result;
	}
};
