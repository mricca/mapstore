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
 *  .. class:: GeobasiDataBoxPlotButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataBoxPlotButton = Ext.extend(Ext.Button, {
    
    /** api: ptype = gxp_geobasidata */
    xtype: 'gxp_geobasiDataBoxPlotButton',
    
    /**
    * i18n Start
    */        
    mainLoadingMask: "Attendere prego, creazione grafico in corso...",
    msgAlertRequiredFieldsTitle: "Campi obbligatori",
    msgAlertRequiredFieldsMatrixElementText: "Devi selezionare una Matrice e un Elemento!",
    msgAlertRequiredFieldsElementText: "Devi selezionare un Elemento!",
    msgAlertNoDataTitle: 'Nessun dato',
    msgAlertNoDataText: 'Dati non disponibili per questo criterio di ricerca',
    
    boxPlotObservationsName: 'Osservazioni',
    boxPlotOutliersName: 'Valori Anomali',
    boxPlotPointsTooltip: 'Osservazione',
    boxPlotNewDatasetTitle: 'Box Plot Nuovo Dataset',
    boxPlotDefaultTitle: 'Box Plot Geobasi',
    
    chartYAxisTitle: 'Elemento',
    chartYAxisPlotLinesText: 'Mediana totale:',
    
    boxPlotPanelTitle: 'Box Plot',
    
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
    
    url: null,
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
        
        var allowBaciniIntersect = data2.baciniintersect && !this.filter.baciniintersect.disabled;
        
        geobasi.bacinifilter.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function(dateFilter) {
            
            me.makeChart(dateFilter, data, data2, viewparams2);
            
        }, this);
        
    },
    makeChart: function(dateFilter, data, data2, viewparams2) {
        this.layer;
        this.addedLayer;
        var newViewParams = viewparams2.split(';');
        this.cql_filter = "( " + newViewParams[0].split(':')[0] + " = '" + newViewParams[0].split(':')[1] + "' AND " + newViewParams[1].split(':')[0] + " = '" + newViewParams[1].split(':')[1] + "' AND " + newViewParams[2].split(':')[0] + " = '" + newViewParams[2].split(':')[1] + "' )";
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
                
                //var dataCharts = this.getData(jsonData2, metodoElaborazione);
                var dataCharts = geobasi.getdata.getBoxPlotData(jsonData2, metodoElaborazione, this);
                
                var mainChart = Ext4.getCmp('geobasi_boxplot' + "_" + this.chartID);
                
                var gridStore = Ext4.data.StoreManager.lookup("BoxPlotChartStore");
                
                if (!mainChart) {
                    var hcConfig = {
                        series: [{
                            name: this.boxPlotObservationsName,
                            type: 'boxplot',
                            minDataIndex: 'min',
                            lowQtrDataIndex: 'q1',
                            medianDataIndex: 'med',
                            highQtrDataIndex: 'q2',
                            maxDataIndex: 'max',
                            xField: 'experiment'
                        }, {
                            name: this.boxPlotOutliersName,
                            type: 'scatter',
                            dataField: 'outlier',
                            dataIndex: 'outlier',
                            yField: 'outlier',
                            marker: {
                                fillColor: 'white',
                                lineWidth: 1,
                                lineColor: Highcharts.getOptions().colors[3]
                            },
                            tooltip: {
                                pointFormat: this.boxPlotPointsTooltip + ': {point.y}'
                            },
                            visible: true,
                            listeners: {
                                pointclick: function(serie, point, record, event) {
                                    point.select(true);
                                    var index;
                                    var newIndex = 0;
                                    for (var i = 0; i < event.currentTarget.points.length; i++) {
                                        if (event.currentTarget.points[i].x == point.x) {
                                            if (event.currentTarget.points[i].selected == true) {
                                                index = newIndex;
                                            }
                                            newIndex++
                                        }
                                    }
                                    var app = window.app;
                                    var map = app.mapPanel.map;
                                    var left = this.chart.store.data.items[point.x].data.bbox[index][1][0];
                                    var bottom = this.chart.store.data.items[point.x].data.bbox[index][1][1];
                                    var right = this.chart.store.data.items[point.x].data.bbox[index][1][2];
                                    var top = this.chart.store.data.items[point.x].data.bbox[index][1][3];
                                    map.zoomToExtent(new OpenLayers.Bounds(left, bottom, right, top));
                                    point.select(false);
                                }
                            }
                        }],
                        height: 500,
                        width: 650,
                        yField: 'outlier',
                        xField: 'experiment',
                        loadMask: true,
                        initAnimAfterLoad: false,
                        chartConfig: {
                            chart: {
                                backgroundColor: '#FFFFFF',
                                marginRight: 50,
                                marginBottom: 80,
                                zoomType: 'xy',
                                inverted: true
                            },
                            title: {
                                text: 'Box Plot',
                                x: -20
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                allowDecimals: false,
                                title: {
                                    text: '',
                                    align: 'middle'
                                },
                                labels: {
                                    rotation: 40,
                                    y: 55
                                }
                            },
                            yAxis: {
                                title: {
                                    text: this.chartYAxisTitle,
                                },
                                plotLines: [{
                                    value: 0,
                                    color: '#C53430',
                                    width: 2,
                                    zIndex: 4,
                                    label: {
                                        text: this.chartYAxisPlotLinesText,
                                        rotation: 0,
                                        align: 'center',
                                        x: 70,
                                        style: {
                                            color: '#C53430'
                                        }
                                    }
                                }]
                            },
                            plotOptions: {
                                boxplot: {
                                    fillColor: '#F0F0E0',
                                    lineWidth: 2,
                                    medianColor: '#0C5DA5',
                                    medianWidth: 4,
                                    stemColor: '#A63400',
                                    stemDashStyle: 'dot',
                                    stemWidth: 1,
                                    whiskerColor: '#3D9200',
                                    whiskerLength: '20%',
                                    whiskerWidth: 3
                                }
                            }
                        }
                    };
                    hcConfig.id = 'geobasi_boxplot' + "_" + this.chartID;
                    mainChart = Ext4.widget('highchart', hcConfig);
                    var myTabPanel = new Ext4.window.Window({
                        title: this.boxPlotPanelTitle,
                        id: this.chartID,
                        itemId: 'boxplot_tab',
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
                
                var newTitle = this.chartID == "added_boxPlot" ? this.boxPlotNewDatasetTitle : this.boxPlotDefaultTitle;
                
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
                mainChart.chartConfig.chart.backgroundColor = this.chartID == "added_boxPlot" ? '#F1F9C3' : '#FFFFFF';
                mainChart.chartConfig.title.text = this.chartID == "added_boxPlot" ? this.boxPlotNewDatasetTitle : this.boxPlotDefaultTitle;
                mainChart.chartConfig.initAnimAfterLoad = false;
                mainChart.chartConfig.yAxis.plotLines[0].value = records.get('median');
                mainChart.chartConfig.yAxis.plotLines[0].label.text = this.chartYAxisPlotLinesText + ': ' + records.get('median');
                mainChart.chartConfig.series[1].visible = false;
                
                mainChart.chartConfig.subtitle.text = this.chartTotValueSubtitle + ': ' + records.get('totaleRiprova') + ' - ' + 
                                                        this.chartMatrixType + ': ' + records.get('dmgeomattipo_descr').toUpperCase() + ' - ' +
                                                        this.chartFromData + " " + records.get('startYear') + ' ' +
                                                        this.chartToData + " " + records.get('endYear') + ' - ' + 
                                                        this.chartNoDataValue + ": " + nullDateString +
                                                        selectionArea;
                                                        
                var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
                mainChart.chartConfig.yAxis.title.text = this.chartYAxisTitle + ': ' + records.get('sigla') + " " + unitaMisura;
                var logText = records.get('log') === "1" ? this.chartLogarithmicScale : this.chartActualValues;
                mainChart.chartConfig.xAxis.title.text = this.chartAnalyticalMethod + ': - ' + logText;
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

Ext.reg(gxp.widgets.button.GeobasiDataBoxPlotButton.prototype.xtype, gxp.widgets.button.GeobasiDataBoxPlotButton);