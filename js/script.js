( function() {
	
	window.addEventListener( 'load', init, false );
	
	function init() {
		
		var d, n;
		
		d = new Date();
		n = d.getFullYear() + ( '0' + ( d.getMonth() + 1 ) ).slice( -2 ) + ( '0' + d.getDate() ).slice( -2 );

		load( n, render );
		
	}
	
	function load( date, callback ) {
		
		var xobj = new XMLHttpRequest();
		var file = 'application-logs/process-' + date + '.json';
		
        xobj.overrideMimeType("application/json");
		xobj.open('GET', file, true);
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			  }
		};
		xobj.send(null); 
		
	}
	
	function render( raw ) {
		
		var data;
		
		data = JSON.parse( raw );
		
		console.log( data );
		
	}
	
})();