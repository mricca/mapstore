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
 *  .. class:: GeobasiDataBarChartButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataBarChartButton = Ext.extend(Ext.Button, {

    /** api: xtype = gxp_geobasiDataChartButton */
    xtype: 'gxp_geobasiDataBarChartButton',
    form: null,
    url: null,
	filter:null,
	mainLoadingMask: "Attendere prego, creazione grafico in corso...",
	colors: [
		'#00FFFF',
		'#0000FF',
		'#8A2BE2',
		'#A52A2A',
		'#DEB887',
		'#5F9EA0',
		'#7FFF00',
		'#D2691E',
		'#FF7F50',
		'#6495ED',
		'#DC143C',
		'#006400',
		'#FF00FF',
		'#FFD700',
		'#FF4500'
	],	
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
		
        var viewparams1 = "flag:" + data.matrixmethodtype + ";" +
            "tygeomat:" + data2.tipo_matrice + ";" +
            "sigla:" + data.elemento + ";" +
			"tipometa:" + data.Metodo_analitico;

        /*Ext.Ajax.request({
            scope: this,
            url: this.url,
            method: 'POST',
            params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "geosolutions:geobasi_barchart",
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

					var tipometaStatQuery;

					if(data2.Metodo_analitico == '-999'){
						tipometaStatQuery = "IS NULL";
					}else{
						tipometaStatQuery = "= " + "\\'" + data2.Metodo_analitico + "\\'";
					}		
		
                    var viewparams2 = data2.Metodo_analitico == '-999' ? "monitoraggio:" + data.monitoraggiotype + ";" +
                        "tygeomat:" + data2.tipo_matrice + ";" +
                        "sigla_el:" + data.elemento + ";" +
						"tipometa:" + tipometaStatQuery : "monitoraggio:" + data.monitoraggiotype + ";" +
                        "tygeomat:" + data2.tipo_matrice + ";" +
                        "sigla_el:" + data.elemento + ";" +
						"tipometa:" + tipometaStatQuery;

                    Ext.Ajax.request({
                        scope: this,
                        url: this.url,
                        method: 'POST',
                        params: this.xml ? {
                            service: "WFS",
                            version: "1.1.0",
							geometryName: "geom",
							filter: this.xml,
                            request: "GetFeature",
                            typeName: "geosolutions:geobasi_chart2",
                            outputFormat: "json",
                            propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,tygeomat,dmgeomattipo_descr,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa,geom",
                            sortBy: "valore",
                            viewparams: viewparams2
                        } : {
                            service: "WFS",
                            version: "1.1.0",
							geometryName: "geom",
                            request: "GetFeature",
                            typeName: "geosolutions:geobasi_chart2",
                            outputFormat: "json",
                            propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,tygeomat,dmgeomattipo_descr,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa,geom",
                            sortBy: "valore",
                            viewparams: viewparams2
                        },
                        success: function (result, request) {
                            try {
                                this.jsonData2 = Ext.util.JSON.decode(result.responseText);
                            } catch (e) {
								this.appMask.hide();
                                Ext.Msg.alert("Error", "Error parsing data from the server");
                                return;
                            }
                            if (this.jsonData2.features.length <= 0) {
								this.appMask.hide();
                                Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                                return;
                            }

                            //var aggregatedDataOnly = (granType == "pakistan");
                            //var data = this.getData(jsonData, aggregatedDataOnly);
							
							var data = this.form.output.getForm().getValues();
							var data2 = this.form.output.getForm().getFieldValues();
					
							var tipometaStatQuery;

							if(data.Metodo_analitico == '-999'){
								tipometaStatQuery = "IS NULL";
							}else{
								tipometaStatQuery = "= " + "\\'" + data.Metodo_analitico + "\\'";
							}	
					
							this.viewparams3 = data.Metodo_analitico == '-999' ? "monitoraggio:" + data.monitoraggiotype + ";" +
								"tygeomat:" + data2.tipo_matrice + ";" +
								"sigla_el:" + data.elemento + ";" +
								"tipometa:" + tipometaStatQuery : "monitoraggio:" + data.monitoraggiotype + ";" +
								"tygeomat:" + data2.tipo_matrice + ";" +
								"sigla_el:" + data.elemento + ";" +
								"tipometa:" + tipometaStatQuery;
						
                            //var data1 = this.jsonData1;
                            var metodoElaborazione = data.elabmethodtype;
							
                            //var dataCharts = this.getData(this.jsonData2, metodoElaborazione, data1);
							var dataCharts = this.getData(this.jsonData2, metodoElaborazione);

                            //var charts  = this.makeChart(data, this.chartOpt, listVar, aggregatedDataOnly);

                            var mainChart = Ext4.getCmp('geobasi_barchart');

                            var gridStore = Ext4.data.StoreManager.lookup("BarChartStore");

                            if (!mainChart) {
								var hcConfig = {
									series : [{
										type : 'column',
										dataIndex : 'valore',
										name : 'BarChart',
										colors: this.colors,
										listeners: {
											pointclick: function(serie,point,record,event) {
												
												var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
												renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
			
												var geoJSON = new OpenLayers.Format.GeoJSON();

												var vector_layer = new OpenLayers.Layer.Vector('Classe: '+ record.data.classe + " - Elemento: " +  record.data.sigla +" - Numerosità: " + record.data.valore + " - Ampiezza: "+record.data.uuidelemento, {
													//styleMap: styleCluster,
													styleMap: new OpenLayers.StyleMap({
														pointRadius: "10", // based on feature.attributes.type
														fillColor: "${colore}"
													}),
													renderers: renderer,													
													displayInLayerSwitcher: true
													//rendererOptions: {yOrdering: true}
												},{
													restrictedExtent: new OpenLayers.Bounds([record.raw.bbox[0],record.raw.bbox[1],record.raw.bbox[2],record.raw.bbox[3]])
												});

												for (var i = 0;i<record.raw.jsonData.features.length;i++){
													if(record.data.classe === record.raw.jsonData.features[i].attributes.classe){
														var geoJSONgeometry = geoJSON.read(record.raw.jsonData.features[i].geometry);
														geoJSONgeometry[0].attributes = record.raw.jsonData.features[i].attributes;
														vector_layer.addFeatures(geoJSONgeometry);
													}
												}												
												
												var app = window.app;
												var map = app.mapPanel.map;
												var mybounds = vector_layer.getDataExtent();
														var points = new OpenLayers.Layer.PointGrid({dx: 3200.77, dy: 3200.77, rotation: 0, gridBounds: bounds});
														
														
												map.addLayers([vector_layer,points]);
												
												map.zoomToExtent(
													new OpenLayers.Bounds(
														record.raw.bbox[0],
														record.raw.bbox[1],
														record.raw.bbox[2],
														record.raw.bbox[3]
													)
												);

											}
										}
									}, {
										type: 'spline',
										dataIndex: ['valore'],
										name : 'Spline',
										color: '#000000'
									}],
									height : 500,
									width : 700,
									xField : ['uuidelemento'],
									loadMask: true,
									initAnimAfterLoad: false,           
									chartConfig : {            
										chart : {
											marginRight : 130,
											marginBottom : 160,
											zoomType : 'xy'
										},
										title : {
											text : 'Bar Chart',
											x : -20 //center
										},
										subtitle : {
											text : '',
											x : -20
										},
										xAxis : [{
											title : {
												text : '',
												margin : 20
											},
											labels : {
												rotation: -45,
												align: 'right',
												style: {
													fontSize: '10px',
													fontFamily: 'Verdana, sans-serif'
												},
												y : 15,
												formatter : function () {
													/*var dt = Ext.Date.parse (parseInt (this.value) / 1000, "U");
													if (dt) {
														return Ext.Date.format (dt, "H:i:s");
													}*/
													return this.value;
												}

											}
										}],
										yAxis : {
											title : {
												text : 'Elemento: '
											},
											plotLines : [{
												value : 0,
												width : 1,
												color : '#808080'
											}]
										},
										tooltip : {
											formatter : function () {
												if(this.point.data){
													return 'Classe : '+ this.point.data.classe +' - Numerosità Classe : ' + this.y;
												}else{
													return 'Classe : '+ (this.point.x+1) +' - Numerosità Classe : ' + this.y;
												}
											}

										},
										legend : {
											layout : 'vertical',
											align : 'right',
											verticalAlign : 'top',
											x : -10,
											y : 100,
											borderWidth : 0
										},
										plotOptions: {
											series: {
												pointPadding: 0,
												groupPadding: 0,
												borderWidth: 0, 
												shadow: false
											},
											column: {
												colorByPoint: true
											}
										},
										credits: {
											text: 'Consorzio LaMMA',
											href: 'http://www.lamma.rete.toscana.it',
											style: {
												cursor: 'pointer',
												color: '#707070',
												fontSize: '12px'
											}
										},
										exporting: {
											buttons: {
												customButton: {
													x: -62,
													onclick: function () {
														var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
														renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

														var geoJSON = new OpenLayers.Format.GeoJSON();

														var vector_layer = new OpenLayers.Layer.Vector('BarChart_Layer', {
															//styleMap: styleCluster,
															styleMap: new OpenLayers.StyleMap({
																pointRadius: "10", // based on feature.attributes.type
																fillColor: "${colore}"
															}),
															renderers: renderer,													
															displayInLayerSwitcher: true
															//rendererOptions: {yOrdering: true}
														},{
															restrictedExtent: new OpenLayers.Bounds([this.series[0].data[0].data.bbox[0],this.series[0].data[0].data.bbox[1],this.series[0].data[0].data.bbox[2],this.series[0].data[0].data.bbox[3]])
														});
														
														for (var i = 0;i<this.series[0].data[0].data.jsonData.features.length;i++){
																var geoJSONgeometry = geoJSON.read(this.series[0].data[0].data.jsonData.features[i].geometry);
																geoJSONgeometry[0].attributes = this.series[0].data[0].data.jsonData.features[i].attributes;
																vector_layer.addFeatures(geoJSONgeometry);
														}												
														
														var app = window.app;
														var map = app.mapPanel.map;
																										var mybounds = vector_layer.getDataExtent();
														var points = new OpenLayers.Layer.PointGrid({dx: 3200.77, dy: 3200.77, rotation: 0, gridBounds: bounds});
														map.addLayers([vector_layer,points]);
														
														map.zoomToExtent(
															new OpenLayers.Bounds(
																this.series[0].data[0].data.bbox[0],
																this.series[0].data[0].data.bbox[1],
																this.series[0].data[0].data.bbox[2],
																this.series[0].data[0].data.bbox[3]
															)
														);
													},
													symbol: 'circle'
												}
											}
										}										
									}
								};

                                hcConfig.id = 'geobasi_barchart';
                                mainChart = Ext4.widget('highchart', hcConfig);

                                if (!myTabPanel) {
                                    var myTabPanel = new Ext4.window.Window({
                                        title: 'Bar Chart',
                                        id: 'barchart_tab',
                                        itemId: 'barchart_tab',
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
                            //Ext.getCmp('id_mapTab').setActiveTab('barchart_tab');
							
							gridStore.each(function (records) {
								var grafico = mainChart;
								mainChart.chartConfig.subtitle.text = 'Totale valori: ' + records.get('totaleRiprova') + " - Numero Classi: " + records.get('num_classi')+ " - Ampiezza Classi: " + records.get('ampiezza_classi');
								mainChart.chartConfig.title.text = 'Metodo Analitico: ' + records.get('tipoMeta');
								var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
								//mainChart.chartConfig.yAxis.title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura;
								mainChart.chartConfig.yAxis.title.text = 'Frequenza';
								var logText = records.get('log') === "1" ? "( scala logaritmica )" : "( valori reali )";
								mainChart.chartConfig.xAxis[0].title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura + ' - ' + logText;
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
		
        var num_ele = json.features.length;

		/*function uniqueBy(arr, fn) {
		  var unique = {};
		  var distinct = [];
		  arr.forEach(function (x) {
			var key = fn(x);
			if (!unique[key]) {
			  distinct.push(x);
			  unique[key] = true;
			}
		  });
		  return distinct;
		}

		// usage
		var uniqueGeometry = uniqueBy(json.features, function(x){return x.geometry.coordinates;});
		
		var uniqueGeomLength = uniqueGeometry.length;
		//esempio creazione poligono regolare

												
		//prova calcolo distanza punti
		var geographic  = new OpenLayers.Projection("EPSG:4326"); 
		var boaga = new OpenLayers.Projection("EPSG:3003");

		function distanceBetweenPoints(latlng1, latlng2){
			var point1 = new OpenLayers.Geometry.Point(latlng1[0], latlng1[1]); //.transform(geographic, boaga);
			var point2 = new OpenLayers.Geometry.Point(latlng2[0], latlng2[1]); //.transform(geographic, boaga);
			//return Math.round10(point1.distanceTo(point2),-10);
			return point1.distanceTo(point2);
		}

		var count = 0;

		//var twoDimensionalArray =[];
		
		//var data = new Array(uniqueGeomLength);
		var data = new Array();
	
		for (var i=0;i<uniqueGeomLength;i++){
			var newarray = uniqueGeomLength-count;
			data[i] = new Array(newarray-1);
			
			for (var j=0;j<newarray-1;j++){
			
				data[i][j] = distanceBetweenPoints(uniqueGeometry[count].geometry.coordinates,uniqueGeometry[(j+count)+1].geometry.coordinates);
				
			}
			//data.splice(0,num_ele);
			//data.length = 0;
			count++;

			//twoDimensionalArray.push(data);
		}
		
		var dataLength = data.length;
		var medianArray = new Array();
		
		for (var i = 0; i<dataLength;i++){
			medianArray = medianArray.concat(data[i]);
		
		}
		
		function compareNumbers(a, b)
		{
			return a - b;
		}
		
		medianArray.sort(compareNumbers);
		var medianaArrayLength = medianArray.length;
		var mediana = (medianaArrayLength % 2 == 0) ? (medianArray[((medianaArrayLength) / 2)-1] + medianArray[((medianaArrayLength + 2) / 2)-1]) / 2 : medianArray[((medianaArrayLength + 1) / 2)-1];*/
		
		var custLog = function(x,base) {
			// Created 1997 by Brian Risk.  http://brianrisk.com
			return (Math.log(x))/(Math.log(base));
		}        
        // Calcolo del numero appropriato delle classi secondo la FORMULA DI STURGES
        // http://www.gobnf.com/formule/default.aspx?code=0030031LKBP1
        // http://www.aracneeditrice.it/pdf/991.pdf
        var numClassi = 1 + (10 / 3) * (custLog(num_ele,10));

        
        // Prendo il valore reale o calcolo il logaritmo naturale dei valori a seconda della scelta effettuata dall'utente
        var resultsLog = [];        
        for (var x = 0; x < num_ele; x++) {
            resultsLog[x] = {
                //valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.valore),-4) : Math.round10(json.features[x].properties.valore,-4)
				valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.valore),-4) : Math.round10(json.features[x].properties.valore,-4)
            };
			this.jsonData2.features[x].attributes = {
				valore: resultsLog[x].valore,
				classe:0,
				colore: ''
			};			
        }        
        
		var conteggio = resultsLog.length;
		 
        // Estraggo il valore minimo e il valore massimo
        // dall'array dei valori per il calcolo dell'ampiezza delle classi
        // per la realizzazione del grafico a barre        
        var barMinimo =  resultsLog[0].valore;
        var barMassimo =  resultsLog[conteggio - 1].valore;
        
        //echo gettype($barMassimo['valore'])." - ".gettype($barMinimo['valore']) . " - ";
        
        // Calcolo l'ampiezza delle classi
        var ampClassiInit = (barMassimo - barMinimo) / Math.round(numClassi);
        var ampClassi = Math.round10(ampClassiInit,-4);
        
        //echo $ampClassi;
        //exit(0);
        
        // Creo array per inserire il conteggio degli alementi appartenenti ad ogni classe
        var numerositaClassi = new Array();
        for(var i=0;i<Math.round(numClassi);i++){
            numerositaClassi[i] = {
                classe: i,
                conteggio: 0,
                ampiezza: ampClassi,
                num_ele: num_ele,
                ampiezzaMin: metodoElaborazione == "1" ? Math.round10(Math.exp(barMinimo)+(Math.exp(ampClassi) * (i)),-4) : Math.round10(barMinimo+(ampClassi * (i)),-4),
                ampiezzaMax: metodoElaborazione == "1" ? Math.round10(Math.exp(barMinimo)+(Math.exp(ampClassi) * (i+1)),-4) : Math.round10(barMinimo+(ampClassi * (i+1)),-4)
            };
        }
        
        // Conteggio gli elementi appartenenti alla prima e all'ultima classe
        for(var x=0;x<num_ele;x++)
        {             
            if(resultsLog[x].valore < barMinimo+ampClassi){
                numerositaClassi[0].conteggio++;
				this.jsonData2.features[x].attributes.classe = numerositaClassi[0].classe+1;
				this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[0].classe];
                resultsLog[x].valore = "undefined";

            }else if(resultsLog[x].valore >= (barMinimo+(ampClassi*(Math.round(numClassi))))){
                numerositaClassi[Math.round(numClassi)-1].conteggio++;
				this.jsonData2.features[x].attributes.classe = numerositaClassi[Math.round(numClassi)-1].classe+1;
				this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[Math.round(numClassi)-1].classe];
                resultsLog[x].valore = "undefined";
            }          
        }      

        // Conteggio gli elementi appartenenti alle classi intermedie
        for(var y=1;y<Math.round(numClassi);y++)
        {
            for(var x=0;x<num_ele;x++)
            {               
				var aaa = resultsLog[x].valore; 
				var bbb = barMinimo+(ampClassi*(y));
				var ccc = barMinimo+(ampClassi*(y+1));
                if (resultsLog[x].valore >= (barMinimo+(ampClassi*(y))) && resultsLog[x].valore < (barMinimo+(ampClassi*(y+1)))){
                    numerositaClassi[y].conteggio++;
					this.jsonData2.features[x].attributes.classe = numerositaClassi[y].classe+1;
					this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[y].classe];
                    resultsLog[x].valore = "undefined";
                }
                
            }      
            
        }       
        
        /*#######################################################################
        #                                                                      #
        #                               FINE                                   #
        #  CALCOLO DINAMICO DELLE CLASSI PER LA DISTRIBUZIONE DI FREQUENZA     #
        #                                                                      #
        ########################################################################*/
        
        var countElem = 0;
        var dataPoints = [];
        var resp;
		var classe;
		var classe_num;

		for (var i=0;i<numerositaClassi.length;i++){
			countElem = countElem + numerositaClassi[i].conteggio;
		}
                
        for (var i=0;i<numerositaClassi.length;i++) {
            classe_num = numerositaClassi[i].classe + 1;
			classe = numerositaClassi[i].ampiezzaMin + " | " + numerositaClassi[i].ampiezzaMax;
            dataPoints[i] = {
                uuidelemento: classe,
				classe: classe_num,
				color: this.colors[i],
                valore: numerositaClassi[i].conteggio,
                //totaleDaDB: $num_ele_stat,
                totaleOriginale: numerositaClassi[i].num_ele,
                totaleRiprova: countElem,
				tipoMeta: !json.features[i].properties.tipometa ? 'non specificato' : json.features[i].properties.tipometa,
                num_classi: numerositaClassi.length,
                ampiezza_classi: metodoElaborazione == "1" ? Math.round10(Math.exp(ampClassi),-4) : ampClassi,
                sigla: json.features[i].properties.sigla_el,
                matrice: json.features[i].properties.tygeomat,
                log: metodoElaborazione,
				viewparams: this.viewparams3,
				bbox: json.bbox,
				spatialFilter: this.xml ? this.xml : null,
				jsonData: this.jsonData2
            };
        }
		
		return dataPoints;
    },
	
	makeChart: function(data, opt, listVar, aggregatedDataOnly){
	
	}
});

Ext.reg(gxp.widgets.button.GeobasiDataBarChartButton.prototype.xtype, gxp.widgets.button.GeobasiDataBarChartButton);