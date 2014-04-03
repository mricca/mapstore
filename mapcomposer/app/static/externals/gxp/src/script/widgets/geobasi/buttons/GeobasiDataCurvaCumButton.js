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
 
/**
 * @author Riccardo Mari
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
	
	layer: "geobasi:geobasi_boxplot_view",
	
	addedLayer: null,
	
	chartID: null,
	
	pagePosition: null,	
	
	mainLoadingMask: "Attendere prego, creazione grafico in corso...",
	
    handler: function () {

	
		var me = this;
		
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
		}else if(this.filter.searchWFSComboAlluvioni && this.filter.searchWFSComboAlluvioni.geometry){
		
			var geoJSON = new OpenLayers.Format.WKT();
			var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboAlluvioni.geometry);		
			myFilter = new OpenLayers.Filter.Spatial({
				type: OpenLayers.Filter.Spatial.INTERSECTS,
				property: "geom",
				value: geoJSONgeometry.geometry
			});
			
		}else if(this.filter.searchWFSComboRoccia && this.filter.searchWFSComboRoccia.geometry){
		
			var geoJSON = new OpenLayers.Format.WKT();
			var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboRoccia.geometry);		
			myFilter = new OpenLayers.Filter.Spatial({
				type: OpenLayers.Filter.Spatial.INTERSECTS,
				property: "geom",
				value: geoJSONgeometry.geometry
			});
			
		}else if(this.filter.searchWFSComboComuniRT && this.filter.searchWFSComboComuniRT.geometry){
		
			var geoJSON = new OpenLayers.Format.WKT();
			var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboComuniRT.geometry);		
			myFilter = new OpenLayers.Filter.Spatial({
				type: OpenLayers.Filter.Spatial.INTERSECTS,
				property: "geom",
				value: geoJSONgeometry.geometry
			});
			
		}else{
			myFilter = false;
		}

		var data = this.form.output.getForm().getValues();
		var data2 = this.form.output.getForm().getFieldValues();

		var viewparams2 = "monitoraggio:" + data.monitoraggiotype + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data.elemento;
			
		this.appMask = new Ext.LoadMask(Ext.getBody(), {msg: this.mainLoadingMask});
		this.appMask.show();

		this.buildFilter(myFilter,data.startYear,data.endYear,data2.allownull,data2.baciniintersect, function(dateFilter){			

			me.makeChart(dateFilter,data,data2,viewparams2);

		});

    },
	
	/**  
	 * api: method[getData]
     */		
    getData: function (json, metodoElaborazione, json1) {
		
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

	/**  
	 * api: method[makeChart]
     */		
	makeChart: function(dateFilter,data,data2,viewparams2){
		this.layer;
		this.addedLayer;

		var newViewParams = viewparams2.split(';');
		var cql_filter = "( " + newViewParams[0].split(':')[0] + " = '" + newViewParams[0].split(':')[1] + "' AND " + newViewParams[1].split(':')[0] + " = '" + newViewParams[1].split(':')[1] + "' AND " + newViewParams[2].split(':')[0] + " = '" + newViewParams[2].split(':')[1] + "' )";		
		
		if(this.addedLayer){
			var aaa = new OpenLayers.Filter.Logical({
				type: OpenLayers.Filter.Logical.AND,
				filters: []
			});
			
			for (var i = 0; i<newViewParams.length; i++){
				var	filtro = new OpenLayers.Filter.Comparison({
						type: newViewParams[i].split(':')[0] === "tygeomat" ? OpenLayers.Filter.Comparison.LIKE : OpenLayers.Filter.Comparison.EQUAL_TO,
						property:  newViewParams[i].split(':')[0],
						value: newViewParams[i].split(':')[0] === "tygeomat" ? newViewParams[i].split(':')[1] + "%" : newViewParams[i].split(':')[1]
				});				
				aaa.filters.push(filtro);
			}
			
			//dateFilter.filters.push(aaa);
			aaa.filters.push(dateFilter);
		}

		if(aaa){
			var node = new OpenLayers.Format.Filter({
				version: "1.1.0",
				srsName: "EPSG:3003",
				geometryName: "geom"
			}).write(aaa);
			
			this.xml = new OpenLayers.Format.XML().write(node);
		}else{
			var node = new OpenLayers.Format.Filter({
				version: "1.1.0",
				srsName: "EPSG:3003",
				geometryName: "geom"
			}).write(dateFilter);
			
			this.xml = new OpenLayers.Format.XML().write(node);
		}

		Ext.Ajax.request({
			scope: this,
			url: this.url,
			method: 'POST',
			params: this.addedLayer ? {
				service: "WFS",
				version: "1.1.0",
				geometryName: "geom",
				request: "GetFeature",
				filter: this.xml,
				typeName: this.layer,
				outputFormat: "json",
				propertyName: "fonte,codsito,data_aaaa,data_mm,data_gg,monitoraggio,dmgeomattipo_descr,tygeomat,toponimo,foglioigm50k,codcomune,sigla_el,valore,tipometa,geom",
				sortBy: "valore"
			} : {
				service: "WFS",
				version: "1.1.0",
				geometryName: "geom",
				request: "GetFeature",
				filter: this.xml,
				typeName: this.layer,
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

				var mainChart = Ext4.getCmp('geobasi_curvacum'+"_"+this.chartID);

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

					//if (!myTabPanel) {
						var myTabPanel = new Ext4.window.Window({
							title: 'Curva Cumulata',
							id: this.chartID,
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
						Ext4.getCmp(this.chartID).show();
						
						//tabPanel.add(myTabPanel);
					}
					Ext4.getCmp(this.chartID).add(mainChart);
					Ext4.getCmp(this.chartID).setPagePosition(this.pagePosition);										
					
				//}

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
	
	},

	/**  
	 * api: method[buildFilter]
     */	    
    buildFilter: function(filter,startDate,endDate,checked,baciniFilter,callback){

		if(baciniFilter){
		
			var layerBacini = new OpenLayers.Layer.Vector("WFS");

			var getFeatureFromWFS = function(response) {

				if(response.features.length > 0) {
					for (var i = 0; i<response.features.length; i++){
						layerBacini.addFeatures([response.features[i]]);
					}
				}
				var app = window.app;
				var map = app.mapPanel.map;
				
				map.addLayers([layerBacini]);
				
				var allowNullFilter =  new OpenLayers.Filter.Comparison({
					type: OpenLayers.Filter.Comparison.IS_NULL,
					property: "data_aaaa",
					value: null
				});
				
				var	baciniFeatures = new OpenLayers.Filter.Spatial({
						type: OpenLayers.Filter.Spatial.INTERSECTS,
						property: "geom",
						value: layerBacini.features[0].geometry
					});
				
				var dateFilter = new OpenLayers.Filter.Logical({
					type: OpenLayers.Filter.Logical.OR,
					filters: [
						new OpenLayers.Filter.Comparison({
							type: OpenLayers.Filter.Comparison.BETWEEN,
							property: "data_aaaa",
							lowerBoundary: startDate,
							upperBoundary: endDate
						})
					]
				});
				
				var newFilter = new OpenLayers.Filter.Logical({
					type: OpenLayers.Filter.Logical.AND,
					filters: [
						new OpenLayers.Filter.Comparison({
							type: OpenLayers.Filter.Comparison.BETWEEN,
							property: "data_aaaa",
							lowerBoundary: startDate,
							upperBoundary: endDate
						})
					]
				});
					
				if (checked)
					dateFilter.filters.push(allowNullFilter)			
					
				if (filter){
					baciniFilter ? newFilter.filters.push(baciniFeatures) : newFilter.filters.push(filter);		
					if (checked)
						newFilter.filters.push(dateFilter);
				}
				var totFilter = filter ? newFilter : dateFilter;				
				callback(totFilter);							
				
			}
				
			var protocol = new OpenLayers.Protocol.WFS({
				url: "http://159.213.57.108/geoserver_geobasi/wfs",
				version: "1.1.0",
				featureType: "bacini_idro",
				featureNS: "http://geobasi",
				//geometryName: "wkb_geometry",
				srsName: "EPSG:3003",
				extractAttribute: true
			});          
				
			var protRead = protocol.read({
				filter: filter,
				callback: getFeatureFromWFS
			});
			
		}else{
			var allowNullFilter =  new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.IS_NULL,
				property: "data_aaaa",
				value: null
			});
			
			var dateFilter = new OpenLayers.Filter.Logical({
				type: OpenLayers.Filter.Logical.OR,
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.BETWEEN,
						property: "data_aaaa",
						lowerBoundary: startDate,
						upperBoundary: endDate
					})
				]
			});
			
			var newFilter = new OpenLayers.Filter.Logical({
				type: OpenLayers.Filter.Logical.AND,
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.BETWEEN,
						property: "data_aaaa",
						lowerBoundary: startDate,
						upperBoundary: endDate
					})
				]
			});
				
			if (checked)
				dateFilter.filters.push(allowNullFilter)			
				
			if (filter){
				newFilter.filters.push(filter);		
				if (checked)
					newFilter.filters.push(dateFilter);
			}
			
			var totFilter =  filter ? newFilter : dateFilter;
			callback(totFilter);							
		}
    
    }
});

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
Ext.reg(gxp.widgets.button.GeobasiDataCurvaCumButton.prototype.xtype, gxp.widgets.button.GeobasiDataCurvaCumButton);