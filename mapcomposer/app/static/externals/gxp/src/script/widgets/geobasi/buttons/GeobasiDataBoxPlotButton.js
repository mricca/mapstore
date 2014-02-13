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
 *  .. class:: GeobasiDataBoxPlotButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataBoxPlotButton = Ext.extend(Ext.Button, {

    /** api: xtype = gxp_geobasiDataChartButton */
    xtype: 'gxp_geobasiDataBoxPlotButton',
    form: null,
    url: null,
	filter: null,
	mainLoadingMask: "Attendere prego, creazione grafico in corso...",
    handler: function () {
		var myFilter;
		
		if(this.filter.bufferFieldset.hidden === false){
			var radius = this.filter.bufferFieldset.bufferField.getValue(); 
			
			//
			// create point from your lat and lon of your selected feature
			//
			var coordinates = this.filter.bufferFieldset.coordinatePicker.getCoordinate();
			var radiusPoint = new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]);
			
			var polygon;
			if(this.filter.geodesic){
				polygon = OpenLayers.Geometry.Polygon.createGeodesicPolygon(
					radiusPoint,
					radius,
					100, 
					0,
					this.target.mapPanel.map.getProjectionObject()
				);
			}else{
				polygon = OpenLayers.Geometry.Polygon.createRegularPolygon(
					radiusPoint,
					radius,
					100, 
					0
				);
			}
			
			var bounds = polygon.getBounds();							
			polygon.bounds = bounds;
			
			var radiusFilter = new OpenLayers.Filter.Spatial({
				type: OpenLayers.Filter.Spatial.INTERSECTS,
				property: "geom",
				value: polygon
			});
							
			myFilter = radiusFilter;			
		}else if(this.filter.filterPolygon && this.filter.filterPolygon.value){
			myFilter = this.filter.filterPolygon;
		}else if(this.filter.filterCircle && this.filter.filterCircle.value){
			myFilter = this.filter.filterCircle;
		}else if(this.filter.searchWFSComboAlluvioni.filter && this.filter.searchWFSComboAlluvioni.filter.value){
			myFilter = this.filter.searchWFSComboAlluvioni.filter;
		}else if(this.filter.searchWFSComboRoccia.filter && this.filter.searchWFSComboRoccia.filter.value){
			myFilter = this.filter.searchWFSComboRoccia.filter;
		}else{
			myFilter = false;
		}
		
		if(myFilter){
			var node = new OpenLayers.Format.Filter({
				version: "1.1.0",
				srsName: "EPSG:3003"
			}).write(myFilter);
			
			this.xml = new OpenLayers.Format.XML().write(node);
		}else{
			this.xml = false;
		}	
		
        var data = this.form.output.getForm().getValues();
        var data2 = this.form.output.getForm().getFieldValues();

        var tabPanel = Ext.getCmp('id_mapTab');

        /*var viewparams1 = "flag:" + data.matrixmethodtype + ";" +
            "tygeomat:" + data2.tipo_matrice + ";" +
            "sigla:" + data.elemento;

        Ext.Ajax.request({
            scope: this,
            url: this.url,
            method: 'POST',
            params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "geosolutions:geobasi_boxplot",
                outputFormat: "json",
                propertyName: "sigla,min,max,avg,med,mad,num_elem,tygeomat,tipometa,origine",
                viewparams: viewparams1
            },
            success: function (result, request) {
                try {*/
					this.appMask = new Ext.LoadMask(Ext.getBody(), {msg: this.mainLoadingMask});
					this.appMask.show();				
                    //this.jsonData1 = Ext.util.JSON.decode(result.responseText);

                    var data = this.form.output.getForm().getValues();
                    var data2 = this.form.output.getForm().getFieldValues();

                    var viewparams2 = "monitoraggio:" + data.monitoraggiotype + ";" +
                        "tygeomat:" + data2.tipo_matrice + ";" +
                        "sigla_el:" + data.elemento;

                    Ext.Ajax.request({
                        scope: this,
                        url: this.url,
                        method: 'POST',
                        params: this.xml ? {
                            service: "WFS",
                            version: "1.1.0",
							geometryName: "geom",
                            request: "GetFeature",
							filter: this.xml,
                            typeName: "geosolutions:geobasi_chart",
                            outputFormat: "json",
                            propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,dmgeomattipo_descr,tygeomat,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa,geom",
                            sortBy: "valore",
                            viewparams: viewparams2
                        } : {
                            service: "WFS",
                            version: "1.1.0",
							geometryName: "geom",
                            request: "GetFeature",
                            typeName: "geosolutions:geobasi_chart",
                            outputFormat: "json",
                            propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,dmgeomattipo_descr,tygeomat,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa,geom",
                            sortBy: "valore",
                            viewparams: viewparams2
                        },
                        success: function (result, request) {
                            try {
                                var jsonData2 = Ext.util.JSON.decode(result.responseText);
                            } catch (e) {
								this.appMask.hide();
                                Ext.Msg.alert("Error", "Error parsing data from the server");
                                return;
                            }
                            if (jsonData2.features.length <= 0) {
								this.appMask.hide();
                                Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                                return;
                            }

                            //var aggregatedDataOnly = (granType == "pakistan");
                            //var data = this.getData(jsonData, aggregatedDataOnly);
                            var data = this.form.output.getForm().getValues();
                            //var data1 = this.jsonData1;
                            var metodoElaborazione = data.elabmethodtype;

                            //var dataCharts = this.getData(jsonData2, metodoElaborazione, data1);
							var dataCharts = this.getData(jsonData2, metodoElaborazione);

                            //var charts  = this.makeChart(data, this.chartOpt, listVar, aggregatedDataOnly);

                            var mainChart = Ext4.getCmp('geobasi_boxplot');

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
												var newIndex = 0;
												for(var i = 0;i<event.currentTarget.points.length; i++){
													if(event.currentTarget.points[i].x == point.x){
														
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

                                hcConfig.id = 'geobasi_boxplot';
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
										collapsible: true,
										collapsed: false,										
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
							
							this.appMask.hide();

                        },					
                        failure: function (result, request) {
							this.appMask.hide();
                            Ext.Msg.alert("Error", "Server response error");
                        }
                    });
                /*} catch (e) {
					this.appMask.hide();
                    Ext.Msg.alert("Error", "Error parsing data from the server");
                    return;
                }
                if (this.jsonData1.features.length <= 0) {
					this.appMask.hide();
                    Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                    return;
                }
            },
            failure: function (result, request) {
				this.appMask.hide();
                Ext.Msg.alert("Error", "Server response error");
            }
        });*/

    },
    getData: function (json, metodoElaborazione, json1) {

		// Closure
		(function(){

			/**
			 * Decimal adjustment of a number.
			 *
			 * @param	{String}	type	The type of adjustment.
			 * @param	{Number}	value	The number.
			 * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
			 * @returns	{Number}			The adjusted value.
			 */
			function decimalAdjust(type, value, exp) {
				// If the exp is undefined or zero...
				if (typeof exp === 'undefined' || +exp === 0) {
					return Math[type](value);
				}
				value = +value;
				exp = +exp;
				// If the value is not a number or the exp is not an integer...
				if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
					return NaN;
				}
				// Shift
				value = value.toString().split('e');
				value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
				// Shift back
				value = value.toString().split('e');
				return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
			}

			// Decimal round
			if (!Math.round10) {
				Math.round10 = function(value, exp) {
					return decimalAdjust('round', value, exp);
				};
			}
			// Decimal floor
			if (!Math.floor10) {
				Math.floor10 = function(value, exp) {
					return decimalAdjust('floor', value, exp);
				};
			}
			// Decimal ceil
			if (!Math.ceil10) {
				Math.ceil10 = function(value, exp) {
					return decimalAdjust('ceil', value, exp);
				};
			}

		})();
		
        //features number returned by json (query)
        var arrLength = json.features.length;

        //array with values for boxPlot charts
		var dataPoints = [];
        //mediana totale
        var medianaBoxPlot;

        // Calcolo mediana per l'intero set di valori (per tutti i metodi analitici)
        switch (metodoElaborazione) {
        case "1":
            medianaBoxPlot = (arrLength % 2 == 0) ? (Math.log(json.features[((arrLength) / 2)-1].properties.valore) + Math.log(json.features[((arrLength + 2) / 2)-1].properties.valore)) / 2 : Math.log(json.features[((arrLength + 1) / 2)-1].properties.valore);
            break;
        case "2":
            medianaBoxPlot = (arrLength % 2 == 0) ? (json.features[((arrLength) / 2)-1].properties.valore + json.features[((arrLength + 2) / 2)-1].properties.valore) / 2 : json.features[((arrLength + 1) / 2)-1].properties.valore;
            break;
        }

		function uniqueBy(arr, fn) {
		  var unique = {};
		  var distinct = [];
		  arr.forEach(function (x) {
			var key = fn(x);
			if (!unique[key]) {
			  distinct.push(key);
			  unique[key] = true;
			}
		  });
		  return distinct;
		}

		// usage
		var uniqueTipometa = uniqueBy(json.features, function(x){return x.properties.tipometa;});
		
        for (var i = 0; i < uniqueTipometa.length; i++) {
            var minimo;
            var massimo;
            var myValues = [];
            var metodoAnalitico = uniqueTipometa[i] === null ? '-999' : uniqueTipometa[i];
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
            var secondPercentile = (conteggio % 2 == 0) ? (myValues[((conteggio) / 2)-1].valore + myValues[((conteggio + 2) / 2)-1].valore) / 2 : myValues[((conteggio + 1) / 2)-1]['valore'];
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
                            Math.round10(myValues[c].valore,-5)
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
                experiment: metodoAnalitico === '-999' ? 'MA non specificato' : metodoAnalitico,
                min: Math.round10(newMin,-5),
                q1: Math.round10(firstPercentile,-5),
                med: Math.round10(secondPercentile,-5),
                q2: Math.round10(thirdPercentile,-5),
                max: Math.round10(newMax,-5),
                outlier: outlier,
                median: Math.round10(medianaBoxPlot,-5),
                sigla: json.features[0].properties.sigla_el,
                totaleRiprova: arrLength,
                matrice: json.features[0].properties.tygeomat,
                log: metodoElaborazione,
				bbox: outlierBbox
            };

        }

        return dataPoints;

    },
	
	makeChart: function(data, opt, listVar, aggregatedDataOnly){

	}
});

Ext.reg(gxp.widgets.button.GeobasiDataBoxPlotButton.prototype.xtype, gxp.widgets.button.GeobasiDataBoxPlotButton);