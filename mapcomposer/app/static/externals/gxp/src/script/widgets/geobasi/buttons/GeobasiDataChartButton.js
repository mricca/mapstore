/**
 *  Copyright (C) Consorzio LaMMA.
 *  http://www.lamma.rete.toscana.it
 *
 *  GPLv3 + Classpath exception
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.namespace('gxp.widgets.button');

/** api: constructor
 *  .. class:: GeobasiDataChartButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataChartButton = Ext.extend(Ext.Button, {

    /** api: xtype = gxp_geobasiDataChartButton */
    xtype: 'gxp_geobasiDataChartButton',
    iconCls: "gxp-icon-geobasi-chart",
    text: 'Genera Grafico',
    form: null,
    url: null,
    chartOpt: {
        series: {
            prod: {
                name: 'Production (000 tons)',
                color: '#89A54E',
                lcolor: 'rgb(207,235,148)',
                type: 'line',
                yAxis: 1,
                dataIndex: 'prod',
                unit: '(000 tons)'
            },
            yield: {
                name: 'Yield (kg/ha)',
                dashStyle: 'shortdot',
                type: 'line',
                color: '#4572A7',
                lcolor: 'rgb(139,184,237)',
                yAxis: 2,
                dataIndex: 'yield',
                unit: '(kg/ha)'
            },
            area: {
                name: 'Area (000 hectares)',
                color: '#AA4643',
                lcolor: 'rgb(240,140,137)',
                type: 'line',
                dataIndex: 'area',
                unit: '(000 ha)'
            }
        },
        height: 500
    },
    handler: function () {
        /*
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = mm+'/'+dd+'/'+yyyy; 
        
        var numRegion = [];
        var regStore = this.form.output.aoiFieldSet.AreaSelector.store
        var records = regStore.getRange();
		
        for (var i=0;i<records.length;i++){
			var attrs = records[i].get("attributes");
            var region = attrs.district ? attrs.district + "," + attrs.province : attrs.province;
            numRegion.push(region.toLowerCase());
        }
    */
        var data = this.form.output.getForm().getValues();
        var data2 = this.form.output.getForm().getFieldValues();
        /*
        
        var regionList = data.region_list.toLowerCase();
        var commodity = data.crop.toLowerCase();
        var season = data.season.toLowerCase();
        var granType = data.areatype;
        var fromYear = data.startYear;
        var toYear = data.endYear;
        
        var prodUnits = data2.production_unit;
        //var areaUnits = data2.area_unit == 1 ? 'Ha' : 'Sqr Km';
        
        switch(prodUnits)
        {
        case "000 tons":
          this.chartOpt.series.prod.unit = '(000 tons)';
          this.chartOpt.series.prod.name = 'Production (000 tons)';
          var prodCoeffUnits = '1000';
          break;
        case "000 kgs":
          this.chartOpt.series.prod.unit = '(000 kgs)';
          this.chartOpt.series.prod.name = 'Production (000 kgs)';
          var prodCoeffUnits = '1000';
          break;
        default:
          this.chartOpt.series.prod.unit = '(000 bales)';
          this.chartOpt.series.prod.name = 'Production (000 bales)';          
          var prodCoeffUnits = '170';
        }

        var chartTitle = "";
        var splitRegion;
        
        for (var i = 0;i<numRegion.length;i++){
            if (granType == "province"){
                if(i==numRegion.length-1){
                    chartTitle += numRegion[i].slice(0,1).toUpperCase() + numRegion[i].slice(1);
                }else{
                    chartTitle += numRegion[i].slice(0,1).toUpperCase() + numRegion[i].slice(1) + ", ";
                }                
            }else{
                splitRegion = numRegion[i].split(',');
                if(i==numRegion.length-1){
                    chartTitle += splitRegion[0].slice(0,1).toUpperCase() + splitRegion[0].slice(1) + " (" + splitRegion[1].toUpperCase() + ")";
                }else{
                    chartTitle += splitRegion[0].slice(0,1).toUpperCase() + splitRegion[0].slice(1) + " (" + splitRegion[1].toUpperCase() + "), ";
                }                       
            }            
        }
        
        var listVar = {
            today: today,
            chartTitle: chartTitle,
            numRegion: numRegion,
            season: season,
            fromYear: fromYear,
            toYear: toYear,
            commodity: commodity
        };       
        */
        var tabPanel = Ext.getCmp('id_mapTab');

        var viewparams1 = "flag:" + data.matrixmethodtype + ";" +
            "tygeomat:" + data2.tipo_matrice + ";" +
            "sigla:" + data.elemento;

        Ext.Ajax.request({
            scope: this,
            url: this.url,
            method: 'POST',
            params: {
                service: "WFS",
                version: "1.0.0",
                request: "GetFeature",
                typeName: "geosolutions:geobasi_boxplot_tipometa",
                outputFormat: "json",
                propertyName: "sigla,min,max,avg,med,mad,num_elem,tygeomat,tipometa",
                viewparams: viewparams1
            },
            success: function (result, request) {
                try {
                    this.jsonData1 = Ext.util.JSON.decode(result.responseText);

                    var data = this.form.output.getForm().getValues();
                    var data2 = this.form.output.getForm().getFieldValues();

                    var viewparams2 = "monitoraggio:" + data.monitoraggiotype + ";" +
                        "tygeomat:" + data2.tipo_matrice + ";" +
                        "sigla_el:" + data.elemento;

                    Ext.Ajax.request({
                        scope: this,
                        url: this.url,
                        method: 'POST',
                        params: {
                            service: "WFS",
                            version: "1.0.0",
                            request: "GetFeature",
                            typeName: "geosolutions:geobasi_chart",
                            outputFormat: "json",
                            propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,dmgeomattipo_descr,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa",
                            sortBy: "valore",
                            viewparams: viewparams2
                        },
                        success: function (result, request) {
                            try {
                                var jsonData2 = Ext.util.JSON.decode(result.responseText);
                            } catch (e) {
                                Ext.Msg.alert("Error", "Error parsing data from the server");
                                return;
                            }
                            if (jsonData2.features.length <= 0) {
                                Ext.Msg.alert("No data", "Data not available for these search criteria");
                                return;
                            }

                            //var aggregatedDataOnly = (granType == "pakistan");
                            //var data = this.getData(jsonData, aggregatedDataOnly);
                            var data = this.form.output.getForm().getValues();
                            var data1 = this.jsonData1;
                            var metodoElaborazione = data.elabmethodtype;

                            var dataCharts = this.getData(jsonData2, metodoElaborazione, data1);

                            //var charts  = this.makeChart(data, this.chartOpt, listVar, aggregatedDataOnly);

                            var mainChart = Ext4.getCmp('geobasi_barchart');

                            var gridStore = Ext4.data.StoreManager.lookup("BoxPlotChartStore");

                            if (!mainChart) {
                                var hcConfig = {
									//pointObject: true,
                                    series: [{
                                        name: 'Osservazioni',
                                        type: 'boxplot',
                                        minDataIndex: 'min', //valore più piccolo della distribuzione
                                        lowQtrDataIndex: 'q1', //primo quartile (25° percentile)
                                        medianDataIndex: 'med', //mediana (50° percentile)
                                        highQtrDataIndex: 'q2', //terzo quartile (75° percentile)
                                        maxDataIndex: 'max', //valore più grande della distribuzione										
										xField: 'experiment'
                                    }, {
                                        name: 'Valori Anomali',
                                        type: 'scatter',
										dataField : 'outlier',
                                        dataIndex: 'outlier',
										yField: 'outlier',
                                        marker: {
                                            fillColor: 'white',
                                            lineWidth: 1,
                                            lineColor: Highcharts.getOptions().colors[3]
                                        },
                                        tooltip: {
                                            pointFormat: 'Osservazione: {point.y}'
                                        },
                                        visible: true,
										listeners: {
											pointclick: function(serie,point,record,event) {
												point.select(true);
												var index;
												for(var i = 0;i<event.currentTarget.points.length; i++){
													if(event.currentTarget.points[i].x == point.x){
														var newIndex = 0
														if(event.currentTarget.points[i].selected == true){
															index = newIndex;
														}
														newIndex++
													}
												}
												var app = window.app;
												var map = app.mapPanel.map;
												
												var left = this.chart.store.data.items[point.x].data.bbox[index][1][0];
												var bottom = this.chart.store.data.items[point.x].data.bbox[index][1][1];
												var right = this.chart.store.data.items[point.x].data.bbox[index][1][2];
												var top = this.chart.store.data.items[point.x].data.bbox[index][1][3];
												
												/*var msg = "Series name: " + serie.name + 
													", selected temperature value: " + point.y + "<BR>" +
													"data record index: " + this.chart.store.data.items[point.x].data.bbox[index][1][0] + " - "+ this.chart.store.data.items[point.x].data.bbox[index][1][1] + " - "+ this.chart.store.data.items[point.x].data.bbox[index][1][2] + " - "+ this.chart.store.data.items[point.x].data.bbox[index][1][3];
												Ext.Msg.alert("Point Click Info", msg);*/
												
												map.zoomToExtent(
													new OpenLayers.Bounds(
														left,
														bottom,
														right,
														top
													)
												);
												
												point.select(false);
											}
										}										
                                    }],
                                    height: 500,
                                    width: 700,
									yField: 'outlier',
                                    xField: 'experiment',
                                    loadMask: true,
                                    initAnimAfterLoad: false,
                                    chartConfig: {
                                        chart: {
                                            marginRight: 130,
                                            marginBottom: 120,
                                            zoomType: 'xy'
                                        },
                                        title: {
                                            text: "Box Plot",
                                            x: -20 //center
                                        },
                                        subtitle: {
                                            text: '',
                                            x: -20
                                        },
                                        xAxis: {
                                            allowDecimals: false,
                                            title: {
                                                text: '',
                                                align: 'middle'
                                            }
                                        },
                                        yAxis: {
                                            title: {
                                                text: 'Elemento'
                                            },
                                            plotLines: [{
                                                value: 0,
                                                color: '#FF0000',
                                                width: 1,
                                                zIndex: 4,
                                                label: {
                                                    text: 'Mediana totale:',
                                                    align: 'center',
                                                    style: {
                                                        color: 'red'
                                                    }
                                                }
                                            }]
                                        },
                                        credits: {
                                            text: 'Consorzio LaMMA',
                                            href: 'http://www.lamma.rete.toscana.it',
                                            style: {
                                                cursor: 'pointer',
                                                color: '#707070',
                                                fontSize: '12px'
                                            }
                                        }
                                    }
                                };

                                hcConfig.id = 'geobasi_barchart';
                                mainChart = Ext4.widget('highchart', hcConfig);

                                if (!myTabPanel) {
                                    var myTabPanel = new Ext4.window.Window({
                                        title: 'Box Plot',
                                        id: 'boxplot_tab',
                                        itemId: 'boxplot_tab',
                                        border: true,
                                        autoScroll: true,
										height: 500,
										width: 800,
                                        layout: 'fit',
										maximizable : true,
										maximized: false,
                                        //tabTip: 'Box Plot',
                                        closable: true,
										constrain: true
                                    });
									myTabPanel.show();
																                            
                                    //tabPanel.add(myTabPanel);
                                }
								myTabPanel.add(mainChart);
								
                            }

							var dataCharts2 = Ext.util.JSON.encode(dataCharts);
							
							var proxy = new Ext4.data.proxy.Memory({
								reader: {
									type: 'json',
									root: 'data'
								}
							});
							
							//gridStore.setProxy(proxy);

							//gridStore.sync();							
							gridStore && mainChart.bindStore(gridStore);
							gridStore.loadData(dataCharts);
                            //Ext.getCmp('id_mapTab').setActiveTab('boxplot_tab');
							
							var chartMask = new Ext4.LoadMask({target:mainChart,store:gridStore});
							
							chartMask.show();
							
							gridStore.each(function (records) {

								mainChart.chartConfig.initAnimAfterLoad = false;
								mainChart.chartConfig.yAxis.plotLines[0].value = records.get('median');
								mainChart.chartConfig.yAxis.plotLines[0].label.text = 'Mediana totale: ' + records.get('median');
								mainChart.chartConfig.series[1].visible = false;
								mainChart.chartConfig.subtitle.text = 'Totale valori: ' + records.get('totaleRiprova');
								var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
								mainChart.chartConfig.yAxis.title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura;              
								var logText = records.get('log') === "1" ? "( scala logaritmica )" : "( valori reali )";
								mainChart.chartConfig.xAxis.title.text = 'Metodo Analitico - ' + logText;
							});								
							mainChart.draw();
							
							chartMask.hide();

                        },					
                        failure: function (result, request) {
                            Ext.Msg.alert("Error", "Server response error");
                        }
                    });
                } catch (e) {
                    Ext.Msg.alert("Error", "Error parsing data from the server");
                    return;
                }
                if (this.jsonData1.features.length <= 0) {
                    Ext.Msg.alert("No data", "Data not available for these search criteria");
                    return;
                }
            },
            failure: function (result, request) {
                Ext.Msg.alert("Error", "Server response error");
            }
        });

    },
    getData: function (json, metodoElaborazione, json1) {

        //features number returned by json (query)
        var arrLength = json.features.length;

        //array with values for boxPlot charts
        /*var dataPoints = {
			result:{
				total: '250',
				data: []
			}
		};*/
		
        /*var dataPoints = {
			data: []
		};*/		
		
		var dataPoints = [];
        //mediana totale
        var medianaBoxPlot;

        // Calcolo mediana per l'intero set di valori (per tutti i metodi analitici)
        switch (metodoElaborazione) {
        case "1":
            medianaBoxPlot = (arrLength % 2 == 0) ? (Math.log(json.features[(arrLength) / 2].properties.valore) + Math.log(json.features[(arrLength + 2) / 2].properties.valore)) / 2 : Math.log(json.features[(arrLength + 1) / 2].properties.valore);
            break;
        case "2":
            medianaBoxPlot = (arrLength % 2 == 0) ? (json.features[(arrLength) / 2].properties.valore + json.features[(arrLength + 2) / 2].properties.valore) / 2 : json.features[(arrLength + 1) / 2].properties.valore;
            break;
        }

        for (var i = 0; i < json1.features.length; i++) {
            var minimo;
            var massimo;
            var myValues = [];
            var metodoAnalitico = json1.features[i].properties.tipometa;
            var b = 0;
            var firstPercentile;
            var thirdPercentile;

            for (var c = 0; c < arrLength; c++) {
                json.features[c].properties.tipometa = json.features[c].properties.tipometa === null ? '-999' : json.features[c].properties.tipometa;
                if (metodoAnalitico === json.features[c].properties.tipometa) {
                    myValues[b] = {
                        metodo: json.features[c].properties.tipometa,
                        valore: metodoElaborazione == '1' ? Math.log(json.features[c].properties.valore) : json.features[c].properties.valore,
						bbox: json.features[c].properties.bbox
                    };
                    b++;
                }
            }

            // http://www.amstat.org/publications/jse/v14n3/langford.html
            // http://www.alcula.com/it/calcolatrici/statistica/quartili/
            // http://www.alcula.com/it/calcolatrici/statistica/mediana/

            var conteggio = myValues.length;

            var firstPercentileVal = (conteggio + 1) / 4;
            var secondPercentile = (conteggio % 2 == 0) ? (myValues[(conteggio) / 2].valore + myValues[((conteggio + 2) / 2)].valore) / 2 : myValues[(conteggio + 1) / 2]['valore'];
            var thirdPercentileVal = (conteggio + 1) * 3 / 4;

            // check if a number is integer or float
            var is_int = function (value) {
                if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                }
            }

            // A JavaScript equivalent of PHP’s intval
            var intval = function (mixed_var, base) {
                // http://kevin.vanzonneveld.net
                // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // +   improved by: stensi
                // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // +   input by: Matteo
                // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
                // +   bugfixed by: Rafał Kukawski (http://kukawski.pl)
                // *     example 1: intval('Kevin van Zonneveld');
                // *     returns 1: 0
                // *     example 2: intval(4.2);
                // *     returns 2: 4
                // *     example 3: intval(42, 8);
                // *     returns 3: 42
                // *     example 4: intval('09');
                // *     returns 4: 9
                // *     example 5: intval('1e', 16);
                // *     returns 5: 30
                var tmp;

                var type = typeof mixed_var;

                if (type === 'boolean') {
                    return +mixed_var;
                } else if (type === 'string') {
                    tmp = parseInt(mixed_var, base || 10);
                    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
                } else if (type === 'number' && isFinite(mixed_var)) {
                    return mixed_var | 0;
                } else {
                    return 0;
                }
            }

            if (is_int(firstPercentileVal)) {
                if (conteggio >= 4) {
                    firstPercentile = myValues[firstPercentileVal - 1].valore;
                } else {
                    firstPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var first = myValues[intval(firstPercentileVal) - 1].valore;
                    var second = myValues[(intval(firstPercentileVal) - 1) + 1].valore;
                    var third = myValues[intval(firstPercentileVal) - 1].valore;
                    var forth = intval(firstPercentileVal);

                    firstPercentile = first + ((second) - third) * (firstPercentileVal - (forth));
                } else {
                    firstPercentile = null;
                }
            }

            if (is_int(thirdPercentileVal)) {
                if (conteggio >= 4) {
                    thirdPercentile = myValues[thirdPercentileVal - 1].valore;
                } else {
                    thirdPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var primo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var secondo = myValues[(intval(thirdPercentileVal) - 1) + 1].valore;
                    var terzo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var quarto = intval(thirdPercentileVal);

                    thirdPercentile = primo + ((secondo) - terzo) * (thirdPercentileVal - (quarto));
                } else {
                    thirdPercentile = null;
                }
            }

            var minimo = myValues[0].valore;
            var massimo = myValues[conteggio - 1].valore;

            var firstPercRecalc = firstPercentile - 1.5 * (thirdPercentile - firstPercentile);
            var thirdPercRecalc = thirdPercentile + 1.5 * (thirdPercentile - firstPercentile);

            var newMin = minimo > firstPercRecalc ? minimo : firstPercRecalc;
            var newMax = massimo < thirdPercRecalc ? massimo : thirdPercRecalc;

            var outlier = [];
			var outlierBbox = [];
            var h = 0


            for (var c = 0; c < conteggio; c++) {
                if (metodoAnalitico == myValues[c].metodo) {
                    if (myValues[c].valore < newMin || myValues[c].valore > newMax) {
                        outlier[h] = [
                            i,
                            myValues[c].valore
                        ];
                        outlierBbox[h] = [
                            i,
                            myValues[c].bbox
                        ];						
                        h++;
                    }
                }
            }

			var obj = null;
			
			
			
            //dataPoints.data[i] = {
			dataPoints[i] = {
                experiment: metodoAnalitico,
                min: newMin,
                q1: firstPercentile,
                med: secondPercentile,
                q2: thirdPercentile,
                max: newMax,
                outlier: outlier,
                median: medianaBoxPlot,
                sigla: json1.features[0].properties.sigla,
                totaleRiprova: arrLength,
                matrice: json1.features[0].properties.tygeomat,
                log: metodoElaborazione,
				bbox: outlierBbox
            };

        }

        return dataPoints;
        /*var chartData = [];
		
		for (var i=0 ; i<json.features.length; i++) {
			var feature = json.features[i];
			var obj = null;
			
			//search already existing entries
			for (var j=0; j<chartData.length; j++){
				if(chartData[j].region == feature.properties.region){
					obj = chartData[j];
				}
			}
			
			//create entry if doesn't exists yet
			if(!obj){
				obj = {
					region:feature.properties.region,
					title:feature.properties.region,
					subtitle:feature.properties.crop,
					rows: []
				};
				chartData.push(obj);
			}
			
			//create a row entry
			var yr = feature.properties.year;
			var a = feature.properties.area;
			var p = feature.properties.production;
			var yi = feature.properties.yield;
			
			obj.rows.push({
				time: yr,
				area: parseFloat(a.toFixed(2)),
				prod: parseFloat(p.toFixed(2)),
				yield: parseFloat(yi.toFixed(2))//,
				//crop: feature.properties.crop
			});
			
			//obj.avgs.area+=a;
			//obj.avgs.prod+=p;
			//obj.avgs.yield+=yi;
			//obj.avgs.years+=1;
		}
	
		//create mean chart if needed
		var mean;
		if (chartData.length > 1){			
			mean = {
				region: "all",
				title: "Aggregated data",
				subtitle: json.features[0].properties.crop,
				rows: []
			};

			var meanareas = []
			var meanproductions = [];
			var meanyields = [];
			var nyears = {};
			
			//sum all values
			for (var i=0; i<chartData.length; i++){
				var rows = chartData[i].rows;
				for (var j=0; j<rows.length; j++){
					var yr = rows[j].time;
					var area = rows[j].area;
					var prod = rows[j].prod;
					var yield = rows[j].yield;
					meanareas[yr] = (meanareas[yr] ? meanareas[yr] :0) + area;
					meanproductions[yr] = (meanproductions[yr] ? meanproductions[yr]:0) +prod;
					meanyields[yr] = (meanyields[yr] ? meanyields[yr]:0) +yield;
					nyears[yr] = (nyears[yr]?nyears[yr]:0) + 1;
				}
			}
			
			//divide by nyears
			for(var i=0 in nyears){				
				mean.rows.push({
					time: i,
					area: parseFloat(meanareas[i].toFixed(2)), //(meanareas[i]/nyears[i]).toFixed(2),
					prod: parseFloat(meanproductions[i].toFixed(2)), //(meanproductions[i]/nyears[i]).toFixed(2),
					yield: parseFloat((meanyields[i]/nyears[i]).toFixed(2))					
				});
			}
			
			chartData.push(mean);
		}	
		
		if(aggregatedDataOnly && mean){
			chartData = [mean];
		}else{		
			// Sorts array elements in ascending order numerically.
			function CompareForSort(first, second){
				if (first.time == second.time)
					return 0;
				if (first.time < second.time)
					return -1;
				else
					return 1; 
			}
			
			//sort all year ascending
			for (var i=0; i<chartData.length; i++){
				//chartData[i].rows.sort(function(a,b){return a.time > b.time});
				chartData[i].rows.sort(CompareForSort);        
			}
		}
        
		return chartData;*/
    }
    /*,
	
	makeChart: function(data, opt, listVar, aggregatedDataOnly){
		
		var grafici = [];
		var getAvg = function(arr,type) {
			var sum = 0,len = arr.length;
			for (var i=0;i<len;i++){
				sum += arr[i][type];
			}
			return sum/len;
		};
		
		for (var r=0; r<data.length; r++){
        
			// Store for random data
			var store = new Ext.data.JsonStore({
				data: data[r],
				fields: [{
					name: 'time',
					type: 'string'
				}, {
					name: 'area',
					type: 'float'
				}, {
					name: 'prod',
					type: 'float'
				}, {
					name: 'yield',
					type: 'float'
				}],
				root: 'rows'
			});

			var chart;
			var prodavg = getAvg(data[r].rows,'prod');
			var yieldavg = getAvg(data[r].rows,'yield');
			var areaavg = getAvg(data[r].rows,'area');
			
			//
			// Making Chart Title
			//
			var text = "";
			var dataTitle = data[r].title.toUpperCase();
			var commodity = listVar.commodity.toUpperCase();
			var chartTitle = listVar.chartTitle.split(',')[r];
				
			if(dataTitle){				
				if(dataTitle == "AGGREGATED DATA"){
					if(aggregatedDataOnly){
						text += dataTitle + " (Pakistan) - " + commodity;
					}else{
						text += dataTitle + " - " + commodity;
					}					
				}else{
					text += commodity + " - " + chartTitle;
				}
			}
			
			//
			// AOI Subtitle customization
			//
			var aoiSubtitle = "";
			if(dataTitle == "AGGREGATED DATA"){
				if(aggregatedDataOnly){
					aoiSubtitle += "Pakistan";
				}else{
					aoiSubtitle += listVar.chartTitle;
				}	
			}else{
				aoiSubtitle += chartTitle;
			}
			
			chart = new Ext.ux.HighChart({
				series: [
					opt.series.prod,
					opt.series.yield,
					opt.series.area					
				],
				height: opt.height,
				//width: 900,
				store: store,
				animShift: true,
				xField: 'time',
				chartConfig: {
					chart: {
						zoomType: 'x',
                        spacingBottom: 145                       
					},
                    exporting: {
                        enabled: true,
                        width: 1200,
                        url: this.target.highChartExportUrl
                    },
					title: {
						//text: (data[r].title.toUpperCase()=="AGGREGATED DATA" ? data[r].title.toUpperCase() + " - " + listVar.commodity.toUpperCase() : listVar.commodity.toUpperCase() +" - "+listVar.chartTitle.split(',')[r]) // + " - " + (listVar.numRegion.length == 1 ? listVar.chartTitle : listVar.chartTitle.split(',')[r])
						text: text
					},
					subtitle: {
                        text: '<span style="font-size:10px;">Source: Pakistan Crop Portal</span><br />'+
                              '<span style="font-size:10px;">Date: '+ listVar.today +'</span><br />'+
                              '<span style="font-size:10px;">AOI: '+ aoiSubtitle (data[r].title.toUpperCase()=="AGGREGATED DATA" ? listVar.chartTitle : listVar.chartTitle.split(',')[r]) + '</span><br />' +
                              '<span style="font-size:10px;">Commodity: '+listVar.commodity.toUpperCase()+'</span><br />'+
                              '<span style="font-size:10px;">Season: '+listVar.season.toUpperCase()+'</span><br />'+
                              '<span style="font-size:10px;">Years: '+ listVar.fromYear + "-"+ listVar.toYear+'</span><br />'+ 
                              '<span style="font-size:10px; color: '+opt.series.area.color+'">Area mean: '+areaavg.toFixed(2)+' '+opt.series.area.unit+'</span><br />'+
                              '<span style="font-size:10px; color: '+opt.series.prod.color+'">Prod mean: '+ prodavg.toFixed(2)+' '+opt.series.prod.unit+'</span><br />'+
                              '<span style="font-size:10px; color: '+opt.series.yield.color+'">Yield mean: '+ yieldavg.toFixed(2)+' '+opt.series.yield.unit+'</span>',
                        align: 'left',
                        verticalAlign: 'bottom',
                        useHTML: true,
                        x: 30,
                        y: -10
					},
					xAxis: [{
						type: 'datetime',
						categories: 'time',
						tickWidth: 0,
						gridLineWidth: 1
					}],
					yAxis: [{ // AREA
						title: {
							text: opt.series.area.name,
                            rotation: 270,
							style: {
								color: opt.series.area.color,
                                backgroundColor: Ext.isIE ? '#ffffff' : "transparent"
							}
						},                    
						labels: {
							formatter: function () {
								return this.value;
							},
							style: {
								color: opt.series.area.color
							}
						},
                        plotLines: [{ //mid values
							value: areaavg,
							color: opt.series.area.lcolor,
							dashStyle: 'LongDash',
							width: 1                       
						}]

					}, { // PRODUCTION yAxis
						gridLineWidth: 0,
						title: {
							text: opt.series.prod.name,
                            rotation: 270,
							style: {
								color: opt.series.prod.color,
                                backgroundColor: Ext.isIE ? '#ffffff' : "transparent"
							}
						},
						labels: {
							formatter: function () {
								return this.value;
							},
							style: {
								color: opt.series.prod.color
							}
						},
						opposite: true,
                        plotLines: [{ //NOTE all the mid values are overlapping in the middle of the chart
						 //mid values
							value: prodavg,
							color: opt.series.prod.lcolor,
							dashStyle: 'LongDash',
							width: 1
						}]

					}, { // Tertiary yAxis
						gridLineWidth: 0,
						dashStyle: 'shortdot',
						title: {
							text: opt.series.yield.name,
                            rotation: 270,
							style: {
								color: opt.series.yield.color,
                                backgroundColor: Ext.isIE ? '#ffffff' : "transparent"
							},
                            x: 6
						},
						labels: {
							formatter: function () {
								return this.value;
							},
							style: {
								color: opt.series.yield.color
							}
						},
						opposite: true,
                        plotLines: [{ //mid values
							value: yieldavg,
							color: opt.series.yield.lcolor,
							dashStyle: 'LongDash',
							width: 1
						}]
					}],
					tooltip: {
                        formatter: function() {
                            var s = '<b>'+ this.x +'</b>';
                            
                            Ext.each(this.points, function(i, point) {
                                s += '<br/><span style="color:'+i.series.color+'">'+ i.series.name +': </span>'+
                                    '<span style="font-size:12px;">'+ i.y+'</span>';
                            });
                            
                            return s;
                        },
                        shared: true,
						crosshairs: true
					},
                    legend: {
                        labelFormatter: function() {
                            if (this.name == 'Area (000 hectares)'){
                                return 'Area (000 ha)';
                            }else{
                                return this.name;
                            }
                            
                        }
                    }            
				}
			});
			grafici.push(chart);
		}
		
		return grafici; 
	}*/
});

Ext.reg(gxp.widgets.button.GeobasiDataChartButton.prototype.xtype, gxp.widgets.button.GeobasiDataChartButton);