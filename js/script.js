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
		
		var data, n, list, sortable, i, x, name;
		
		data = JSON.parse( raw );
		n = data.data.length;
		list = {}
		
		for ( i = 0; i < n; i++ ) {
			name = data.data[i][0];
			name in list ? ++list[name] : list[name] = 1
		}
		
		sortable = [];
		for ( x in list ) {
			sortable.push( [x, list[x]] );
		}
		
		output( sortable, n );
		
	}
	
	function output( list, n ) {
		
		var el, ul, li, name, x, i;
		
		el = document.getElementById( 'output' );
		ul = document.createElement( 'ul' );

		list.sort( function( a, b ) {
			return b[1] - a[1];
		});
		
		for ( i = 0; i < list.length; i++ ) {
			
			li = document.createElement( 'li' )
			li.innerHTML = '<strong>' + list[i][0] + '</strong>: ' + ( list[i][1] / n * 100 ).toFixed(1) + '%';
			ul.appendChild( li );
			
		}
		
		el.appendChild( ul );
		
	}
	
})();