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
 *  .. class:: GeobasiDataCurvaCumButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataCurvaCumButton = Ext.extend(Ext.Button, {
    xtype: 'gxp_geobasiDataCurvaCumButton',

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

    curvaCumNewDatasetTitle: 'Cumulata Nuovo Dataset',
    curvaCumDefaultTitle: 'Cumulata Geobasi',

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
    /**
    * i18n Start
    */

    form: null,
    url: null,
    filter: null,
    layer: this.typeNameBoxPlot,
    addedLayer: null,
    chartID: null,
    pagePosition: null,
    handler: function() {

        var me = this;

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
        var monitoraggioValue;
        if (data2.tipomonitoraggio === "01") {
            monitoraggioValue = ' IS NOT NULL';
        } else if (data2.tipomonitoraggio === "02") {
            monitoraggioValue = ' = true';
        } else {
            monitoraggioValue = ' = false';
        }

        var elementType = this.target.checkElementType(this.target.output.selElementType,data2.tipo_matrice);

        var viewparams2 = "monitoraggio:" + monitoraggioValue + ";" +
                            "tygeomat:" + data2.tipo_matrice + ";" +
                            "sigla:" + data2.elemento + ";" +
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
                        addedFilterType = OpenLayers.Filter.Comparison.NOT_EQUAL_TO;
                        addedFilterValue = null;
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
                request: "GetFeature",
                filter: this.xml,
                typeName: this.typeNameBoxPlot,
                outputFormat: "json",
                propertyName: "source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,geom",
                sortBy: "value"
            } : {
                service: "WFS",
                version: "1.1.0",
                geometryName: "geom",
                request: "GetFeature",
                filter: this.xml,
                typeName: this.typeNameBoxPlot,
                outputFormat: "json",
                propertyName: "source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,geom",
                sortBy: "value",
                viewparams: viewparams2
            },
            success: function(result, request) {
                try {
                    var jsonData2 = Ext.util.JSON.decode(result.responseText);
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
                if (jsonData2.features.length <= 0) {
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

                var metodoElaborazione = data.elabmethodtype;

                var dataCharts = geobasi.getdata.getCurvCumulData(jsonData2, metodoElaborazione, this);

                var mainChart = Ext4.getCmp('geobasi_curvacum' + "_" + this.chartID);

                var gridStore = Ext4.data.StoreManager.lookup("MatrixStore");

                if (!mainChart) {
                    var hcConfig = {
                        series: [{
                            type: 'line',
                            lineWidth: 3,
                            turboThreshold: 10000,
                            yField: 'uuidelemento',
                            visible: true
                        }],
                        height: 500,
                        width: 650,
                        initAnimAfterLoad: true,
                        debug: false,
                        lineShift: true,
                        chartConfig: {
                            chart: {
                                marginRight: 130,
                                marginBottom: 160,
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'Curva Cumulata',
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
                                    value: 0.95,
                                    color: '#FF0000',
                                    width: 1,
                                    zIndex: 4,
                                    label: {
                                        text: '',
                                        align: 'center',
                                        style: {
                                            color: 'red'
                                        }
                                    }
                                }]
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -10,
                                y: 100,
                                borderWidth: 0
                            },
                        }
                    };
                    hcConfig.id = 'geobasi_curvacum' + "_" + this.chartID;
                    mainChart = Ext4.widget('highchart', hcConfig);
                    var myTabPanel = new Ext4.window.Window({
                        title: 'Curva Cumulata',
                        id: this.chartID,
                        itemId: 'curvacum_tab',
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

                var newTitle = this.chartID == "added_curvaCum" ? this.curvaCumNewDatasetTitle : this.curvaCumDefaultTitle;

                Ext4.getCmp(this.chartID).setTitle(newTitle);
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
                mainChart.chartConfig.chart.backgroundColor = this.chartID == "added_curvaCum" ? '#F1F9C3' : '#FFFFFF';
                mainChart.chartConfig.title.text = this.chartID == "added_curvaCum" ? this.curvaCumNewDatasetTitle : this.curvaCumDefaultTitle;
                mainChart.chartConfig.yAxis.plotLines[0].value = 0.95;
                mainChart.chartConfig.yAxis.plotLines[0].label.text = '95° percentile';
                var nullDateString = records.get('nullDate') ? this.chartNullDataYes : this.chartNullDataNo;

                mainChart.chartConfig.subtitle.text = this.chartTotValueSubtitle + ': ' + records.get('totaleRiprova') + ' - ' +
                                                        this.chartMatrixType + ': ' + records.get('dmgeomattipo_descr').toUpperCase() + ' - ' +
                                                        this.chartFromData + " " + records.get('startYear') + ' ' +
                                                        this.chartToData + " " + records.get('endYear') + ' - ' +
                                                        this.chartNoDataValue + ": " + nullDateString +
                                                        selectionArea;

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
                // var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
                mainChart.chartConfig.yAxis.title.text = this.chartYAxisTitle + ': ' + records.get('sigla') + " " + unitaMisura;
                var logText = records.get('log') === "1" ? this.chartLogarithmicScale : this.chartActualValues;
                mainChart.chartConfig.xAxis[0].title.text = logText;
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
    }
});

Ext.reg(gxp.widgets.button.GeobasiDataCurvaCumButton.prototype.xtype, gxp.widgets.button.GeobasiDataCurvaCumButton);
