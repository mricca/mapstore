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

    /**
    * i18n Start
    */
    selElabMethodLabel: 'Seleziona tipologia valori',
    mainLoadingMask: "Caricamento date in corso...",
    dataTabText: 'Dati',
    updateCountFieldsetTitle: 'Riepilogo selezione',
    updateCountTotAnalisiText: 'Totale Analisi selezionate:',
    updateCountTipoMatriceText: 'Tipo Matrice:',
    updateCountElementoText: 'Elemento:',
    updateCountMetAnaliticoText: 'Metodo Analitico:',
    updateCountAreaGeoText: 'Area Geografica:',
    updateCountIntTempText: 'Intervallo temporale:',
    updateCountMonitoraggioText: 'Presenza monitoraggio:',
    rangeYearFieldsetTitle: 'Selezione intervallo temporale',
    selAreaDamageFieldsetTitle: 'Selezione area geografica',
    rangeYearNullValueLabel: 'Includi valori nulli',
    monitoraggioFieldsetTitle: 'Selezione presenza monitoraggio',
    monitoraggioLabel: 'Monitoraggio',
    monitoringTypeDropDownLabelAll: 'Tutte le tipologie',
    monitoringTypeDropDownLabelYes: 'Monitoraggio SI',
    monitoringTypeDropDownLabelNo: 'Monitoraggio NO',
    matrixElemMethodFieldsetTitle: 'Selezione Matrice - Elemento - Metodo Analitico',
    matrixTypeSelectionLabel: 'Tipo Matrice',
    selectionMatrixEmptyText: '-- Seleziona Tipo Matrice --',
    selectionMatrixValueNotFoundText: '-- Seleziona Tipo Matrice --',
    genericText: '(generico)',
    waterMatrix: 'Acqua',
    soilMatrix: 'Terreno',
    elementSelectionTypeLabel: "Tipologia Elemento",
    elementTypeCheckLabel: 'Elementi',
    oxideTypeCheckLabel: 'Ossidi',
    redoxTypeCheckLabel: 'Redox',
    isotopeTypeCheckLabel: 'Isotopi',
    elementSelectionLabel: 'Elemento',
    selectionElementEmptyText: "-- Seleziona Elemento --",
    selectionElementValueNotFoundText: "-- Seleziona Elemento --",
    analyticalMethodSelectionLabel: 'Metodo Analitico',
    selectionMethodEmptyText: "-- Seleziona Metodo Analitico --",
    selectionMethodNotFoundText: "-- Seleziona Metodo Analitico --",
    transformationMethodsFieldsetTitle: 'Metodi trasformazione dati',
    elabMethodTypeRealValueLabel: 'Valori reali',
    elabMethodTypeLogarithmicScaleLabel: 'Scala logaritmica',
    downloadPanelTitle: "DOWNLOAD SELEZIONE",
    downloadPanelDownloadSelectionText: 'Scarica Selezione (CSV)',
    downloadPanelViewSelectionText: 'Visualizza Selezione',
    downloadPanelViewSelectionTooltip: 'Visualizza Selezione',
    downloadPanelDownloadSelectionTooltip: 'Scarica Selezione (CSV)',
    statisticalAnalysisPanelTitle: "ANALISI STATISTICA GRAFICO NUMERICA",
    statisticalAnalysisButtonBoxPlotText: 'Box Plot',
    statisticalAnalysisButtonHistogramText: 'Istogramma',
    statisticalAnalysisButtonCumulativeCurveText: 'Curva Cumul.',
    viewChartTooltip: 'Visualizza Grafico',
    errorNoDataResponseTitle: "Nessun dato",
    errorNoDataResponseText: "Dati non disponibili per questo criterio di ricerca",
    tuscanyRegionText: 'Regione Toscana',
    msgInfoAlertTitle: 'Informazione',
    msgAlertNoImplementedFunctionality: 'Funzionalità in fase di implementazione!',
    msgAlertSelectionInfoTitle: 'Selezione',
    msgAlertSelectionInfoText: 'La selezione impostata ha restituito 0 analisi!',
    /**
    * i18n End
    */

    localeGeoserverUrl: null,
    remoteGeoserverUrl: null,
    typeNameLivelliRTGeobasi: {},
    typeNameDistinctGeobasi: {},
    typeNameGeobasiElab:{},

    init: function(target) {
        target.on({
            scope: this,
            'ready': function() {
                this.output.on("show", function() {}, this);
            }
        });
        return gxp.plugins.geobasi.GeobasiData.superclass.init.apply(this, arguments);
    },
    addOutput: function(config) {

        var me = this;

        this._newGeometryViewparams = 'POLYGON((965523.68377232947386801 5388020.56055717170238495\\,' +
                                                '2315632.81207791296765208 5389637.45771681889891624\\,' +
                                                '2317249.70923756016418338 5389637.45771681889891624\\,' +
                                                '2317249.70923756016418338 4383927.4244161332026124\\,' +
                                                '965523.68377232959028333 4383927.4244161332026124\\,' +
                                                '965523.68377232947386801 5388020.56055717170238495))';

        this.selectionObject = {
            matrix: '-',
            element: '-',
            method: '-'
        };

        Ext.Panel.prototype.buttonAlign = 'left';

        this.areaSelection = new gxp.geobasi.spatialFilterGeobasi(Ext.apply({
            selAreaDamageFieldsetTitle: '<span style="color:#C53430;">'+this.selAreaDamageFieldsetTitle+'</span>',
            localeGeoserverUrl: this.localeGeoserverUrl,
            remoteGeoserverUrl: this.remoteGeoserverUrl,
            typeNameLivelliRTGeobasi: this.typeNameLivelliRTGeobasi,
            map: app.mapPanel.map,
            mapPanel: app.mapPanel
        }, this.outputConfig));

        var matrixStore = new Ext.data.JsonStore({
            baseParams: {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: this.typeNameDistinctGeobasi['matrix'],
                outputFormat: 'json',
                sortBy: 'matrix_cod'
            },
            fields: [{
                "name": "count",
                "mapping": "properties.count"
            }, {
                "name": "matrix_cod",
                "mapping": "properties.matrix_cod"
            }, {
                "name": "matrix",
                "mapping": "properties.matrix_" + GeoExt.Lang.locale
            }],
            autoLoad: true,
            url: this.localeGeoserverUrl,
            root: 'features',
            idProperty: 'id'
        });

        var elementsStore = new Ext.data.JsonStore({
            baseParams: {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: this.typeNameDistinctGeobasi['elements'],
                outputFormat: 'json',
                sortBy: 'element'
            },
            fields: [{
                "name": "count",
                "mapping": "properties.count"
            }, {
                "name": "element",
                "mapping": "properties.element"
            }, {
                "name": "element_descr",
                "mapping": "properties.element_descr_" + GeoExt.Lang.locale
            }],
            autoLoad: true,
            url: this.localeGeoserverUrl,
            root: 'features',
            idProperty: 'id'
        });

        elementsStore.on('load',function(store, records, options){
            if(store.totalLength === 0){
                this.checkEmptyStore(store,{
                    count: 0,
                    element: this.errorNoDataResponseTitle
                });
            }
        },this);

        var methodStore = new Ext.data.JsonStore({
            baseParams: {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: this.typeNameDistinctGeobasi['method'],
                outputFormat: 'json',
                sortBy: 'method'
            },
            fields: [{
                "name": "count",
                "mapping": "properties.count"
            }, {
                "name": "method",
                "mapping": "properties.method"
            }, {
                "name": "method_descr",
                "mapping": "properties.method_descr_" + GeoExt.Lang.locale
            }],
            autoLoad: true,
            url: this.localeGeoserverUrl,
            root: 'features',
            idProperty: 'id'
        });

        var geobasiData = new Ext.form.FormPanel({
            xtype: 'form',
            baseCls: 'x-plain',
            id: "geobasiDataForm",
            title: this.dataTabText,
            layout: "form",
            autoScroll: true,
            frame: true,
            forceLayout: true,
            items: [{
                xtype: "fieldset",
                id: "updateCountID",
                ref: "updateCount",
                title: '<span style="color:#C53430;">' + this.updateCountFieldsetTitle + '</span>',
                checkboxToggle: false,
                collapsed: false,
                hidden: false,
                forceLayout: true,
                cls: 'geobasi-tot-analisi',
                listeners: {
                    scope: this,
                    expand: function(panel) {
                        panel.doLayout();
                    },
                    collapse: function(panel) {},
                    afterrender: function(panel) {
                        panel.body.update(
                            '<table class="table table-condensed">' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountTotAnalisiText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">-</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountTipoMatriceText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">-</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountElementoText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">-</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountMetAnaliticoText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">-</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountAreaGeoText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">'+this.tuscanyRegionText+'</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountIntTempText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">1950 - 2015</td>' +
                                '</tr>' +
                                '<tr >' +
                                    '<th rowspan="1" style="border:0px">'+this.updateCountMonitoraggioText+'</th>' +
                                    '<td style="border:0px;vertical-align:bottom">'+this.monitoringTypeDropDownLabelAll+'</td>' +
                                '</tr>' +
                            '</table>'
                        );
                    }
                }
            },
                this.areaSelection,
            {
                xtype: 'fieldset',
                title: '<span style="color:#C53430;">'+this.rangeYearFieldsetTitle+'</span>',
                anchor: '100%',
                ref: 'rangeyear',
                collapsible: true,
                forceLayout: true,
                collapsed: false,
                iconCls: "gxp-icon-time-range",
                listeners: {
                    expand: function(fieldset) {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                        fieldset.doLayout(false, true);
                    },
                    'collapse': function(fieldset) {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                        fieldset.doLayout(false, true);
                    }
                },
                items: [{
                    xtype: 'checkbox',
                    anchor: '100%',
                    fieldLabel: this.rangeYearNullValueLabel,
                    ref: 'allownull',
                    name: 'allownull',
                    checked: true,
                    listeners: {
                        check: function(checkbox, checked) {
                            this.clearSelection();
                        },
                        scope: this
                    }
                }, {
                    ref: 'yearRangeSelector',
                    xtype: 'yearrangeselector',
                    anchor: '100%',
                    listeners: {
                        scope: this,
                        change: function(start, end) {},
                        afterrender: function(component) {
                            this.setMinMaxValues();
                            if (this.output.rangeyear.yearRangeSelector != component)
                                return;
                        }
                    }
                }]
            }, {
                xtype: 'fieldset',
                title: '<span style="color:#C53430;">'+this.monitoraggioFieldsetTitle+'</span>',
                anchor: '100%',
                ref: 'monitoraggioFieldset',
                iconCls: 'gxp-icon-geobasi-monitoraggio',
                collapsible: true,
                forceLayout: true,
                collapsed: true,
                listeners: {
                    expand: function() {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                    },
                    'collapse': function() {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                    }
                },
                items: [{
                    xtype: 'combo',
                    ref: '../monitoraggio',
                    id: 'monitoraggioId',
                    anchor: '100%',
                    fieldLabel: this.monitoraggioLabel,
                    typeAhead: true,
                    triggerAction: 'all',
                    lazyRender: false,
                    mode: 'local',
                    name: 'tipomonitoraggio',
                    forceSelected: true,
                    allowBlank: false,
                    autoLoad: true,
                    displayField: 'label',
                    valueField: 'coeff',
                    value: "01",
                    readOnly: false,
                    listeners: {
                        select: this.clearSelection,
                        scope: this
                    },
                    store: new Ext.data.JsonStore({
                        fields: [{
                            name: 'name',
                            dataIndex: 'name'
                        }, {
                            name: 'label',
                            dataIndex: 'label'
                        }, {
                            name: 'coeff',
                            dataIndex: 'coeff'
                        }, {
                            name: 'shortName',
                            dataindex: 'shortName'
                        }, {
                            name: 'cid',
                            dataindex: 'cid'
                        }],
                        data: [{
                            label: this.monitoringTypeDropDownLabelAll,
                            coeff: "01"
                        }, {
                            label: this.monitoringTypeDropDownLabelYes,
                            coeff: "02"
                        }, {
                            label: this.monitoringTypeDropDownLabelNo,
                            coeff: "03"
                        }]
                    })
                }]
            }, {
                xtype: 'fieldset',
                title: '<span style="color:#C53430;">'+this.matrixElemMethodFieldsetTitle+'</span>',
                anchor: '100%',
                ref: 'matrixElemMethodFieldset',
                collapsible: false,
                forceLayout: true,
                collapsed: false,
                iconCls: "gxp-icon-select-elem-geobasi",
                items: [{
                    xtype: 'combo',
                    ref: '../matrixType',
                    id: 'matrixTypeId',
                    anchor: '100%',
                    fieldLabel: this.matrixTypeSelectionLabel,
                    typeAhead: false,
                    editable: false,
                    listWidth: 270,
                    triggerAction: 'all',
                    lazyRender: false,
                    mode: 'remote',
                    name: 'tipo_matrice',
                    forceSelection: true,
                    allowBlank: true,
                    autoLoad: true,
                    displayField: 'matrix',
                    valueField: 'matrix_cod',
                    readOnly: false,
                    selectOnFocus: true,
                    lastQuery: '',
                    store: matrixStore,
                    resizable: true,
                    emptyText: this.selectionMatrixEmptyText,
                    valueNotFoundText: this.selectionMatrixValueNotFoundText,
                    scope: me,
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
                    tpl: new Ext.XTemplate(
                        '<tpl for=\".\" >' +

                            '<tpl  if="matrix_cod == \'01\'">' +
                                '<div id="acqua_id" class=\"x-combo-list-item\"><h4 style="color:#C53430;">{matrix} - '+this.genericText+' -> n°: 0</h4></div>' +
                            '</tpl>' +

                            '<tpl  if="matrix_cod == \'02\'">' +
                                '<div id="terreno_id" class=\"x-combo-list-item\"><h4 style="color:#C53430;">{matrix} - '+this.genericText+' -> n°: 0</h4></div>' +
                            '</tpl>' +

                            '<tpl if="matrix_cod !== \'01\' && matrix_cod !== \'02\'">' +
                                '<div class=\"x-combo-list-item\"><li style="padding-left:1em;">{matrix} -> n°: {[this.getCount(values)]}</li></div>' +
                            '</tpl>' +

                        '</tpl>',
                        {
                            getCount: function(values){
                                var count = values.count;
                                return count;
                            }
                        }
                    )
                },{
                    fieldLabel: this.elementSelectionTypeLabel,
                    xtype: 'radiogroup',
                    anchor: '100%',
                    hidden: false,
                    disabled: true,
                    //autoHeight: true,
                    columns: 2,
                    vertical: true,
                    checkboxToggle: true,
                    name: '../selElementType',
                    ref: '../selElementType',
                    defaultType: 'radio',
                    listeners: {
                        change: {
                            fn: me.onRadioElementTypeChange,
                            scope: me
                        }
                    },
                    items: [{
                        boxLabel: this.elementTypeCheckLabel,
                        name: 'elementType',
                        inputValue: 1,
                        checked: true
                    }, {
                        boxLabel: this.oxideTypeCheckLabel,
                        name: 'elementType',
                        inputValue: 2
                    }, {
                        boxLabel: this.redoxTypeCheckLabel,
                        name: 'elementType',
                        inputValue: 3
                    }, {
                        boxLabel: this.isotopeTypeCheckLabel,
                        name: 'elementType',
                        inputValue: 4
                    }]
                }, {
                    xtype: 'combo',
                    ref: '../elemento',
                    anchor: '100%',
                    fieldLabel: this.elementSelectionLabel,
                    typeAhead: false,
                    editable: false,
                    triggerAction: 'all',
                    lazyRender: true,
                    mode: 'remote',
                    autoLoad: true,
                    forceSelected: true,
                    allowBlank: false,
                    name: 'elemento',
                    displayField: 'element',
                    valueField: 'element',
                    lastQuery: '',
                    emptyText: this.selectionElementEmptyText,
                    valueNotFoundText: this.selectionElementValueNotFoundText,
                    readOnly: false,
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
                    tpl: new Ext.XTemplate('<tpl for=\".\">', '<div class=\"x-combo-list-item\">{element} - ({element_descr}) -> n°: {count}</div>', '</tpl>')
                }, {
                    xtype: 'combo',
                    ref: '../metodoAnalitico',
                    anchor: '100%',
                    fieldLabel: this.analyticalMethodSelectionLabel,
                    typeAhead: false,
                    editable: false,
                    triggerAction: 'all',
                    lazyRender: true,
                    mode: 'remote',
                    autoLoad: true,
                    resizable: true,
                    forceSelected: true,
                    allowBlank: false,
                    name: 'Metodo_analitico',
                    displayField: 'method_descr',
                    valueField: 'method',
                    lastQuery: '',
                    emptyText: this.selectionMethodEmptyText,
                    valueNotFoundText: this.selectionMethodNotFoundText,
                    disabled: true,
                    readOnly: false,
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
                    tpl: new Ext.XTemplate('<tpl for=\".\">', '<div class=\"x-combo-list-item\">{method_descr} -> n°: {count}</div>', '</tpl>')
                }, new Ext.Button({
                    text: 'Reset',
                    iconCls: 'cancel',
                    tooltip: 'Reset',
                    handler: function() {
                        this.clearSelection();
                    },
                    scope: this
                })]
            }, {
                xtype: 'fieldset',
                title: '<span style="color:#C53430;">'+this.transformationMethodsFieldsetTitle+'</span>',
                anchor: '100%',
                ref: 'transformationMethodsFieldset',
                collapsible: true,
                forceLayout: true,
                collapsed: true,
                iconCls: "gxp-icon-select-log-geobasi",
                listeners: {
                    expand: function(fieldset) {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                        fieldset.doLayout(false, true);
                    },
                    'collapse': function(fieldset) {
                        for (var tool in app.tools) {
                            if (app.tools[tool].ptype == "gxp_maingeobasi") {
                                app.tools[tool].adjustLayout();
                            }
                        }
                        fieldset.doLayout(false, true);
                    }
                },
                items: [{
                    fieldLabel: this.selElabMethodLabel,
                    xtype: 'radiogroup',
                    anchor: '100%',
                    autoHeight: true,
                    checkboxToggle: true,
                    name: 'elabMethodType',
                    ref: 'elabMethodType',
                    autoHeight: true,
                    defaultType: 'radio',
                    items: [{
                        boxLabel: this.elabMethodTypeRealValueLabel,
                        name: 'elabmethodtype',
                        inputValue: 2,
                        checked: true
                    }, {
                        boxLabel: this.elabMethodTypeLogarithmicScaleLabel,
                        name: 'elabmethodtype',
                        inputValue: 1
                    }]
                }]
            }, {
                xtype: "panel",
                layout: 'fit',
                autoScroll: true,
                title: this.downloadPanelTitle,
                iconCls: 'gxp-icon-download-csv-geobasi',
                buttons: [{
                    text: this.downloadPanelDownloadSelectionText,
                    iconCls: 'gxp-icon-download-csv-geobasi',
                    typeNameBoxPlot: this.typeNameGeobasiElab['box_plot'],
                    typeNameBarChart: this.typeNameGeobasiElab['bar_chart'],
                    tooltip: this.downloadPanelDownloadSelectionTooltip,
                    url: this.localeGeoserverUrl,
                    chartID: "notAdded_download",
                    pagePosition: [10000, 0],
                    xtype: 'gxp_geobasiDataDownloadButton',
                    ref: '../submitButtonDownload',
                    target: this,
                    form: this,
                    disabled: false,
                    filter: this.areaSelection,
                    addedLayer: false
                }, {
                    text: this.downloadPanelViewSelectionText,
                    iconCls: "gxp-icon-map-filter-geobasi",
                    tooltip: this.downloadPanelViewSelectionTooltip,
                    scope:this,
                    handler: function() {

                        Ext.MessageBox.show({
                            title: this.msgInfoAlertTitle,
                            msg: this.msgAlertNoImplementedFunctionality,
                            buttons: Ext.Msg.OK,
                            animEl: 'elId',
                            icon: Ext.MessageBox.INFO
                        });
                        Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                        return;

                    }
                }]
            }, {
                xtype: "panel",
                layout: 'fit',
                autoScroll: true,
                title: this.statisticalAnalysisPanelTitle,
                iconCls: "gxp-icon-analisi-statistica-geobasi",
                buttons: [{
                    text: this.statisticalAnalysisButtonBoxPlotText,
                    iconCls: "gxp-icon-geobasi-boxplot",
                    tooltip: this.viewChartTooltip,
                    url: this.localeGeoserverUrl,
                    typeNameBoxPlot: this.typeNameGeobasiElab['box_plot'],
                    chartID: "notAdded_boxPlot",
                    pagePosition: [10000, 0],
                    xtype: 'gxp_geobasiDataBoxPlotButton',
                    ref: '../submitButtonBoxPlot',
                    target: this,
                    form: this,
                    disabled: false,
                    filter: this.areaSelection,
                    addedLayer: false
                }, {
                    text: this.statisticalAnalysisButtonHistogramText,
                    iconCls: "gxp-icon-geobasi-barchart",
                    tooltip: this.viewChartTooltip,
                    url: this.localeGeoserverUrl,
                    typeNameBarChart: this.typeNameGeobasiElab['bar_chart'],
                    chartID: "notAdded_barChart",
                    pagePosition: [10000, 400],
                    xtype: 'gxp_geobasiDataBarChartButton',
                    ref: '../submitButtonColumnChart',
                    target: this,
                    form: this,
                    disabled: false,
                    filter: this.areaSelection,
                    addedLayer: false
                }, {
                    text: this.statisticalAnalysisButtonCumulativeCurveText,
                    iconCls: "gxp-icon-geobasi-curvacum",
                    tooltip: this.viewChartTooltip,
                    url: this.localeGeoserverUrl,
                    typeNameBoxPlot: this.typeNameGeobasiElab['box_plot'],
                    chartID: "notAdded_curvaCum",
                    pagePosition: [10000, 800],
                    xtype: 'gxp_geobasiDataCurvaCumButton',
                    ref: '../submitButtonCurvaCum',
                    target: this,
                    form: this,
                    disabled: false,
                    filter: this.areaSelection,
                    addedLayer: false
                }]
            }]
        });
        config = Ext.apply(geobasiData, config || {});
        this.output = gxp.plugins.geobasi.GeobasiData.superclass.addOutput.call(this, config);
        this.output.rangeyear.yearRangeSelector.slider.on('changecomplete', function() {
            this.clearSelection();
        }, this);
    },

    onComboboxMatrixExpand: function(field, eOpts) {

        var matrixStore,
            monitoringValue,
            newMonitoringViewparams,
            newGeometryViewparams;

        matrixStore = field.getStore();

        monitoringValue = this.output.monitoraggio.getValue();

        newMonitoringViewparams = this.setNewMonitoringViewparams(monitoringValue);
        newGeometryViewparams = this.getGeometryViewParams() || this._newGeometryViewparams;

        var years = this.output.rangeyear.yearRangeSelector.slider.getValues();
        var allowNull = this.output.rangeyear.allownull.checked;
        var checkAllowNull = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');

        var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ?
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';geometria:' + newGeometryViewparams.replace(/,/g, '\\,') +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull :
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';geometria:' + newGeometryViewparams +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull;

        matrixStore.load({
            params: {
                viewparams: viewParams
            }
        });

        //Update the number of matrix_code '01' and '02'
        matrixStore.on('load',function(store, records, options){
            if (store.totalLength === 1 && records[0].data.matrix_cod === '00'){
                return;
            }else{
                this.countAcqua = 0;
                this.countTerreno = 0;

                store.each(function(records,count,tot) {

                    var matrixCount = records.data.count;

                    if(records.data.matrix_cod.substr(0,2)==='01'){
                        this.countAcqua = this.countAcqua + matrixCount;
                    }else{
                        this.countTerreno = this.countTerreno + matrixCount;
                    }

                    if(this.countAcqua !== 0){
                        Ext.get('acqua_id').dom.lastChild.innerHTML = this.waterMatrix + ' - '+this.genericText+' -&gt; n°: ' + this.countAcqua;
                        Ext.get('acqua_id').dom.hidden = false;
                    }else{
                        if(Ext.get('acqua_id'))
                            Ext.get('acqua_id').dom.hidden = true;
                    }

                    if(this.countTerreno !== 0){
                        Ext.get('terreno_id').dom.lastChild.innerHTML = this.soilMatrix + ' - '+this.genericText+' -&gt; n°: ' + this.countTerreno;
                        Ext.get('terreno_id').dom.hidden = false;
                    }else{
                        if(Ext.get('terreno_id'))
                            Ext.get('terreno_id').dom.hidden = true;
                    }

                },this)
            }
            if (this.countAcqua === 0 && this.countTerreno === 0) {
                this.checkEmptyStore(store,{
                    count: 0,
                    matrix: this.errorNoDataResponseTitle,
                    matrix_cod: "00"
                });
            }

        },this);

        //this._newMonitoringViewparams = newMonitoringViewparams;
    },

    onComboboxMatrixSelect: function(field, eOpts) {
        var me = this;
        me.output.elemento.enable();
        me.output.elemento.reset();
        me.output.metodoAnalitico.reset();
        me.output.metodoAnalitico.disable();
        this.selectionObject = {
            matrix: '-',
            element: '-',
            method: '-'
        };
        var combo = this.output.matrixType;
        this.updateTotAnalisiFieldset(combo, 'matrix_cod', 'matrix');

        //Show/Hide Element Type Radio
        this.showHideElementTypeRadio(combo.getValue());

        var radio = this.output.selElementType;
        radio.reset();
    },

    onComboboxElemExpand: function(field, eOpts) {

        var elementsStore,
            monitoringValue,
            matrixValue,
            newMonitoringViewparams,
            newMatrixViewparams,
            newGeometryViewparams;

        elementsStore = field.getStore();
        monitoringValue = this.output.monitoraggio.getValue();
        matrixValue = this.output.matrixType.getValue();

        newMatrixViewparams = matrixValue;
        newMonitoringViewparams = this.setNewMonitoringViewparams(monitoringValue);
        newGeometryViewparams = this.getGeometryViewParams() || this._newGeometryViewparams;

        var years = this.output.rangeyear.yearRangeSelector.slider.getValues();
        var allowNull = this.output.rangeyear.allownull.checked;
        var checkAllowNull = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');

        var elementType = this.checkElementType(this.output.selElementType,matrixValue);

        var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ?
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';tygeomat:' + newMatrixViewparams +
                                    ';geometria:' + newGeometryViewparams.replace(/,/g, '\\,') +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull +
                                    ';type:' + elementType.replace(/,/g, '\\,') :
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';tygeomat:' + newMatrixViewparams +
                                    ';geometria:' + newGeometryViewparams +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull +
                                    ';type:' + elementType.replace(/,/g, '\\,');

        elementsStore.load({
            params: {
                viewparams: viewParams
            }
        });

        //this._newMonitoringViewparams = newMonitoringViewparams;
        //this._newMatrixViewparams = newMatrixViewparams;
    },

    onComboboxElemSelect: function(field, eOpts) {
        var me = this;
        me.output.metodoAnalitico.enable();
        me.output.metodoAnalitico.reset();
        this.selectionObject = {
            matrix: me.output.matrixType.getRawValue(),
            element: '-',
            method: '-'
        };
        var combo = this.output.elemento;
        this.updateTotAnalisiFieldset(combo, 'element');
    },

    onComboboxMetAnExpand: function(field, eOpts) {
        var methodStore,
            monitoringValue,
            matrixValue,
            elementValue,
            newMonitoringViewparams,
            newMatrixViewparams,
            newElementViewparams,
            newGeometryViewparams;

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
        var checkAllowNull = (allowNull ? 'OR c.data_aaaa IS NULL' : 'OR c.data_aaaa = \'0000\'');

        var elementType = this.checkElementType(this.output.selElementType,matrixValue);

        var viewParams = newGeometryViewparams.indexOf('\\,') === -1 ?
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';tygeomat:' + newMatrixViewparams +
                                    ';sigla:' + newElementViewparams +
                                    ';geometria:' + newGeometryViewparams.replace(/,/g, '\\,') +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull +
                                    ';type:' + elementType.replace(/,/g, '\\,') :
                                    'monitoraggio:' + newMonitoringViewparams +
                                    ';tygeomat:' + newMatrixViewparams +
                                    ';sigla:' + newElementViewparams +
                                    ';geometria:' + newGeometryViewparams +
                                    ';startDate:' + years[0] +
                                    ';endDate:' + years[1] +
                                    ';nullDate:' + checkAllowNull +
                                    ';type:' + elementType.replace(/,/g, '\\,');

        methodStore.load({
            params: {
                viewparams: viewParams
            }
        });

        //this._newMonitoringViewparams = newMonitoringViewparams;
        //this._newMatrixViewparams = newMatrixViewparams;
        //this._newElementViewparams = newElementViewparams;
    },

    onComboboxMetAnSelect: function(field, eOpts) {
        var me = this;
        this.selectionObject = {
            matrix: me.output.matrixType.getRawValue(),
            element: me.output.elemento.getValue(),
            method: '-'
        };
        var combo = this.output.metodoAnalitico;
        this.updateTotAnalisiFieldset(combo, 'method');
    },

    setMinMaxValues: function() {
        this.appMask = new Ext.LoadMask(this.output.rangeyear.el, {
            msg: this.mainLoadingMask
        });
        this.appMask.show();
        Ext.Ajax.request({
            scope: this,
            url: this.localeGeoserverUrl,
            method: 'POST',
            params: {
                service: "WFS",
                version: "1.1.0",
                request: "GetFeature",
                typeName: "geobasi_test:geobasi_data_analisi",
                outputFormat: "json",
                propertyName: "max,min"
            },
            success: function(result, request) {
                try {
                    var jsonData2 = Ext.util.JSON.decode(result.responseText);
                } catch (e) {
                    Ext.Msg.alert("Error", "Error parsing data from the server");
                    this.appMask.hide();
                    return;
                }
                if (jsonData2.features.length <= 0) {
                    Ext.Msg.alert(this.errorNoDataResponseTitle, this.errorNoDataResponseText);
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
            failure: function(result, request) {
                Ext.Msg.alert("Error", "Server response error");
                this.appMask.hide();
            }
        });
    },

    clearSelection: function() {
        this.output.matrixType.reset();
        this.output.elemento.reset();
        this.output.metodoAnalitico.reset();
        this.output.elemento.disable();
        this.output.metodoAnalitico.disable();
        this.output.selElementType.reset();
        this.output.selElementType.disable();
        this.getGeometryViewParams();
        this.selectionObject = {
            matrix: '-',
            element: '-',
            method: '-'
        };
        this.updateSelectionSummary(undefined, this.selectionObject);
    },

    setNewMonitoringViewparams: function(monitoringValue) {
        var newMonitoringViewparams;
        switch (monitoringValue) {
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

    getGeometryViewParams: function() {
        var myFilter;
        if (this.areaSelection.filterPolygon && this.areaSelection.filterPolygon.value) {
            var wkt_options = {};
            var wkt = new OpenLayers.Format.WKT();
            var out = wkt.write(this.areaSelection.selectGeometry);
            var geomCollectionIndex = out.indexOf('GEOMETRYCOLLECTION(');
            if (geomCollectionIndex == 0) {
                out = out.substring(19, out.length - 1);
            }
            myFilter = out;
            this.vectorSelectionArea = 'Poligono';
        } else if (this.areaSelection.filterCircle && this.areaSelection.filterCircle.value) {
            myFilter = this.areaSelection.filterCircle;
        } else if (this.areaSelection.searchWFSComboAlluvioni && this.areaSelection.searchWFSComboAlluvioni.geometry) {
            myFilter = this.areaSelection.searchWFSComboAlluvioni.geometry;
            this.vectorSelectionArea = this.areaSelection.searchWFSComboAlluvioni.lastSelectionText;
        } else if (this.areaSelection.searchWFSComboRoccia && this.areaSelection.searchWFSComboRoccia.geometry) {
            myFilter = this.areaSelection.searchWFSComboRoccia.geometry;
            this.vectorSelectionArea = this.areaSelection.searchWFSComboRoccia.lastSelectionText;
        } else if (this.areaSelection.searchWFSComboComuniRT && this.areaSelection.searchWFSComboComuniRT.geometry) {
            myFilter = this.areaSelection.searchWFSComboComuniRT.geometry;
            this.vectorSelectionArea = this.areaSelection.searchWFSComboComuniRT.lastSelectionText;
        } else {
            myFilter = false;
            this.vectorSelectionArea = this.tuscanyRegionText;
        }
        return myFilter;
    },

    updateTotAnalisiFieldset: function(combo, field, desc) {
        var value = combo.getValue();
        var store = combo.getStore();
        var tot;
        var matrix;
        store.findBy(function(record) {
            if (record.get(field) === value) {

                switch (value){
                    case '01':
                        tot = this.countAcqua
                        break;
                    case '02':
                        tot = this.countTerreno
                        break;
                    default:
                        tot = record.get('count');
                }

                if (desc) {
                    this.selectionObject[desc] = record.get(desc);
                } else {
                    this.selectionObject[field] = value;
                }
            }
        }, this);
        this.updateSelectionSummary(tot, this.selectionObject);
    },

    updateSelectionSummary: function(text, newDesc) {
        var text = (typeof text === 'undefined') ? "-" : text;
        var totFieldset = this.output.updateCount;
        if (totFieldset.body){
            totFieldset.body.update(
                '<table class="table table-condensed">' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountTotAnalisiText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + text + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountTipoMatriceText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + newDesc.matrix + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountElementoText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + newDesc.element + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountMetAnaliticoText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + newDesc.method + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountAreaGeoText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + this.vectorSelectionArea + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountIntTempText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + this.output.rangeyear.yearRangeSelector.slider.getValues()[0] +' - ' + this.output.rangeyear.yearRangeSelector.slider.getValues()[1] + '</td>' +
                    '</tr>' +
                    '<tr >' +
                        '<th rowspan="1" style="border:0px">'+this.updateCountMonitoraggioText+'</th>' +
                        '<td style="border:0px;vertical-align:bottom">' + this.output.monitoraggio.getRawValue() + '</td>' +
                    '</tr>' +
                '</table>'
            );
        }
    },

    /**
    * Enable/Disable elements radio type according to matrix type
    *
    */
    showHideElementTypeRadio: function(type){
        var radio = this.output.selElementType;

        if (radio.disabled)
            radio.enable();

        // boxLabel: this.elementTypeCheckLabel,
        // inputValue: 1
        //
        // boxLabel: this.oxideTypeCheckLabel,
        // inputValue: 2
        //
        // boxLabel: this.redoxTypeCheckLabel,
        // inputValue: 3
        //
        // boxLabel: this.isotopeTypeCheckLabel,
        // inputValue: 4


        if(type.substr(0,2)==='02' && type==='0201'){
            for(var i = 0;i<radio.items.items.length;i++){
                if(radio.items.items[i].inputValue === 3){
                    radio.items.items[i].disable();
                } else {
                    radio.items.items[i].enable();
                }
            }
        } else if(type==='02'){
            for(var i = 0;i<radio.items.items.length;i++){
                if(radio.items.items[i].inputValue === 3){
                    radio.items.items[i].disable();
                } else {
                    radio.items.items[i].enable();
                }
            }
        } else if(type==='0202'){
            for(var i = 0;i<radio.items.items.length;i++){
                if(radio.items.items[i].inputValue === 1){
                    radio.items.items[i].enable();
                } else {
                    radio.items.items[i].disable();
                }
            }
        } else if (type.substr(0,2)==='01'){
            for(var i = 0;i<radio.items.items.length;i++){
                if(radio.items.items[i].inputValue === 2){
                    radio.items.items[i].disable();
                } else {
                    radio.items.items[i].enable();
                }
            }
        }
        this.output.doLayout();
        radio.reset();
    },

    /**
    * Returns elements table type according to matrix type
    *
    *    1 speriment.acqua_elemento
    *    2 speriment.isotopo
    *    3 speriment.acqua_redox
    *    4 speriment.sedimento_elemento
    *    5 speriment.sedimento_ossido
    *
    */
    checkElementType: function(selElementType,matrixValue){
        /*if(selElementType.hidden === false){
            if(selElementType.getValue().inputValue === 1){
                return 3+','+4;
            }else{
                return 3+','+5;
            }
        }else{
            return 3+','+1;
        }*/
        if (matrixValue === '02' || matrixValue === '0201'){
            switch (selElementType.getValue().inputValue){
                case 1:
                    return '4';
                    break;
                case 2:
                    return '5';
                    break;
                case 4:
                    return '2';
                    break;
            }
        }

        if (matrixValue === '0202'){
            switch (selElementType.getValue().inputValue){
                case 1:
                    return '6';
                    break;
            }
        }

        if(matrixValue.substr(0,2) === '01'){
            switch (selElementType.getValue().inputValue){
                case 1:
                    return '1';
                    break;
                case 3:
                    return '3';
                    break;
                case 4:
                    return '2';
                    break;
            }
        }
    },

    /**
    * Reset Element and method combo on radio element type change
    *
    */
    onRadioElementTypeChange: function(radio, checked){
        var me = this;
        me.output.elemento.reset();
        me.output.metodoAnalitico.reset();
        me.output.metodoAnalitico.disable();
        this.selectionObject = {
            matrix: '-',
            element: '-',
            method: '-'
        };
        var combo = this.output.matrixType;
        this.updateTotAnalisiFieldset(combo, 'matrix_cod', 'matrix');
        //this.onComboboxMatrixSelect();
    },

    /**
    * Check empty store
    *
    */
    checkEmptyStore: function(store,properties){

        function resetElement(){
            var me = this;
            me.output.elemento.reset();
            me.output.metodoAnalitico.reset();
            me.output.metodoAnalitico.disable();
            this.selectionObject = {
                matrix: '-',
                element: '-',
                method: '-'
            };
            var combo = this.output.matrixType;
            this.updateTotAnalisiFieldset(combo, 'matrix_cod', 'matrix');
        }

        store.loadData({
            type: null,
            totalFeatures: 0,
            crs: null,
            features: [{
                type: "Feature",
                geometry: null,
                id: "1",
                properties: properties
            }]
        });
        Ext.MessageBox.show({
            title: this.msgAlertSelectionInfoTitle,
            msg: this.msgAlertSelectionInfoText,
            buttons: Ext.Msg.OK,
            animEl: 'elId',
            fn: properties.element ? resetElement: this.clearSelection,
            icon: Ext.MessageBox.INFO,
            scope: this
        });
        Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
        return;
    }

});

Ext.preg(gxp.plugins.geobasi.GeobasiData.prototype.ptype, gxp.plugins.geobasi.GeobasiData);
