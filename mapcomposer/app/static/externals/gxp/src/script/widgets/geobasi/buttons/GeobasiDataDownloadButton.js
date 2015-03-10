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
 *  .. class:: GeobasiDataDownloadButton(config)
 *
 *    Base class to create chart
 *
 */
gxp.widgets.button.GeobasiDataDownloadButton = Ext.extend(Ext.Button, {

    /** api: xtype = gxp_geobasiDataDownloadButton */
    xtype: 'gxp_geobasiDataDownloadButton',

    form: null,

    url: null,

    filter: null,

    barchart_layer: "geobasi:geobasi_barchart_view",
    
    boxplot_layer: "geobasi:geobasi_boxplot_view",

    addedLayer: null,

    chartID: null,

    pagePosition: null,

    mainLoadingMask: "Attendere prego, download dei dati in corso...",

    colors: [
        '#00FFFF',
        '#0000FF',
        '#8A2BE2',
        '#A52A2A',
        '#DEB887',
        '#5F9EA0',
        '#7FFF00',
        '#D2691E',
        '#FF7F50',
        '#6495ED',
        '#DC143C',
        '#006400',
        '#FF00FF',
        '#FFD700',
        '#FF4500'
    ],

    handler: function () {

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
        
        /*if(data2.elemento == ""){
            Ext.MessageBox.show({
                title: 'Campi obbligatori',
                msg: 'Devi selezionare un Elemento!!!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });

            //Ext.Msg.alert("Nessun dato", "Dati non disponibili per questo criterio di ricerca");
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
            return;        
        }*/
        
        this.tipometaStatQuery = false;

        if (data2.Metodo_analitico == '-999') {
            this.tipometaStatQuery = "IS NULL";
        /*} else if (data2.Metodo_analitico == "") {
            this.tipometaStatQuery = " IN (IS NULL\\,IS NOT NULL)";*/
        } else if (this.addedLayer) {
            this.tipometaStatQuery = data2.Metodo_analitico;
        } else if (data2.Metodo_analitico === ""){
            this.tipometaStatQuery = false;
        }else {
            this.tipometaStatQuery = "= " + "\\'" + data2.Metodo_analitico + "\\'";
        }

        var monitoraggioValue;
        
        if(data2.tipomonitoraggio === "01"){
            monitoraggioValue = ' IS NOT NULL';
        }else if(data2.tipomonitoraggio === "02"){
            monitoraggioValue = ' = true';
        }else{
            monitoraggioValue = ' = false';
        }
        
        if(this.tipometaStatQuery){
            var viewparams2 = data2.Metodo_analitico == '-999' ? "monitoraggio:" + monitoraggioValue + ";" +
                "tygeomat:" + data2.tipo_matrice + ";" +
                "sigla_el:" + data2.elemento + ";" +
                "tipometa:" + this.tipometaStatQuery : "monitoraggio:" + monitoraggioValue + ";" +
                "tygeomat:" + data2.tipo_matrice + ";" +
                "sigla_el:" + data2.elemento + ";" +
                "tipometa:" + this.tipometaStatQuery;
        }else{
            var viewparams2 = "monitoraggio:" + monitoraggioValue + ";" + "tygeomat:" + data2.tipo_matrice + ";" + "sigla_el:" + data2.elemento;
        }

        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();

        this.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function (dateFilter) {

            me.makeChart(dateFilter, data, data2, viewparams2);

        });

    },

    /**  
     * api: method[getData]
     */
    getData: function (json, metodoElaborazione, json1) {

        var num_ele = json.features.length;

        var custLog = function (x, base) {
                // Created 1997 by Brian Risk.  http://brianrisk.com
                return (Math.log(x)) / (Math.log(base));
            }
            // Calcolo del numero appropriato delle classi secondo la FORMULA DI STURGES
            // http://www.gobnf.com/formule/default.aspx?code=0030031LKBP1
            // http://www.aracneeditrice.it/pdf/991.pdf
        var numClassi = 1 + (10 / 3) * (custLog(num_ele, 10));


        // Prendo il valore reale o calcolo il logaritmo naturale dei valori a seconda della scelta effettuata dall'utente
        var resultsLog = [];
        for (var x = 0; x < num_ele; x++) {
            resultsLog[x] = {
                //valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.valore),-4) : Math.round10(json.features[x].properties.valore,-4)
                valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.valore), -4) : Math.round10(json.features[x].properties.valore, -4)
            };
            this.jsonData2.features[x].attributes = {
                valore: resultsLog[x].valore,
                classe: 0,
                colore: ''
            };
        }

        var conteggio = resultsLog.length;

        // Estraggo il valore minimo e il valore massimo
        // dall'array dei valori per il calcolo dell'ampiezza delle classi
        // per la realizzazione del grafico a barre        
        var barMinimo = resultsLog[0].valore;
        var barMassimo = resultsLog[conteggio - 1].valore;

        //echo gettype($barMassimo['valore'])." - ".gettype($barMinimo['valore']) . " - ";

        // Calcolo l'ampiezza delle classi
        var ampClassiInit = (barMassimo - barMinimo) / Math.round(numClassi);
        var ampClassi = Math.round10(ampClassiInit, -4);

        //echo $ampClassi;
        //exit(0);

        // Creo array per inserire il conteggio degli alementi appartenenti ad ogni classe
        var numerositaClassi = new Array();
        for (var i = 0; i < Math.round(numClassi); i++) {
            numerositaClassi[i] = {
                classe: i,
                conteggio: 0,
                ampiezza: ampClassi,
                num_ele: num_ele,
                /*ampiezzaMin: metodoElaborazione == "1" ? Math.round10(Math.exp(barMinimo) + (Math.exp(ampClassi) * (i)), -4) : Math.round10(barMinimo + (ampClassi * (i)), -4),
                ampiezzaMax: metodoElaborazione == "1" ? Math.round10(Math.exp(barMinimo) + (Math.exp(ampClassi) * (i + 1)), -4) : Math.round10(barMinimo + (ampClassi * (i + 1)), -4)*/
                ampiezzaMin: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i)), -4) : Math.round10(barMinimo + (ampClassi * (i)), -4),
                ampiezzaMax: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i + 1)), -4) : Math.round10(barMinimo + (ampClassi * (i + 1)), -4)                
            };
        }

        // Conteggio gli elementi appartenenti alla prima e all'ultima classe
        for (var x = 0; x < num_ele; x++) {
            if (resultsLog[x].valore < barMinimo + ampClassi) {
                numerositaClassi[0].conteggio++;
                this.jsonData2.features[x].attributes.classe = numerositaClassi[0].classe + 1;
                this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[0].classe];
                resultsLog[x].valore = "undefined";

            } else if (resultsLog[x].valore >= (barMinimo + (ampClassi * (Math.round(numClassi))))) {
                numerositaClassi[Math.round(numClassi) - 1].conteggio++;
                this.jsonData2.features[x].attributes.classe = numerositaClassi[Math.round(numClassi) - 1].classe + 1;
                this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[Math.round(numClassi) - 1].classe];
                resultsLog[x].valore = "undefined";
            }
        }

        // Conteggio gli elementi appartenenti alle classi intermedie
        for (var y = 1; y < Math.round(numClassi); y++) {
            for (var x = 0; x < num_ele; x++) {
                var aaa = resultsLog[x].valore;
                var bbb = barMinimo + (ampClassi * (y));
                var ccc = barMinimo + (ampClassi * (y + 1));
                if (resultsLog[x].valore >= (barMinimo + (ampClassi * (y))) && resultsLog[x].valore < (barMinimo + (ampClassi * (y + 1)))) {
                    numerositaClassi[y].conteggio++;
                    this.jsonData2.features[x].attributes.classe = numerositaClassi[y].classe + 1;
                    this.jsonData2.features[x].attributes.colore = this.colors[numerositaClassi[y].classe];
                    resultsLog[x].valore = "undefined";
                }

            }

        }

        /*#######################################################################
        #                                                                      #
        #                               FINE                                   #
        #  CALCOLO DINAMICO DELLE CLASSI PER LA DISTRIBUZIONE DI FREQUENZA     #
        #                                                                      #
        ########################################################################*/

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
                color: this.colors[i],
                valore: numerositaClassi[i].conteggio,
                //totaleDaDB: $num_ele_stat,
                totaleOriginale: numerositaClassi[i].num_ele,
                totaleRiprova: countElem,
                tipoMeta: !json.features[i].properties.tipometa ? 'non specificato' : json.features[i].properties.tipometa,
                num_classi: numerositaClassi.length,
                ampiezza_classi: metodoElaborazione == "1" ? Math.round10(Math.exp(ampClassi), -4) : ampClassi,
                sigla: json.features[i].properties.sigla_el,
                matrice: json.features[i].properties.tygeomat,
                dmgeomattipo_descr: json.features[i].properties.dmgeomattipo_descr,
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

    /** api: method[doDownloadPost]
     * create a dummy iframe and a form. Submit the form 
     */    
     
    doDownloadPost: function(url, data,outputFormat){
        //        
        //delete other iframes appended
        //
        if(document.getElementById(this.downloadFormId)) {
            document.body.removeChild(document.getElementById(this.downloadFormId)); 
        }
        if(document.getElementById(this.downloadIframeId)) {
            document.body.removeChild(document.getElementById(this.downloadIframeId));
        }
        // create iframe
        var iframe = document.createElement("iframe");
        iframe.setAttribute("style","visiblity:hidden;width:0px;height:0px;");
        this.downloadIframeId = Ext.id();
        iframe.setAttribute("id",this.downloadIframeId);
        iframe.setAttribute("name",this.downloadIframeId);
        document.body.appendChild(iframe);
        iframe.onload = function(){
            if(!iframe.contentWindow) return;
            
            var error ="";
            var body = iframe.contentWindow.document.getElementsByTagName('body')[0];
            var content ="";
            if (body.textContent){
              content = body.textContent;
            }else{
              content = body.innerText;
            }
            try{
                var serverError = Ext.util.JSON.decode(content);
                error = serverError.exceptions[0].text
            }catch(err){
                error = body.innerHTML || content;
            }
             Ext.Msg.show({
                title: me.invalidParameterValueErrorText,
                msg: "outputFormat: " + outputFormat + "</br></br>" +
                      "</br></br>" +
                     "Error: " + error,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });   
        }
        var me = this;
        
        // submit form with enctype = application/xml
        var form = document.createElement("form");
        this.downloadFormId = Ext.id();
        form.setAttribute("id", this.downloadFormId);
        form.setAttribute("method", "POST");
        //this is to skip cross domain exception notifying the response body
        var urlregex =/^https?:\/\//i;
        //if absoulte url and do not contain the local host
        var iframeURL = (!urlregex.test(url) || url.indexOf(location.host)>0) ? url :  proxy + encodeURIComponent(url);
        form.setAttribute("action", iframeURL );
        form.setAttribute("target",this.downloadIframeId);
        
        var hiddenField = document.createElement("input");      
        hiddenField.setAttribute("name", "filter");
        hiddenField.value= data;
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit(); 
        
        this.appMask.hide();
    },
    
    /**  
     * api: method[makeChart]
     */
    makeChart: function (dateFilter, data, data2, viewparams2) {
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
                if(newViewParams[i].split(':')[0] === "tygeomat"){
                    addedFilterType = OpenLayers.Filter.Comparison.LIKE;
                    addedFilterValue = newViewParams[i].split(':')[1] + "%";
                }else if(newViewParams[i].split(':')[0] === "monitoraggio"){
                    if(newViewParams[i].split(':')[1] == " IS NOT NULL"){
                        addedFilterType = OpenLayers.Filter.Comparison.IS_NULL;
                        addedFilterType = !addedFilterType;
                        addedFilterValue = "";
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

        var url = this.url;
        var service = "?service=WFS";
        var version = "&version=1.1.0";
        var geometryName = "&geomtryName=geom";
        var request = "&request=GetFeature";
        var filter = "&filter=" + this.xml;
        //var cql_filter = "&cql_filter=" + dateFilter;
        var typeName = this.tipometaStatQuery ? "&typeName=" + this.barchart_layer : "&typeName=" + this.boxplot_layer;
        var outputFormat = "&outputformat=CSV";
        var exception = "&exceptions=application/json";
        var propertyName = "&propertyName=source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,x_coord,y_coord";
        var sortBy = "&sortBy=value";
        this.viewParams = "&viewparams="+viewparams2;
        
        //this.stringURLTot = url + service + version + geometryName + request + filter + typeName + outputFormat + propertyName + sortBy + viewParams;
        this.stringURLTot = url + service + version + geometryName + request + typeName + outputFormat + propertyName + sortBy + exception +  encodeURI(this.viewParams);
        OpenLayers.Request.POST({
            scope: this,
            url: this.stringURLTot,
            data: this.xml,
            callback: function(request){
                var stringa = request.responseText;
                
                if (stringa.length > 200){
                    this.doDownloadPost(this.stringURLTot, this.xml, "CSV");
                }else{
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
                property: "year",
                value: null
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

Ext.reg(gxp.widgets.button.GeobasiDataDownloadButton.prototype.xtype, gxp.widgets.button.GeobasiDataDownloadButton);