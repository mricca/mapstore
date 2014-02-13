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
 *  .. class:: GeobasiDataCurvaCumButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataCurvaCumButton = Ext.extend(Ext.Button, {

    /** api: xtype = gxp_geobasiDataChartButton */
    xtype: 'gxp_geobasiDataCurvaCumButton',
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
                typeName: "geosolutions:geobasi_curvacum",
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

                            var mainChart = Ext4.getCmp('geobasi_curvacum');

                            var gridStore = Ext4.data.StoreManager.lookup("BarChartStore");

                            if (!mainChart) {
								var hcConfig = {
									series : [{
										type : 'scatter',
										lineWidth : 1,
										//xField: 'uuidelemento',
										turboThreshold: 10000, // to accept point object configuration		
										yField: 'uuidelemento',												
										visible: true
									}],	
									height : 500,
									width : 700,							
									initAnimAfterLoad: true,           
									chartConfig : {
										chart : {
											marginRight : 130,
											marginBottom : 160,
											zoomType : 'xy'
										},
										title : {
											text : 'Curva Cumulata',
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
													return this.value;
												}

											}
										}],
										yAxis : {
											title : {
												text : 'Elemento: '
											},
                                            plotLines: [{
                                                value: 0.95,
                                                color: '#FF0000',
                                                width: 1,
                                                zIndex: 4,
                                                label: {
                                                    text: '',
                                                    align: 'center',
                                                    style: {
                                                        color: 'red'
                                                    }
                                                }
                                            }]
										},
										tooltip : {
											formatter : function () {
												if(this.point.data){
													return 'X : '+ this.point.data.classe +' - Y : ' + this.y;
												}else{
													return 'X : '+ (this.point.x+1) +' - Y : ' + this.y;
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
										},/*
										plotOptions: {
											series: {
												pointPadding: 0,
												groupPadding: 0,
												borderWidth: 0,
												turboThreshold: 30000,
												shadow: false
											},
											column: {
												colorByPoint: true
											}
										},*/
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

                                hcConfig.id = 'geobasi_curvacum';
                                mainChart = Ext4.widget('highchart', hcConfig);

                                if (!myTabPanel) {
                                    var myTabPanel = new Ext4.window.Window({
                                        title: 'Curva Cumulata',
                                        id: 'curvacum_tab',
                                        itemId: 'curvacum_tab',
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

							//var dataCharts2 = Ext.util.JSON.encode(dataCharts);
							
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

								mainChart.chartConfig.yAxis.plotLines[0].value = 0.95; //records.get('median');
								mainChart.chartConfig.yAxis.plotLines[0].label.text = '95° percentile';
								//mainChart.chartConfig.series[1].visible = false;
								mainChart.chartConfig.subtitle.text = 'Totale valori: ' + records.get('totaleRiprova');
								var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
								mainChart.chartConfig.yAxis.title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura;              
								var logText = records.get('log') === "1" ? "( scala logaritmica )" : "( valori reali )";
								mainChart.chartConfig.xAxis[0].title.text = logText;
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

		var cumulata = [];
		var custLog = function(x,base) {
			// Created 1997 by Brian Risk.  http://brianrisk.com
			return (Math.log(x))/(Math.log(base));
		}
		
		
		for(var c=0;c<num_ele;c++){
			cumulata[c] = {
				cumX: [Math.round10(json.features[c].properties.valore,-4),Math.round10(((c+1)-0.5) / num_ele,-4)]
				//cumY: (((c+1)-0.5) / num_ele)
			}
		}

		var dataPoints = [];
		
		var newNumEle = num_ele <= 1000 ? num_ele : 1000
        for (var i=0;i<newNumEle;i++) {
            dataPoints[i] = {
                uuidelemento: cumulata[i].cumX,
                totaleRiprova: num_ele,
                sigla: json.features[i].properties.sigla_el,
                matrice: json.features[i].properties.tygeomat,
                log: metodoElaborazione,
				bbox: json.bbox,
				spatialFilter: this.xml ? this.xml : null,
				jsonData: json
            };			
        }
		
		return dataPoints;
    },
	
	makeChart: function(data, opt, listVar, aggregatedDataOnly){

	}
});

Ext.reg(gxp.widgets.button.GeobasiDataCurvaCumButton.prototype.xtype, gxp.widgets.button.GeobasiDataCurvaCumButton);