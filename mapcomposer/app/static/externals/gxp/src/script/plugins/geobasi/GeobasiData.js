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
		mainLoadingMask : "Caricamento date in corso...",
		getWFSStoreProxyProp: {
			wfsURL : "http://www506.regione.toscana.it/geoserver/wfs",
			featureNS : 'http://geobasi',
            outputFormat : "application/json",
            wfsVersion : '1.1.0'
		},

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
            this._newGeometryViewparams = 'POLYGON((965523.68377232947386801 5388020.56055717170238495\\,'+
                                            '2315632.81207791296765208 5389637.45771681889891624\\,'+
                                            '2317249.70923756016418338 5389637.45771681889891624\\,'+
                                            '2317249.70923756016418338 4383927.4244161332026124\\,'+
                                            '965523.68377232959028333 4383927.4244161332026124\\,'+
                                            '965523.68377232947386801 5388020.56055717170238495))';
                                            
			Ext.Panel.prototype.buttonAlign = 'left';

			this.areaSelection = new gxp.form.SelDamageArea(Ext.apply({
						localeGeoserverUrl : this.localeGeoserverUrl, //"http://159.213.57.108/geoserver/ows?",
						remoteGeoserverUrl : this.remoteGeoserverUrl, //"http://www502.regione.toscana.it:80/wfsvector/com.rt.wfs.RTmap/wfs",
						map : app.mapPanel.map,
						mapPanel : app.mapPanel
					}, this.outputConfig));

            var matrixStore = new Ext.data.JsonStore({
                 baseParams:{
                    service: 'WFS',
                    version: '1.0.0',
                    request: 'GetFeature',
                    typeName: 'geobasi:distinct_matrix',
                    outputFormat: 'json',
                    sortBy: 'matrix',
                    viewparams: 'monitoraggio:' + this._newMonitoringViewparams + 
                                ';geometria:' + this._newGeometryViewparams
                 },
                 fields: [{
                    "name": "count",              
                    "mapping": "properties.count"
                  },{
                    "name": "matrix_cod",              
                    "mapping": "properties.matrix_cod"
                  },{
                    "name": "matrix",              
                    "mapping": "properties.matrix"
                  }],
                  autoLoad: true,
                  url: "http://www506.regione.toscana.it/geoserver/geobasi/ows/",
                  root: 'features',
                  idProperty: 'id'
            });
            
            var elementsStore = new Ext.data.JsonStore({
                 baseParams:{
                    service: 'WFS',
                    version: '1.0.0',
                    request: 'GetFeature',
                    typeName: 'geobasi:distinct_elements',
                    outputFormat: 'json',
                    sortBy: 'element',
                    viewparams: 'monitoraggio:' + this._newMonitoringViewparams +
                                ';geometria:' + this._newGeometryViewparams +
                                ';tygeomat:' + this._newMatrixViewparams
                 },
                 fields: [{
                    "name": "count",              
                    "mapping": "properties.count"
                  },{
                    "name": "element",              
                    "mapping": "properties.element"
                  }],
                  autoLoad: true,
                  url: "http://www506.regione.toscana.it/geoserver/geobasi/ows/",
                  root: 'features',
                  idProperty: 'id'
            });
            
            var methodStore = new Ext.data.JsonStore({
                 baseParams:{
                    service: 'WFS',
                    version: '1.0.0',
                    request: 'GetFeature',
                    typeName: 'geobasi:distinct_method',
                    outputFormat: 'json',
                    sortBy: 'method',
                    viewparams: 'monitoraggio:' + this._newMonitoringViewparams +
                                ';geometria:' + this._newGeometryViewparams +
                                ';tygeomat:' + this._newMatrixViewparams +
                                ';sigla_el:' + this._newElementViewparams 
                 },
                 fields: [{
                    "name": "count",              
                    "mapping": "properties.count"
                  },{
                    "name": "method",              
                    "mapping": "properties.method"
                  }],
                  autoLoad: true,
                  url: "http://www506.regione.toscana.it/geoserver/geobasi/ows/",
                  root: 'features',
                  idProperty: 'id'
            });            
            
			var geobasiData = new Ext.form.FormPanel({
					xtype : 'form',
					baseCls : 'x-plain',
					id : "geobasiDataForm",
					title : 'Dati',
					layout : "form",
					autoScroll : true,
					frame : true,
					forceLayout: true,
					items : [{
                            xtype: "fieldset",
                            id: "updateCountID",
                            ref: "updateCount",
                            title: '<span style="color:#C53430;">Numerosità analisi selezionate</span>',
                            checkboxToggle: false,
                            collapsed : false,
                            hidden: false,
                            forceLayout : true,
                            cls: 'selected-query-layer',
                            listeners: {
                                scope: this,
                                expand: function(panel){
                                    panel.doLayout();
                                },
                                collapse: function(panel) {
                                    //this.spatialSelector.reset();
                                },
                                afterlayout: function(panel){
                                    panel.body.update('Totale: 0');
                                }
                            }
                        }, {
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Selezione Matrice - Elemento - Metodo Analitico</span>',
							anchor : '100%',
							ref : 'selectionAnalisysFieldset',
							collapsible : false,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : false,
							iconCls : "gxp-icon-select-elem-geobasi",
							//buttonAlign: 'left',
							buttons : [{
								text : 'Reset',
								iconCls : 'cancel',
								tooltip : 'Reset',
								handler: function () {
									this.clearSelection();
								},
								scope: this
							}],
							items : [{
									xtype : 'combo',
									ref : '../matrixType',
									id : 'matrixTypeId',
									anchor : '100%',
									fieldLabel : 'Tipo Matrice',
									typeAhead : false,
									editable: false,
									listWidth: 250,
									triggerAction : 'all',
									lazyRender : false,
									mode : 'remote',
									name : 'tipo_matrice',
									forceSelection : true,
									allowBlank : true,
									autoLoad : true,
									displayField : 'matrix',
									valueField : 'matrix_cod',
									readOnly : false,
                                    selectOnFocus:true,  
                                    lastQuery: '',
                                    store: matrixStore,
                                    resizable: true,
									emptyText : '-- Seleziona Tipo Matrice --',
									valueNotFoundText : '-- Seleziona Tipo Matrice --',
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
										'<tpl for=\".\" >',
                                            '<tpl  if="matrix_cod == \'01\' || matrix_cod == \'0201\'">',
                                                '<div class=\"x-combo-list-item\"><h4 style="color:#C53430;">{matrix} - (generico) -> n°: {count}<h4></div>',
                                            '</tpl>',
                                        
                                            '<tpl if="matrix_cod !== \'01\' && matrix_cod !== \'0201\'">',
                                                '<div class=\"x-combo-list-item\"><li style="padding-left:1em;">{matrix} -> n°: {count}</li></div>',
                                            '</tpl>',
										'</tpl>',
                                        {
                                            formatName: function(name){
                                                return name.toUpperCase();
                                            }
                                        }
                                    )
								}, {
									xtype : 'combo',
									ref : '../elemento',
									anchor : '100%',
									fieldLabel : 'Elemento',
									typeAhead : false,
									editable: false,
									triggerAction : 'all',
									lazyRender : true,
									mode : 'remote',
									autoLoad : true,
									forceSelected : true,
									allowBlank : false,
									name : 'elemento',
									displayField : 'element',
									valueField : 'element',
									lastQuery: '',
									emptyText : "-- Seleziona Elemento --",
									valueNotFoundText : "-- Seleziona Elemento --",
									readOnly : false,
									disabled: true,
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
										'<div class=\"x-combo-list-item\">{element} -> n°: {count}</div>',
										'</tpl>')
								}, {
									xtype : 'combo',
									ref : '../metodoAnalitico',
									anchor : '100%',
									fieldLabel : 'Metodo Analitico',
									typeAhead : false,
									editable: false,
									triggerAction : 'all',
									lazyRender : true,
									mode : 'remote',
									autoLoad : true,
									resizable : true,
									forceSelected : true,
									allowBlank : false,
									name : 'Metodo_analitico',
									displayField : 'method',
									valueField : 'method',
									lastQuery: '',
									emptyText : "-- Seleziona Metodo Analitico --",
									valueNotFoundText : "-- Seleziona Metodo Analitico --",
									disabled : true,
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
										'<div class=\"x-combo-list-item\">{method} -> n°: {count}</div>',
										'</tpl>')
								}
							]
						},						
						this.areaSelection,
                        {
							xtype : 'fieldset',
							title : '<span style="color:#C53430;">Selezione presenza monitoraggio</span>',
							anchor : '100%',
							ref : 'comboView1',
							iconCls : 'gxp-icon-geobasi-monitoraggio',
							collapsible : true,
							forceLayout : true, //needed to force to read values from this fieldset
							collapsed : false,
							listeners: {
								expand: function(){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
								},
								'collapse': function(){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
								}									
							},							
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
									listeners: {
										select: this.clearSelection,
										scope:this
									},
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
							listeners: {
								expand: function(fieldset){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
									//fieldset.syncSize();
									fieldset.doLayout(false,true);
								},
								'collapse': function(fieldset){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
									//fieldset.syncSize();
									fieldset.doLayout(false,true);									
								}																	
							},								
							items : [{
									xtype : 'checkbox',
									anchor : '100%',
									fieldLabel : 'Includi valori nulli',
									ref : 'allownull',
									name : 'allownull',
									checked : true,
                                    listeners: {
                                        check: function(checkbox, checked){
                                            this.clearSelection();
                                        },
                                        scope: this
                                    }
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
							listeners: {
								expand: function(fieldset){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
									fieldset.doLayout(false,true);	
								},
								'collapse': function(fieldset){
									for(var tool in app.tools){            
										if(app.tools[tool].ptype == "gxp_maingeobasi"){  
											app.tools[tool].adjustLayout();
										}                          
									}
									fieldset.doLayout(false,true);	
								}								
							},								
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
									filter : this.areaSelection,
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
									filter : this.areaSelection,
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
									filter : this.areaSelection,
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
									filter : this.areaSelection,
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
            
            this.output.rangeyear.yearRangeSelector.slider.on('changecomplete',function(){
                this.clearSelection();
            },this);            

		},
        
        onComboboxMatrixExpand: function (field, eOpts) {

			var matrixStore, monitoringValue, newMonitoringViewparams, newGeometryViewparams;
			
            matrixStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			
            newMonitoringViewparams = this.setNewMonitoringViewparams(monitoringValue);
            
            newGeometryViewparams = this.getGeometryViewParams() || this._newGeometryViewparams;
            var years = this.output.rangeyear.yearRangeSelector.slider.getValues();
            var allowNull = this.output.rangeyear.allownull.checked;
            var ccc = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');            
            var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ? 
                                                    'monitoraggio:' + newMonitoringViewparams + 
                                                    ';geometria:' + newGeometryViewparams.replace(/,/g,'\\,') +
                                                    ';startDate:' + years[0] +
                                                    ';endDate:' + years[1] + 
                                                    ';nullDate:' + ccc :
                                                    'monitoraggio:' + newMonitoringViewparams + 
                                                    ';geometria:' + newGeometryViewparams +
                                                    ';startDate:' + years[0] +
                                                    ';endDate:' + years[1] +  
                                                    ';nullDate:' + ccc;            
			//if(this._newMonitoringViewparams !== newMonitoringViewparams || this._newGeometryViewparams !== newGeometryViewparams){
                matrixStore.load({
                    params: {
                        viewparams: viewParams                                    
                    }
                });
                
				this._newMonitoringViewparams = newMonitoringViewparams;
                //this._newGeometryViewparams = newGeometryViewparams;
			//}

        },

		onComboboxMatrixSelect: function (field, eOpts) {
			var me = this;
			me.output.elemento.enable();
			me.output.elemento.reset();
			me.output.metodoAnalitico.reset();
			me.output.metodoAnalitico.disable();
            
            var combo = this.output.matrixType;
            this.updateTotAnalisiFieldset(combo,'matrix_cod');
                
		},

		onComboboxElemExpand: function (field, eOpts) {

			var elementsStore, monitoringValue, matrixValue, newMonitoringViewparams, newMatrixViewparams, newGeometryViewparams;
			
            elementsStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			matrixValue = this.output.matrixType.getValue();
			newMatrixViewparams = matrixValue;
			
			newMonitoringViewparams = this.setNewMonitoringViewparams(monitoringValue);
            
            newGeometryViewparams = this.getGeometryViewParams() || this._newGeometryViewparams;
            var years = this.output.rangeyear.yearRangeSelector.slider.getValues();
            var allowNull = this.output.rangeyear.allownull.checked;       
            var ccc = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');
            var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ?
                                                    'monitoraggio:' + newMonitoringViewparams +
                                                    ';tygeomat:' + newMatrixViewparams +
                                                    ';geometria:' + newGeometryViewparams.replace(/,/g,'\\,') +
                                                    ';startDate:' + years[0] +
                                                    ';endDate:' + years[1] + 
                                                    ';nullDate:' + ccc :
                                                    'monitoraggio:' + newMonitoringViewparams +
                                                    ';tygeomat:'+newMatrixViewparams +
                                                    ';geometria:' + newGeometryViewparams +
                                                    ';startDate:' + years[0] +
                                                    ';endDate:' + years[1] + 
                                                    ';nullDate:' + ccc;            
			//if(this._newMonitoringViewparams !== newMonitoringViewparams || this._newMatrixViewparams !== newMatrixViewparams || this._newGeometryViewparams !== newGeometryViewparams){
                elementsStore.load({
                    params: {
                        viewparams: viewParams
                    }
                });
                
				this._newMonitoringViewparams = newMonitoringViewparams;
				this._newMatrixViewparams = newMatrixViewparams;
                //this._newGeometryViewparams = newGeometryViewparams;
			//}            
			
		},		

		onComboboxElemSelect: function (field, eOpts) {
			var me = this;
			me.output.metodoAnalitico.enable();
			me.output.metodoAnalitico.reset();
            
            var combo = this.output.elemento;
            this.updateTotAnalisiFieldset(combo,'element');            
		},
		
		onComboboxMetAnExpand: function (field, eOpts) {
			
			var methodStore, monitoringValue, matrixValue, elementValue, newMonitoringViewparams, newMatrixViewparams, newElementViewparams, newGeometryViewparams;
			
            methodStore = field.getStore();
            monitoringValue = this.output.monitoraggio.getValue();
			matrixValue = this.output.matrixType.getValue();
			elementValue = this.output.elemento.getValue();
			newMatrixViewparams = matrixValue;
			newElementViewparams = elementValue;
			
			newMonitoringViewparams = this.setNewMonitoringViewparams(monitoringValue);
            
            newGeometryViewparams = this.getGeometryViewParams() || this._newGeometryViewparams;
            var years = this.output.rangeyear.yearRangeSelector.slider.getValues();
            var allowNull = this.output.rangeyear.allownull.checked;
            var ccc = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');     
            var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ?
                                        'monitoraggio:' + newMonitoringViewparams +
                                        ';tygeomat:' + newMatrixViewparams +
                                        ';sigla_el:'+newElementViewparams +
                                        ';geometria:' + newGeometryViewparams.replace(/,/g,'\\,') +
                                        ';startDate:' + years[0] +
                                        ';endDate:' + years[1] + 
                                        ';nullDate:' + ccc :
                                        'monitoraggio:' + newMonitoringViewparams +
                                        ';tygeomat:' + newMatrixViewparams +
                                        ';sigla_el:' + newElementViewparams +
                                        ';geometria:' + newGeometryViewparams +
                                        ';startDate:' + years[0] +
                                        ';endDate:' + years[1] + 
                                        ';nullDate:' + ccc;
			//if(this._newMonitoringViewparams !== newMonitoringViewparams || this._newMatrixViewparams !== newMatrixViewparams || this._newElementViewparams !== newElementViewparams || this._newGeometryViewparams !== newGeometryViewparams){
                methodStore.load({
                    params: {
                        viewparams: viewParams
                    }
                });
                
				this._newMonitoringViewparams = newMonitoringViewparams;
				this._newMatrixViewparams = newMatrixViewparams;
				this._newElementViewparams = newElementViewparams;
                //this._newGeometryViewparams = newGeometryViewparams;
			//}            
			
		},		

		onComboboxMetAnSelect: function (field, eOpts) {

            var combo = this.output.metodoAnalitico;
            this.updateTotAnalisiFieldset(combo,'method'); 
            
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
					
					var yearRangeSelector = this.output.rangeyear.yearRangeSelector;

					yearRangeSelector.slider.setMinValue(min);
					yearRangeSelector.slider.setMaxValue(max);
					yearRangeSelector.slider.setValue(0, min, true);
					yearRangeSelector.slider.setValue(1, max, true);

					yearRangeSelector.startValue.setValue(min);
					yearRangeSelector.endValue.setValue(max);
					this.appMask.hide();

				},
				failure : function (result, request) {
					Ext.Msg.alert("Error", "Server response error");
					this.appMask.hide();
				}
			});
		},
		
		clearSelection: function(){
			this.output.matrixType.reset();
			this.output.elemento.reset();
			this.output.metodoAnalitico.reset();
			this.output.elemento.disable();
			this.output.metodoAnalitico.disable();

            var totFieldset = this.output.updateCount;
            
            if(totFieldset.body)
                totFieldset.body.update('Totale: 0');
		},
        
        setNewMonitoringViewparams: function(monitoringValue){
        
            var newMonitoringViewparams;
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
            return newMonitoringViewparams;
            
        },
        
        getGeometryViewParams: function(){

            if (this.areaSelection.filterPolygon && this.areaSelection.filterPolygon.value) {
                var wkt_options = {};
                var wkt = new OpenLayers.Format.WKT();
                var out = wkt.write(this.areaSelection.selectGeometry);

                var geomCollectionIndex = out.indexOf('GEOMETRYCOLLECTION(');
                if (geomCollectionIndex == 0) {
                    out = out.substring(19, out.length - 1);
                }            
                myFilter = out;
            } else if (this.areaSelection.filterCircle && this.areaSelection.filterCircle.value) {
                myFilter = this.areaSelection.filterCircle;
            } else if (this.areaSelection.searchWFSComboAlluvioni && this.areaSelection.searchWFSComboAlluvioni.geometry) {
                
                myFilter = this.areaSelection.searchWFSComboAlluvioni.geometry;
                
            } else if (this.areaSelection.searchWFSComboRoccia && this.areaSelection.searchWFSComboRoccia.geometry) {
                
                myFilter = this.areaSelection.searchWFSComboRoccia.geometry;
                
            } else if (this.areaSelection.searchWFSComboComuniRT && this.areaSelection.searchWFSComboComuniRT.geometry) {

                myFilter = this.areaSelection.searchWFSComboComuniRT.geometry;

            } else {
                myFilter = false;
            }        
        
            return myFilter;
            
        },
        
        updateTotAnalisiFieldset: function(combo,field){
            
            var value = combo.getValue();
            var store = combo.getStore();
            var text;
            
            store.findBy(function(record){
                if (record.get(field) === value){
                    text = record.get('count');
                }
            },this);
            
            var totFieldset = this.output.updateCount;
            
            if(totFieldset.body)
                totFieldset.body.update('Totale: ' + text);          
        
        }

	});

Ext.preg(gxp.plugins.geobasi.GeobasiData.prototype.ptype, gxp.plugins.geobasi.GeobasiData);