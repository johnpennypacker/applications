( function() {
	
	window.addEventListener( 'load', init, false );
	
	function init() {
		
		var month, day, opt, i;
		
		month = document.getElementById( 'select-month' );
		for ( i = 1; i < 13; i++ ) {
			opt = document.createElement( 'option' );
			opt.value = i;
			opt.innerHTML = i;
			month.appendChild( opt );
		}
		
		day = document.getElementById( 'select-day' );
		for ( i = 1; i < 32; i++ ) {
			opt = document.createElement( 'option' );
			opt.value = i;
			opt.innerHTML = i;
			day.appendChild( opt );
		}
		
		document.getElementById( 'submit' ).addEventListener( 'click', function() {
			var n = document.getElementById( 'select-year').value + ( '0' + ( month.value ) ).slice( -2 ) + ( '0' + day.value ).slice( -2 );
			document.getElementById( 'date' ).innerHTML = n;
			document.getElementById( 'view-today').value = "Today";
			load( n, render );
		});
		
		document.getElementById( 'view-today').addEventListener( 'click', loadToday, false );
		
		loadToday();
															
	}
																
	function loadToday() {
		
		var d, n;
		
		d = new Date();
		n = d.getFullYear() + ( '0' + ( d.getMonth() + 1 ) ).slice( -2 ) + ( '0' + d.getDate() ).slice( -2 );

		document.getElementById( 'date' ).innerHTML = "Today";
		document.getElementById( 'view-today').value = "Refresh";
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
			  } else if ( xobj.status != "200" ) {
				  document.getElementById( 'output' ).innerHTML = "Unable to retrieve data";
			  }
		};
		xobj.send(null); 
		
	}
	
	function render( raw ) {
		
		var data, n, list, sortable, i, x, name;
		
		data = JSON.parse( raw );
		n = data.length;
		list = {}
		
		for ( x in data ) {
			name = data[x].application;
			name in list ? ++list[name] : list[name] = 1
		}
		
		sortable = [];
		for ( x in list ) {
			sortable.push( [x, list[x]] );
		}
		
		output( sortable, n );
		
	}
	
	function output( list, n ) {
		
		var el, ul, li, name, x, i, p;
		
		el = document.getElementById( 'output' );
		ul = document.createElement( 'ul' );

		list.sort( function( a, b ) {
			return b[1] - a[1];
		});
		
		for ( i = 0; i < list.length; i++ ) {
			
			p = ( list[i][1] / n * 100 ).toFixed(1)
			
			li = document.createElement( 'li' )
			li.innerHTML = '<strong>' + list[i][0] + '</strong>: ' + p + '% <div><div style="width:' + p + '%"></div></div>';
			ul.appendChild( li );
			
		}
		
		el.innerHTML = 'Apps used: ' + list.length;
		el.appendChild( ul );
		
	}
	
})();