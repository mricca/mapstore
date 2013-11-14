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
	selTipo: 'Seleziona',
	selMonitoraggio: 'Monitoraggio',
    selMatrixMethod: 'Metodo selezione Matrice',
	selElabMethod: 'Seleziona tipologia valori',
	dataUrl: null,


    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }
		this.areaDamage = new gxp.form.SelDamageArea(Ext.apply({
						map: app.mapPanel.map
					},this.outputConfig));
		
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
					labelWidth: 1,
					items:[{
						//fieldLabel: this.selTipo,
						xtype: 'radiogroup',
						anchor:'100%',
						autoHeight:true,
						checkboxToggle:true,
						name:'matrixMethodType',
						ref:'matrixMethodType',
						autoHeight: true,
						vertical: true,
						//labelWidth: 50,
						defaultType: 'radio', // each item will be a radio button
						items:[
							{boxLabel: 'SOTMAT/MA' , name: 'matrixmethodtype', inputValue: 1, checked: true},
							{boxLabel: 'MAT/MA', name: 'matrixmethodtype', inputValue: 2},
							{boxLabel: 'MAT'  , name: 'matrixmethodtype', inputValue: 3}                        
						],
                        listeners: {
                            afterrender: {
                                fn: this.onRadioGroupAfterRender,
                                scope: this
                            },
                            change: {
                                fn: this.onRadioGroupChange,
                                scope: this
                            }
                        }
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
						fieldLabel: this.selMonitoraggio,
						xtype: 'radiogroup',
						anchor:'100%',
						autoHeight:true,
						checkboxToggle:true,
						name:'monitoraggioType',
						ref:'monitoraggioType',
						autoHeight: true,
						defaultType: 'radio', // each item will be a radio button
						items:[
							{boxLabel: 'SI' , name: 'monitoraggiotype', inputValue: true},
							{boxLabel: 'NO', name: 'monitoraggiotype', inputValue: false, checked: true}                
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
                                    {label: 'Acqua - 01', coeff:"01",	shortName:'(Acque)'},
									{label: 'Fiume - 0101', coeff:"0101",	shortName:'(Fiume)'},
                                    {label: 'Lago - 0102',    coeff:"0102",	shortName:'(Lago)'},
									{label: 'Sorgente - 0103',    coeff:"0103",	shortName:'(Sorgente)'},
									{label: 'Pozzo - 0104',    coeff:"0104",	shortName:'(Pozzo)'},
									{label: 'Pozzo termale - 010401',    coeff:"010401",	shortName:'(Pozzo termale)'},
									{label: 'Sedimenti - 02',    coeff:"02",	shortName:'(Sedimenti)'},
									{label: 'Stream - 0201',    coeff:"0201",	shortName:'(Stream)'},
									{label: 'Gas - 03',    coeff:"03",	shortName:'(Gas)'}
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
										{label: "Hf", coeff:1,	shortName:'Ag' },
										{label: "Al", coeff:1,	shortName:'Al' },
										{label: "Am", coeff:1,	shortName:'Am' },
										{label: "Sb", coeff:1,	shortName:'Sb' },
										{label: "Ag", coeff:1,	shortName:'Ag' },
										{label: "Ar", coeff:1,	shortName:'Ar' },
										{label: "As", coeff:1,	shortName:'As' },
										{label: "Ac", coeff:1,	shortName:'Ac' },
										{label: "At", coeff:1,	shortName:'At' },
										{label: "N", coeff:1,	shortName:'"N' },
										{label: "Ba", coeff:1,	shortName:'Ba' },
										{label: "Bk", coeff:1,	shortName:'Bk' },
										{label: "Be", coeff:1,	shortName:'Be' },
										{label: "Bi", coeff:1,	shortName:'Bi' },
										{label: "Bh", coeff:1,	shortName:'Bh' },
										{label: "B", coeff:1,	shortName:'"B' },
										{label: "Br", coeff:1,	shortName:'Br' },
										{label: "Cd", coeff:1,	shortName:'Cd' },
										{label: "Ca", coeff:1,	shortName:'Ca' },
										{label: "Cf", coeff:1,	shortName:'Cf' },
										{label: "C", coeff:1,	shortName:'"C' },
										{label: "Ce", coeff:1,	shortName:'Ce' },
										{label: "Cs", coeff:1,	shortName:'Cs' },
										{label: "Cl", coeff:1,	shortName:'Cl' },
										{label: "Cr", coeff:1,	shortName:'Cr' },
										{label: "Co", coeff:1,	shortName:'Co' },
										{label: "Kr", coeff:1,	shortName:'Kr' },
										{label: "Cm", coeff:1,	shortName:'Cm' },
										{label: "Ds", coeff:1,	shortName:'Ds' },
										{label: "Dy", coeff:1,	shortName:'Dy' },
										{label: "Db", coeff:1,	shortName:'Db' },
										{label: "Es", coeff:1,	shortName:'Es' },
										{label: "He", coeff:1,	shortName:'He' },
										{label: "Er", coeff:1,	shortName:'Er' },
										{label: "Eu", coeff:1,	shortName:'Eu' },
										{label: "Fm", coeff:1,	shortName:'Fm' },
										{label: "Fe", coeff:1,	shortName:'Fe' },
										{label: "F", coeff:1,	shortName:'"F' },
										{label: "Fr", coeff:1,	shortName:'Fr' },
										{label: "Gd", coeff:1,	shortName:'Gd' },
										{label: "Ga", coeff:1,	shortName:'Ga' },
										{label: "Ge", coeff:1,	shortName:'Ge' },
										{label: "Hs", coeff:1,	shortName:'Hs' },
										{label: "H", coeff:1,	shortName:'"H' },
										{label: "In", coeff:1,	shortName:'In' },
										{label: "I", coeff:1,	shortName:'"I' },
										{label: "Ir", coeff:1,	shortName:'Ir' },
										{label: "La", coeff:1,	shortName:'La' },
										{label: "Lr", coeff:1,	shortName:'Lr' },
										{label: "Pb", coeff:1,	shortName:'Pb' },
										{label: "Li", coeff:1,	shortName:'Li' },
										{label: "Lu", coeff:1,	shortName:'Lu' },
										{label: "Mg", coeff:1,	shortName:'Mg' },
										{label: "Mn", coeff:1,	shortName:'Mn' },
										{label: "Mt", coeff:1,	shortName:'Mt' },
										{label: "Md", coeff:1,	shortName:'Md' },
										{label: "Hg", coeff:1,	shortName:'Hg' },
										{label: "Mo", coeff:1,	shortName:'Mo' },
										{label: "Nd", coeff:1,	shortName:'Nd' },
										{label: "Ne", coeff:1,	shortName:'Ne' },
										{label: "Np", coeff:1,	shortName:'Np' },
										{label: "Ni", coeff:1,	shortName:'Ni' },
										{label: "Nb", coeff:1,	shortName:'Nb' },
										{label: "No", coeff:1,	shortName:'No' },
										{label: "Ho", coeff:1,	shortName:'Ho' },
										{label: "Au", coeff:1,	shortName:'Au' },
										{label: "Os", coeff:1,	shortName:'Os' },
										{label: "O", coeff:1,	shortName:'O' },
										{label: "Pd", coeff:1,	shortName:'Pd' },
										{label: "P", coeff:1,	shortName:'P' },
										{label: "Pt", coeff:1,	shortName:'Pt' },
										{label: "Pu", coeff:1,	shortName:'Pu' },
										{label: "Po", coeff:1,	shortName:'Po' },
										{label: "K", coeff:1,	shortName:'K' },
										{label: "Pr", coeff:1,	shortName:'Pr' },
										{label: "Pm", coeff:1,	shortName:'Pm' },
										{label: "Pa", coeff:1,	shortName:'Pa' },
										{label: "Ra", coeff:1,	shortName:'Ra' },
										{label: "Rn", coeff:1,	shortName:'Rn' },
										{label: "Cu", coeff:1,	shortName:'Cu' },
										{label: "Re", coeff:1,	shortName:'Re' },
										{label: "Rh", coeff:1,	shortName:'Rh' },
										{label: "Rb", coeff:1,	shortName:'Rb' },
										{label: "Ru", coeff:1,	shortName:'Ru' },
										{label: "Rf", coeff:1,	shortName:'Rf' },
										{label: "Sm", coeff:1,	shortName:'Sm' },
										{label: "Sc", coeff:1,	shortName:'Sc' },
										{label: "Sg", coeff:1,	shortName:'Sg' },
										{label: "Se", coeff:1,	shortName:'Se' },
										{label: "Si", coeff:1,	shortName:'Si' },
										{label: "Na", coeff:1,	shortName:'Na' },
										{label: "Sn", coeff:1,	shortName:'Sn' },
										{label: "Sr", coeff:1,	shortName:'Sr' },
										{label: "Ta", coeff:1,	shortName:'Ta' },
										{label: "Tc", coeff:1,	shortName:'Tc' },
										{label: "Te", coeff:1,	shortName:'Te' },
										{label: "Tb", coeff:1,	shortName:'Tb' },
										{label: "Tl", coeff:1,	shortName:'Tl' },
										{label: "Th", coeff:1,	shortName:'Th' },
										{label: "Tm", coeff:1,	shortName:'Tm' },
										{label: "Ti", coeff:1,	shortName:'Ti' },
										{label: "W", coeff:1,	shortName:'W' },
										{label: "Uub", coeff:1,	shortName:'Uub' },
										{label: "Uuh", coeff:1,	shortName:'Uuh' },
										{label: "Uuo", coeff:1,	shortName:'Uuo' },
										{label: "Uup", coeff:1,	shortName:'Uup' },
										{label: "Uuq", coeff:1,	shortName:'Uuq' },
										{label: "Uus", coeff:1,	shortName:'Uus' },
										{label: "Uut", coeff:1,	shortName:'Uut' },
										{label: "Uuu", coeff:1,	shortName:'Uuu' },
										{label: "U", coeff:1,	shortName:'U' },
										{label: "V", coeff:1,	shortName:'V' },
										{label: "Xe", coeff:1,	shortName:'Xe' },
										{label: "Yb", coeff:1,	shortName:'Yb' },
										{label: "Y", coeff:1,	shortName:'Y' },
										{label: "Zn", coeff:1,	shortName:'Zn' },
										{label: "Zr", coeff:1,	shortName:'Zr' },
										{label: "S", coeff:1,	shortName:'S' }
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
									{label: 'AAS', coeff:1, shortName:'AAS'},
									{label: 'colorimetria', coeff:1, shortName:'colorimetria'},
									{label: 'colorimetria_all_indofenolo', coeff:1, shortName:'colorimetria_all_indofenolo'},
									{label: 'colorimetria_al_reattivo_Gress', coeff:1, shortName:'colorimetria_al_reattivo_Gress'},
									{label: 'cromatografia_ionica', coeff:1, shortName:'cromatografia_ionica'},
									{label: 'Gascromatografia', coeff:1, shortName:'Gascromatografia'},
                                    {label: 'ICP-AES', coeff:1, shortName:'ICP-AES'},
									{label: 'volumetria', coeff:1, shortName:'volumetria'},
									{label: '-999', coeff:1, shortName:'-999'}
                                ]
                            })
                    }]
                },
				this.areaDamage				
            ],	
            buttons:[{
                url: this.dataUrl,
                xtype: 'gxp_geobasiDataBoxPlotButton',
				text: "Crea BoxPlot",
                ref: '../submitButton',
                target:this,
                form: this,
                disabled:false,
				filter: this.areaDamage
            },{
                url: this.dataUrl,
                xtype: 'gxp_geobasiDataBarChartButton',
				text: "Crea BarChart",
                ref: '../submitButton',
                target:this,
                form: this,
                disabled:false,
				filter: this.areaDamage
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
	
	onRadioGroupAfterRender: function(){
	
	},
    
	onRadioGroupChange: function(){
	
	}
	
	/*,
	
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