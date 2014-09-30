/**
 * Copyright (c) 2008-2011 The Open Planning Project
 *
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */
/**
 * requires
 * include
 */
/** api: (define)
 *  module = gxp.plugins
 *  class = WFSRTSearchWidget
 */
/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.form");

/** api: constructor
 *  .. class:: WFSRTSearchWidget(config)
 *
 *    Plugin for select Area of Damage with Circle, Polygon or Buffer
 */
gxp.form.WFSRTSearchWidget = Ext.extend(Ext.form.FieldSet, {

    /** api: ptype = gxp_wfsrtsearchwidget */
    ptype: "gxp_wfsrtsearchwidget",

    /** api: config[id]
     *  ``String``
     *
     */
    id: "wfsrtsearchwidget",

    anchor: '100%',
    
    /** api: config[searchFieldsetTitle]
     * ``String``
     * Text for fieldSet title (i18n).
     */    
    searchFieldsetTitle: "Trova sulla mappa",
    
    /** api: config[searchLabel]
     * ``String``
     * Text for combo label (i18n).
     */    
    searchLabel: "Ricerca in",
    
    /** api: config[selAreaDamageEmptyText]
     * ``String``
     * Text for combo empty text (i18n).
     */    
    selAreaDamageEmptyText: "--- Seleziona livello ---",
    
    /** api: config[comboPolygonSelection]
     * ``String``
     * Text for Label Polygon (i18n).
     */        
    comboPolygonSelection: 'Poligono',
    
    
    /** api: config[comboCircleSelection]
     * ``String``
     * Text for Label Circle (i18n).
     */        
    comboCircleSelection: 'Cerchio',
    
	/** api: config[comboBufferSelection]
     * ``String``
     * Text for Label comboBufferSelection (i18n).
     */  
	comboBufferSelection: "Buffer",    
	
	iconCls: "gxp-icon-find",

    initComponent: function () {

        var me = this;

		this.searchWFSComuniRT = new gxp.form.WFSSearchComboBox({
					url: "http://www502.regione.toscana.it:80/wfsvector/com.rt.wfs.RTmap/wfs",
					versionWFS: '1.1.0',
					typeName: "sita:listacomunirtpoly",
					mapPanel: this.mapPanel,
					hidden: true,
					zoomTo: true,
					queryParam: 'Filter',
					highlightLayer: "Highlight Comuni",
                    highlightLayerStyle: {
                       strokeColor: "#FF00FF",
                       strokeWidth: 2,
                       fillColor: "#FF00FF",
                       fillOpacity: 0.2
                    },
					recordModel:[
						{name: 'id', mapping: 'gid'},
						{name: 'geometry', mapping: 'geometry'},
						{name: 'codcom', mapping: 'properties.codcom'},
						{name: 'ncom', mapping: 'properties.ncom'}
					],
					queriableAttributes:['ncom'],
					sortBy: 'ncom',
					displayField: 'ncom',
					tpl:"<tpl for=\".\"><div class=\"search-item\"><h3>{ncom}</span></h3>(Comune)</div></tpl>"
		});			
        
        this.autoHeight = true;

        this.title= this.searchFieldsetTitle;
        
        this.items = [];
        
        this.items = [{
                xtype: 'combo',
                width: 150,
                id: 'selectionWFSRT_id',
                ref: '../outputType',
                fieldLabel: this.searchLabel,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: false,
                mode: 'local',
                name: 'selection_method',
                forceSelected: true,
                allowBlank: true,
                autoLoad: true,
                displayField: 'label',
                valueField: 'value',
                emptyText: this.selAreaDamageEmptyText,
                valueNotFoundText: this.selAreaDamageEmptyText,
                editable: false,
                readOnly: false,
                store: new Ext.data.JsonStore({
                    fields: [{
                        name: 'name',
                        dataIndex: 'name'
                    }, {
                        name: 'label',
                        dataIndex: 'label'
                    }, {
                        name: 'value',
                        dataIndex: 'value'
                    }],
                    data: [{
                        name: 'ComuniRT',
                        label: 'Comuni',
                        value: 'comunirt'
                    }]
                }),
                listeners: {
                    select: function (c, record, index) {

                        var disabledItems = [];
                        app.toolbar.items.each(function (item) {
                            if (!item.disabled) {
                                disabledItems.push(item);
                            }
                        });

                        for (var i = 0; i < disabledItems.length; i++) {
                            if (disabledItems[i].toggleGroup) {
                                if (disabledItems[i].scope && disabledItems[i].scope.actions) {
                                    for (var a = 0; a < disabledItems[i].scope.actions.length; a++) {
                                        disabledItems[i].scope.actions[a].toggle(false);

                                        if (disabledItems[i].scope.actions[a].menu) {
                                            for (var b = 0; b < disabledItems[i].scope.actions[a].menu.items.items.length; b++) {
                                                disabledItems[i].scope.actions[a].menu.items.items[b].disable();
                                            }
                                        }

                                        disabledItems[i].scope.actions[a].on({
                                            "click": function (evt) {
                                                this.clearDrawFeature();
                                            },
                                            "menushow": function (evt) {
                                                var menuItems = evt.menu.items.items;
                                                for (var i = 0;i<menuItems.length;i++){
                                                        menuItems[i].enable();
                                                    }
                                                this.clearDrawFeature();
                                            },
                                            scope: this
                                        });
                                    }
                                }
                            }
                        }

                        var outputValue = c.getValue();

                        if (outputValue == 'comunirt') {
                            this.searchWFSComuniRT.enable();
							this.searchWFSComuniRT.show();
						}

                    },
                    scope: this
                }
            },
			this.searchWFSComuniRT,
			new Ext.Button({
				id:'clearWFSButton_id',
				text: 'Pulisci',
				iconCls: "cancel",
				handler: function(){
					this.clearDrawFeature();
				},
				scope:this
			})
        ];
        
        this.listeners = {
            'hide': function(){
                this.clearDrawFeature();
            }        
        };
        
        var areaDamage = gxp.form.WFSRTSearchWidget.superclass.initComponent.call(this);
        
        return areaDamage;
    },
    
    getDamageArea: function() {
        if(this.drawings && this.drawings.features && this.drawings.features.length > 0) {
            return this.drawings.features[0].geometry;
        }
        if(this.bufferFieldSet.bufferLayer && this.bufferFieldSet.bufferLayer.features && this.bufferFieldSet.bufferLayer.features.length > 0) {
            return this.bufferFieldSet.bufferLayer.features[0].geometry;
        }
        
        return null;
    },
    
    clearDrawFeature: function(){
        var me = this;

		me.searchWFSComuniRT.hide();
		me.searchWFSComuniRT.geometry = null;
		me.searchWFSComuniRT.clearValue();	
		me.searchWFSComuniRT.newLayer = null;			

		var searchWFSComboComuniRTLayer = me.mapPanel.map.getLayersByName(me.searchWFSComuniRT.highlightLayer)[0];
		if(searchWFSComboComuniRTLayer)			
			me.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);			

		me.items.items[0].setValue('Scegli tipologia selezione area');
    }


});

Ext.reg("gxp_wfsrtsearchwidget", gxp.form.WFSRTSearchWidget);