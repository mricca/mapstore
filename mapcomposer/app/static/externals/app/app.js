		Ext4.Loader.setConfig({
			enabled : true,
			disableCaching : true, // For debug only
			paths : {
				'Chart' : 'externals/Chart'
			}
		});        
		
		Ext4.require('Chart.ux.Highcharts');
		Ext4.require('Chart.ux.Highcharts.Serie');
		Ext4.require('Chart.ux.Highcharts.AreaRangeSerie');
		Ext4.require('Chart.ux.Highcharts.AreaSerie');
		Ext4.require('Chart.ux.Highcharts.AreaSplineRangeSerie');
		Ext4.require('Chart.ux.Highcharts.AreaSplineSerie');
		Ext4.require('Chart.ux.Highcharts.BarSerie');
		Ext4.require('Chart.ux.Highcharts.BoxPlotSerie');
		Ext4.require('Chart.ux.Highcharts.BubbleSerie');
		Ext4.require('Chart.ux.Highcharts.ColumnRangeSerie');
		Ext4.require('Chart.ux.Highcharts.ColumnSerie');
		Ext4.require('Chart.ux.Highcharts.ErrorBarSerie');
		Ext4.require('Chart.ux.Highcharts.FunnelSerie');
		Ext4.require('Chart.ux.Highcharts.GaugeSerie');
		Ext4.require('Chart.ux.Highcharts.LineSerie');
		Ext4.require('Chart.ux.Highcharts.PieSerie');
		Ext4.require('Chart.ux.Highcharts.RangeSerie');
		Ext4.require('Chart.ux.Highcharts.ScatterSerie');
		Ext4.require('Chart.ux.Highcharts.SplineSerie');
		Ext4.require('Chart.ux.Highcharts.WaterfallSerie');

		//Ext4.require('Chart.ux.HighStock');
		
		Ext4.override(Ext4.data.proxy.Ajax,{ 
			getMethod: function(request) { 
				return 'POST'; 
			} 
		})
		
		Ext4.require('Ext4.container.Viewport');
		
		Ext4.application({
			models: [
				'MatrixModel',
				'BoxPlotChartModel',
				'BarChartModel'
			],
			stores: [
				'MatrixStore',
				'BoxPlotChartStore',
				'BarChartStore'
			],
			name: 'GeoBasi'
		});		