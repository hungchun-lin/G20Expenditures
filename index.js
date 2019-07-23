	//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllGraphs);
		
		function drawAllGraphs() {
			drawGraphName('Spread', 
						  'SELECT D,E',
						  SpreadingResponseHandler);
						  
			drawGraphName('G20',
						  'SELECT A,B',
						  G20populationResponseHandler);
		} //drawAllGraphs
		
		function drawGraphName(sheetName, query, responseHandler) {
			var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1DESrBB3qlSHUWtAwG3Ib3zD9BNsdXrBo2YimnhVAd-Y/gviz/tq?sheet=' +
							sheetName + '&headers=1&tq=' + queryString);
			query.send(responseHandler);
			}
		 
		//SpreadingResponseHandler
		
		function SpreadingResponseHandler(response) {
			var data = response.getDataTable();
			var options = {
					title: 'Expenditure Spreading of 10 Countries (2016)',	
					colors:['#E7253B','#1605AB','#FFE725'], //red, blue, yellow
					backgroundColor: 'none',
					Height:400
			};
			
			
			var chart = new google.visualization.PieChart(
						document.getElementById('Spreading_div'));
			
			chart.draw(data, options);
		}
	
	
		//G20populationResponseHandler
		
		function G20populationResponseHandler(response) {
			var data = response.getDataTable();

			
			var options = {
						title: 'Population of G20 Country (2018)',
						height: 400,
						colorAxis: {colors: ['#73E35F', '#0A7200']}, 
						backgroundColor: 'none',
						
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('G20Population'));
			
			chart.draw(data, options);
		}
		