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

    selMatrixMethod: 'Metodo selezione Matrice',
	selElabMethod: 'Seleziona tipologia valori',
	dataUrl: null,
   /*areaFilter: "province NOT IN ('GILGIT BALTISTAN','AJK','DISPUTED TERRITORY','DISPUTED AREA')",
    seasonText:'Season',
	
    hilightLayerName:"CropData_Selection_Layer", //TODO doesn't seems to run
    radioQtipTooltip: "You have to be logged in to use this method",
	layerStyle:{
        strokeColor: "red",
        strokeWidth: 1,
        fillOpacity:0.6,
        cursor: "pointer"
    },
	rangesUrl: "http://84.33.2.24/geoserver/nrl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nrl:cropdata_ranges&outputFormat=json",
    dataUrl: null, //"http://84.33.2.24/geoserver/ows?",
	comboConfigs:{
        base:{
            anchor:'100%',
            fieldLabel: 'District',
            //url: "http://84.33.2.24/geoserver/ows?",
            predicate:"ILIKE",
            width:250,
            sortBy:"province",
			ref:'singleSelector',
            displayField:"name",
            pageSize:10            
        },
        district:{
            typeName:"nrl:district_crop",
            queriableAttributes:[
                "district",
                "province"                
             ],
             recordModel:[
                {
                  name:"id",
                   mapping:"id"
                },
                {
                   name:"geometry",
                   mapping:"geometry"
                },
                {
                   name:"name",
                   mapping:"properties.district"
                },{
                   name:"province",
                   mapping:"properties.province"
                },{
                   name:"properties",
                   mapping:"properties"
                } 
            ],
            tpl:"<tpl for=\".\"><div class=\"search-item\"><h3>{name}</span></h3>({province})</div></tpl>"       
        },
        province:{             
            typeName:"nrl:province_crop",
            recordModel:[
                {
                   name:"id",
                   mapping:"id"
                },
                {
                   name:"geometry",
                   mapping:"geometry"
                },
                {
                   name:"name",
                   mapping:"properties.province"
                },{
                   name:"properties",
                   mapping:"properties"
                }
            ],
            sortBy:"province",
            queriableAttributes:[
                "province"
            ],
            displayField:"name",
            tpl:"<tpl for=\".\"><div class=\"search-item\"><h3>{name}</span></h3>(Province)</div></tpl>"                            
        }    
    },
	
    startCommodity:'Wheat',*/

    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }
		
        //Override the comboconfig url;
        /*this.comboConfigs.base.url = this.dataUrl;
        var rangeData;*/
        //download from WFS available year ranges for each crops.
        
        var geobasiData  = {
            xtype:'form',
            title: 'Geobasi Data',
            layout: "form",
            minWidth:180,
            autoScroll:true,
            frame:true,
            items:[            
                {
                    xtype: 'fieldset',
                    title:'Seleziona tipo',
                    anchor:'100%',
                    ref: 'comboView0',
                    collapsible:false,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:false,
					items:[{
						fieldLabel: this.selMatrixMethod,
						xtype: 'radiogroup',
						anchor:'100%',
						autoHeight:true,
						checkboxToggle:true,
						name:'matrixMethodType',
						ref:'matrixMethodType',
						autoHeight: true,
						defaultType: 'radio', // each item will be a radio button
						items:[
							{boxLabel: 'Tipo 1 - (BarChart e BoxPlot)' , name: 'matrixmethodtype', inputValue: 1, checked: true},
							{boxLabel: 'Tipo 2 - (BarChart e BoxPlot)', name: 'matrixmethodtype', inputValue: 2},
							{boxLabel: 'Tipo 3 - (BarChart)'  , name: 'matrixmethodtype', inputValue: 3}                        
						]
					}]
                },{
                    xtype: 'fieldset',
                    title:'Seleziona tipo monitoraggio',
                    anchor:'100%',
                    ref: 'comboView1',
                    collapsible:false,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:false,
					items:[{
						fieldLabel: this.selMatrixMethod,
						xtype: 'radiogroup',
						anchor:'100%',
						autoHeight:true,
						checkboxToggle:true,
						name:'monitoraggioType',
						ref:'monitoraggioType',
						autoHeight: true,
						defaultType: 'radio', // each item will be a radio button
						items:[
							{boxLabel: 'Monitoraggio SI' , name: 'monitoraggiotype', inputValue: true},
							{boxLabel: 'Monitoraggio NO', name: 'monitoraggiotype', inputValue: false, checked: true}                
						]
					}]
                },{ 
                    xtype: 'fieldset',
                    title:'Seleziona tipo valore',
                    anchor:'100%',
                    ref: 'comboView2',
                    collapsible:false,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:false,
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
							{boxLabel: 'Scala logaritmica' , name: 'elabmethodtype', inputValue: 1, checked: true},
							{boxLabel: 'Valori reali', name: 'elabmethodtype', inputValue: 2}
						]
					}]
                },{
                    xtype: 'fieldset',
                    title:'Seleziona',
                    anchor:'100%',
                    ref: 'comboView3',
                    collapsible:false,
                    forceLayout:true, //needed to force to read values from this fieldset
                    collapsed:false,
                    items:[{
                            xtype: 'combo',
                            ref: 'matrixType',
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
                                    {label: 'Acque', coeff:"01",	shortName:'(Acque)'},//TODO set proper values for coef
									{label: 'Fiume', coeff:"0101",	shortName:'(Acque)'},//TODO set proper values for coef
                                    {label: 'Sedimenti',    coeff:"02",	shortName:'(Sedimenti)'} //TODO set proper values for coef
                                ]
                            }),
                            listeners: {
                                /*expand: function( combo ){
                                    
                                    if (combo.disabled == true){
                                        combo.enable();
                                        var commodity = this.ownerCt.ownerCt.Commodity;
                                        var radio = commodity.getValue();
                                        
                                        if(radio){
                                            combo.store.filter('cid', radio.toLowerCase(),true,true); 
                                        }
                                        combo.disable();
                                    }
                                }*/                        
                            }                      
						},{
                            xtype: 'combo',
                            ref: 'element',
                            anchor:'100%',
                            fieldLabel: 'Elemento',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:false,
                            mode: 'local',
                            autoLoad:true,
                            forceSelected:true,
                            allowBlank:false,
                            name:'elemento',
                            displayField: 'label',
                            valueField:'label',
                            value: 'Ca',
                            readOnly:false,
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:'name',dataIndex:'name'},
                                        {name:'label',dataIndex:'label'},
                                        {name:'coeff',dataIndex:'coeff'},
                                        {name:'shortName', dataindex: 'shortName'}
                                ],
                                data:[
                                    {label: 'Ag',		coeff:1,	shortName:'Ag'        },//TODO set proper values for coef
                                    {label: 'Al',	coeff:2,	shortName:'Al'}, //TODO set proper values for coef
									{label: 'As',	coeff:3,	shortName:'As'},
									{label: 'B',	coeff:4,	shortName:'B'},
									{label: 'Ba',	coeff:5,	shortName:'Ba'},
									{label: 'Be',	coeff:6,	shortName:'Be'},
									{label: 'Ca',	coeff:7,	shortName:'Ca'}
                                ]
                            })
                        },{
                            xtype: 'combo',
                            ref: 'metodoAnalitico',
                            anchor:'100%',
                            fieldLabel: 'Metodo Analitico',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:false,
                            mode: 'local',
                            autoLoad:true,
                            forceSelected:true,
                            allowBlank:false,
                            name:'Metodo_analitico',
                            displayField: 'label',
                            valueField:'label',
                            value: 'ICP-AES',
                            readOnly:false,
                            store: new Ext.data.JsonStore({
                                fields:[
                                        {name:'name',dataIndex:'name'},
                                        {name:'label',dataIndex:'label'},
                                        {name:'coeff',dataIndex:'coeff'},
                                        {name:'shortName', dataindex: 'shortName'}
                                ],
                                data:[
                                    {label: 'ICP-AES', coeff:1, shortName:'ICP-AES'},//TODO set proper values for coef
									{label: 'colorimetria', coeff:1, shortName:'colorimetria'},
									{label: 'cromatografia_ionica', coeff:1, shortName:'cromatografia_ionica'},
									{label: 'volumetria', coeff:1, shortName:'volumetria'},
									{label: '-999', coeff:1, shortName:'-999'}

                                ]
                            })
                    }]
                }            
            ],	
            buttons:[{
                url: this.dataUrl,
                xtype: 'gxp_geobasiDataChartButton',
				text: "Visualizza Grafico",
                ref: '../submitButton',
                target:this,
                form: this,
                disabled:false
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
    }/*,
	
    setRadioQtip: function (t){ 
        var o = { 
            afterrender: function() {
                //Ext.QuickTips.init();
                var id  = Ext.get(Ext.DomQuery.select('#x-form-el-'+this.id+' div'));
                Ext.QuickTips.register({ target:  id.elements[id.elements.length-1].id, text: t});
            },
            destroy:function(){
                var id = Ext.get(Ext.DomQuery.select('#x-form-el-'+this.id+' div'));
                Ext.QuickTips.unregister(id.elements[id.elements.length-1].id);
            },                                
            enable: function() {
                var id = Ext.get(Ext.DomQuery.select('#x-form-el-'+this.id+' div'));
                Ext.QuickTips.unregister(id.elements[id.elements.length-1].id);
            },
            disable: function() {
                //Ext.QuickTips.init();
                var id  = Ext.get(Ext.DomQuery.select('#x-form-el-'+this.id+' div'));
                Ext.QuickTips.register({ target:  id.elements[id.elements.length-1].id, text: t});
            }
        }        
        return o;
    }*/
 });
 
 Ext.preg(gxp.plugins.geobasi.GeobasiData.prototype.ptype, gxp.plugins.geobasi.GeobasiData);