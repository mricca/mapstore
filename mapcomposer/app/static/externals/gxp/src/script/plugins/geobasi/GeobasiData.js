/**
 *  Copyright (C) 2007 - 2012 GeoSolutions S.A.S.
 *  http://www.geo-solutions.it
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
 * @requires plugins/Tool.js
 */
/**
 * @author Riccardo Mari
 */
/** api: (define)
 *  module = gxp.plugins
 *  class = GeobasiData
 */
/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.geobasi");

/** api: constructor
 *  .. class:: GeobasiData(config)
 *
 *    Plugin for adding MainGeobasi GeobasiData Module to a :class:`gxp.Viewer`.
 */
gxp.plugins.geobasi.GeobasiData = Ext.extend(gxp.plugins.Tool, {

		/** api: ptype = gxp_geobasidata */
		ptype : "gxp_geobasidata",
		selTipo : 'Seleziona',
		selMonitoraggio : 'Monitoraggio',
		selMatrixMethod : 'Metodo selezione Matrice',
		selElabMethod : 'Seleziona tipologia valori',
		dataUrl : null,
        wfsURL: "http://www506.regione.toscana.it/geoserver/wfs",

		mainLoadingMask : "Caricamento date in corso...",

		/** private: method[init]
		 *  :arg target: ``Object``
		 *
		 *  Provide the initialization code defining necessary listeners and controls.
		 */
		init : function (target) {
			target.on({
				scope : this,
				'ready' : function () {
					//
					// Show the Time Slider only when this tool is activated
					//
					this.output.on("show", function () {
						//this.setMinMaxValues();
					}, this);
				}
			});
			return gxp.plugins.geobasi.GeobasiData.superclass.init.apply(this, arguments);
		},
		/** private: method[addOutput]
		 *  :arg config: ``Object``
		 */
		addOutput : function (config) {
            
            var me = this;
			
            this._newMonitoringViewparams = ' IS NOT NULL';
			this._newMatrixViewparams = '01';
			this._newElementViewparams = 'Ca';
			
			Ext.Panel.prototype.buttonAlign = 'left';

			this.areaDamage = new gxp.form.SelDamageArea(Ext.apply({
						localeGeoserverUrl : this.localeGeoserverUrl, //"http://159.213.57.108/geoserver/ows?",
						remoteGeoserverUrl : this.remoteGeoserverUrl, //"http://www502.regione.toscana.it:80/wfsvector/com.rt.wfs.RTmap/wfs",
						map : app.mapPanel.map,
						mapPanel : app.mapPanel
					}, this.outputConfig));


            var matrixStore = new GeoExt.data.FeatureStore({ 
                 id: "matrixStore",
                 fields: [{
                    "name": "count",              
                    "mapping": "count"
                  },{
                    "name": "matrix_cod",              
                    "mapping": "matrix_cod"
                  },{
                    "name": "matrix",              
                    "mapping": "matrix"
                  }],
                 proxy: this.getWFSStoreProxy('distinct_matrix', null, 'matrix', 'monitoraggio:'+this._newMonitoringViewparams), 
                 autoLoad: true 
           });
           
            matrixStore.on('load', function(store, records, options) {
                this.output.matrixType.setValue(records[0].get('matrix_cod'));
            }, this);
			
            var elementsStore = new GeoExt.data.FeatureStore({ 
                 id: "elementsStore",
                 fields: [{
                    "name": "count",              
                    "mapping": "count"
                  },{
                    "name": "element",              
                    "mapping": "element"
                  }],
                 proxy: this.getWFSStoreProxy('distinct_elements', null, 'element', 'monitoraggio:'+this._newMonitoringViewparams+';tygeomat:'+this._newMatrixViewparams), 
                 autoLoad: true 
           });
           
            elementsStore.on('load', function(store, records, options) {
                //this.output.elemento.setValue(records[0].get('element'));
            }, this);			
			
            var methodStore = new GeoExt.data.FeatureStore({ 
                 id: "methodStore",
                 fields: [{
                    "name": "count",              
                    "mapping": "count"
                  },{
                    "name": "method",              
                    "mapping": "method"
                  }],
                 proxy: this.getWFSStoreProxy('distinct_method', null, 'method', 'monitoraggio:'+this._newMonitoringViewparams+';tygeomat:'+this._newMatrixViewparams+';sigla_el:'+this._newElementViewparams), 
                 autoLoad: true 
           });
           
            methodStore.on('load', function(store, records, options) {
                //this.output.elemento.setValue(records[0].get('element'));
            }, this);				
            
			var geobasiData = new Ext.form.FormPanel({
					xtype : 'form',
					baseCls : 'x-plain',
					id : "geobasiDataForm",
					title : 'Geobasi Data',
					layout : "form",
					autoScroll : true,
					frame : true,
					items : [{
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Selezione Matrice - Elemento - Metodo Analitico</span>',
							anchor : '100%',
							ref : 'comboView3',
							collapsible : false,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : false,
							iconCls : "gxp-icon-select-elem-geobasi",
							items : [{
									xtype : 'combo',
									ref : '../matrixType',
									id : 'matrixTypeId',
									anchor : '100%',
									fieldLabel : 'Tipo Matrice',
									typeAhead : true,
									triggerAction : 'all',
									lazyRender : false,
									//mode : 'remote',
									name : 'tipo_matrice',
									forceSelection : true,
									allowBlank : false,
									autoLoad : true,
									displayField : 'matrix',
									valueField : 'matrix_cod',
									readOnly : false,
                                    selectOnFocus:true,  
                                    lastQuery: '',
                                    store: matrixStore,
                                    resizable: true,
									//emptyText : "-- Seleziona Tipo Matrice --",
									//valueNotFoundText : "-- Seleziona Tipo Matrice --",                                    
                                    listeners: {
                                        expand: {
                                            fn: me.onComboboxMatrixExpand,
                                            scope: me
                                        },
                                        select: {
                                            fn: me.onComboboxMatrixSelect,
                                            scope: me                            
                                        }
                                    },
									tpl : new Ext.XTemplate(
										'<tpl for=\".\">',
										'<div class=\"x-combo-list-item\">{matrix} -> {count}</div>',
										'</tpl>')
								}, {
									xtype : 'combo',
									ref : '../elemento',
									anchor : '100%',
									fieldLabel : 'Elemento',
									typeAhead : true,
									triggerAction : 'all',
									lazyRender : true,
									//mode : 'local',
									autoLoad : true,
									forceSelected : true,
									allowBlank : false,
									name : 'elemento',
									displayField : 'element',
									valueField : 'element',
									lastQuery: '',
									//value: 'Ca',
									emptyText : "-- Seleziona Elemento --",
									valueNotFoundText : "-- Seleziona Elemento --",
									readOnly : false,
									listeners: {
										expand: {
											fn: me.onComboboxElemExpand,
											scope: me
										},
										select: {
											fn: me.onComboboxElemSelect,
											scope: me                            
										}
									},
									store: elementsStore,
									tpl : new Ext.XTemplate(
										'<tpl for=\".\">',
										'<div class=\"x-combo-list-item\">{element} -> {count}</div>',
										'</tpl>')
								}, {
									xtype : 'combo',
									ref : '../metodoAnalitico',
									anchor : '100%',
									fieldLabel : 'Metodo Analitico',
									typeAhead : true,
									triggerAction : 'all',
									lazyRender : true,
									//mode : 'local',
									autoLoad : true,
									resizable : true,
									forceSelected : true,
									allowBlank : false,
									name : 'Metodo_analitico',
									displayField : 'method',
									valueField : 'method',
									//value: 'ICP-AES',
									lastQuery: '',
									emptyText : "-- Seleziona Metodo Analitico --",
									valueNotFoundText : "-- Seleziona Metodo Analitico --",
									disabled : false,
									readOnly : false,
									listeners: {
										expand: {
											fn: me.onComboboxMetAnExpand,
											scope: me
										},
										select: {
											fn: me.onComboboxMetAnSelect,
											scope: me                            
										}
									},	
									store: methodStore,
									tpl : new Ext.XTemplate(
										'<tpl for=\".\">',
										'<div class=\"x-combo-list-item\">{method} -> {count}</div>',
										'</tpl>')
								}
							]
						},
						this.areaDamage, {
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Selezione presenza monitoraggio</span>',
							anchor : '100%',
							ref : 'comboView1',
							iconCls : 'gxp-icon-geobasi-monitoraggio',
							collapsible : true,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : true,
							items : [{
									xtype : 'combo',
									ref : '../monitoraggio',
									id : 'monitoraggioId',
									anchor : '100%',
									fieldLabel : this.selMonitoraggio,
									typeAhead : true,
									triggerAction : 'all',
									lazyRender : false,
									mode : 'local',
									name : 'tipomonitoraggio',
									forceSelected : true,
									allowBlank : false,
									autoLoad : true,
									displayField : 'label',
									valueField : 'coeff',
									value : "01",
									readOnly : false,
									store : new Ext.data.JsonStore({
										fields : [{
												name : 'name',
												dataIndex : 'name'
											}, {
												name : 'label',
												dataIndex : 'label'
											}, {
												name : 'coeff',
												dataIndex : 'coeff'
											}, {
												name : 'shortName',
												dataindex : 'shortName'
											}, {
												name : 'cid',
												dataindex : 'cid'
											}
										],
										data : [{
												label : 'Tutte le tipologie',
												coeff : "01"
											}, {
												label : 'Monitoraggio SI',
												coeff : "02"
											}, {
												label : 'Monitoraggio NO',
												coeff : "03"
											}
										]
									})
								}
							]
						}, {
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Selezione intervallo temporale</span>',
							anchor : '100%',
							ref : 'rangeyear',
							collapsible : true,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : false,
							iconCls : "gxp-icon-time-range",
							items : [{
									xtype : 'checkbox',
									anchor : '100%',
									fieldLabel : 'Includi valori nulli',
									ref : 'allownull',
									name : 'allownull',
									checked : true
								}, {
									ref : 'yearRangeSelector',
									xtype : 'yearrangeselector',
									anchor : '100%',
									listeners : {
										scope : this,
										change : function (start, end) {
											//this.output.rangeyear.referenceYear.setText(end);
										},
										afterrender : function (component) {
											this.setMinMaxValues();
											if (this.output.rangeyear.yearRangeSelector != component)
												return;
										}
									}
								}
							]
							/*,listeners:{
							scope:this,
							'expand': function(component) {
							this.setMinMaxValues();
							if(this.output.rangeyear.yearRangeSelector!=component)return;
							}
							}*/
						}, //,this.uploadPanelForm
						{
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Metodi trasformazione dati</span>',
							anchor : '100%',
							ref : 'comboView2',
							collapsible : true,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : true,
							iconCls : "gxp-icon-select-log-geobasi",
							items : [{
									fieldLabel : this.selElabMethod,
									xtype : 'radiogroup',
									anchor : '100%',
									autoHeight : true,
									checkboxToggle : true,
									name : 'elabMethodType',
									ref : 'elabMethodType',
									autoHeight : true,
									defaultType : 'radio', // each item will be a radio button
									items : [{
											boxLabel : 'Valori reali',
											name : 'elabmethodtype',
											inputValue : 2,
											checked : true
										}, {
											boxLabel : 'Scala logaritmica',
											name : 'elabmethodtype',
											inputValue : 1
										}
									]
								}
							]
						}, {
							xtype : "panel",
							layout : 'fit',
							autoScroll : true,
							title : "DOWNLOAD SELEZIONE",
							iconCls : 'gxp-icon-download-csv-geobasi',
							buttons : [{
									text : 'Scarica Selezione (CSV)',
									iconCls : 'gxp-icon-download-csv-geobasi',
									tooltip : 'Scarica Selezione (CSV)',
									url : this.dataUrl,
									chartID : "notAdded_download",
									pagePosition : [10000, 0],
									xtype : 'gxp_geobasiDataDownloadButton',
									ref : '../submitButtonDownload',
									target : this,
									form : this,
									disabled : false,
									filter : this.areaDamage,
									addedLayer : false
								}, {
									text : 'Visualizza Selezione',
									iconCls : "gxp-icon-map-filter-geobasi",
									tooltip : 'Visualizza Selezione',
									handler : function () {
										Ext.MessageBox.show({
											title : 'Informazione',
											msg : 'Funzionalità in fase di implementazione!',
											buttons : Ext.Msg.OK,
											animEl : 'elId',
											icon : Ext.MessageBox.INFO
										});

										Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
										return;
									}
								}
							]
						}, {
							xtype : "panel",
							layout : 'fit',
							autoScroll : true,
							title : "ANALISI STATISTICA GRAFICO NUMERICA",
							iconCls : "gxp-icon-analisi-statistica-geobasi",
							buttons : [{
									text : 'Box Plot',
									iconCls : "gxp-icon-geobasi-boxplot",
									tooltip : 'Visualizza Grafico',
									url : this.dataUrl,
									chartID : "notAdded_boxPlot",
									pagePosition : [10000, 0],
									xtype : 'gxp_geobasiDataBoxPlotButton',
									ref : '../submitButtonBoxPlot',
									target : this,
									form : this,
									disabled : false,
									filter : this.areaDamage,
									addedLayer : false
								}, {
									text : 'Istogramma',
									iconCls : "gxp-icon-geobasi-barchart",
									tooltip : 'Visualizza Grafico',
									url : this.dataUrl,
									chartID : "notAdded_barChart",
									pagePosition : [10000, 400],
									xtype : 'gxp_geobasiDataBarChartButton',
									ref : '../submitButtonColumnChart',
									target : this,
									form : this,
									disabled : false,
									filter : this.areaDamage,
									addedLayer : false
								}, {
									text : 'Curva Cumul.',
									iconCls : "gxp-icon-geobasi-curvacum",
									tooltip : 'Visualizza Grafico',
									url : this.dataUrl,
									chartID : "notAdded_curvaCum",
									pagePosition : [10000, 800],
									xtype : 'gxp_geobasiDataCurvaCumButton',
									ref : '../submitButtonCurvaCum',
									target : this,
									form : this,
									disabled : false,
									filter : this.areaDamage,
									addedLayer : false
									/*,
									handler: function() {
									Ext.MessageBox.show({
									title: 'Informazione',
									msg: 'Funzionalità in fase di implementazione!',
									buttons: Ext.Msg.OK,
									animEl: 'elId',
									icon: Ext.MessageBox.INFO
									});

									Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
									return;
									}
									 */
								}
							]
						}
					]
				});

			config = Ext.apply(geobasiData, config || {});

			this.output = gxp.plugins.geobasi.GeobasiData.superclass.addOutput.call(this, config);

		},

        onComboboxMatrixExpand: function (field, eOpts) {

			var matrixStore, monitoringValue, newMonitoringViewparams, newProtocol;
			
            matrixStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			
			switch (monitoringValue){
				case "01":
					newMonitoringViewparams = ' IS NOT NULL'
					break;
				case "02":
					newMonitoringViewparams = ' = true'
					break;
				case "03":
					newMonitoringViewparams = ' = false'
					break;
			}
			
			if(this._newMonitoringViewparams !== newMonitoringViewparams){
				newProtocol = this.getWFSStoreProxy('distinct_matrix', null, 'matrix', 'monitoraggio:' + newMonitoringViewparams);    
				matrixStore.proxy.protocol = newProtocol.protocol;
				matrixStore.reload();
				this._newMonitoringViewparams = newMonitoringViewparams;
			}

        },

		onComboboxMatrixSelect: function (field, eOpts) {
			/*var cmbelem = Ext.getCmp('cmbelem_id');
			var cmbmetan = Ext.getCmp('cmbmetan_id');
			cmbelem.enable();
			cmbelem.reset();
			cmbmetan.reset();
			
			var barChartButton = Ext.getCmp('barChartButton_id');
			var boxPlotButton = Ext.getCmp('boxPlotButton_id');
			
			barChartButton.disable();
			boxPlotButton.disable();*/			
		},

		onComboboxElemExpand: function (field, eOpts) {

			var elementsStore, monitoringValue, matrixValue, newMonitoringViewparams, newMatrixViewparams, newProtocol;
			
            elementsStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			matrixValue = this.output.matrixType.getValue();
			newMatrixViewparams = matrixValue;
			
			switch (monitoringValue){
				case "01":
					newMonitoringViewparams = ' IS NOT NULL'
					break;
				case "02":
					newMonitoringViewparams = ' = true'
					break;
				case "03":
					newMonitoringViewparams = ' = false'
					break;
			}
			
			if(this._newMonitoringViewparams !== newMonitoringViewparams || this._newMatrixViewparams !== newMatrixViewparams){
				newProtocol = this.getWFSStoreProxy('distinct_elements', null, 'element', 'monitoraggio:'+newMonitoringViewparams+';tygeomat:'+newMatrixViewparams);    
				elementsStore.proxy.protocol = newProtocol.protocol;
				elementsStore.reload();
				this._newMonitoringViewparams = newMonitoringViewparams;
				this._newMatrixViewparams = newMatrixViewparams;
			}
			
		},		

		onComboboxElemSelect: function (field, eOpts) {
			/*var cmbmetan = Ext.getCmp('cmbmetan_id');
			//cmbmetan.enable();
			cmbmetan.reset();
			
			var flagSelMatrix = this.items.items[0].getForm().getValues();        
			var barChartButton = Ext.getCmp('barChartButton_id');
			var boxPlotButton = Ext.getCmp('boxPlotButton_id');
			
			switch (flagSelMatrix.selmatrix) {
			case '1':
					boxPlotButton.enable();
					barChartButton.disable();
					cmbmetan.enable();
				break;
			case '2':
					boxPlotButton.enable();
					barChartButton.disable();
					cmbmetan.enable();
				break;
			case '3':
					boxPlotButton.disable();
					barChartButton.enable();
				break;
			}*/
		},
		
		onComboboxMetAnExpand: function (field, eOpts) {
			
			var methodStore, monitoringValue, matrixValue, elementValue, newMonitoringViewparams, newMatrixViewparams, newElementViewparams, newProtocol;
			
            methodStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			matrixValue = this.output.matrixType.getValue();
			elementValue = this.output.elemento.getValue();
			newMatrixViewparams = matrixValue;
			newElementViewparams = elementValue;
			
			switch (monitoringValue){
				case "01":
					newMonitoringViewparams = ' IS NOT NULL'
					break;
				case "02":
					newMonitoringViewparams = ' = true'
					break;
				case "03":
					newMonitoringViewparams = ' = false'
					break;
			}
			
			if(this._newMonitoringViewparams !== newMonitoringViewparams || this._newMatrixViewparams !== newMatrixViewparams || this._newElementViewparams !== newElementViewparams){
				newProtocol = this.getWFSStoreProxy('distinct_method', null, 'method', 'monitoraggio:'+newMonitoringViewparams+';tygeomat:'+newMatrixViewparams+';sigla_el:'+newElementViewparams);    
				methodStore.proxy.protocol = newProtocol.protocol;
				methodStore.reload();
				this._newMonitoringViewparams = newMonitoringViewparams;
				this._newMatrixViewparams = newMatrixViewparams;
				this._newElementViewparams = newElementViewparams;
			}
			
		},		

		onComboboxMetAnSelect: function (field, eOpts) {
			/*var flagSelMatrix = this.items.items[0].getForm().getValues();        
			var barChartButton = Ext.getCmp('barChartButton_id');
			var boxPlotButton = Ext.getCmp('boxPlotButton_id');
			
			switch (flagSelMatrix.selmatrix) {
			case '1':
					barChartButton.enable();
				break;
			case '2':
					barChartButton.enable();
				break;
			case '3':
					barChartButton.enable();
					boxPlotButton.disable();
				break;
			}*/
		},
	
		setMinMaxValues : function () {
			this.appMask = new Ext.LoadMask(this.output.rangeyear.el, {
					msg : this.mainLoadingMask
				});
			this.appMask.show();
			Ext.Ajax.request({
				scope : this,
				url : this.dataUrl,
				method : 'POST',
				params : {
					service : "WFS",
					version : "1.1.0",
					//geometryName: "geom",
					request : "GetFeature",
					typeName : "geobasi:geobasi_data_analisi",
					outputFormat : "json",
					propertyName : "max,min"
				},
				success : function (result, request) {
					try {
						var jsonData2 = Ext.util.JSON.decode(result.responseText);
					} catch (e) {
						Ext.Msg.alert("Error", "Error parsing data from the server");
						this.appMask.hide();
						return;
					}
					if (jsonData2.features.length <= 0) {
						Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
						this.appMask.hide();
						return;
					}

					var min = jsonData2.features[0].properties.min;
					var max = jsonData2.features[0].properties.max;

					this.output.rangeyear.yearRangeSelector.slider.setMinValue(min);
					this.output.rangeyear.yearRangeSelector.slider.setMaxValue(max);
					this.output.rangeyear.yearRangeSelector.slider.setValue(0, min, true);
					this.output.rangeyear.yearRangeSelector.slider.setValue(1, max, true);

					this.output.rangeyear.yearRangeSelector.startValue.setValue(min);
					this.output.rangeyear.yearRangeSelector.endValue.setValue(max);
					this.appMask.hide();

				},
				failure : function (result, request) {
					Ext.Msg.alert("Error", "Server response error");
					this.appMask.hide();
				}
			});
		},
        
        getWFSStoreProxy: function(featureName, filter, sortBy, viewparams){
            var filterProtocol=new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.AND,
                filters: new Array()
            });
            if(filter) {
                if(filter.type== "FID")
                    filterProtocol=filter;
               else
                  filterProtocol.filters.push(filter);
            }
            var proxy= new GeoExt.data.ProtocolProxy({ 
                protocol: new OpenLayers.Protocol.WFS({ 
                    url: this.wfsURL, 
                    featureType: featureName, 
                    readFormat: new OpenLayers.Format.GeoJSON(),
                    featureNS: 'http://geobasi',
                    filter: filterProtocol, 
                    outputFormat: "application/json",
                    version: '1.1.0', //this.wfsVersion,
                    sortBy: sortBy || undefined,
                    viewparams: viewparams || undefined
                }) 
            });
            return proxy;         
            
        }        

	});

Ext.preg(gxp.plugins.geobasi.GeobasiData.prototype.ptype, gxp.plugins.geobasi.GeobasiData);