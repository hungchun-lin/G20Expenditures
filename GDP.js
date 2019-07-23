	//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllGraphs);
		
		function drawAllGraphs() {
			drawGraphName('GDP',
						 'SELECT A,Q',
						 GDPaverageResponseHandler);
			
			drawGraphName('PercapitaCombined', 
						  'SELECT A,B,D,J',
						  GDPVSEducationResponseHandler);
						  
			drawGraphName('PercapitaCombined', 
						  'SELECT A,B,F,J',
						  GDPVSHealthcareResponseHandler);
						  
			drawGraphName('PercapitaCombined', 
						  'SELECT A,B,H,J',
						  GDPVSMilitaryResponseHandler);
			
			
			
		} //drawAllGraphs
		
		function drawGraphName(sheetName, query, responseHandler) {
			var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1DESrBB3qlSHUWtAwG3Ib3zD9BNsdXrBo2YimnhVAd-Y/gviz/tq?sheet=' +
							sheetName + '&headers=1&tq=' + queryString);
			query.send(responseHandler);
			}
		
		//GDPaverageResponseHandler
		
		function GDPaverageResponseHandler(response) {
			var data = response.getDataTable();
			data.sort({column: 1, desc: true});
			
			var options = {
					title: 'Average GDP of 10 countries from 2011 to 2016' ,
					subtitle: 'Percentage of the GDP',
					vAxis: {title: 'GDP in billion ($)'},
					hAxis: {title: 'Country Name'},
					backgroundColor: 'none',
					Height:500,
					colors: ['darkblue'],
			};
			
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('GDP_average_div'));
			
			chart.draw(data, options);
		}
		
		
		
		
		
		//GDPVSEducationResponseHandler
		function GDPVSEducationResponseHandler(response) {
			var data = response.getDataTable();
			
			
			var options = {
					vAxis: {title: 'Education expenditure of per Capita in billion ($)'},
					hAxis: {title: 'GDP of per Capita in billion ($)'},
					colorAxis:{legend: {position: 'bottom',legend:'Population'}},
					colors: ['#FF7F8D', '#EB0808'],
					backgroundColor: 'none',
					bubble: {textStyle: {fontSize: 12,italic: true,bold: true}},
					Height:500					
			};
			
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('GDP_Education_div'));
			
			chart.draw(data, options);
		}
		
		
		//GDPVSHealthcareResponseHandler
		function GDPVSHealthcareResponseHandler(response) {
			var data = response.getDataTable();
			
			
			var options = {
					vAxis: {title: 'Education expenditure of per Capita in billion ($)'},
					hAxis: {title: 'GDP of per Capita in billion ($)'},
					colorAxis:{legend: {position: 'bottom',legend:'Population'}},
					colors: ['#95DAEB', '#1118C3'],
					backgroundColor: 'none',
					bubble: {textStyle: {fontSize: 12,italic: true,bold: true}},
					Height:500					
			};
			
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('GDP_Healthcare_div'));
			
			chart.draw(data, options);
		}
		
		
		
		//GDPVSMilitaryResponseHandler
		function GDPVSMilitaryResponseHandler(response) {
			var data = response.getDataTable();
			
			
			var options = {
					vAxis: {title: 'Education expenditure of per Capita in billion ($)'},
					hAxis: {title: 'GDP of per Capita in billion ($)'},
					colorAxis:{legend: {position: 'bottom',legend:'Population'}},
					colors: ['#FFFE87', '#FFD712'],
					backgroundColor: 'none',
					bubble: {textStyle: {fontSize: 12,italic: true,bold: true}},
					Height:500					
			};
			
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('GDP_Military_div'));
			
			chart.draw(data, options);
		}