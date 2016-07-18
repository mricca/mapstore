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
 *  class = spatialFilterGeobasi
 */
/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.geobasi");

/** api: constructor
 *  .. class:: spatialFilterGeobasi(config)
 *
 *    Plugin for Geobasi spatial filter
 */
gxp.geobasi.spatialFilterGeobasi = Ext.extend(Ext.form.FieldSet, {

        /** api: ptype = gxp_spatialfiltergeobasi */
        ptype : "gxp_spatialfiltergeobasi",

        /** api: config[id]
         *  ``String``
         *
         */
        id : "geobasiSpatialFilterId",

        anchor : '100%',

        /** api: config[geobasiSpatialFilterFieldsetTitle]
         * ``String``
         * Text for fieldSet title (i18n).
         */
        geobasiSpatialFilterFieldsetTitle : null,

        /** api: config[geobasiSpatialFilterLabel]
         * ``String``
         * Text for combo label (i18n).
         */
        geobasiSpatialFilterLabel : "Metodo selezione",

        /** api: config[geobasiSpatialFilteEmptyText]
         * ``String``
         * Text for combo empty text (i18n).
         */
        geobasiSpatialFilteEmptyText : "--- Scegli tipologia ---",

        /** api: config[comboPolygonSelection]
         * ``String``
         * Text for Label Polygon (i18n).
         */
        comboPolygonSelection : 'Poligono',

        /** api: config[comboCircleSelection]
         * ``String``
         * Text for Label Circle (i18n).
         */
        comboCircleSelection : 'Cerchio',

        /** api: config[comboBufferSelection]
         * ``String``
         * Text for Label comboBufferSelection (i18n).
         */
        comboBufferSelection : "Buffer",

        comboComuniSelection : "Comuni",

        comboAlluvioniSelection: 'CIS - Poroso',

        comboRocciaSelection: 'CIS - Roccia',

        highlightAlluvioni : "Highlight Alluvioni",

        highlightRoccia : "Highlight Roccia",
        
        highlightComuni : "Highlight Comuni",

        intersectBaciniCheckLabel: 'Interseca con Bacini',
        
        clearSpatialFilterText: 'Rimuovi filtro',
        
        setTipologyAreaSelection: 'Scegli tipologia selezione area',
        
        iconCls : "gxp-icon-select-area-geobasi",

        collapsible : true,

        forceLayout : true, //needed to force to read values from this fieldset

        collapsed : true,

        /** api: config[defaultStyle]
         *  ``Object``
         */
        defaultStyle : {
            "fillColor" : "#FFFFFF",
            "strokeColor" : "#FF0000",
            "fillOpacity" : 0.5,
            "strokeWidth" : 1
        },

        /** api: config[selectStyle]
         *  ``Object``
         */
        selectStyle : {
            "fillColor" : "#FFFFFF",
            "strokeColor" : "#FF0000",
            "fillOpacity" : 0.5,
            "strokeWidth" : 1
        },

        /** api: config[temporaryStyle]
         *  ``Object``
         */
        temporaryStyle : {
            "strokeColor" : "#ee9900",
            "fillColor" : "#ee9900",
            "fillOpacity" : 0.4,
            "strokeWidth" : 1
        },

        initComponent : function () {

            var me = this;

            /*this.bufferFieldSet = new gxp.widgets.form.BufferFieldset({
            anchor: '100%',
            ref: "bufferFieldset",
            collapsed: false,
            hidden: true,
            map: app.mapPanel.map,
            toggleGroup: app.toggleGroup,
            minValue: this.initialConfig.bufferOptions.minValue,
            maxValue: this.initialConfig.bufferOptions.maxValue,
            decimalPrecision: this.initialConfig.bufferOptions.decimalPrecision,
            outputSRS: this.initialConfig.outputSRS,
            //selectStyle: this.initialConfig.selectStyle,
            listeners: {
            disable: function () {
            this.hide();
            },
            enable: function () {
            this.show();
            }
            }
            });*/

            this.searchWFSComboAlluvioni = new gxp.form.WFSSearchComboBox({
                    url : this.localeGeoserverUrl,
                    versionWFS : '1.1.0',
                    typeName : this.typeNameLivelliRTGeobasi['cis_alluvioni'],
                    mapPanel : this.mapPanel,
                    width : 250,
                    anchor : '100%',
                    hidden : true,
                    zoomTo : true,
                    queryParam : 'cql_filter',
                    pageSize : 10,
                    highlightLayer : this.highlightAlluvioni,
                    highlightLayerStyle : {
                        strokeColor : "#FF00FF",
                        strokeWidth : 2,
                        fillColor : "#FF00FF",
                        fillOpacity : 0.2
                    },
                    defaultStyle : this.defaultStyle,
                    selectStyle : this.selectStyle,
                    temporaryStyle : this.temporaryStyle,
                    recordModel : [{
                            name : 'id',
                            mapping : 'id'
                        }, {
                            name : 'geometry',
                            mapping : 'geometry'
                        }, {
                            name : 'codice',
                            mapping : 'properties.codice'
                        }, {
                            name : 'acquifero',
                            mapping : 'properties.acquifero'
                        }
                    ],
                    queriableAttributes : ['acquifero'],
                    sortBy : 'acquifero',
                    displayField : 'acquifero',
                    tpl : "<tpl for=\".\"><div class=\"search-item\"><h3>{acquifero}</span></h3>(Acquifero Alluvioni)</div></tpl>"
                });

            this.searchWFSComboRoccia = new gxp.form.WFSSearchComboBox({
                    url : this.localeGeoserverUrl,
                    versionWFS : '1.1.0',
                    typeName : this.typeNameLivelliRTGeobasi['cis_roccia'],
                    mapPanel : this.mapPanel,
                    width : 250,
                    anchor : '100%',
                    hidden : true,
                    zoomTo : true,
                    queryParam : 'cql_filter',
                    pageSize : 10,
                    highlightLayer : this.highlightRoccia,
                    highlightLayerStyle : {
                        strokeColor : "#FF00FF",
                        strokeWidth : 2,
                        fillColor : "#FF00FF",
                        fillOpacity : 0.2
                    },
                    defaultStyle : this.defaultStyle,
                    selectStyle : this.selectStyle,
                    temporaryStyle : this.temporaryStyle,
                    recordModel : [{
                            name : 'id',
                            mapping : 'id'
                        }, {
                            name : 'geometry',
                            mapping : 'geometry'
                        }, {
                            name : 'codice',
                            mapping : 'properties.codice'
                        }, {
                            name : 'acquifero',
                            mapping : 'properties.acquifero'
                        }
                    ],
                    queriableAttributes : ['acquifero'],
                    sortBy : 'acquifero',
                    displayField : 'acquifero',
                    tpl : "<tpl for=\".\"><div class=\"search-item\"><h3>{acquifero}</span></h3>(Acquifero Roccia)</div></tpl>"
                });

            this.searchWFSComboComuniRT = new gxp.form.WFSSearchComboBox({
                    url : this.remoteGeoserverUrl,
                    versionWFS : '1.1.0',
                    typeName : this.typeNameLivelliRTGeobasi['listacomunirtpoly'],
                    mapPanel : this.mapPanel,
                    width : 250,
                    anchor : '100%',
                    hidden : true,
                    zoomTo : true,
                    queryParam : 'Filter',
                    highlightLayer : this.highlightComuni,
                    highlightLayerStyle : {
                        strokeColor : "#FF00FF",
                        strokeWidth : 2,
                        fillColor : "#0000FF",
                        fillOpacity : 0.8
                    },
                    defaultStyle : this.defaultStyle,
                    selectStyle : this.selectStyle,
                    temporaryStyle : this.temporaryStyle,
                    recordModel : [{
                            name : 'id',
                            mapping : 'gid'
                        }, {
                            name : 'geometry',
                            mapping : 'geometry'
                        }, {
                            name : 'codcom',
                            mapping : 'properties.codcom'
                        }, {
                            name : 'ncom',
                            mapping : 'properties.ncom'
                        }
                    ],
                    queriableAttributes : ['ncom'],
                    sortBy : 'ncom',
                    displayField : 'ncom',
                    tpl : "<tpl for=\".\"><div class=\"search-item\"><h3>{ncom}</span></h3>(Comune)</div></tpl>"
                });

            this.filterCircle;
            this.filterPolygon;
            this.drawings;
            this.draw;

            this.autoHeight = true;

            this.title = this.selAreaDamageFieldsetTitle;

            this.items = [];

            this.items = [{
                    xtype : 'combo',
                    //width: 200,
                    anchor : '100%',
                    id : 'selectionMethod_id',
                    ref : '../outputType',
                    fieldLabel : this.geobasiSpatialFilterLabel,
                    typeAhead : true,
                    triggerAction : 'all',
                    lazyRender : false,
                    mode : 'local',
                    name : 'selection_method',
                    forceSelected : true,
                    allowBlank : true,
                    autoLoad : true,
                    displayField : 'label',
                    valueField : 'value',
                    emptyText : this.geobasiSpatialFilteEmptyText,
                    valueNotFoundText : this.geobasiSpatialFilteEmptyText,
                    editable : false,
                    readOnly : false,
                    store : new Ext.data.JsonStore({
                        fields : [{
                                name : 'name',
                                dataIndex : 'name'
                            }, {
                                name : 'label',
                                dataIndex : 'label'
                            }, {
                                name : 'value',
                                dataIndex : 'value'
                            }
                        ],
                        data : [{
                                name : 'Polygon',
                                label : this.comboPolygonSelection,
                                value : 'polygon'
                            }, {
                                name : 'ComuniRT',
                                label : this.comboComuniSelection,
                                value : 'comunirt'
                            }, /* {
                            name: 'Circle',
                            label: this.comboCircleSelection,
                            value: 'circle'
                            }, {
                            name: 'Buffer',
                            label: this.comboBufferSelection,
                            value: 'buffer'
                            },*/
                            {
                                name : 'AcquiferoAll',
                                label : this.comboAlluvioniSelection,
                                value : 'acquiferoall'
                            }, {
                                name : 'AcquiferoRocc',
                                label : this.comboRocciaSelection,
                                value : 'acquiferorocc'
                            }
                        ]
                    }),
                    listeners : {
                        select : function (c, record, index) {

                            this.baciniintersect.disable();
                            this.baciniintersect.setValue(false);

                            //this.bufferFieldSet.resetPointSelection();
                            //this.bufferFieldSet.coordinatePicker.toggleButton(false);

                            /*var disabledItems = [];
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
                            for (var i = 0; i < menuItems.length; i++) {
                            menuItems[i].enable();
                            }
                            this.clearDrawFeature();
                            },
                            scope: this
                            });
                            }
                            }
                            }
                            }*/

                            var outputValue = c.getValue();
                            if (me.draw) {
                                me.draw.deactivate()
                            };
                            me.enableAllFunc();
                            if (me.drawings) {
                                me.drawings.destroyFeatures()
                            };
                            if (me.filterCircle) {
                                me.filterCircle = new OpenLayers.Filter.Spatial({})
                            };
                            if (me.filterPolygon) {
                                me.filterPolygon = new OpenLayers.Filter.Spatial({})
                            };

                            if (outputValue == 'circle') {
                                this.searchWFSComboAlluvioni.disable();
                                this.searchWFSComboAlluvioni.hide();
                                this.searchWFSComboAlluvioni.clearValue();
                                this.searchWFSComboAlluvioni.geometry = null;
                                this.searchWFSComboAlluvioni.newLayer = null;

                                var searchWFSComboAlluvioniLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboAlluvioni.highlightLayer)[0];

                                if (searchWFSComboAlluvioniLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

                                this.searchWFSComboRoccia.disable();
                                this.searchWFSComboRoccia.hide();
                                this.searchWFSComboRoccia.clearValue();
                                this.searchWFSComboRoccia.geometry = null;
                                this.searchWFSComboRoccia.newLayer = null;

                                var searchWFSComboRocciaLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboRoccia.highlightLayer)[0];

                                if (searchWFSComboRocciaLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

                                this.searchWFSComboComuniRT.disable();
                                this.searchWFSComboComuniRT.hide();
                                this.searchWFSComboComuniRT.clearValue();
                                this.searchWFSComboComuniRT.geometry = null;
                                this.searchWFSComboComuniRT.newLayer = null;

                                var searchWFSComboComuniRTLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboComuniRT.highlightLayer)[0];

                                if (searchWFSComboComuniRTLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);

                                //this.bufferFieldset.disable();

                                me.drawings = new OpenLayers.Layer.Vector({}, {
                                        displayInLayerSwitcher : false
                                    });

                                app.mapPanel.map.addLayer(me.drawings);
                                var polyOptions = {
                                    sides : 100
                                };

                                me.draw = new OpenLayers.Control.DrawFeature(
                                        me.drawings,
                                        OpenLayers.Handler.RegularPolygon, {
                                        handlerOptions : polyOptions
                                    });

                                app.mapPanel.map.addControl(me.draw);
                                me.draw.activate();

                                me.drawings.events.on({
                                    "featureadded" : function (event) {
                                        me.filterCircle = new OpenLayers.Filter.Spatial({
                                                type : OpenLayers.Filter.Spatial.INTERSECTS,
                                                property : "geom",
                                                value : event.feature.geometry
                                            });
                                        me.baciniintersect.enable();
                                    },
                                    "beforefeatureadded" : function (event) {
                                        me.drawings.destroyFeatures();
                                    }
                                });

                            } else if (outputValue == 'polygon') {
                                this.searchWFSComboAlluvioni.disable();
                                this.searchWFSComboAlluvioni.hide();
                                this.searchWFSComboAlluvioni.clearValue();
                                this.searchWFSComboAlluvioni.geometry = null;
                                this.searchWFSComboAlluvioni.newLayer = null;

                                var searchWFSComboAlluvioniLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboAlluvioni.highlightLayer)[0];

                                if (searchWFSComboAlluvioniLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

                                this.searchWFSComboRoccia.disable();
                                this.searchWFSComboRoccia.hide();
                                this.searchWFSComboRoccia.clearValue();
                                this.searchWFSComboRoccia.geometry = null;
                                this.searchWFSComboRoccia.newLayer = null;

                                var searchWFSComboRocciaLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboRoccia.highlightLayer)[0];

                                if (searchWFSComboRocciaLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

                                this.searchWFSComboComuniRT.disable();
                                this.searchWFSComboComuniRT.hide();
                                this.searchWFSComboComuniRT.clearValue();
                                this.searchWFSComboComuniRT.geometry = null;
                                this.searchWFSComboComuniRT.newLayer = null;

                                var searchWFSComboComuniRTLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboComuniRT.highlightLayer)[0];

                                if (searchWFSComboComuniRTLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);

                                //this.bufferFieldset.disable();

                                me.drawings = new OpenLayers.Layer.Vector({}, {
                                        displayInLayerSwitcher : false,
                                        styleMap : new OpenLayers.StyleMap({
                                            "default" : this.defaultStyle,
                                            "select" : this.selectStyle,
                                            "temporary" : this.temporaryStyle
                                        })
                                    });

                                app.mapPanel.map.addLayer(me.drawings);

                                me.draw = new OpenLayers.Control.DrawFeature(
                                        me.drawings,
                                        OpenLayers.Handler.Polygon);

                                //me.draw.handler.stopDown = true;
                                //me.draw.handler.stopUp = true;
                                me.disableAllFunc();
                                app.mapPanel.map.addControl(me.draw);
                                me.draw.activate();

                                me.drawings.events.on({
                                    "featureadded" : function (event) {
                                        me.filterPolygon = new OpenLayers.Filter.Spatial({
                                                type : OpenLayers.Filter.Spatial.INTERSECTS,
                                                property : "geom",
                                                value : event.feature.geometry
                                            });

                                        if (me.draw) {
                                            me.draw.deactivate();
                                            me.enableAllFunc();
                                        };

                                        me.selectGeometry = event.feature;
                                        me.baciniintersect.enable();
                                        if (app.tools.geobasidataToolId)
                                            app.tools.geobasidataToolId.clearSelection();
                                    },
                                    "beforefeatureadded" : function (event) {
                                        me.drawings.destroyFeatures();
                                    },
                                    scope : me
                                });

                            } else if (outputValue == 'buffer') {
                                this.searchWFSComboAlluvioni.disable();
                                this.searchWFSComboAlluvioni.hide();
                                this.searchWFSComboAlluvioni.clearValue();
                                this.searchWFSComboAlluvioni.geometry = null;
                                this.searchWFSComboAlluvioni.newLayer = null;

                                var searchWFSComboAlluvioniLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboAlluvioni.highlightLayer)[0];

                                if (searchWFSComboAlluvioniLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

                                this.searchWFSComboRoccia.disable();
                                this.searchWFSComboRoccia.hide();
                                this.searchWFSComboRoccia.clearValue();
                                this.searchWFSComboRoccia.geometry = null;
                                this.searchWFSComboRoccia.newLayer = null;

                                var searchWFSComboRocciaLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboRoccia.highlightLayer)[0];

                                if (searchWFSComboRocciaLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

                                this.searchWFSComboComuniRT.disable();
                                this.searchWFSComboComuniRT.hide();
                                this.searchWFSComboComuniRT.clearValue();
                                this.searchWFSComboComuniRT.geometry = null;
                                this.searchWFSComboComuniRT.newLayer = null;

                                var searchWFSComboComuniRTLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboComuniRT.highlightLayer)[0];

                                if (searchWFSComboComuniRTLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);

                                //this.bufferFieldSet.enable();
                                //this.bufferFieldset.doLayout(true,false);
                            } else if (outputValue == 'acquiferoall') {

                                this.searchWFSComboRoccia.disable();
                                this.searchWFSComboRoccia.hide();
                                this.searchWFSComboRoccia.clearValue();
                                this.searchWFSComboRoccia.geometry = null;
                                this.searchWFSComboRoccia.newLayer = null;

                                var searchWFSComboRocciaLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboRoccia.highlightLayer)[0];

                                if (searchWFSComboRocciaLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

                                this.searchWFSComboComuniRT.disable();
                                this.searchWFSComboComuniRT.hide();
                                this.searchWFSComboComuniRT.clearValue();
                                this.searchWFSComboComuniRT.geometry = null;
                                this.searchWFSComboComuniRT.newLayer = null;

                                var searchWFSComboComuniRTLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboComuniRT.highlightLayer)[0];

                                if (searchWFSComboComuniRTLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);

                                //this.bufferFieldset.disable();
                                this.searchWFSComboAlluvioni.enable();
                                this.searchWFSComboAlluvioni.show();
                                //this.searchWFSComboAlluvioni.doLayout(true,false);

                            } else if (outputValue == 'acquiferorocc') {
                                this.searchWFSComboAlluvioni.disable();
                                this.searchWFSComboAlluvioni.hide();
                                this.searchWFSComboAlluvioni.clearValue();
                                this.searchWFSComboAlluvioni.geometry = null;
                                this.searchWFSComboAlluvioni.newLayer = null;

                                var searchWFSComboAlluvioniLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboAlluvioni.highlightLayer)[0];

                                if (searchWFSComboAlluvioniLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

                                this.searchWFSComboComuniRT.disable();
                                this.searchWFSComboComuniRT.hide();
                                this.searchWFSComboComuniRT.clearValue();
                                this.searchWFSComboComuniRT.geometry = null;
                                this.searchWFSComboComuniRT.newLayer = null;

                                var searchWFSComboComuniRTLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboComuniRT.highlightLayer)[0];

                                if (searchWFSComboComuniRTLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);

                                //this.bufferFieldset.disable();
                                this.searchWFSComboRoccia.enable();
                                this.searchWFSComboRoccia.show();
                                //this.searchWFSComboAlluvioni.doLayout(true,false);

                            } else {
                                this.searchWFSComboAlluvioni.disable();
                                this.searchWFSComboAlluvioni.hide();
                                this.searchWFSComboAlluvioni.clearValue();
                                this.searchWFSComboAlluvioni.geometry = null;
                                this.searchWFSComboAlluvioni.newLayer = null;

                                var searchWFSComboAlluvioniLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboAlluvioni.highlightLayer)[0];

                                if (searchWFSComboAlluvioniLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

                                this.searchWFSComboRoccia.disable();
                                this.searchWFSComboRoccia.hide();
                                this.searchWFSComboRoccia.clearValue();
                                this.searchWFSComboRoccia.geometry = null;
                                this.searchWFSComboRoccia.newLayer = null;

                                var searchWFSComboRocciaLayer = this.mapPanel.map.getLayersByName(this.searchWFSComboRoccia.highlightLayer)[0];

                                if (searchWFSComboRocciaLayer)
                                    this.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

                                //this.bufferFieldset.disable();
                                this.searchWFSComboComuniRT.enable();
                                this.searchWFSComboComuniRT.show();
                                //this.searchWFSComboAlluvioni.doLayout(true,false);

                            }
                        },
                        scope : this
                    }
                },
                //this.bufferFieldSet,
                this.searchWFSComboComuniRT,
                this.searchWFSComboAlluvioni,
                this.searchWFSComboRoccia, {
                    xtype : 'checkbox',
                    anchor : '100%',
                    fieldLabel : this.intersectBaciniCheckLabel,
                    ref : 'baciniintersect',
                    name : 'baciniintersect',
                    checked : false,
                    disabled : true,
                    listeners : {}
                },
                new Ext.Button({
                    id : 'clearButton_id',
                    text : this.clearSpatialFilterText,
                    iconCls : "cancel",
                    handler : function () {
                        this.clearDrawFeature();
                    },
                    scope : this
                })
            ];

            this.listeners = {
                'hide' : function (fieldset) {
                    this.clearDrawFeature();
                }
                /*,
                'expand': function(){
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
                }*/
            };

            this.areaDamage = gxp.geobasi.spatialFilterGeobasi.superclass.initComponent.call(this);

            //Enable disable bacini intersect according to combosearch selection
            this.searchWFSComboAlluvioni.on('select', function () {
                this.baciniintersect.enable();

            }, this);

            this.searchWFSComboAlluvioni.on('focus', function () {
                this.baciniintersect.disable();
                this.baciniintersect.setValue(false);

            }, this);

            this.searchWFSComboRoccia.on('select', function () {
                this.baciniintersect.enable();

            }, this);

            this.searchWFSComboRoccia.on('focus', function () {
                this.baciniintersect.disable();
                this.baciniintersect.setValue(false);

            }, this);

            this.searchWFSComboComuniRT.on('select', function () {
                this.baciniintersect.enable();

            }, this);

            this.searchWFSComboComuniRT.on('focus', function () {
                this.baciniintersect.disable();
                this.baciniintersect.setValue(false);

            }, this);

            return this.areaDamage;
        },

        getDamageArea : function () {
            if (this.drawings && this.drawings.features && this.drawings.features.length > 0) {
                return this.drawings.features[0].geometry;
            }
            /*if(this.bufferFieldSet.bufferLayer && this.bufferFieldSet.bufferLayer.features && this.bufferFieldSet.bufferLayer.features.length > 0) {
            return this.bufferFieldSet.bufferLayer.features[0].geometry;
            }*/

            return null;
        },

        clearDrawFeature : function () {
            var me = this;

            me.baciniintersect.disable();
            me.baciniintersect.setValue(false);

            if (me.draw) {
                me.draw.deactivate();
            };
            if (me.drawings) {
                me.drawings.destroyFeatures();
            };
            if (me.filterCircle) {
                me.filterCircle = new OpenLayers.Filter.Spatial({});
            };
            if (me.filterPolygon) {
                me.filterPolygon = new OpenLayers.Filter.Spatial({});
            };
            /*me.bufferFieldSet.resetPointSelection();
            me.bufferFieldSet.coordinatePicker.toggleButton(false);
            if(me.bufferFieldSet.hidden === false){
            me.bufferFieldSet.hide();
            }*/
            //if(me.searchWFSComboAlluvioni.hidden === false){
            me.searchWFSComboAlluvioni.hide();
            me.searchWFSComboAlluvioni.geometry = null;
            me.searchWFSComboAlluvioni.clearValue();
            me.searchWFSComboAlluvioni.newLayer = null;
            //}
            //if(me.searchWFSComboRoccia.hidden === false){
            me.searchWFSComboRoccia.hide();
            me.searchWFSComboRoccia.geometry = null;
            me.searchWFSComboRoccia.clearValue();
            me.searchWFSComboRoccia.newLayer = null;

            me.searchWFSComboComuniRT.hide();
            me.searchWFSComboComuniRT.geometry = null;
            me.searchWFSComboComuniRT.clearValue();
            me.searchWFSComboComuniRT.newLayer = null;

            var searchWFSComboAlluvioniLayer = me.mapPanel.map.getLayersByName(me.searchWFSComboAlluvioni.highlightLayer)[0];
            if (searchWFSComboAlluvioniLayer)
                me.mapPanel.map.removeLayer(searchWFSComboAlluvioniLayer);

            var searchWFSComboRocciaLayer = me.mapPanel.map.getLayersByName(me.searchWFSComboRoccia.highlightLayer)[0];
            if (searchWFSComboRocciaLayer)
                me.mapPanel.map.removeLayer(searchWFSComboRocciaLayer);

            var searchWFSComboComuniRTLayer = me.mapPanel.map.getLayersByName(me.searchWFSComboComuniRT.highlightLayer)[0];
            if (searchWFSComboComuniRTLayer)
                me.mapPanel.map.removeLayer(searchWFSComboComuniRTLayer);
            //}
            me.items.items[0].setValue(this.setTipologyAreaSelection);

            me.enableAllFunc();

            if (app.tools.geobasidataToolId)
                app.tools.geobasidataToolId.clearSelection();
        },
        /*
         * private: method[disableAllFunc]
         */
        disableAllFunc : function () {

            var map = app.mapPanel.map;

            var navigation = map.getControlsByClass('OpenLayers.Control.Navigation');
            var panPanel = map.getControlsByClass('OpenLayers.Control.PanPanel');
            var zoomPanel = map.getControlsByClass('OpenLayers.Control.ZoomPanel');

            navigation[0].deactivate();
            navigation[1].deactivate();
            panPanel[0].deactivate();
            zoomPanel[0].deactivate();

            /*var south = Ext.getCmp('south');
            if (south) {
            south.disable();
            }
            var east = Ext.getCmp('east');
            if (east) {
            east.disable();
            }
            var tree = Ext.getCmp('tree');
            if (tree) {
            var panel = tree.findParentByType('panel');
            if (panel) {
            panel.disable();
            }
            }*/

            for (var map in app.mapPanel.items.items) {
                if (app.mapPanel.items.items[map].xtype == "gx_zoomslider") {
                    app.mapPanel.items.items[map].hide();
                }
                if (app.mapPanel.items.items[map].xtype == "gxp_scaleoverlay") {
                    app.mapPanel.items.items[map].hide();
                }
            }

            for (var items in app.toolbar.items.items) {
                if (app.toolbar.items.items[items].id == "full-screen-button") {
                    app.toolbar.items.items[items].disable();
                }
            }

            app.toolbar.disable();

            /*if (app.tools.synchronizer_plugin)
            app.tools.synchronizer_plugin.actions[0].enable();*/

        },
        /*
         * private: method[enableAllFunc]
         */
        enableAllFunc : function () {

            var map = app.mapPanel.map;

            var navigation = map.getControlsByClass('OpenLayers.Control.Navigation');
            var panPanel = map.getControlsByClass('OpenLayers.Control.PanPanel');
            var zoomPanel = map.getControlsByClass('OpenLayers.Control.ZoomPanel');

            navigation[0].activate();
            navigation[1].activate();
            panPanel[0].activate();
            zoomPanel[0].activate();

            /*var south = Ext.getCmp('south');
            if (south) {
            south.enable();
            }
            var east = Ext.getCmp('east');
            if (east) {
            east.enable();
            }
            var tree = Ext.getCmp('tree');
            if (tree) {
            var panel = tree.findParentByType('panel');
            if (panel) {
            panel.enable();
            }
            }*/

            for (var a = 0; a < app.mapPanel.items.items.length; a++) {
                if (app.mapPanel.items.items[a].xtype == "gx_zoomslider") {
                    app.mapPanel.items.items[a].show();
                }
                if (app.mapPanel.items.items[a].xtype == "gxp_scaleoverlay") {
                    app.mapPanel.items.items[a].show();
                }
            }

            for (var items in app.toolbar.items.items) {
                if (app.toolbar.items.items[items].id == "full-screen-button") {
                    app.toolbar.items.items[items].enable();
                }
            }

            app.toolbar.enable();
        }

    });

Ext.reg("gxp_spatialfiltergeobasi", gxp.geobasi.spatialFilterGeobasi);