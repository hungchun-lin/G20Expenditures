	//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllGraphs);
		
		function drawAllGraphs() {
			drawGraphName('Education', 
						  'SELECT J,K,L,M,N,O,P',
						  EducationabsolutelyResponseHandler);
						  
			drawGraphName('EducationofGDP', 
						  'SELECT A,B,C,D,E,F,G',
						  EducationpercentageResponseHandler);
				
			drawGraphName('EducationPerCapita', 
						  'SELECT A,B,C,D,E,F,G',
						  EducationPerCapitaResponseHandler);
						  
			drawGraphName('combined', 
						  'SELECT B,X,H',
						  EducationVSMilitaryResponseHandler);
						  
			drawGraphName('EducationGrowth', 
						  'SELECT A,B',
						  EducationGrowthResponseHandler);	

			drawGraphName('EducationGrowth', 
						  'SELECT A,C',
						  EducationGrowthinGDPResponseHandler);				  

			drawGraphName('combined', 
						  'SELECT B,H',
						  EducationspreadResponseHandler);
			
		} //drawAllGraphs
		
		function drawGraphName(sheetName, query, responseHandler) {
			var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1DESrBB3qlSHUWtAwG3Ib3zD9BNsdXrBo2YimnhVAd-Y/gviz/tq?sheet=' +
							sheetName + '&headers=1&tq=' + queryString);
			query.send(responseHandler);
			}
		
		//EducationabsolutelyResponseHandler
		
		function EducationabsolutelyResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Education Expenditure of 10 countries (2011-2016)' ,
					vAxis: {title: 'Expenditure in Billions ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Education_abs_div'));
			
			chart.draw(data, options);
		}
		
		
		//EducationpercentageResponseHandler
		
		function EducationpercentageResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Education Expenditure of 10 countries (2011-2016)' ,
					subtitle: 'Percentage of the GDP',
					vAxis: {title: '% GDP'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Education_GDP_div'));
			
			chart.draw(data, options);
		}
		
		
		//EducationPerCapitaResponseHandler
		
		function EducationPerCapitaResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 5, desc: true});
			
			var options = {
					title: 'Education Expenditure on per capita of 10 countries (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Expenditure in DSD ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('Education_per_div'));
			
			chart.draw(data, options);
		}
		
		
		
		
		//EducationvsMilitary
		function EducationVSMilitaryResponseHandler(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Compared to Military Expenditure (2016)',
						vAxis: {title: 'Country'},
						hAxis: {title: 'Spending in Billions ($)'},
						colors:['#FFE725','#E7253B'],
						backgroundColor: 'none',
						isStacked: true
			};
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Education_Military_div'));
			
			chart.draw(data, options);
		} 
		
		
		
		//EducationGrowthResponseHandler
		function EducationGrowthResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Education Expenditure Growth in absolutely value (2011-2016)' ,
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
						document.getElementById('Education_growth_div'));
			
			chart.draw(view, options);
		}
		
		//EducationGrowthinGDPResponseHandler
		function EducationGrowthinGDPResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			
			var options = {
					title: 'Education Expenditure Growth in % GDP (2011-2016)' ,
					subtitle: 'Per Capita',
					vAxis: {title: 'Country Name'},
					hAxis: {title: '% GDP'},
					colors:['#7627B8'],
					annotations: {stem: {length: 5, color:'none'}},
					backgroundColor: 'none',
					Height:500				
			};
			
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Education_growth_GDP_div'));
			
			
			var view = new google.visualization.DataView(data);
			view.setColumns([0,1, {
					calc: function(dt, row) {
			return Math.floor(dt.getFormattedValue(row,1)) + ' %';
					},
					calc: "stringify",
					sourceColumn: 1,
					type: 'string',
					role: 'annotation'					
			}]);
			
			var chart = new google.visualization.BarChart(
						document.getElementById('Education_growth_GDP_div'));
			
			
			chart.draw(view, options);
		}
		
		//EducationspreadResponseHandler
		
		function EducationspreadResponseHandler(response) {
			var data = response.getDataTable();

			
			var options = {
						title: 'Average expenditure on Education (2011 - 2016)',
						height: 400,
						colorAxis: {colors: ['#FF7F8D', '#EB0808']}, 
						backgroundColor: 'none',
						
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('Education_spread_div'));
			
			chart.draw(data, options);
		}
		