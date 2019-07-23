	//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllGraphs);
		
		function drawAllGraphs() {
			drawGraphName('Healthcare', 
						  'SELECT J,K,L,M,N,O,P',
						  HealthcareabsolutelyResponseHandler);
						  
			drawGraphName('HealthcareofGDP', 
						  'SELECT A,B,C,D,E,F,G',
						  HealthcarepercentageResponseHandler);
				
			drawGraphName('HealthcarePerCapita', 
						  'SELECT A,B,C,D,E,F,G',
						  HealthcarePerCapitaResponseHandler);
						  
			drawGraphName('combined', 
						  'SELECT B,X,P',
						  HealthcareVSMilitaryResponseHandler);
						  
			drawGraphName('HealthcareGrowth', 
						  'SELECT A,B',
						  HealthcareGrowthResponseHandler);	

			drawGraphName('HealthcareGrowth', 
						  'SELECT A,C',
						  HealthcareGrowthinGDPResponseHandler);				  

			drawGraphName('combined', 
						  'SELECT B,P',
						  HealthcarespreadResponseHandler);
			
		} //drawAllGraphs
		
		function drawGraphName(sheetName, query, responseHandler) {
			var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1DESrBB3qlSHUWtAwG3Ib3zD9BNsdXrBo2YimnhVAd-Y/gviz/tq?sheet=' +
							sheetName + '&headers=1&tq=' + queryString);
			query.send(responseHandler);
			}
		
		//HealthcareabsolutelyResponseHandler
		
		function HealthcareabsolutelyResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Healthcare Expenditure of 10 countries (2011-2016)' ,
					vAxis: {title: 'Expenditure in Billions ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Healthcare_abs_div'));
			
			chart.draw(data, options);
		}
		
		
		//HealthcarepercentageResponseHandler
		
		function HealthcarepercentageResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Healthcare Expenditure of 10 countries (2011-2016)' ,
					subtitle: 'Percentage of the GDP',
					vAxis: {title: '% GDP'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Healthcare_GDP_div'));
			
			chart.draw(data, options);
		}
		
		
		//HealthcarePerCapitaResponseHandler
		
		function HealthcarePerCapitaResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Healthcare Expenditure of 10 countries (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Expenditure in DSD ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Healthcare_per_div'));
			
			chart.draw(data, options);
		}
		
		
		
		
		//HealthcarevsMilitary
		function HealthcareVSMilitaryResponseHandler(response) {
			var data = response.getDataTable();
			
			var options = {
						title: 'Healthcare Expenditure Compared to Military Expenditure (2016)',
						vAxis: {title: 'Country'},
						hAxis: {title: 'Spending in Billions ($)'},
						colors:['#FFE725','#1605AB'],
						backgroundColor: 'none',
						isStacked: true
			};
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Healthcare_Military_div'));
			
			chart.draw(data, options);
		} 
		
		
		
		//HealthcareGrowthResponseHandler
		function HealthcareGrowthResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Healthcare Expenditure Growth in absolutely value (2011-2016)' ,
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
						document.getElementById('Healthcare_growth_div'));
			
			chart.draw(view, options);
		}
		
		//HealthcareGrowthinGDPResponseHandler
		function HealthcareGrowthinGDPResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Healthcare Expenditure Growth in % GDP (2011-2016)' ,
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
						document.getElementById('Healthcare_growth_GDP_div'));
			
			chart.draw(view, options);
		}
		
		//HealthcarespreadResponseHandler
		
		function HealthcarespreadResponseHandler(response) {
			var data = response.getDataTable();

			
			var options = {
						title: 'Average Healthcare on Healthcare (2011 - 2016)',
						height: 400,
						colorAxis: {colors: ['#95DAEB', '#1118C3']}, 
						backgroundColor: 'none',
						
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('Healthcare_spread_div'));
			
			chart.draw(data, options);
		}
		