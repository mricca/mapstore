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

    /**
    * i18n Start
    */
    mainLoadingMask: "Attendere prego, creazione grafico in corso...",
    msgAlertRequiredFieldsTitle: "Campi obbligatori",
    msgAlertRequiredFieldsMatrixElementText: "Devi selezionare una Matrice e un Elemento!",
    msgAlertRequiredFieldsElementText: "Devi selezionare un Elemento!",
    msgAlertRequiredFieldsAnalyticalMethodText: 'Devi selezionare un Metodo Analitico!!!',
    msgAlertNoDataTitle: 'Nessun dato',
    msgAlertNoDataText: 'Dati non disponibili per questo criterio di ricerca',

    histogramColumnSeriesName: 'Istogramma',
    histogramSplineSeriesName: 'Spline',

    histogramClasseVectorLayer: 'Classe',
    histogramElementVectorLayer: "Elemento",
    histogramNumerosityVectorLayer: "Numerosità",
    histogramamplitudeVectorLayer: "Ampiezza",
    histogramStatisticNumerousness: 'Numerosità Classe',
    histogramNewDatasetTitle: 'Istogramma Nuovo Dataset',
    histogramDefaultTitle: 'Istogramma Geobasi',

    chartYAxisTitle: 'Elemento',

    chartSelectionAreaLabel: "Selezione",
    chartNullDataYes: 'SI',
    chartNullDataNo: 'NO',
    chartTotValueSubtitle: 'Totale valori',
    chartMatrixType: 'Tipo Matrice',
    chartFromData: 'Periodo dal',
    chartToData: 'al',
    chartNoDataValue: 'Valori senza data',
    chartLogarithmicScale: "( scala logaritmica )",
    chartActualValues: "( valori reali )",
    chartAnalyticalMethod: 'Metodo Analitico',
    histogramYAxisText: 'Frequenza',
    /**
    * i18n Start
    */

    form: null,
    url: null,
    filter: null,
    layer: this.typeNameBarChart,
    addedLayer: null,
    chartID: null,
    pagePosition: null,
    colorGradient: {
        start: '#FFFF00',
        end: '#FF0000'
    },
    handler: function() {
        me = this;

        var myFilter = geobasi.getdata.getFilter(this);

        var data = this.form.output.getForm().getValues();
        var data2 = this.form.output.getForm().getFieldValues();
        if (!data2.tipo_matrice) {
            Ext.MessageBox.show({
                title: this.msgAlertRequiredFieldsTitle,
                msg: this.msgAlertRequiredFieldsMatrixElementText,
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }
        if (!data2.elemento) {
            Ext.MessageBox.show({
                title: this.msgAlertRequiredFieldsTitle,
                msg: this.msgAlertRequiredFieldsElementText,
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }
        if (!data2.Metodo_analitico) {
            Ext.MessageBox.show({
                title: this.msgAlertRequiredFieldsTitle,
                msg: this.msgAlertRequiredFieldsAnalyticalMethodText,
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

       var elementType = this.target.checkElementType(this.target.output.selElementType,data2.tipo_matrice);

        var viewparams2 = data2.Metodo_analitico == '-999' ?
                            "monitoraggio:" + monitoraggioValue + ";" +
                            "tygeomat:" + data2.tipo_matrice + ";" +
                            "sigla:" + data2.elemento + ";" +
                            "tipometa:" + tipometaStatQuery + ";" +
                            "type:" + elementType.replace(/,/g, '\\,') :
                            "monitoraggio:" + monitoraggioValue + ";" +
                            "tygeomat:" + data2.tipo_matrice + ";" +
                            "sigla:" + data2.elemento + ";" +
                            "tipometa:" + tipometaStatQuery + ";" +
                            "type:" + elementType.replace(/,/g, '\\,');

        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();

        geobasi.bacinifilter.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function(dateFilter) {

            me.makeChart(dateFilter, data, data2, viewparams2);

        }, this);

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
                typeName: this.typeNameBarChart,
                outputFormat: "json",
                propertyName: "source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,geom",
                sortBy: "value"
            } : {
                service: "WFS",
                version: "1.1.0",
                geometryName: "geom",
                request: "GetFeature",
                filter: this.xml,
                typeName: this.typeNameBarChart,
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
                        title: this.msgAlertNoDataTitle,
                        msg: this.msgAlertNoDataText,
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
                this.viewparams3 = data.Metodo_analitico == '-999' ? "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery : "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla:" + data2.elemento + ";" + "tipometa:" + tipometaStatQuery;

                var metodoElaborazione = data.elabmethodtype;

                //var dataCharts = this.getData(this.jsonData2, metodoElaborazione);
                var dataCharts = geobasi.getdata.getBarChartData(this.jsonData2, metodoElaborazione, this);

                this.newColors = jsgradient.generateGradient('#FFCDD6', '#FF0000', dataCharts.length);

                var mainChart = Ext4.getCmp('geobasi_barchart' + "_" + this.chartID);

                var gridStore = Ext4.data.StoreManager.lookup("BarChartStore");

                if (!mainChart) {
                    var hcConfig = {
                        series: [{
                            type: 'column',
                            dataIndex: 'valore',
                            name: this.histogramColumnSeriesName,
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
                                    var vector_layer = new OpenLayers.Layer.Vector(
                                                                me.histogramColumnSeriesName + ' - ' +
                                                                me.histogramClasseVectorLayer + ': ' + record.data.classe + " - " +
                                                                me.histogramElementVectorLayer + ": " + record.data.sigla + " - " +
                                                                me.histogramNumerosityVectorLayer + ": " + record.data.valore + " - " +
                                                                me.histogramamplitudeVectorLayer + ": " + record.data.uuidelemento,
                                    {
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
                            name: this.histogramSplineSeriesName,
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
                                text: this.histogramColumnSeriesName,
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
                                    text: this.chartYAxisTitle + ': ',
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
                                        return 'Classe : ' + this.point.data.classe + ' - ' + me.histogramStatisticNumerousness + ' : ' + this.y;
                                    } else {
                                        return 'Classe : ' + (this.point.x + 1) + ' - ' + me.histogramStatisticNumerousness + ' : ' + this.y;
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
                                                restrictedExtent: new OpenLayers.Bounds([
                                                                            this.series[0].data[0].data.bbox[0],
                                                                            this.series[0].data[0].data.bbox[1],
                                                                            this.series[0].data[0].data.bbox[2],
                                                                            this.series[0].data[0].data.bbox[3]
                                                                            ])
                                            });
                                            for (var i = 0; i < this.series[0].data[0].data.jsonData.features.length; i++) {
                                                var geoJSONgeometry = geoJSON.read(this.series[0].data[0].data.jsonData.features[i].geometry);
                                                geoJSONgeometry[0].attributes = this.series[0].data[0].data.jsonData.features[i].attributes;
                                                vector_layer.addFeatures(geoJSONgeometry[0]);
                                            }

                                            var app = window.app;
                                            var map = app.mapPanel.map;

                                            map.addLayers([vector_layer]);
                                            map.zoomToExtent(new OpenLayers.Bounds(this.series[0].data[0].data.bbox[0],
                                                                                    this.series[0].data[0].data.bbox[1],
                                                                                    this.series[0].data[0].data.bbox[2],
                                                                                    this.series[0].data[0].data.bbox[3]
                                                                                    ));
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

                var newTitle = this.chartID == "added_barChart" ? this.histogramNewDatasetTitle : this.histogramDefaultTitle;

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
                var selectionArea = records.get('vectorSelectionArea') != "false" ? " - " + this.chartSelectionAreaLabel + ": " + records.get('vectorSelectionArea') : "";
                var nullDateString = records.get('nullDate') ? this.chartNullDataYes : this.chartNullDataNo;
                mainChart.chartConfig.chart.backgroundColor = this.chartID == "added_barChart" ? '#F1F9C3' : '#FFFFFF';

                mainChart.chartConfig.subtitle.text = this.chartTotValueSubtitle + ': ' + records.get('totaleRiprova') + ' - ' +
                                                        this.chartMatrixType + ': ' + records.get('dmgeomattipo_descr').toUpperCase() + ' - ' +
                                                        this.chartFromData + " " + records.get('startYear') + ' ' +
                                                        this.chartToData + " " + records.get('endYear') + ' - ' +
                                                        this.chartNoDataValue + ": " + nullDateString +
                                                        selectionArea;

                mainChart.chartConfig.title.text = this.chartAnalyticalMethod + ': ' + records.get('tipoMeta') + ' - ' + 'Geobasi';
                var matrice = records.get('matrice');
                var unitaMisura;

                if (matrice.substr(0, 2) === "01") {
                    unitaMisura = "(mg/L)";
                } else if (matrice === "02" || matrice === "0201") {
                    unitaMisura = "(ppm)";
                } else if (matrice === "0202") {
                    if (records.get('sigla') === "Ca" || records.get('sigla') === "Mg" || records.get('sigla') === "Na" || records.get('sigla') === "K" || records.get('sigla') === "H" || records.get('sigla') === "Al") {
                        unitaMisura = "(meq/100g)";
                    } else if (records.get('sigla') === "C" || records.get('sigla') === "N") {
                        unitaMisura = "(dag/Kg)";
                    }
                };
                // var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)";
                mainChart.chartConfig.yAxis.title.text = this.histogramYAxisText;
                var logText = records.get('log') === "1" ? this.chartLogarithmicScale : this.chartActualValues;
                mainChart.chartConfig.xAxis[0].title.text = this.chartYAxisTitle + ': ' + records.get('sigla') + " " + unitaMisura + ' - ' + logText;
                mainChart.chartConfig.series[0].colors = this.columnChartColors;
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

Ext.reg(gxp.widgets.button.GeobasiDataBarChartButton.prototype.xtype, gxp.widgets.button.GeobasiDataBarChartButton);
