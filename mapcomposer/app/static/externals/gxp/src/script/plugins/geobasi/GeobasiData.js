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
    ptype: "gxp_geobasidata",
	selTipo: 'Seleziona',
	selMonitoraggio: 'Monitoraggio',
    selMatrixMethod: 'Metodo selezione Matrice',
	selElabMethod: 'Seleziona tipologia valori',
	dataUrl: null,

	mainLoadingMask: "Caricamento date in corso...",
	
	/** private: method[init]
     *  :arg target: ``Object``
	 * 
	 *  Provide the initialization code defining necessary listeners and controls.
     */
	init: function(target) {
		target.on({
		    scope: this,
			'ready' : function(){
				//
				// Show the Time Slider only when this tool is activated 
				//
			    this.output.on("show", function(){
					//this.setMinMaxValues();
				}, this);
			}
		});
		return gxp.plugins.geobasi.GeobasiData.superclass.init.apply(this, arguments);
	},	
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }
		this.areaDamage = new gxp.form.SelDamageArea(Ext.apply({
								map: app.mapPanel.map,
								mapPanel: app.mapPanel
							},this.outputConfig));
		
        //Override the comboconfig url;
        /*this.comboConfigs.base.url = this.dataUrl;
        var rangeData;*/
        //download from WFS available year ranges for each crops.

		/*this.uploadPanelForm = new gxp.LayerUploadPanel({
			url: "/geoserver/rest",
			//width: 350,
			frame: true,
			title: "Upload Layer Data",
			autoHeight: true,
			bodyStyle: "padding: 10px 10px 0 10px;",
			labelWidth: 65,
			defaults: {
				anchor: "95%",
				allowBlank: false,
				msgTarget: "side"
			},
			listeners: {
				uploadcomplete: function(panel, detail) {
					var layers = detail.layers;
					var names = [];
					for (var i=0, len=layers.length; i<len; ++i) {
						names.push(layers[i].name);
					}
					Ext.Msg.show({
						title: "Success",
						msg: "Added new layer" + (len !== 1 ? "s" : "") + ": " + names.join(", "),
						minWidth: 200,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
				}
			}
		});*/

		

					
        var geobasiData  = {
            xtype:'form',
            baseCls: 'x-plain',
			id: "geobasiDataForm",
            title: 'Geobasi Data',
            layout: "form",
            minWidth:180,
            autoScroll:true,
            frame:false,
            items:[{
                    xtype: 'fieldset',
                    title:'<span style="color:red;">Selezione Matrice - Elemento - Metodo Analitico</span>',
                    anchor:'100%',
                    ref: 'comboView3',
                    collapsible:false,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:false,
					iconCls: "gxp-icon-select-elem-geobasi",
                    items:[{
                            xtype: 'combo',
                            ref: '../matrixType',
                            id: 'matrixTypeId',
                            anchor:'100%',
                            fieldLabel: 'Tipo Matrice',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:false,
                            mode: 'local',
                            name:'tipo_matrice',
                            forceSelected:true,
                            allowBlank:false,
                            autoLoad:true,
                            displayField: 'label',
                            valueField:'coeff',
                            value:"01",
                            readOnly:false,
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:'name',dataIndex:'name'},
                                        {name:'label',dataIndex:'label'},
                                        {name:'coeff',dataIndex:'coeff'},
                                        {name:'shortName', dataindex: 'shortName'},
                                        {name:'cid', dataindex: 'cid'}
                                ],
                                data:[
                                    {label: 'Acqua', coeff:"01",	shortName:'(Acque)', cid:'2,3'},
									{label: 'Fiume', coeff:"0101",	shortName:'(Fiume)', cid:'1'},
                                    {label: 'Lago',    coeff:"0102",	shortName:'(Lago)', cid:'1'},
									{label: 'Sorgente',    coeff:"0103",	shortName:'(Sorgente)', cid:'1'},
									{label: 'Pozzo',    coeff:"0104",	shortName:'(Pozzo)', cid:'1'},
									{label: 'Pozzo termale',    coeff:"010401",	shortName:'(Pozzo termale)', cid:'1'},
									{label: 'Sedimenti',    coeff:"02",	shortName:'(Sedimenti)', cid:'2,3'},
									{label: 'Stream',    coeff:"0201",	shortName:'(Stream)', cid:'1'},
									{label: 'Gas',    coeff:"03",	shortName:'(Gas)', cid:'2,3'}
                                ]
                            }),
                            listeners: {
                                expand: function( combo ){
                                    /*var radio = this.ownerCt.ownerCt.getForm().getValues();
                                    combo.reset();
                                    if(radio.matrixmethodtype == 1){
                                        combo.store.filter('cid', radio.matrixmethodtype,true,true); 
                                    }else if(radio.matrixmethodtype == 2){
                                        combo.store.filter('cid', radio.matrixmethodtype,true,true); 
                                    }else{
                                        combo.store.filter('cid', radio.matrixmethodtype,true,true); 
                                    }*/
                                    
                                    
                                    
                                    /*if (combo.disabled == true){
                                        combo.enable();
                                        var commodity = this.ownerCt.ownerCt.Commodity;
                                        var radio = commodity.getValue();
                                        
                                        if(radio){
                                            combo.store.filter('cid', radio.toLowerCase(),true,true); 
                                        }
                                        combo.disable();
                                    }*/
                                    
                                    
                                    
                                },
                                afterrender: function( combo ){
                                    //combo.setValue('0101');
                                    combo.setValue('01');
                                }
                            }                      
						},{
                            xtype: 'combo',
                            ref: '../elemento',
                            anchor:'100%',
                            fieldLabel: 'Elemento',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',
                            autoLoad:true,
                            forceSelected:true,
                            allowBlank:false,
                            name:'elemento',
                            displayField: 'label',
                            valueField:'value',
                            //value: 'Ca',
                            emptyText: "-- Seleziona Elemento --",
                            valueNotFoundText: "-- Seleziona Elemento --",
                            readOnly:false,
                            listeners:{
                                //scope:this,
                                select:function(combo, record, index){
                                    /*if(this.ownerCt.ownerCt.matrixMethodType.getValue().inputValue != 3){
                                        this.ownerCt.ownerCt.metodoAnalitico.enable();
                                    }*/
                                }
                            },
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:'name',dataIndex:'name'},
                                        {name:'label',dataIndex:'label'},
                                        {name:'coeff',dataIndex:'coeff'},
                                        {name:'value', dataindex: 'value'}
                                ],
                                data:[
                                        {label: "Afnio", value: "Hf"},
                                        {label: "Alluminio", value: "Al"},
                                        {label: "Americio", value: "Am"},
                                        {label: "Antimonio", value: "Sb"},
                                        {label: "Argento", value: "Ag"},
                                        {label: "Argon", value: "Ar"},
                                        {label: "Arsenico", value: "As"},
                                        {label: "Astato", value: "At"},
                                        {label: "Attinio", value: "Ac"},
                                        {label: "Azoto", value: "N"},
                                        {label: "Bario", value: "Ba"},
                                        {label: "Berchelio", value: "Bk"},
                                        {label: "Berillio", value: "Be"},
                                        {label: "Bismuto", value: "Bi"},
                                        {label: "Bohrio", value: "Bh"},
                                        {label: "Boro", value: "B"},
                                        {label: "Bromo", value: "Br"},
                                        {label: "Cadmio", value: "Cd"},
                                        {label: "Calcio", value: "Ca"},
                                        {label: "Californio", value: "Cf"},
                                        {label: "Carbonio", value: "C"},
                                        {label: "Cerio", value: "Ce"},
                                        {label: "Cesio", value: "Cs"},
                                        {label: "Cloro", value: "Cl"},
                                        {label: "Cobalto", value: "Co"},
                                        {label: "Cripto", value: "Kr"},
                                        {label: "Cromo", value: "Cr"},
                                        {label: "Curio", value: "Cm"},
                                        {label: "Darmstadtio", value: "Ds"},
                                        {label: "Disprosio", value: "Dy"},
                                        {label: "Dubnio", value: "Db"},
                                        {label: "Einsteinio", value: "Es"},
                                        {label: "Elio", value: "He"},
                                        {label: "Erbio", value: "Er"},
                                        {label: "Europio", value: "Eu"},
                                        {label: "Fermio", value: "Fm"},
                                        {label: "Fluoro", value: "F"},
                                        {label: "Fosforo", value: "P"},
                                        {label: "Francio", value: "Fr"},
                                        {label: "Gadolinio", value: "Gd"},
                                        {label: "Gallio", value: "Ga"},
                                        {label: "Germanio", value: "Ge"},
                                        {label: "Hassio", value: "Hs"},
                                        {label: "Ferro", value: "Fe"},
                                        {label: "Idrogeno", value: "H"},
                                        {label: "Indio", value: "In"},
                                        {label: "Iodio", value: "I"},
                                        {label: "Iridio", value: "Ir"},
                                        {label: "Lantanio", value: "La"},
                                        {label: "Laurenzio", value: "Lr"},
                                        {label: "Litio", value: "Li"},
                                        {label: "Lutezio", value: "Lu"},
                                        {label: "Magnesio", value: "Mg"},
                                        {label: "Manganese", value: "Mn"},
                                        {label: "Meitnerio", value: "Mt"},
                                        {label: "Mendelevio", value: "Md"},
                                        {label: "Mercurio", value: "Hg"},
                                        {label: "Molibdeno", value: "Mo"},
                                        {label: "Neodimio", value: "Nd"},
                                        {label: "Neon", value: "Ne"},
                                        {label: "Neptunio", value: "Np"},
                                        {label: "Nickel", value: "Ni"},
                                        {label: "Niobio", value: "Nb"},
                                        {label: "Nobelio", value: "No"},
                                        {label: "Olmio", value: "Ho"},
                                        {label: "Oro", value: "Au"},
                                        {label: "Osmio", value: "Os"},
                                        {label: "Ossigeno", value: "O"},
                                        {label: "Palladio", value: "Pd"},
                                        {label: "Piombo", value: "Pb"},
                                        {label: "Platino", value: "Pt"},
                                        {label: "Plutonio", value: "Pu"},
                                        {label: "Polonio", value: "Po"},
                                        {label: "Potassio", value: "K"},
                                        {label: "Praseodimio", value: "Pr"},
                                        {label: "Promezio", value: "Pm"},
                                        {label: "Protoattinio", value: "Pa"},
                                        {label: "Radio", value: "Ra"},
                                        {label: "Radon", value: "Rn"},
                                        {label: "Rame", value: "Cu"},
                                        {label: "Renio", value: "Re"},
                                        {label: "Rodio", value: "Rh"},
                                        {label: "Rubidio", value: "Rb"},
                                        {label: "Rutenio", value: "Ru"},
                                        {label: "Ruterfordio", value: "Rf"},
                                        {label: "Samario", value: "Sm"},
                                        {label: "Scandio", value: "Sc"},
                                        {label: "Seaborgio", value: "Sg"},
                                        {label: "Selenio", value: "Se"},
                                        {label: "Silicio", value: "Si"},
                                        {label: "Sodio", value: "Na"},
                                        {label: "Stagno", value: "Sn"},
                                        {label: "Stronzio", value: "Sr"},
                                        {label: "Tallio", value: "Tl"},
                                        {label: "Tantalo", value: "Ta"},
                                        {label: "Tecnezio", value: "Tc"},
                                        {label: "Tellurio", value: "Te"},
                                        {label: "Terbio", value: "Tb"},
                                        {label: "Titanio", value: "Ti"},
                                        {label: "Torio", value: "Th"},
                                        {label: "Tulio", value: "Tm"},
                                        {label: "Tungsteno", value: "W"},
                                        {label: "Ununbio", value: "Uub"},
                                        {label: "Ununexio", value: "Uuh"},
                                        {label: "Ununio", value: "Uuu"},
                                        {label: "Ununottio", value: "Uuo"},
                                        {label: "Ununpentio", value: "Uup"},
                                        {label: "Ununquadio", value: "Uuq"},
                                        {label: "Ununseptio", value: "Uus"},
                                        {label: "Ununtrio", value: "Uut"},
                                        {label: "Uranio", value: "U"},
                                        {label: "Vanadio", value: "V"},
                                        {label: "Xenon", value: "Xe"},
                                        {label: "Ytterbio", value: "Yb"},
                                        {label: "Yttrio", value: "Y"},
                                        {label: "Zinco", value: "Zn"},
                                        {label: "Zirconio", value: "Zr"},
                                        {label: "Zolfo", value: "S"}
                                ]
                            }),
                            tpl: new Ext.XTemplate(
                                '<tpl for=\".\">',
                                    '<div class=\"x-combo-list-item\">{label} - {value}</div>',
                                '</tpl>'
                            )
                        },{
                            xtype: 'combo',
                            ref: '../metodoAnalitico',
                            anchor:'100%',
                            fieldLabel: 'Metodo Analitico',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:false,
                            mode: 'local',
                            autoLoad:true,
                            resizable: true,
                            forceSelected:true,
                            allowBlank:false,
                            name:'Metodo_analitico',
                            displayField: 'label',
                            valueField:'value',
                            //value: 'ICP-AES',
                            emptyText: "-- Seleziona Metodo Analitico --",
                            valueNotFoundText: "-- Seleziona Metodo Analitico --",
                            disabled: false,
                            readOnly:false,
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:"name",dataIndex:"name"},
                                        {name:"label",dataIndex:"label"},
                                        {name:"value",dataIndex:"value"},
                                        {name:"shortName", dataindex: "shortName"}
                                ],
                                data:[
									{label: "AAS", value:"AAS", shortName:"AAS"},
									{label: "COLORIMETRIA", value:"colorimetria", shortName:"colorimetria"},
									{label: "COLORIMETRIA ALL'INDOFENOLO", value:"colorimetria_all_indofenolo", shortName:"colorimetria_all_indofenolo"},
									{label: "COLORIMETRIA AL REATTIVO GRESS", value:"colorimetria_al_reattivo_Gress", shortName:"colorimetria_al_reattivo_Gress"},
									{label: "CROMATOGRAFIA IONICA", value:"cromatografia_ionica", shortName:"cromatografia_ionica"},
									{label: "GASCROMATOGRAFIA", value:"Gascromatografia", shortName:"Gascromatografia"},
                                    {label: "ICP-AES", value:"ICP-AES", shortName:"ICP-AES"},
									{label: "VOLUMETRIA", value:"volumetria", shortName:"volumetria"},
									{label: "SPETTROFOTOMETRIA", value:"spettrofotometria", shortName:"spettrofotometria"},
									{label: "METODO ANALITICO NON SPECIFICATO", value:"-999", shortName:"-999"}
                                ]
                            })
                    }]
                },
					this.areaDamage,
                {
                    xtype: 'fieldset',
                    title:'<span style="color:red;">Selezione presenza monitoraggio</span>',
                    anchor:'100%',
                    ref: 'comboView1',
                    iconCls: 'gxp-icon-geobasi-monitoraggio',
                    collapsible:true,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:true,
					items:[{
                            xtype: 'combo',
                            ref: '../monitoraggio',
                            id: 'monitoraggioId',
                            anchor:'100%',
                            fieldLabel: this.selMonitoraggio,
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:false,
                            mode: 'local',
                            name:'tipomonitoraggio',
                            forceSelected:true,
                            allowBlank:false,
                            autoLoad:true,
                            displayField: 'label',
                            valueField:'coeff',
                            value:"01",
                            readOnly:false,
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:'name',dataIndex:'name'},
                                        {name:'label',dataIndex:'label'},
                                        {name:'coeff',dataIndex:'coeff'},
                                        {name:'shortName', dataindex: 'shortName'},
                                        {name:'cid', dataindex: 'cid'}
                                ],
                                data:[
                                    {label: 'Tutte le tipologie', coeff:"01"},
									{label: 'Monitoraggio SI', coeff:"02"},
                                    {label: 'Monitoraggio NO', coeff:"03"}
                                ]
                            })
						}]
                }, {
                    xtype: 'fieldset',
                    title:'<span style="color:red;">Selezione intervallo temporale</span>',
                    anchor:'100%',
                    ref: 'rangeyear',
                    collapsible:true,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:true,
					iconCls: "gxp-icon-time-range",
                    items:[{
						xtype: 'checkbox',
						anchor:'100%',
						fieldLabel:'Includi valori nulli',
						ref: 'allownull',
						name: 'allownull',
						checked : true
					},{
						ref: 'yearRangeSelector',
						xtype: 'yearrangeselector',
						anchor:'100%',
						listeners:{
							scope:this,
							change:function(start,end){
								//this.output.rangeyear.referenceYear.setText(end);
							},
							afterrender: function(component) {
								this.setMinMaxValues();
								if(this.output.rangeyear.yearRangeSelector!=component)return;           
							}
						}         
					}],
					afterrender: function(component) {
						//this.setMinMaxValues();
						//if(this.output.rangeyear.yearRangeSelector!=component)return;           
					}					
				}, //,this.uploadPanelForm
                { 
                    xtype: 'fieldset',
                    title:'<span style="color:red;">Metodi trasformazione dati</span>',
                    anchor:'100%',
                    ref: 'comboView2',
                    collapsible:true,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:true,
					iconCls: "gxp-icon-select-log-geobasi",
					items:[{
						fieldLabel: this.selElabMethod,
						xtype: 'radiogroup',
						anchor:'100%',
						autoHeight:true,
						checkboxToggle:true,
						name:'elabMethodType',
						ref:'elabMethodType',
						autoHeight: true,
						defaultType: 'radio', // each item will be a radio button
						items:[
							{boxLabel: 'Valori reali', name: 'elabmethodtype', inputValue: 2, checked: true},                        
							{boxLabel: 'Scala logaritmica' , name: 'elabmethodtype', inputValue: 1}
						]
					}]
                }
            ],
			buttons:[{
                url: this.dataUrl,
				chartID: "notAdded_boxPlot",
				pagePosition: [10000,0],
				iconCls: "gxp-icon-geobasi-boxplot",
                xtype: 'gxp_geobasiDataBoxPlotButton',
				text: "BoxPlot",
                ref: '../submitButtonBoxPlot',
                target:this,
                form: this,
                disabled:false,
				filter: this.areaDamage,
				addedLayer: false
            },{
                url: this.dataUrl,
				chartID: "notAdded_barChart",				
				pagePosition: [10000,400],
				iconCls: "gxp-icon-geobasi-barchart",
                xtype: 'gxp_geobasiDataBarChartButton',
				text: "ColumnChart",
                ref: '../submitButtonColumnChart',
                target:this,
                form: this,
                disabled:false,
				filter: this.areaDamage,
				addedLayer: false
            },{
                url: this.dataUrl,
				chartID: "notAdded_curvaCum",
				pagePosition: [10000,800],
				iconCls: "gxp-icon-geobasi-curvacum",
                xtype: 'gxp_geobasiDataCurvaCumButton',
				text: "Curva Cumul.",
                ref: '../submitButtonCurvaCum',
                target:this,
                form: this,
                disabled:false,
				filter: this.areaDamage,
				addedLayer: false
            }]
		};
        
        config = Ext.apply(geobasiData,config || {});
        
        this.output = gxp.plugins.geobasi.GeobasiData.superclass.addOutput.call(this, config);
		
        //Enable Disable button when regions are selected
        /*this.output.on('update',function(store){
            var button = this.output.submitButton.getXType();
			
			var values = this.output.getForm().getValues();
			var gran_type = values.areatype;
				
            if (button == "gxp_nrlCropDataButton" || button == 'gxp_nrlCropDataTabButton'){
                this.output.submitButton.setDisabled(store.getCount()<=0 && gran_type != "pakistan");
            }else{
                //map button
                this.output.submitButton.setDisabled(store.getCount()<=0 && gran_type == "province");
            }
            
        },this);
		
        //hide selection layer on tab change
        this.output.on('beforehide',function(){
            var button = this.output.aoiFieldSet.AreaSelector.selectButton;
            button.toggle(false);
            var lyr = button.hilightLayer;
            if(!lyr) return;
            lyr.setVisibility(false);
            
        },this);
        this.output.on('show',function(){
            var button = this.output.aoiFieldSet.AreaSelector.selectButton;
            
            var lyr = button.hilightLayer;
            if(!lyr) return;
            lyr.setVisibility(true);
            
        },this);
        
        return this.output;*/
    },
	
	setMinMaxValues: function(){
		this.appMask = new Ext.LoadMask(this.output.rangeyear.el, {msg: this.mainLoadingMask});
		this.appMask.show();
		Ext.Ajax.request({
			scope: this,
			url: this.dataUrl,
			method: 'POST',
			params: {
				service: "WFS",
				version: "1.1.0",
				//geometryName: "geom",
				request: "GetFeature",
				typeName: "geobasi:geobasi_data_analisi",
				outputFormat: "json",
				propertyName: "max,min"
			},
			success: function (result, request) {
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
				this.output.rangeyear.yearRangeSelector.slider.setValue( 0, min, true );
				this.output.rangeyear.yearRangeSelector.slider.setValue( 1, max, true );
				
				this.output.rangeyear.yearRangeSelector.startValue.setValue(min);
				this.output.rangeyear.yearRangeSelector.endValue.setValue(max);
				this.appMask.hide();
				
			},					
			failure: function (result, request) {
				Ext.Msg.alert("Error", "Server response error");
				this.appMask.hide();
			}
		});	
	},
	
	onRadioGroupAfterRender: function(){
	
	},
    
	onRadioGroupChange: function(){
	
	}

 });
 
 Ext.preg(gxp.plugins.geobasi.GeobasiData.prototype.ptype, gxp.plugins.geobasi.GeobasiData);