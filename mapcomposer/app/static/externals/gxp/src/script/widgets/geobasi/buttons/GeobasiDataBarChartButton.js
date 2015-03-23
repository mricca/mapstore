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
 *  .. class:: GeobasiDataBarChartButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataBarChartButton = Ext.extend(Ext.Button, {
    xtype: 'gxp_geobasiDataBarChartButton',
    form: null,
    url: null,
    filter: null,
    layer: "geobasi:geobasi_barchart_view",
    addedLayer: null,
    chartID: null,
    pagePosition: null,
    mainLoadingMask: "Attendere prego, creazione grafico in corso...",
    colorGradient: {
        end: '#FFCDD6',
        start: '#FF0000'
    },
    handler: function() {
        var me = this;
        var myFilter;
        if (this.filter.filterPolygon && this.filter.filterPolygon.value) {
            myFilter = this.filter.filterPolygon;
        } else if (this.filter.filterCircle && this.filter.filterCircle.value) {
            myFilter = this.filter.filterCircle;
        } else if (this.filter.searchWFSComboAlluvioni && this.filter.searchWFSComboAlluvioni.geometry) {
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboAlluvioni.geometry);
            myFilter = new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            this.vectorSelectionArea = this.filter.searchWFSComboAlluvioni.lastSelectionText;
        } else if (this.filter.searchWFSComboRoccia && this.filter.searchWFSComboRoccia.geometry) {
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboRoccia.geometry);
            myFilter = new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            this.vectorSelectionArea = this.filter.searchWFSComboRoccia.lastSelectionText;
        } else if (this.filter.searchWFSComboComuniRT && this.filter.searchWFSComboComuniRT.geometry) {
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(this.filter.searchWFSComboComuniRT.geometry);
            myFilter = new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            this.vectorSelectionArea = this.filter.searchWFSComboComuniRT.lastSelectionText;
        } else {
            myFilter = false;
            this.vectorSelectionArea = false;
        }
        var data = this.form.output.getForm().getValues();
        var data2 = this.form.output.getForm().getFieldValues();
        if (!data2.tipo_matrice) {
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare una Matrice e un Elemento!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }
        if (!data2.elemento) {
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare un Elemento!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }
        if (!data2.Metodo_analitico) {
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare un Metodo Analitico!!!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }
        var tipometaStatQuery;
        if (data2.Metodo_analitico == '-999') {
            tipometaStatQuery = "IS NULL";
        } else if (this.addedLayer) {
            tipometaStatQuery = data2.Metodo_analitico;
        } else {
            tipometaStatQuery = "= " + "\\'" + data2.Metodo_analitico + "\\'";
        }
        var monitoraggioValue;
        if (data2.tipomonitoraggio === "01") {
            monitoraggioValue = ' IS NOT NULL';
        } else if (data2.tipomonitoraggio === "02") {
            monitoraggioValue = ' = true';
        } else {
            monitoraggioValue = ' = false';
        }
        var viewparams2 = data2.Metodo_analitico == '-999' ? "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery : "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery;
        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();
        this.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function(dateFilter) {
            me.makeChart(dateFilter, data, data2, viewparams2);
        }, this);
    },
    getData: function(json, metodoElaborazione, json1) {
        var num_ele = json.features.length;
        var custLog = function(x, base) {
            return (Math.log(x)) / (Math.log(base));
        }
        var numClassi = 1 + (10 / 3) * (custLog(num_ele, 10));
        var resultsLog = [];
        for (var x = 0; x < num_ele; x++) {
            resultsLog[x] = {
                valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.value), -4) : Math.round10(json.features[x].properties.value, -4)
            };
            this.jsonData2.features[x].attributes = {
                valore: resultsLog[x].valore,
                classe: 0,
                colore: ''
            };
        }
        var conteggio = resultsLog.length;
        var barMinimo = resultsLog[0].valore;
        var barMassimo = resultsLog[conteggio - 1].valore;
        var ampClassiInit = (barMassimo - barMinimo) / Math.round(numClassi);
        var ampClassi = Math.round10(ampClassiInit, -4);
        var numerositaClassi = new Array();
        for (var i = 0; i < Math.round(numClassi); i++) {
            numerositaClassi[i] = {
                classe: i,
                conteggio: 0,
                ampiezza: ampClassi,
                num_ele: num_ele,
                ampiezzaMin: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i)), -4) : Math.round10(barMinimo + (ampClassi * (i)), -4),
                ampiezzaMax: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i + 1)), -4) : Math.round10(barMinimo + (ampClassi * (i + 1)), -4)
            };
        }
        this.columnChartColors = jsgradient.generateGradient(this.colorGradient.end, this.colorGradient.start, numerositaClassi.length);
        for (var x = 0; x < num_ele; x++) {
            if (resultsLog[x].valore < barMinimo + ampClassi) {
                numerositaClassi[0].conteggio++;
                this.jsonData2.features[x].attributes.classe = numerositaClassi[0].classe + 1;
                this.jsonData2.features[x].attributes.colore = this.columnChartColors[numerositaClassi[0].classe];
                resultsLog[x].valore = "undefined";
            } else if (resultsLog[x].valore >= (barMinimo + (ampClassi * (Math.round(numClassi))))) {
                numerositaClassi[Math.round(numClassi) - 1].conteggio++;
                this.jsonData2.features[x].attributes.classe = numerositaClassi[Math.round(numClassi) - 1].classe + 1;
                this.jsonData2.features[x].attributes.colore = this.columnChartColors[numerositaClassi[Math.round(numClassi) - 1].classe];
                resultsLog[x].valore = "undefined";
            }
        }
        for (var y = 1; y < Math.round(numClassi); y++) {
            for (var x = 0; x < num_ele; x++) {
                var aaa = resultsLog[x].valore;
                var bbb = barMinimo + (ampClassi * (y));
                var ccc = barMinimo + (ampClassi * (y + 1));
                if (resultsLog[x].valore >= (barMinimo + (ampClassi * (y))) && resultsLog[x].valore < (barMinimo + (ampClassi * (y + 1)))) {
                    numerositaClassi[y].conteggio++;
                    this.jsonData2.features[x].attributes.classe = numerositaClassi[y].classe + 1;
                    this.jsonData2.features[x].attributes.colore = this.columnChartColors[numerositaClassi[y].classe];
                    resultsLog[x].valore = "undefined";
                }
            }
        }
        var countElem = 0;
        var dataPoints = [];
        var resp;
        var classe;
        var classe_num;
        for (var i = 0; i < numerositaClassi.length; i++) {
            countElem = countElem + numerositaClassi[i].conteggio;
        }
        for (var i = 0; i < numerositaClassi.length; i++) {
            classe_num = numerositaClassi[i].classe + 1;
            classe = numerositaClassi[i].ampiezzaMin + " | " + numerositaClassi[i].ampiezzaMax;
            dataPoints[i] = {
                uuidelemento: classe,
                classe: classe_num,
                color: this.columnChartColors[i],
                valore: numerositaClassi[i].conteggio,
                totaleOriginale: numerositaClassi[i].num_ele,
                totaleRiprova: countElem,
                tipoMeta: !json.features[i].properties.method ? 'non specificato' : json.features[i].properties.method,
                num_classi: numerositaClassi.length,
                ampiezza_classi: metodoElaborazione == "1" ? Math.round10(Math.exp(ampClassi), -4) : ampClassi,
                sigla: json.features[i].properties.element,
                matrice: json.features[i].properties.matrix_cod,
                dmgeomattipo_descr: json.features[i].properties.matrix,
                log: metodoElaborazione,
                viewparams: this.viewparams3,
                bbox: json.bbox,
                spatialFilter: this.xml ? this.xml : null,
                jsonData: this.jsonData2,
                dmgeomattipo_descr: this.form.output.getForm().getValues().tipo_matrice,
                startYear: this.form.output.getForm().getValues().startYear,
                endYear: this.form.output.getForm().getValues().endYear,
                nullDate: this.form.output.getForm().getFieldValues().allownull,
                vectorSelectionArea: this.vectorSelectionArea
            };
        }
        return dataPoints;
    },
    makeChart: function(dateFilter, data, data2, viewparams2) {
        this.layer;
        this.addedLayer;
        var newViewParams = viewparams2.split(';');
        var cql_filter = "( " + newViewParams[0].split(':')[0] + " = '" + newViewParams[0].split(':')[1] + "' AND " + newViewParams[1].split(':')[0] + " = '" + newViewParams[1].split(':')[1] + "' AND " + newViewParams[2].split(':')[0] + " = '" + newViewParams[2].split(':')[1] + "' )";
        if (this.addedLayer) {
            var aaa = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.AND,
                filters: []
            });
            for (var i = 0; i < newViewParams.length; i++) {
                var addedFilterType;
                var addedFilterValue;
                if (newViewParams[i].split(':')[0] === "tygeomat") {
                    addedFilterType = OpenLayers.Filter.Comparison.LIKE;
                    addedFilterValue = newViewParams[i].split(':')[1] + "%";
                } else if (newViewParams[i].split(':')[0] === "monitoraggio") {
                    if (newViewParams[i].split(':')[1] == " IS NOT NULL") {
                        addedFilterType = OpenLayers.Filter.Comparison.IS_NULL;
                        addedFilterType = !addedFilterType;
                        addedFilterValue = "";
                    } else if (newViewParams[i].split(':')[1] == " = true") {
                        addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                        addedFilterValue = "true";
                    } else {
                        addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                        addedFilterValue = "false";
                    }
                } else {
                    addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                    addedFilterValue = newViewParams[i].split(':')[1];
                }
                var filtro = new OpenLayers.Filter.Comparison({
                    type: addedFilterType,
                    property: newViewParams[i].split(':')[0],
                    value: addedFilterValue
                });
                aaa.filters.push(filtro);
            }
            aaa.filters.push(dateFilter);
        }
        if (aaa) {
            var node = new OpenLayers.Format.Filter({
                version: "1.1.0",
                srsName: "EPSG:3003",
                geometryName: "geom"
            }).write(aaa);
            this.xml = new OpenLayers.Format.XML().write(node);
        } else {
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
                filter: this.xml,
                request: "GetFeature",
                typeName: this.layer,
                outputFormat: "json",
                propertyName: "source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,geom",
                sortBy: "value"
            } : {
                service: "WFS",
                version: "1.1.0",
                geometryName: "geom",
                request: "GetFeature",
                filter: this.xml,
                typeName: this.layer,
                outputFormat: "json",
                propertyName: "source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,geom",
                sortBy: "value",
                viewparams: viewparams2
            },
            success: function(result, request) {
                try {
                    this.jsonData2 = Ext.util.JSON.decode(result.responseText);
                } catch (e) {
                    this.appMask.hide();
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Error parsing data from the server',
                        buttons: Ext.Msg.OK,
                        animEl: 'elId',
                        icon: Ext.MessageBox.ERROR
                    });
                    Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                    return;
                }
                if (this.jsonData2.features.length <= 0) {
                    this.appMask.hide();
                    Ext.MessageBox.show({
                        title: 'Nessun dato',
                        msg: 'Dati non disponibili per questo criterio di ricerca',
                        buttons: Ext.Msg.OK,
                        animEl: 'elId',
                        icon: Ext.MessageBox.INFO
                    });
                    Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                    return;
                }
                var data = this.form.output.getForm().getValues();
                var data2 = this.form.output.getForm().getFieldValues();
                var tipometaStatQuery;
                if (data.Metodo_analitico == '') {
                    tipometaStatQuery = "IS NOT NULL";
                } else {
                    tipometaStatQuery = "= " + "\\'" + data.Metodo_analitico + "\\'";
                }
                var monitoraggioValue;
                if (data2.tipomonitoraggio === "01") {
                    monitoraggioValue = ' IS NOT NULL';
                } else if (data2.tipomonitoraggio === "02") {
                    monitoraggioValue = ' = true';
                } else {
                    monitoraggioValue = ' = false';
                }
                this.viewparams3 = data.Metodo_analitico == '-999' ? "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery : "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery;
                var metodoElaborazione = data.elabmethodtype;
                var dataCharts = this.getData(this.jsonData2, metodoElaborazione);
                this.newColors = jsgradient.generateGradient('#FFCDD6', '#FF0000', dataCharts.length);
                var mainChart = Ext4.getCmp('geobasi_barchart' + "_" + this.chartID);
                var gridStore = Ext4.data.StoreManager.lookup("BarChartStore");
                if (!mainChart) {
                    var hcConfig = {
                        series: [{
                            type: 'column',
                            dataIndex: 'valore',
                            name: 'Istogramma',
                            colors: this.columnChartColors,
                            turboThreshold: 100000,
                            listeners: {
                                pointclick: function(serie, point, record, event) {
                                    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
                                    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
                                    var geoJSON = new OpenLayers.Format.GeoJSON();
                                    var symbolizer = {
                                        stroke: true,
                                        strokeColor: "#000000",
                                        fill: true,
                                        fillOpacity: 0.8,
                                        pointRadius: "10",
                                        fillColor: "${colore}",
                                        graphicName: "circle"
                                    };
                                    var styleMap = new OpenLayers.StyleMap({
                                        'default': new OpenLayers.Style({}, {
                                            rules: [new OpenLayers.Rule({
                                                symbolizer: symbolizer,
                                            })]
                                        })
                                    });
                                    var vector_layer = new OpenLayers.Layer.Vector('Istogramma - Classe: ' + record.data.classe + " - Elemento: " + record.data.sigla + " - Numerosità: " + record.data.valore + " - Ampiezza: " + record.data.uuidelemento, {
                                        styleMap: styleMap,
                                        renderers: renderer,
                                        displayInLayerSwitcher: true
                                    }, {
                                        restrictedExtent: new OpenLayers.Bounds([record.raw.bbox[0], record.raw.bbox[1], record.raw.bbox[2], record.raw.bbox[3]])
                                    });
                                    for (var i = 0; i < record.raw.jsonData.features.length; i++) {
                                        if (record.data.classe === record.raw.jsonData.features[i].attributes.classe) {
                                            var geoJSONgeometry = geoJSON.read(record.raw.jsonData.features[i].geometry);
                                            geoJSONgeometry[0].attributes = record.raw.jsonData.features[i].attributes;
                                            vector_layer.addFeatures(geoJSONgeometry);
                                        }
                                    }
                                    var app = window.app;
                                    var map = app.mapPanel.map;
                                    map.addLayers([vector_layer]);
                                    map.zoomToExtent(new OpenLayers.Bounds(record.raw.bbox[0], record.raw.bbox[1], record.raw.bbox[2], record.raw.bbox[3]));
                                }
                            }
                        }, {
                            type: 'spline',
                            dataIndex: ['valore'],
                            name: 'Spline',
                            color: '#000000'
                        }],
                        height: 500,
                        width: 650,
                        xField: ['uuidelemento'],
                        loadMask: true,
                        initAnimAfterLoad: false,
                        chartConfig: {
                            chart: {
                                marginRight: 130,
                                marginBottom: 160,
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'Istogramma',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: [{
                                title: {
                                    text: '',
                                    margin: 20
                                },
                                labels: {
                                    rotation: -45,
                                    align: 'right',
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Verdana, sans-serif'
                                    },
                                    y: 15,
                                    formatter: function() {
                                        return this.value;
                                    }
                                }
                            }],
                            yAxis: {
                                title: {
                                    text: 'Elemento: '
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                formatter: function() {
                                    if (this.point.data) {
                                        return 'Classe : ' + this.point.data.classe + ' - Numerosità Classe : ' + this.y;
                                    } else {
                                        return 'Classe : ' + (this.point.x + 1) + ' - Numerosità Classe : ' + this.y;
                                    }
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -10,
                                y: 100,
                                borderWidth: 0
                            },
                            plotOptions: {
                                series: {
                                    pointPadding: 0,
                                    groupPadding: 0,
                                    borderWidth: 0,
                                    shadow: false
                                },
                                column: {
                                    colorByPoint: true
                                }
                            },
                            exporting: {
                                buttons: {
                                    customButton: {
                                        x: -62,
                                        onclick: function() {
                                            var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
                                            renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
                                            var geoJSON = new OpenLayers.Format.GeoJSON();
                                            var vector_layer = new OpenLayers.Layer.Vector('ColumnChart_Layer', {
                                                styleMap: new OpenLayers.StyleMap({
                                                    'default': new OpenLayers.Style({}, {
                                                        rules: [new OpenLayers.Rule({
                                                            symbolizer: {
                                                                stroke: true,
                                                                strokeColor: "#000000",
                                                                fill: true,
                                                                fillOpacity: 0.8,
                                                                pointRadius: "10",
                                                                fillColor: "${colore}",
                                                                graphicName: "circle"
                                                            }
                                                        })]
                                                    })
                                                }),
                                                renderers: renderer,
                                                displayInLayerSwitcher: true
                                            }, {
                                                restrictedExtent: new OpenLayers.Bounds([this.series[0].data[0].data.bbox[0], this.series[0].data[0].data.bbox[1], this.series[0].data[0].data.bbox[2], this.series[0].data[0].data.bbox[3]])
                                            });
                                            for (var i = 0; i < this.series[0].data[0].data.jsonData.features.length; i++) {
                                                var geoJSONgeometry = geoJSON.read(this.series[0].data[0].data.jsonData.features[i].geometry);
                                                geoJSONgeometry[0].attributes = this.series[0].data[0].data.jsonData.features[i].attributes;
                                                vector_layer.addFeatures(geoJSONgeometry[0]);
                                            }
                                            var app = window.app;
                                            var map = app.mapPanel.map;
                                            map.addLayers([vector_layer]);
                                            map.zoomToExtent(new OpenLayers.Bounds(this.series[0].data[0].data.bbox[0], this.series[0].data[0].data.bbox[1], this.series[0].data[0].data.bbox[2], this.series[0].data[0].data.bbox[3]));
                                        },
                                        symbol: 'circle'
                                    }
                                }
                            }
                        }
                    };
                    hcConfig.id = 'geobasi_barchart' + "_" + this.chartID;
                    mainChart = Ext4.widget('highchart', hcConfig);
                    var myTabPanel = new Ext4.window.Window({
                        title: 'Istogramma',
                        id: this.chartID,
                        itemId: 'barchart_tab',
                        border: true,
                        autoScroll: true,
                        layout: 'fit',
                        maximizable: true,
                        maximized: false,
                        collapsible: true,
                        collapsed: false,
                        closable: true,
                        constrain: true,
                        listeners: {
                            expand: function(p, eOpts) {
                                p.items.items[0].refresh();
                            }
                        }
                    });
                    Ext4.getCmp(this.chartID).show();
                    Ext4.getCmp(this.chartID).add(mainChart);
                    Ext4.getCmp(this.chartID).setPagePosition(this.pagePosition);
                }
                Ext4.getCmp(this.chartID).expand(true);
                var newTitle = this.chartID == "added_barChart" ? 'Istogramma Nuovo Dataset' : 'Istogramma Geobasi';
                Ext4.getCmp(this.chartID).setTitle(newTitle);
                var dataCharts2 = Ext.util.JSON.encode(dataCharts);
                var proxy = new Ext4.data.proxy.Memory({
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                });
                gridStore && mainChart.bindStore(gridStore);
                gridStore.loadData(dataCharts);
                var records = gridStore.first();
                var newTitle = this.chartID == "added_barChart" ? ' - Nuovo Dataset' : ' - Geobasi';
                var selectionArea = records.get('vectorSelectionArea') != "false" ? " - Selezione: " + records.get('vectorSelectionArea') : "";
                var nullDateString = records.get('nullDate') ? 'SI' : 'NO';
                mainChart.chartConfig.chart.backgroundColor = this.chartID == "added_barChart" ? '#F1F9C3' : '#FFFFFF';
                mainChart.chartConfig.subtitle.text = 'Totale valori: ' + records.get('totaleRiprova') + " - Numero Classi: " + records.get('num_classi') + " - Ampiezza Classi: " + records.get('ampiezza_classi') + ' - Tipo Matrice: ' + records.get('dmgeomattipo_descr').toUpperCase() + " - Periodo dal " + records.get('startYear') + " al " + records.get('endYear') + " - Valori senza data: " + nullDateString + selectionArea;;
                mainChart.chartConfig.title.text = 'Metodo Analitico: ' + records.get('tipoMeta') + newTitle;
                var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
                mainChart.chartConfig.yAxis.title.text = 'Frequenza';
                var logText = records.get('log') === "1" ? "( scala logaritmica )" : "( valori reali )";
                mainChart.chartConfig.xAxis[0].title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura + ' - ' + logText;
                mainChart.draw();
                this.appMask.hide();
            },
            failure: function(result, request) {
                this.appMask.hide();
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Server response error',
                    buttons: Ext.Msg.OK,
                    animEl: 'elId',
                    icon: Ext.MessageBox.ERROR
                });
                Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            }
        });
    },
    buildFilter: function(filter, startDate, endDate, checked, baciniFilter, callback, me) {
        if (baciniFilter) {
            var app = window.app;
            var map = app.mapPanel.map;
            var baciniWfsLayer = app.mapPanel.map.getLayersByName("Intersect Bacini")[0];
            if (baciniWfsLayer) {
                app.mapPanel.map.removeLayer(baciniWfsLayer);
            }
            var layerBacini = new OpenLayers.Layer.Vector("Intersect Bacini");
            var getFeatureFromWFS = function(response) {
                var parametri = [];
                var ci_sibapoParams = "";
                if (response.features.length > 0) {
                    for (var i = 0; i < response.features.length; i++) {
                        parametri.push(response.features[i].attributes.ci_sibapo);
                        if (i == response.features.length - 1) {
                            ci_sibapoParams += "'" + response.features[i].attributes.ci_sibapo + "'";
                        } else {
                            ci_sibapoParams += "'" + response.features[i].attributes.ci_sibapo.concat("'\\,");
                        }
                    }
                } else {
                    Ext.MessageBox.show({
                        title: 'Intersect Bacini',
                        msg: 'Nessun sottobacino presente nell\'area prescelta!',
                        buttons: Ext.Msg.OK,
                        animEl: 'elId',
                        icon: Ext.MessageBox.INFO
                    });
                    Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                    me.appMask.hide();
                    return;
                }
                Ext.Ajax.request({
                    scope: me,
                    url: 'http://www506.regione.toscana.it/geoserver/wfs',
                    method: 'POST',
                    params: {
                        service: "WFS",
                        version: "1.1.0",
                        geometryName: "geom",
                        request: "GetFeature",
                        typeName: 'geobasi:bacini_decod',
                        outputFormat: "json",
                        viewparams: "compostoda:" + ci_sibapoParams
                    },
                    success: function(result, request) {
                        var jsonData2 = Ext.util.JSON.decode(result.responseText);
                        var geoJSON = new OpenLayers.Format.GeoJSON();
                        if (jsonData2.features.length > 0) {
                            for (var i = 0; i < jsonData2.features.length; i++) {
                                var geoJSONgeometry = geoJSON.read(jsonData2.features[i].geometry);
                                geoJSONgeometry[0].attributes = jsonData2.features[i].properties;
                                layerBacini.addFeatures(geoJSONgeometry);
                            }
                        }
                        var app = window.app;
                        var map = app.mapPanel.map;
                        map.addLayers([layerBacini]);
                        if (jsonData2.features.length > 110) {
                            Ext.MessageBox.show({
                                title: 'Intersect Bacini',
                                msg: 'Numero sottobacini selezionato al momento troppo elevato, riprova con un\'altra selezione',
                                buttons: Ext.Msg.OK,
                                animEl: 'elId',
                                icon: Ext.MessageBox.INFO
                            });
                            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                            me.appMask.hide();
                            return;
                        }
                        var allowNullFilter = new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.IS_NULL,
                            property: "year",
                            value: null
                        });
                        var aaa = new OpenLayers.Filter.Logical({
                            type: OpenLayers.Filter.Logical.OR,
                            filters: []
                        });
                        for (var i = 0; i < layerBacini.features.length; i++) {
                            var baciniFeatures = new OpenLayers.Filter.Spatial({
                                type: OpenLayers.Filter.Spatial.INTERSECTS,
                                property: "geom",
                                value: layerBacini.features[i].geometry
                            });
                            aaa.filters.push(baciniFeatures);
                        }
                        var dateFilter = new OpenLayers.Filter.Logical({
                            type: OpenLayers.Filter.Logical.OR,
                            filters: [new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.BETWEEN,
                                property: "year",
                                lowerBoundary: startDate,
                                upperBoundary: endDate
                            })]
                        });
                        var newFilter = new OpenLayers.Filter.Logical({
                            type: OpenLayers.Filter.Logical.AND,
                            filters: []
                        });
                        if (checked) {
                            dateFilter.filters.push(allowNullFilter)
                        }
                        baciniFilter ? newFilter.filters.push(aaa) : newFilter.filters.push(filter);
                        newFilter.filters.push(dateFilter);
                        var totFilter = filter ? newFilter : dateFilter;
                        callback(totFilter);
                    },
                    failure: function(result, request) {}
                });
            };
            var protocol = new OpenLayers.Protocol.WFS({
                url: "http://www506.regione.toscana.it/geoserver/wfs",
                version: "1.1.0",
                featureType: "ci_rwtw_bacini",
                featureNS: "http://geobasi",
                srsName: "EPSG:3003",
                extractAttribute: true
            });
            var protRead = protocol.read({
                filter: filter,
                callback: getFeatureFromWFS
            });
        } else {
            var allowNullFilter = new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.IS_NULL,
                property: "year",
                value: null
            });
            var dateFilter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.OR,
                filters: [new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.BETWEEN,
                    property: "year",
                    lowerBoundary: startDate,
                    upperBoundary: endDate
                })]
            });
            var newFilter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.AND,
                filters: []
            });
            if (checked) {
                dateFilter.filters.push(allowNullFilter);
            }
            newFilter.filters.push(filter);
            newFilter.filters.push(dateFilter);
            var totFilter = filter ? newFilter : dateFilter;
            callback(totFilter);
        }
    },
    randomColorsRGB: function(total) {
        var i = 360 / (total - 1);
        var r = [];
        var hsvToRgb = function(h, s, v) {
            var rgb = Ext.ux.ColorPicker.prototype.hsvToRgb(h, s, v);
            return rgb;
        }
        for (var x = 0; x < total; x++) {
            r.push(hsvToRgb(i * x, 0.57, 0.63));
        }
        return r;
    },
    randomColorsHEX: function(total) {
        var i = 360 / (total - 1);
        var r = [];
        var hsvToRgb = function(h, s, v) {
            var rgb = Ext.ux.ColorPicker.prototype.hsvToRgb(h, s, v);
            return "#" + Ext.ux.ColorPicker.prototype.rgbToHex(rgb);
        }
        for (var x = 0; x < total; x++) {
            r.push(hsvToRgb(i + x, 0.57, 0.63));
        }
        return r;
    }
});
(function() {
    jsgradient = {
        inputA: '',
        inputB: '',
        inputC: '',
        gradientElement: '',
        hexToRgb: function(hex) {
            var r, g, b, parts;
            hex = hex.replace('#', '');
            if (hex.length !== 3 && hex.length !== 6) {
                return [255, 255, 255];
            }
            if (hex.length == 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            r = parseInt(hex.substr(0, 2), 16);
            g = parseInt(hex.substr(2, 2), 16);
            b = parseInt(hex.substr(4, 2), 16);
            return [r, g, b];
        },
        rgbToHex: function(color) {
            color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
            color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
            color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];
            return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
        },
        zeroFill: function(number, width) {
            width -= number.toString().length;
            if (width > 0) {
                return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
            }
            return number;
        },
        generateGradient: function(colorA, colorB, steps) {
            var result = [],
                rInterval, gInterval, bInterval;
            colorA = this.hexToRgb(colorA);
            colorB = this.hexToRgb(colorB);
            steps -= 1;
            rStep = (Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0])) / steps;
            gStep = (Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1])) / steps;
            bStep = (Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2])) / steps;
            result.push('#' + this.rgbToHex(colorA));
            var rVal = colorA[0],
                gVal = colorA[1],
                bVal = colorA[2];
            for (var i = 0; i < (steps - 1); i++) {
                rVal = (colorA[0] < colorB[0]) ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
                gVal = (colorA[1] < colorB[1]) ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
                bVal = (colorA[2] < colorB[2]) ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
                result.push('#' + this.rgbToHex([rVal, gVal, bVal]));
            };
            result.push('#' + this.rgbToHex(colorB));
            return result;
        },
        gradientList: function(colorA, colorB, list) {
            var list = (typeof list === 'object') ? list : document.querySelector(list);
            var listItems = list.querySelectorAll('li'),
                steps = listItems.length,
                colors = jsgradient.generateGradient(colorA, colorB, steps);
            for (var i = 0; i < listItems.length; i++) {
                var item = listItems[i];
                item.style.backgroundColor = colors[i];
            };
        }
    };
})();
(function() {
    function decimalAdjust(type, value, exp) {
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

Ext.reg(gxp.widgets.button.GeobasiDataBarChartButton.prototype.xtype, gxp.widgets.button.GeobasiDataBarChartButton);