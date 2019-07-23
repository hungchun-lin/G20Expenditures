	//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllGraphs);
		
		function drawAllGraphs() {
			drawGraphName('Military', 
						  'SELECT J,K,L,M,N,O,P',
						  MilitaryabsolutelyResponseHandler);
						  
			drawGraphName('MilitaryofGDP', 
						  'SELECT A,B,C,D,E,F,G',
						  MilitarypercentageResponseHandler);
				
			drawGraphName('MilitaryPerCapita', 
						  'SELECT A,B,C,D,E,F,G',
						  MilitaryPerCapitaResponseHandler);
						 
						  
			drawGraphName('MilitaryGrowth', 
						  'SELECT A,B',
						  MilitaryGrowthResponseHandler);	

			drawGraphName('MilitaryGrowth', 
						  'SELECT A,C',
						  MilitaryGrowthinGDPResponseHandler);				  

			drawGraphName('combined', 
						  'SELECT B,X',
						  MilitaryspreadResponseHandler);
			
		} //drawAllGraphs
		
		function drawGraphName(sheetName, query, responseHandler) {
			var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1DESrBB3qlSHUWtAwG3Ib3zD9BNsdXrBo2YimnhVAd-Y/gviz/tq?sheet=' +
							sheetName + '&headers=1&tq=' + queryString);
			query.send(responseHandler);
			}
		
		//MilitaryabsolutelyResponseHandler
		
		function MilitaryabsolutelyResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Military Expenditure of 10 countries (2011-2016)' ,
					vAxis: {title: 'Expenditure in Billions ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Military_abs_div'));
			
			chart.draw(data, options);
		}
		
		
		//MilitarypercentageResponseHandler
		
		function MilitarypercentageResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Military Expenditure of 10 countries (2011-2016)' ,
					subtitle: 'Percentage of the GDP',
					vAxis: {title: '% GDP'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Military_GDP_div'));
			
			chart.draw(data, options);
		}
		
		
		//MilitaryPerCapitaResponseHandler
		
		function MilitaryPerCapitaResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Military Expenditure of 10 countries (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Expenditure in DSD ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Military_per_div'));
			
			chart.draw(data, options);
		}
		
		
		
		//MilitaryGrowthResponseHandler
		function MilitaryGrowthResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Military Expenditure Growth in absolutely value (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Country Name'},
					hAxis: {title: 'Dollors in USD (Billion)'},
					colors:['#1C9C2D'],
					annotations: {stem: {length: 5, color:'none'}},
					backgroundColor: 'none',
					Height:500					
			};
			
			
			var view = new google.visualization.DataView(data);
			view.setColumns([0,1, {
					calc: function(dt, row) {
			return Math.floor(dt.getFormattedValue(row,1)) + ' B';
					},
					sourceColumn: 1,
					type: 'string',
					role: 'annotation'					
			}]);
			
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Military_growth_div'));
			
			chart.draw(view, options);
		}
		
		//MilitaryGrowthinGDPResponseHandler
		function MilitaryGrowthinGDPResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Military Expenditure Growth in % GDP (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Country Name'},
					hAxis: {title: '% GDP'},
					colors:['#7627B8'],
					annotations: {stem: {length: 5, color:'none'}},
					backgroundColor: 'none',
					Height:500				
			};
			
			var view = new google.visualization.DataView(data);
			view.setColumns([0,1, {
					calc: function(dt, row) {
			return Math.floor(dt.getFormattedValue(row,1)) + ' B';
					},
					calc: "stringify",
					sourceColumn: 1,
					type: 'string',
					role: 'annotation'					
			}]);
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Military_growth_GDP_div'));
			
			chart.draw(view, options);
		}
		
		//MilitaryspreadResponseHandler
		
		function MilitaryspreadResponseHandler(response) {
			var data = response.getDataTable();

			
			var options = {
						title: 'Average Healthcare on Military (2011 - 2016)',
						height: 400,
						colorAxis: {colors: ['#FFFE87', '#FFD712']}, 
						backgroundColor: 'none',
						
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('Military_spread_div'));
			
			chart.draw(data, options);
		}
		