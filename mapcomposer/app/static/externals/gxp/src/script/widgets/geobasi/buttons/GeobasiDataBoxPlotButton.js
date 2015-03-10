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

    /** api: xtype = gxp_geobasiDataChartButton */
    xtype: 'gxp_geobasiDataBoxPlotButton',

    form: null,

    url: null,

    filter: null,

    layer: "geobasi:geobasi_boxplot_view",

    addedLayer: null,

    chartID: null,

    pagePosition: null,

    mainLoadingMask: "Attendere prego, creazione grafico in corso...",

    handler: function () {

        var me = this;

        var myFilter;

        /*if(this.filter.bufferFieldset.hidden === false){
            var radius = this.filter.bufferFieldset.bufferField.getValue(); 
            
            //
            // create point from your lat and lon of your selected feature
            //
            var coordinates = this.filter.bufferFieldset.coordinatePicker.getCoordinate();
            var radiusPoint = new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]);
            
            var polygon;
            if(this.filter.geodesic){
                polygon = OpenLayers.Geometry.Polygon.createGeodesicPolygon(
                    radiusPoint,
                    radius,
                    100, 
                    0,
                    this.target.mapPanel.map.getProjectionObject()
                );
            }else{
                polygon = OpenLayers.Geometry.Polygon.createRegularPolygon(
                    radiusPoint,
                    radius,
                    100, 
                    0
                );
            }
            
            var bounds = polygon.getBounds();                            
            polygon.bounds = bounds;
            
            var radiusFilter = new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: polygon
            });
                            
            myFilter = radiusFilter;            
        }else if(this.filter.filterPolygon && this.filter.filterPolygon.value){*/

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
        
        /*if(data2.matrixMethodType.inputValue === 3){
            Ext.MessageBox.show({
                title: 'Messaggio',
                msg: 'Per la tipologia (MAT) non è possibile la creazione del BoxPlot!!!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });

            //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
            return;
        }else */
        
        if(!data2.tipo_matrice){
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare una Matrice e un Elemento!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });

            //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
            return;        
        }
        
        if(!data2.elemento){
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare un Elemento!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });

            //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
            return;        
        }
        
        var monitoraggioValue;
        
        if(data2.tipomonitoraggio === "01"){
            monitoraggioValue = ' IS NOT NULL';
        }else if(data2.tipomonitoraggio === "02"){
            monitoraggioValue = ' = true';
        }else{
            monitoraggioValue = ' = false';
        }
        
        var viewparams2 = "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento;

        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();

        var allowBaciniIntersect = data2.baciniintersect && !this.filter.baciniintersect.disabled;

        this.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function (dateFilter) {

            me.makeChart(dateFilter, data, data2, viewparams2);

        });

    },
    
    /**  
     * api: method[getData]
     */
    getData: function (json, metodoElaborazione, json1) {

        //features number returned by json (query)
        var arrLength = json.features.length;

        //array with values for boxPlot charts
        var dataPoints = [];
        //mediana totale
        var medianaBoxPlot;

        // Calcolo mediana per l'intero set di valori (per tutti i metodi analitici)
        switch (metodoElaborazione) {
        case "1":
            medianaBoxPlot = (arrLength % 2 == 0) ? (Math.log(json.features[((arrLength) / 2) - 1].properties.value) + Math.log(json.features[((arrLength + 2) / 2) - 1].properties.value)) / 2 : Math.log(json.features[((arrLength + 1) / 2) - 1].properties.value);
            break;
        case "2":
            medianaBoxPlot = (arrLength % 2 == 0) ? (json.features[((arrLength) / 2) - 1].properties.value + json.features[((arrLength + 2) / 2) - 1].properties.value) / 2 : json.features[((arrLength + 1) / 2) - 1].properties.value;
            break;
        }

        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fun /*, thisArg */ ) {
                "use strict";

                if (this === void 0 || this === null)
                    throw new TypeError();

                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();

                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t)
                        fun.call(thisArg, t[i], i, t);
                }
            };
        }

        function uniqueBy(arr, fn) {
            var unique = {};
            var distinct = [];
            arr.forEach(function (x) {
                var key = fn(x);
                if (!unique[key]) {
                    distinct.push(key);
                    unique[key] = true;
                }
            });
            return distinct;
        }

        // usage
        var uniqueTipometa = uniqueBy(json.features, function (x) {
            return x.properties.method;
        });

        for (var i = 0; i < uniqueTipometa.length; i++) {
            var minimo;
            var massimo;
            var myValues = [];
            var metodoAnalitico = uniqueTipometa[i] === null ? '-999' : uniqueTipometa[i];
            var b = 0;
            var firstPercentile;
            var thirdPercentile;

            for (var c = 0; c < arrLength; c++) {
                json.features[c].properties.method = json.features[c].properties.method === null ? '-999' : json.features[c].properties.method;
                if (metodoAnalitico === json.features[c].properties.method) {
                    myValues[b] = {
                        metodo: json.features[c].properties.method,
                        valore: metodoElaborazione == '1' ? Math.log(json.features[c].properties.value) : json.features[c].properties.value,
                        bbox: json.features[c].properties.bbox
                    };
                    b++;
                }
            }

            // http://www.amstat.org/publications/jse/v14n3/langford.html
            // http://www.alcula.com/it/calcolatrici/statistica/quartili/
            // http://www.alcula.com/it/calcolatrici/statistica/mediana/

            var conteggio = myValues.length;

            var firstPercentileVal = (conteggio + 1) / 4;
            var secondPercentile = (conteggio % 2 == 0) ? (myValues[((conteggio) / 2) - 1].valore + myValues[((conteggio + 2) / 2) - 1].valore) / 2 : myValues[((conteggio + 1) / 2) - 1]['valore'];
            var thirdPercentileVal = (conteggio + 1) * 3 / 4;

            // check if a number is integer or float
            var is_int = function (value) {
                if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                }
            }

            // A JavaScript equivalent of PHP’s intval
            var intval = function (mixed_var, base) {
                // http://kevin.vanzonneveld.net
                // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // +   improved by: stensi
                // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                // +   input by: Matteo
                // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
                // +   bugfixed by: Rafał Kukawski (http://kukawski.pl)
                // *     example 1: intval('Kevin van Zonneveld');
                // *     returns 1: 0
                // *     example 2: intval(4.2);
                // *     returns 2: 4
                // *     example 3: intval(42, 8);
                // *     returns 3: 42
                // *     example 4: intval('09');
                // *     returns 4: 9
                // *     example 5: intval('1e', 16);
                // *     returns 5: 30
                var tmp;

                var type = typeof mixed_var;

                if (type === 'boolean') {
                    return +mixed_var;
                } else if (type === 'string') {
                    tmp = parseInt(mixed_var, base || 10);
                    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
                } else if (type === 'number' && isFinite(mixed_var)) {
                    return mixed_var | 0;
                } else {
                    return 0;
                }
            }

            if (is_int(firstPercentileVal)) {
                if (conteggio >= 4) {
                    firstPercentile = myValues[firstPercentileVal - 1].valore;
                } else {
                    firstPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var first = myValues[intval(firstPercentileVal) - 1].valore;
                    var second = myValues[(intval(firstPercentileVal) - 1) + 1].valore;
                    var third = myValues[intval(firstPercentileVal) - 1].valore;
                    var forth = intval(firstPercentileVal);

                    firstPercentile = first + ((second) - third) * (firstPercentileVal - (forth));
                } else {
                    firstPercentile = null;
                }
            }

            if (is_int(thirdPercentileVal)) {
                if (conteggio >= 4) {
                    thirdPercentile = myValues[thirdPercentileVal - 1].valore;
                } else {
                    thirdPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var primo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var secondo = myValues[(intval(thirdPercentileVal) - 1) + 1].valore;
                    var terzo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var quarto = intval(thirdPercentileVal);

                    thirdPercentile = primo + ((secondo) - terzo) * (thirdPercentileVal - (quarto));
                } else {
                    thirdPercentile = null;
                }
            }

            var minimo = myValues[0].valore;
            var massimo = myValues[conteggio - 1].valore;

            var firstPercRecalc = firstPercentile - 1.5 * (thirdPercentile - firstPercentile);
            var thirdPercRecalc = thirdPercentile + 1.5 * (thirdPercentile - firstPercentile);

            var newMin = minimo > firstPercRecalc ? minimo : firstPercRecalc;
            var newMax = massimo < thirdPercRecalc ? massimo : thirdPercRecalc;

            var outlier = [];
            var outlierBbox = [];
            var h = 0


            for (var c = 0; c < conteggio; c++) {
                if (metodoAnalitico == myValues[c].metodo) {
                    if (myValues[c].valore < newMin || myValues[c].valore > newMax) {
                        outlier[h] = [
                            i,
                            Math.round10(myValues[c].valore, -5)
                        ];
                        outlierBbox[h] = [
                            i,
                            myValues[c].bbox
                        ];
                        h++;
                    }
                }
            }

            var obj = null;

            //dataPoints.data[i] = {
            
            dataPoints[i] = {
                experiment: metodoAnalitico === '-999' ? 'Metodo Analitico non specificato' : metodoAnalitico,
                min: Math.round10(newMin, -5),
                q1: Math.round10(firstPercentile, -5),
                med: Math.round10(secondPercentile, -5),
                q2: Math.round10(thirdPercentile, -5),
                max: Math.round10(newMax, -5),
                outlier: outlier,
                median: Math.round10(medianaBoxPlot, -5),
                sigla: json.features[0].properties.element,
                totaleRiprova: arrLength,
                matrice: json.features[0].properties.matrix_cod,
                dmgeomattipo_descr: this.form.output.getForm().getValues().tipo_matrice,
                startYear: this.form.output.getForm().getValues().startYear,
                endYear: this.form.output.getForm().getValues().endYear,
                nullDate: this.form.output.getForm().getFieldValues().allownull,
                vectorSelectionArea: this.vectorSelectionArea,
                log: metodoElaborazione,
                bbox: outlierBbox
            };

        }

        return dataPoints;

    },
    
    /**  
     * api: method[makeChart]
     */
    makeChart: function (dateFilter, data, data2, viewparams2) {
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
                if(newViewParams[i].split(':')[0] === "tygeomat"){
                    addedFilterType = OpenLayers.Filter.Comparison.LIKE;
                    addedFilterValue = newViewParams[i].split(':')[1] + "%";
                }else if(newViewParams[i].split(':')[0] === "monitoraggio"){
                    if(newViewParams[i].split(':')[1] == " IS NOT NULL"){
                        addedFilterType = OpenLayers.Filter.Comparison.NOT_EQUAL_TO;
                        addedFilterValue = null;
                    }else if(newViewParams[i].split(':')[1] == " = true"){
                        addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                        addedFilterValue = "true";
                    }else{
                        addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                        addedFilterValue = "false";
                    }
                }else{
                    addedFilterType = OpenLayers.Filter.Comparison.EQUAL_TO;
                    addedFilterValue = newViewParams[i].split(':')[1];
                }
                
                var filtro = new OpenLayers.Filter.Comparison({
                    //type: newViewParams[i].split(':')[0] === "tygeomat" ? OpenLayers.Filter.Comparison.LIKE : OpenLayers.Filter.Comparison.EQUAL_TO,
                    type: addedFilterType,
                    property: newViewParams[i].split(':')[0],
                    //value: newViewParams[i].split(':')[0] === "tygeomat" ? newViewParams[i].split(':')[1] + "%" : newViewParams[i].split(':')[1]
                    value: addedFilterValue
                });
                aaa.filters.push(filtro);
            }

            //dateFilter.filters.push(aaa);
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
            success: function (result, request) {
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

                    //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                    Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
                    return;
                }
                if (jsonData2.features.length <= 0) {
                    this.appMask.hide();
                    
                    Ext.MessageBox.show({
                        title: 'Nessun dato',
                        msg: 'Dati non disponibili per questo criterio di ricerca',
                        buttons: Ext.Msg.OK,
                        animEl: 'elId',
                        icon: Ext.MessageBox.INFO
                    });

                    //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                    Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
                    return;
                }

                //var aggregatedDataOnly = (granType == "pakistan");
                //var data = this.getData(jsonData, aggregatedDataOnly);
                var data = this.form.output.getForm().getValues();
                //var data1 = this.jsonData1;
                var metodoElaborazione = data.elabmethodtype;

                //var dataCharts = this.getData(jsonData2, metodoElaborazione, data1);
                var dataCharts = this.getData(jsonData2, metodoElaborazione);

                //var charts  = this.makeChart(data, this.chartOpt, listVar, aggregatedDataOnly);

                var mainChart = Ext4.getCmp('geobasi_boxplot' + "_" + this.chartID);

                var gridStore = Ext4.data.StoreManager.lookup("BoxPlotChartStore");

                if (!mainChart) {
                    var hcConfig = {
                        //pointObject: true,
                        series: [{
                            name: 'Osservazioni',
                            type: 'boxplot',
                            minDataIndex: 'min', //valore più piccolo della distribuzione
                            lowQtrDataIndex: 'q1', //primo quartile (25° percentile)
                            medianDataIndex: 'med', //mediana (50° percentile)
                            highQtrDataIndex: 'q2', //terzo quartile (75° percentile)
                            maxDataIndex: 'max', //valore più grande della distribuzione                                        
                            xField: 'experiment'
                        }, {
                            name: 'Valori Anomali',
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
                                pointFormat: 'Osservazione: {point.y}'
                            },
                            visible: true,
                            listeners: {
                                pointclick: function (serie, point, record, event) {
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

                                    map.zoomToExtent(
                                        new OpenLayers.Bounds(
                                            left,
                                            bottom,
                                            right,
                                            top
                                        )
                                    );

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
                                zoomType: 'xy'
                                ,inverted: true
                            },
                            title: {
                                text: "Box Plot",
                                x: -20 //center
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
                                    text: 'Elemento'
                                },
                                plotLines: [{
                                    value: 0,
                                    color: '#C53430',
                                    width: 2,
                                    zIndex: 4,
                                    label: {
                                        text: 'Mediana totale:',
                                        rotation: 0,
                                        align: 'center',
                                        x: 70,
                                        style: {
                                            color: '#C53430'
                                        }
                                    }
                                }]
                            }
                            /*,
                            credits: {
                                text: 'Consorzio LaMMA',
                                href: 'http://www.lamma.rete.toscana.it',
                                style: {
                                    cursor: 'pointer',
                                    color: '#707070',
                                    fontSize: '12px'
                                }
                            }*/
                        }
                    };

                    hcConfig.id = 'geobasi_boxplot' + "_" + this.chartID;
                    mainChart = Ext4.widget('highchart', hcConfig);

                    //if (!myTabPanel) {
                    //if (Ext4.getCmp(this.chartID)) {
                    var myTabPanel = new Ext4.window.Window({
                        title: 'Box Plot',
                        id: this.chartID,
                        itemId: 'boxplot_tab',
                        border: true,
                        autoScroll: true,
                        //height: 500,
                        //width: 650,
                        layout: 'fit',
                        maximizable: true,
                        maximized: false,
                        collapsible: true,
                        collapsed: false,
                        //tabTip: 'Box Plot',
                        closable: true,
                        constrain: true,
                        listeners: {
                            expand: function(p, eOpts){
                                p.items.items[0].refresh();
                                //Ext4.getCmp(this.chartID).refresh();
                            }
                        }
                    });
                    Ext4.getCmp(this.chartID).show();

                    //tabPanel.add(myTabPanel);
                    //}
                    Ext4.getCmp(this.chartID).add(mainChart);
                    Ext4.getCmp(this.chartID).setPagePosition(this.pagePosition);


                }
                
                Ext4.getCmp(this.chartID).expand(true);
                
                var newTitle = this.chartID == "added_boxPlot" ? 'Box Plot Nuovo Dataset' : 'Box Plot Geobasi';
                
                Ext4.getCmp(this.chartID).setTitle(newTitle);

                var dataCharts2 = Ext.util.JSON.encode(dataCharts);

                var proxy = new Ext4.data.proxy.Memory({
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                });

                //gridStore.setProxy(proxy);

                //gridStore.sync();                            
                gridStore && mainChart.bindStore(gridStore);
                gridStore.loadData(dataCharts);
                //Ext.getCmp('id_mapTab').setActiveTab('boxplot_tab');

                var records = gridStore.first();
                
                //gridStore.each(function (records) {
                    var selectionArea = records.get('vectorSelectionArea') != "false" ? " - Selezione: " + records.get('vectorSelectionArea') : "";
                    mainChart.chartConfig.chart.backgroundColor = this.chartID == "added_boxPlot" ? '#F1F9C3' : '#FFFFFF';
                    mainChart.chartConfig.title.text = this.chartID == "added_boxPlot" ? 'Box Plot Nuovo Dataset' : 'Box Plot Geobasi';
                    mainChart.chartConfig.initAnimAfterLoad = false;
                    mainChart.chartConfig.yAxis.plotLines[0].value = records.get('median');
                    mainChart.chartConfig.yAxis.plotLines[0].label.text = 'Mediana totale: ' + records.get('median');
                    mainChart.chartConfig.series[1].visible = false;
                    var nullDateString = records.get('nullDate') ? 'SI' : 'NO';
                    mainChart.chartConfig.subtitle.text = 'Totale valori: ' + records.get('totaleRiprova') + ' - Tipo Matrice: ' + records.get('dmgeomattipo_descr').toUpperCase() + " - Periodo dal " + records.get('startYear') + " al " + records.get('endYear') + " - Valori senza data: " + nullDateString + selectionArea;
                    var unitaMisura = records.get('matrice').substr(0, 2) === "01" ? "(mg/L)" : "(ppm)"
                    mainChart.chartConfig.yAxis.title.text = 'Elemento: ' + records.get('sigla') + " " + unitaMisura;
                    var logText = records.get('log') === "1" ? "( scala logaritmica )" : "( valori reali )";
                    mainChart.chartConfig.xAxis.title.text = 'Metodo Analitico - ' + logText;
                //},this);
                mainChart.draw();

                this.appMask.hide();

            },
            failure: function (result, request) {
                this.appMask.hide();
               
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Server response error',
                    buttons: Ext.Msg.OK,
                    animEl: 'elId',
                    icon: Ext.MessageBox.ERROR
                });

                //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
                Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            }
        });

    },

    /**  
     * api: method[buildFilter]
     */
    buildFilter: function (filter, startDate, endDate, checked, baciniFilter, callback) {

        if (baciniFilter) {

            var app = window.app;
            var map = app.mapPanel.map;
            
            var baciniWfsLayer = app.mapPanel.map.getLayersByName("Intersect Bacini")[0];
            if (baciniWfsLayer){
                app.mapPanel.map.removeLayer(baciniWfsLayer);
            }
            
            var layerBacini = new OpenLayers.Layer.Vector("Intersect Bacini");

            var getFeatureFromWFS = function (response) {

                /*if(response.features.length > 0) {
                    for (var i = 0; i<response.features.length; i++){
                        layerBacini.addFeatures([response.features[i]]);
                    }
                }*/
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
                }

                Ext.Ajax.request({
                    scope: this,
                    url: 'http://www506.regione.toscana.it/geoserver/wfs',
                    method: 'POST',
                    params: {
                        service: "WFS",
                        version: "1.1.0",
                        geometryName: "geom",
                        request: "GetFeature",
                        //filter: this.xml,
                        typeName: 'geobasi:bacini_decod',
                        outputFormat: "json",
                        viewparams: "compostoda:" + ci_sibapoParams
                    },
                    success: function (result, request) {
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
                            filters: [
                                new OpenLayers.Filter.Comparison({
                                    type: OpenLayers.Filter.Comparison.BETWEEN,
                                    property: "year",
                                    lowerBoundary: startDate,
                                    upperBoundary: endDate
                                })
                            ]
                        });

                        var newFilter = new OpenLayers.Filter.Logical({
                            type: OpenLayers.Filter.Logical.AND,
                            filters: [
                                new OpenLayers.Filter.Comparison({
                                    type: OpenLayers.Filter.Comparison.BETWEEN,
                                    property: "year",
                                    lowerBoundary: startDate,
                                    upperBoundary: endDate
                                })
                            ]
                        });

                        if (checked)
                            dateFilter.filters.push(allowNullFilter)

                        if (filter) {
                            baciniFilter ? newFilter.filters.push(aaa) : newFilter.filters.push(filter);
                            if (checked)
                                newFilter.filters.push(dateFilter);
                        }
                        var totFilter = filter ? newFilter : dateFilter;
                        callback(totFilter);

                    },
                    failure: function (result, request) {}

                });
                /*var app = window.app;
                var map = app.mapPanel.map;
                
                map.addLayers([layerBacini]);
                
                var allowNullFilter =  new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.IS_NULL,
                    property: "data_aaaa",
                    value: null
                });
                
                var aaa = new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: []
                });
                    
                for (var i = 0; i<layerBacini.features.length; i++){
                    var baciniFeatures = new OpenLayers.Filter.Spatial({
                            type: OpenLayers.Filter.Spatial.INTERSECTS,
                            property: "geom",
                            value: layerBacini.features[i].geometry
                    });                
                    aaa.filters.push(baciniFeatures);
                }
                
                
                var dateFilter = new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.OR,
                    filters: [
                        new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.BETWEEN,
                            property: "data_aaaa",
                            lowerBoundary: startDate,
                            upperBoundary: endDate
                        })
                    ]
                });
                
                var newFilter = new OpenLayers.Filter.Logical({
                    type: OpenLayers.Filter.Logical.AND,
                    filters: [
                        new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.BETWEEN,
                            property: "data_aaaa",
                            lowerBoundary: startDate,
                            upperBoundary: endDate
                        })
                    ]
                });
                    
                if (checked)
                    dateFilter.filters.push(allowNullFilter)            
                    
                if (filter){
                    baciniFilter ? newFilter.filters.push(aaa) : newFilter.filters.push(filter);        
                    if (checked)
                        newFilter.filters.push(dateFilter);
                }
                var totFilter = filter ? newFilter : dateFilter;                
                callback(totFilter);*/

            };


            var protocol = new OpenLayers.Protocol.WFS({
                url: "http://www506.regione.toscana.it/geoserver/wfs",
                version: "1.1.0",
                featureType: "ci_rwtw_bacini",
                featureNS: "http://geobasi",
                //geometryName: "wkb_geometry",
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
                property: "year"
            });

            var dateFilter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.OR,
                filters: [
                    new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.BETWEEN,
                        property: "year",
                        lowerBoundary: startDate,
                        upperBoundary: endDate
                    })
                ]
            });

            var newFilter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.AND,
                filters: []
            });

            if (checked){
                dateFilter.filters.push(allowNullFilter);
            }

            newFilter.filters.push(filter);
            newFilter.filters.push(dateFilter);

            var totFilter = filter ? newFilter : dateFilter;
            callback(totFilter);
        }

    }

});

// Closure
(function () {

    /**
     * Decimal adjustment of a number.
     *
     * @param    {String}    type    The type of adjustment.
     * @param    {Number}    value    The number.
     * @param    {Integer}    exp        The exponent (the 10 logarithm of the adjustment base).
     * @returns    {Number}            The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();

Ext.reg(gxp.widgets.button.GeobasiDataBoxPlotButton.prototype.xtype, gxp.widgets.button.GeobasiDataBoxPlotButton);