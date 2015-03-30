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
 *  class = WFSGrid
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: WFSGrid(config)
 *
 *    Plugin for displaying WFS features in a grid. 
 */   
gxp.plugins.WFSGrid = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_wfsgrid */
    ptype: "gxp_wfsgrid",
    
    
    /** api: config[id]
    *  ``String``
    *  
    */
    id: "wfsGridPanel",
    
    /** api: config[featureType]
     *  ``String``
     *
     *  featureType to load from the WFS service
     */
    featureType: null,    
    
    /** api: config[wfsURL]
     *  ``String``
     *  
     *  base URL of the WFS service
     */
    wfsURL: null,
        
    /** api: config[srsName]
     *  ``String``
     *  SRS used to query the WFS (for the output geometry)
     */
    srsName: "EPSG:4326",    
    
    /** api: config[filter]
     *  ``OpenLayers.Filter``
     *  Optional Filter used to extracts features.  
     *
     */
    filter: null,
    
    /** api: config[viewParams]
     *  ``String``
     *  Optional viewParams to contextualize Geoserver parametric sql views
     */
    viewParams: null, 

    /** api: config[version]
     *  ``String``
     *  WFS version to be used for requests.
     */
    version: "1.1.0",
    
    /** api: config[title]
     *  ``String``
     *  Optional title for the grid.
     */
    title: null,
     
    /** api: config[paging]
     *  ``Boolean``
     *  Create a paging grid.
     */
    paging: true,
     
    /** api: config[pageSize]
     *  ``Integer``
     *  Number of records per page shown in the grid.
     */
    pageSize: 10,
    
    /** api: config[autoRefreshInterval]
     *  ``Integer``
     *  Interval in milliseconds for the autorefresh functionality.
     */
    autoRefreshInterval: 10000,
        
    /** api: config[columns]
     *  ``Array Object``
     *  Explicitly configure grid columns to use (columns array of the Ext.Grid)
     */
    columns: null,
    
    /** api: config[fields]
     *  ``Array Object``
     *  Explicitly configure grid store fields to use (columns array of the Ext.Grid)
     */
    fields: null,
    
    /** api: config[data]
     *  ``Array Object``
     *  Static data to be loaded on the grid
     */
    data: null,
    
    /** api: config[extraData]
     *  ``Array Object``
     *  Static data to be loaded on the grid in addition to those got from WFS
     */
    extraData: null,
    
    /** api: config[autoLoad]
     *  ``Boolean``
     *  
     */
    autoLoad: true,
    
    // start i18n
    displayMsgPaging: "Displaying topics {0} - {1} of {2}",
    emptyMsg: "No topics to display",
    loadMsg: "Please Wait...",
    zoomToTooltip: 'Zoom all\'elemento',
    // end i18n
    
    zoomToIconPath: "theme/app/img/silk/map_magnify.png",
    
    chartIconPath: "theme/app/img/silk/chart_line.png",
    
    /** private: countFeature
     *  ``Integer``
     */
    countFeature: null,
    
    featureFields: null,
    
    geometryType: null,
    
    supportTypes: {
        "xsd:boolean": "boolean",
        "xsd:int": "int",
        "xsd:integer": "int",
        "xsd:short": "int",
        "xsd:long": "int",
        /*"xsd:date": "date",
        "xsd:dateTime": "date",*/
        "xsd:date": "string",
        "xsd:dateTime": "string",
        "xsd:string": "string",
        "xsd:float": "float",
        "xsd:double": "float"
    },
    

    /** private: method[constructor]
     */
    constructor: function(config) {
        gxp.plugins.WFSGrid.superclass.constructor.apply(this, arguments);  
        
        if(config.fields){
           this.featureFields = config.fields;
        }
        
        if(config.autoRefresh){
            this.setAutoRefresh(config.autoRefresh);
        }
    },

    /** private: method[getChartsAction]
     */
    getChartsAction: function(actionConf){
        var sourceSRS=actionConf.sourceSRS;
        var me= this;
        return {
            xtype: 'actioncolumn',
            sortable : false, 
            width: 30,
            items: [{
                icon   : this.chartIconPath,  
                tooltip: 'View Charts',
                scope: this,
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.store.getAt(rowIndex);
                    var map = this.target.mapPanel.map;
                    var codStaz = record.get('SCODSTAZOR');
                    var sdescr = "Centralina - " + record.get('SDESCR');
                    Ext.Ajax.request({
                        scope:this,
                        url : "http://172.16.1.53/cgi-bin/getdatamobilita.py",
                        method: 'POST',
                        params:{
                            station: codStaz
                        },
                        success: function ( result, request ) {
                            try{
                                var jsonData = Ext.util.JSON.decode(result.responseText);
                            }catch(e){
                                Ext.Msg.alert("Error","Error parsing data from the server");
                                return;
                            }
                            this.makeChart(this.makeData(jsonData),sdescr,codStaz);
                        },
                        failure: function ( result, request ) {
                            Ext.Msg.alert("Error","Server response error");
                        }
                    }); 
                }
            }]  
        };
    },
    
    makeData: function(data){

        /**CODIFICA SENSORI
        * SENSOR_GROUP 17 (Sensori meteo):
        *
        *    2  : Pressione atmosferica - hPa
        *    3  : Direzione vento - °
        *    8  : Velocità vento - m/s
        *    9  : Temperatura aria - °C
        *    10 : Umidità aria - %
        *    14 : Raffica vento - m/s
        *    15 : Punto di rugiada - °C
        *
        * SENSOR_GROUP 18 (Sensori meteo 2):
        *   
        *    1: Tipo di precipitazione
        *    3: Visibilità
        *
        * SENSOR_GROUP 19 (Road sensor):
        *
        *    0: Road temperature - °C
        *    3: Freeze temperature - °C
        *    4: Salt concentration - %
        *    6: Water film - ùm
        *    7: Road condition
        *
        **/
        
        var sensorGroupObj = {sensorGroupMeteo: [], sensorGroupMeteo2: [], sensorGroupRoad: []};
        for (var i=0,c=data.length;i<c;i++){
            
            switch (data[i].sensor_group){
                case 17:
                    sensorGroupObj.sensorGroupMeteo.push({
                        sensorType  : data[i].sensor_type,
                        sensorTime  : data[i].time,
                        sensorValue : data[i].value
                    });
                    break;
                case 18:
                    sensorGroupObj.sensorGroupMeteo2.push({
                        sensorType  : data[i].sensor_type,
                        sensorTime  : data[i].time,
                        sensorValue : data[i].value
                    });                
                    break;
                case 19:
                    sensorGroupObj.sensorGroupRoad.push({
                        sensorType  : data[i].sensor_type,
                        sensorTime  : data[i].time,
                        sensorValue : data[i].value
                    });                   
                    break;
            }
  
        }
        
        var sensorMeteo = {pressioneAtmosferica:[],direzioneVento:[],velocitaVento:[],temperaturaAria:[],umiditaAria:[],rafficaVento:[],puntoRugiada:[]};
        var sensorMete2 = {tipoPrecipitazione:[],visibilita:[]};
        var sensorRoad = {roadTemperature:[],freezeTemperature:[],saltConcentration:[],waterFilm:[],roadCondition:[]};
        
        for (var key in sensorGroupObj) {
            if (sensorGroupObj.hasOwnProperty(key)) {
                var obj = sensorGroupObj[key];
                for (var prop in obj) {
                    // important check that this is objects own property 
                    // not from prototype prop inherited
                    if(obj.hasOwnProperty(prop)){
                        if(key==="sensorGroupMeteo"){
                            var sensorTime = obj[prop].sensorTime;
                            var time = Date.parseDate(sensorTime, "Y-m-d H:i:s");
                            switch (obj[prop].sensorType){
                                case 2:
                                    sensorMeteo.pressioneAtmosferica.push([time.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                     sensorMeteo.direzioneVento.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 8:
                                     sensorMeteo.velocitaVento.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 9:
                                     sensorMeteo.temperaturaAria.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 10:
                                     sensorMeteo.umiditaAria.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 14:
                                     sensorMeteo.rafficaVento.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 15:
                                     sensorMeteo.puntoRugiada.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;                                    
                            }                        
                        }
                        if(key==="sensorGroupMeteo2"){
                            switch (prop){
                                case 1:
                                    sensorMeteo2.tipoPrecipitazione.push([time.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                    sensorMeteo2.visibilita.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                            }                        
                        }
                        if(key==="sensorGroupRoad"){
                            switch (prop){
                                case 0:
                                    sensorRoad.roadTemperature.push([time.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                    sensorRoad.freezeTemperature.push([time.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 4:
                                    sensorRoad.saltConcentration.push([time.getTime(),obj[prop].sensorValue]);                   
                                    break;
                                case 6:
                                    sensorRoad.waterFilm.push([time.getTime(),obj[prop].sensorValue]);                   
                                    break;
                                case 7:
                                    sensorRoad.roadCondition.push([time.getTime(),obj[prop].sensorValue]);                   
                                    break;                                    
                            }                        
                        
                        }
                    }
                }
            }
        }
        var charts = [sensorMeteo, sensorMete2, sensorRoad];
        return charts
    },
    makeChart: function(data,sdescr,codStaz){

        var mainPanel = Ext.getCmp(app.renderToTab);

		var elementTab = new Ext.TabPanel({
			border: false,
			activeTab: 0,
            deferredRender: false,
            layoutOnTabChange: true,
			id: "newPanel_"+codStaz,
            defaults:{layout: 'fit', bodyStyle: 'background-color: #DFE8F6;'},
			region: "center",
			width: 340,
			split: true,
			collapsible: false,
			header: false,
			enableTabScroll: true,
            forceLayout: true,
			items: []
		});
        
        var tabs = mainPanel.find('title', sdescr);
        if(tabs && tabs.length > 0){
            mainPanel.setActiveTab(tabs[0]); 
        }else{

            var linkTab = new Ext.Panel({
                title: sdescr,
                id:sdescr + "_elementTab", 
                layout:'fit', 
                tabTip: sdescr,
                closable: true,
                items: [
                    elementTab
                ]
            });        
            
            //SENSORI METEO
            var sensoriMeteoTab = new Ext.Panel({
                title: 'Sensori meteo',
                id:'sensoriMeteoTab_'+codStaz,
                border: true,
                layout: 'fit',
                autoScroll: true,
                tabTip: 'Sensori meteo',
                closable: false
            });
            
            //SENSORI METEO 2
            var sensoriMeteo2Tab = new Ext.Panel({
                title: 'Sensori meteo 2',
                id:'sensoriMeteo2Tab'+codStaz,
                border: true,
                layout: 'fit',
                autoScroll: true,
                tabTip: 'Sensori meteo 2',
                closable: false
            });
            
            //SENSORI STRADA
            var sensoriStradaTab = new Ext.Panel({
                title: 'Sensori strada',
                id:'sensoriStradaTab'+codStaz,
                border: true,
                layout: 'fit',
                autoScroll: true,
                tabTip: 'Sensori strada',
                closable: false
            });
            
            mainPanel.add(linkTab);
            elementTab.add(sensoriMeteoTab,sensoriMeteo2Tab,sensoriStradaTab);
            //mainPanel.add(sensoriMeteoTab);
            mainPanel.setActiveTab(linkTab.getId());

            sensoriMeteoTab.add({
                resizeTabs: true,
                autoScroll: true,
                html:    '<div style="max-width:900px; height:400px ; margin: 0 auto">'+
                          '<div id="pressioneAtmosferica'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="direzioneVento'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="velocitaVento'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="temperaturaAria'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                            '<div ></div>'+
                          '</div>'+
                          '<div id="umiditaAria'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="rafficaVento'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                            '<div ></div>'+
                          '</div>'+
                          '<div id="puntoRugiada'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+                      
                        '</div>',
                scope: this
            });       
            
            sensoriMeteoTab.doLayout(false,true);
            


            //mainPanel.add(sensoriMeteo2Tab);
            //mainPanel.setActiveTab(sensoriMeteo2Tab.getId());

            sensoriMeteo2Tab.add({
                resizeTabs: true,
                deferredRender: false,
                autoScroll: true,
                html:    '<div style="max-width:900px; height:400px ; margin: 0 auto">'+
                          '<div id="tipoPrecipitazione'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="visibilita'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                        '</div>',
                scope: this
            });       
            
            sensoriMeteo2Tab.doLayout(false,true);     

           // mainPanel.add(sensoriStradaTab);
            //mainPanel.setActiveTab(sensoriStradaTab.getId());

            sensoriStradaTab.add({
                resizeTabs: true,
                deferredRender: false,
                autoScroll: true,              
                html:    '<div style="max-width:900px; height:400px ; margin: 0 auto">'+
                          '<div id="roadTemperature'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="freezeTemperature'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="saltConcentration'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="waterFilm'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="roadCondition'+codStaz+'" style="width:446px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+                      
                        '</div>',
                scope: this
            });       
            
            sensoriStradaTab.doLayout(false,true);        
            
            if(data[0].pressioneAtmosferica.length > 0){
                var pressioneAtmosferica = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "pressioneAtmosferica"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "pressioneAtmosferica",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "pressioneAtmosferica",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "pressioneAtmosferica",
                        data: data[0]['pressioneAtmosferica'],
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("pressioneAtmosferica"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }
            
            if(data[0].direzioneVento.length > 0){
                var direzioneVento = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "direzioneVento"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "direzioneVento",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "direzioneVento",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "direzioneVento",
                        data: data[0].direzioneVento,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("direzioneVento"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";       
                doc.style.textAlign = "center";
                doc.innerHTML = "direzioneVento";
                doc.innerText = "direzioneVento" ;           
                //mask.hide();        
            }        
            
            if(data[0].velocitaVento.length > 0){
                var velocitaVento = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "velocitaVento"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "velocitaVento",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "velocitaVento",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "velocitaVento",
                        data: data[0].velocitaVento,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("velocitaVento"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }          
            
            if(data[0].temperaturaAria.length > 0){
                var temperaturaAria = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "temperaturaAria"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "temperaturaAria",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "temperaturaAria",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "temperaturaAria",
                        data: data[0].temperaturaAria,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("temperaturaAria"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }         
            
            if(data[0].umiditaAria.length > 0){
                var umiditaAria = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "umiditaAria"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "umiditaAria",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "umiditaAria",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "umiditaAria",
                        data: data[0].umiditaAria,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("umiditaAria"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }         
            
            if(data[0].rafficaVento.length > 0){
                var rafficaVento = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "rafficaVento"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "rafficaVento",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "rafficaVento",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "rafficaVento",
                        data: data[0].rafficaVento,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("rafficaVento"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }        

            if(data[0].puntoRugiada.length > 0){
                var puntoRugiada = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "puntoRugiada"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "puntoRugiada",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "puntoRugiada",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "puntoRugiada",
                        data: data[0].puntoRugiada,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("puntoRugiada"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }

            if(data[1].tipoPrecipitazione.length > 0){
                var tipoPrecipitazione = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "tipoPrecipitazione"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "tipoPrecipitazione",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "tipoPrecipitazione",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "tipoPrecipitazione",
                        data: data[0].tipoPrecipitazione,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("tipoPrecipitazione"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";             
                //mask.hide();        
            }

            if(data[1].visibilita.length > 0){
                var visibilita = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "visibilita"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "visibilita",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "visibilita",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "visibilita",
                        data: data[0].visibilita,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("visibilita"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                       
                //mask.hide();        
            }

            if(data[2].roadTemperature.length > 0){
                var roadTemperature = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "roadTemperature"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "roadTemperature",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "roadTemperature",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "roadTemperature",
                        data: data[0].roadTemperature,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("roadTemperature"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                        
                //mask.hide();        
            }

            if(data[2].freezeTemperature.length > 0){
                var freezeTemperature = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "freezeTemperature"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "freezeTemperature",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "freezeTemperature",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "freezeTemperature",
                        data: data[0].freezeTemperature,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("freezeTemperature"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                         
                //mask.hide();        
            }

            if(data[2].saltConcentration.length > 0){
                var saltConcentration = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "saltConcentration"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "saltConcentration",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "saltConcentration",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "saltConcentration",
                        data: data[0].saltConcentration,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("saltConcentration"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                         
                //mask.hide();        
            }

            if(data[2].waterFilm.length > 0){
                var waterFilm = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "waterFilm"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "waterFilm",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "waterFilm",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "waterFilm",
                        data: data[0].waterFilm,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("waterFilm"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                          
                //mask.hide();        
            }

            if(data[2].roadCondition.length > 0){
                var roadCondition = new Highcharts.StockChart({
                    chart : {
                        type: 'line',
                        renderTo : "roadCondition"+codStaz
                    },
                    rangeSelector : {                                
                        buttons: [{
                            type: 'day',
                            count: 0.25,
                            text: '6 h'
                        },{
                            type: 'day',
                            count: 0.5,
                            text: '12 h'
                        },{
                            type: 'day',
                            count: 1,
                            text: '1 d'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],                                
                        selected : 3,
                        enabled: true
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : "roadCondition",
                        style: {
                            color: '#3E576F',
                            fontSize: '12px'
                        }        
                    },
                    subtitle : {
                        //text : response.features[0].data.fornitore + " - " + response.features[0].data.nome + " - Quota: " + response.features[0].data.quota,
                        text : "roadCondition",//response.features[0].data.temp_med_acq ? "Average Sea Temperature" : "Quota: " + response.features[0].data.quota,
                        style: {
                            color: '#3E576F',
                            fontSize: '10px'
                        }        
                    },                            
                    series : [{
                        name : "roadCondition",
                        data: data[0].roadCondition,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                var doc = document.getElementById("roadCondition"+codStaz);
                doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
                doc.style.backgroundPosition = "center";
                doc.style.backgroundRepeat = "no-repeat";                         
                //mask.hide();        
            }     
        }
    },
    
    /** private: method[getZoomAction]
     */
    getZoomAction: function(actionConf){
        var sourceSRS=actionConf.sourceSRS;
        var me= this;
        return {
            xtype: 'actioncolumn',
            sortable : false, 
            width: 30,
            items: [{
                icon   : this.zoomToIconPath,  
                tooltip: this.zoomToTooltip,
                scope: this,
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.store.getAt(rowIndex);
                    var map = this.target.mapPanel.map;
                    var geometry = me.getGeometry(record,sourceSRS);
                    var ppp = geometry.getBounds();
                    map.zoomToExtent(geometry.getBounds(),true);
                }
            }]  
        };
    },
    /** api: method[addOutput]
     */    
    getCheckDisplayAction: function(actionConf){
        var me= this;
        var checkConf = {
            listeners: {
                scope: this,				
                rowdeselect: function (selMod, rowIndex, record){
                    me.removeGeometry(actionConf.layerName, record.get("fid"));
                },
                rowselect: function(check, rowIndex, record) {
                    var geom = me.getGeometry(record,actionConf.sourceSRS);
                    me.displayGeometry(actionConf.layerName, 
                        record.get("fid"),
                        geom, actionConf.style);
                }
            }
        };
        return new Ext.grid.CheckboxSelectionModel(checkConf);  
    },
    /** api: method[addOutput]
     */    
    displayGeometry: function(layerName, id, geometry, style ){ //"Bersaglio Selezionato"
        var map = this.target.mapPanel.map;
        var targetLayer = map.getLayersByName(layerName)[0];
        
        var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;       
        
        if(!targetLayer){
            var layerStyle= style || {
                strokeColor: "#FF00FF",
                strokeWidth: 2,
                fillColor: "#FF00FF",
                fillOpacity: 0.8
            };
                                    
            targetLayer = new OpenLayers.Layer.Vector(layerName,{
                displayInLayerSwitcher: false,
                style: layerStyle,
                renderers: renderer
            });
			
            map.addLayer(targetLayer);
        }
        if(geometry) {
            var feature = new OpenLayers.Feature.Vector(geometry,{
                "id": id
            });
            targetLayer.addFeatures([feature]);	   
        }
        return targetLayer;
    }, 
    /** api: method[addOutput]
     */    
    removeGeometry: function(layerName, id){
        var map = this.target.mapPanel.map;
        var targetLayer = map.getLayersByName(layerName)[0];
        if(targetLayer) {
            var unSelectFeatures= targetLayer.getFeaturesByAttribute("id", id);
            targetLayer.removeFeatures(unSelectFeatures); 
        }
    },    
    /** api: method[addOutput]
     */    
    getGeometry: function(rec, sourceSRS){
        var map = this.target.mapPanel.map;
        var geometry = rec.data.feature.geometry;
        var ppp = geometry.getBounds();
        if(geometry && sourceSRS) {
            var mapProj = map.getProjection();
            if(sourceSRS != map.getProjection()){
                var coll=new OpenLayers.Geometry.Collection(new Array(geometry.clone()));
                    var ccc = new OpenLayers.Projection(sourceSRS);
                    var bbb = map.getProjectionObject();
                var targetColl=coll.transform(
                    new OpenLayers.Projection(sourceSRS),
                    map.getProjectionObject()
                    );
                geometry = targetColl.components[0];   
                delete targetColl;
            }
        }
        return geometry;
    },    
    /** api: method[addOutput]
     */
    addOutput: function(config) {
        var me = this;
        this.wfsColumns = [];

        if(me.actionColumns){
            for( var kk=0; kk<me.actionColumns.length; kk++){
                switch (me.actionColumns[kk].type){
                    case "charts":
                        me.wfsColumns.push(me.getChartsAction(me.actionColumns[kk]));
                        break;                
                    case "zoom":
                        me.wfsColumns.push(me.getZoomAction(me.actionColumns[kk]));
                        break;
                    case "checkDisplay":
                        var checkModel=me.getCheckDisplayAction(me.actionColumns[kk]);
                        this.sm= checkModel;
                        me.wfsColumns.push(checkModel);
                        break;   
                }
            }
        }

        var bbar;
        
        if(this.paging) {
            bbar = this.createPagingToolbar();
        }
        
        var wfsGridPanel=new Ext.grid.EditorGridPanel({ 
            title: this.title, 
            store: [], 
            id: this.id,
            layout: "fit",
           
            viewConfig : {
                forceFit: true
            },
            listeners: {
                render: function(grid){
                    if(me.loadMsg){
                       me.loadMask = new Ext.LoadMask(grid.getEl(), {msg:me.loadMsg});
                    }
                    
                }
            },     
            sm: this.sm,
            colModel: new Ext.grid.ColumnModel({
                columns: []
            }),
            bbar: bbar,
            scope: this    
        }); 

        config = Ext.apply(wfsGridPanel, config || {});
        
        this.wfsGrid = gxp.plugins.WFSGrid.superclass.addOutput.call(this, config);
        
        if(this.data) {
            this.loadData();
        } if(this.autoLoad) {
            this.countRecords(this.onTotal, this);
        } else {
            this.wfsGrid.on('activate', function() {            
                if(this.data) {
                    this.loadData();
                } else {
                    this.countRecords(this.onTotal, this);
                }
            }, this, {single: true});
        }
        
        return this.wfsGrid;
    },
    
    onTotal: function(total, callback){
        if(parseInt(total,10) > 0 || (this.extraData && this.extraData.length > 0)) {
            this.loadSchema(this.onSchema.createDelegate(this, [callback]));	
        } else if(this.onEmpty){
            this.isEmpty = true;
            this.onEmpty.call(null, this);
        }       
    },
    
    onSchema: function(callback) {
        if(this.columns){
            for(kk=0; kk<this.columns.length; kk++){
                var column = {};
                Ext.apply(column, this.columns[kk]);
                if(column.header instanceof Array) {
                    column.header = column.header[GeoExt.Lang.getLocaleIndex()];
                }
                
                this.wfsColumns.push(column);
            }
        }else{
            for(kk=0; kk<this.featureFields.length; kk++){
                this.wfsColumns.push({
                    header: this.featureFields[kk].name, 
                    dataIndex: this.featureFields[kk].name,
                    sortable: true
                });
            }
        } 
        
        for(kk=0; kk<this.featureFields.length; kk++){
            if(this.featureFields[kk].mapping) {
                this.featureFields[kk].mapping = this.featureFields[kk].mapping.replace('${locale}', GeoExt.Lang.locale);                             
            }
        }
        
        var me = this;
        
        new GeoExt.data.FeatureStore({ 
            wfsParam: this,
            id: this.id+"_store",
            fields: this.featureFields,
            listeners:{
                beforeload: function(store){
                    if(this.loadMask && this.loadMask.el && this.loadMask.el.dom)
                        this.loadMask.show(); 
                    
                    this.wfsGrid.reconfigure(
                        store, 
                        new Ext.grid.ColumnModel({
                            columns: this.wfsColumns
                        })
                    );
                    if(this.wfsGrid.getBottomToolbar() && this.wfsGrid.getBottomToolbar().bind) {
                        this.wfsGrid.getBottomToolbar().bind(store);
                    }
                },
                load : function(store){
                     if(this.loadMask)
                        this.loadMask.hide(); 
                },
                
                exception : function(store){
                    if(this.loadMask && this.loadMask.el && this.loadMask.el.dom)
                        this.loadMask.hide(); 
                },
                scope: this
            },
            loadRecords : function(o, options, success){     
                if (this.isDestroyed === true) {
                    return;
                }
                        
                if(!o || success === false){
                    if(success !== false){
                        this.fireEvent('load', this, [], options);
                    }
                    if(options.callback){
                        options.callback.call(options.scope || this, [], options, false, o);
                    }
                    return;
                }
                o.totalRecords = me.countFeature;
                
                var r = o.records, t = o.totalRecords || r.length;
                if(!options || options.add !== true){
                    if(this.pruneModifiedRecords){
                        this.modified = [];
                    }
                    
                    var finalRecords = [];
                    for(var i = 0, len = r.length; i < len; i++){
                        var add = true;
                        if(me.extraData && me.extraData.length > 0) {
                            for(var j = 0, lenextra = me.extraData.length; j < lenextra; j++){
                                var extraRecord = me.extraData[j];
                                if(extraRecord.id === r[i].get("id")) {
                                    if(extraRecord.removed) {
                                        add = false;
                                    } else {
                                        // changed
                                        r[i].data.feature.geometry = extraRecord.geometry;
                                        r[i].set("value", extraRecord.value);                                                    
                                    }
                                }
                            }
                        }
                        if(add) {
                            r[i].join(this);
                            finalRecords.push(r[i]);
                        }
                    }
                    if(!options || !options.params || !options.params.start || options.params.start === 0) {
                        // add new records only to the first page
                        if(me.extraData && me.extraData.length > 0) {
                            for(var j = 0, lenextra = me.extraData.length; j < lenextra; j++){
                                var extraRecord = me.extraData[j];
                                if(extraRecord.newfeature) {
                                    var recordType = me.wfsGrid.getStore().recordType;
                                    var newRecord = new recordType({                                                    
                                        "geometry": "",
                                        "id": extraRecord.id,
                                        "fid": extraRecord.id,
                                        "feature": {
                                            "geometry": extraRecord.geometry
                                        },
                                        "value": extraRecord.value
                                    });
                                    finalRecords.push(newRecord);
                                }
                            }
                        }
                    }
                            
                    if(this.snapshot){
                        this.data = this.snapshot;
                        delete this.snapshot;
                    }
                            
                    this.clearData();
                    this.data.addAll(finalRecords);   
                    this.totalLength = t;       
                    this.fireEvent('datachanged', this);
                    
                }else{
                            
                    this.totalLength = Math.max(t, this.data.length+r.length);
                    this.add(r);
                }
                        
                this.fireEvent('load', this, r, options);
                if(options.callback){
                    options.callback.call(options.scope || this, r, options, true);
                }
                if(callback) {
                    callback.call();
                }
            },
            proxy: new GeoExt.data.ProtocolProxy({ 
                protocol: 
                this.getProtocol({
                    limit: !me.paging ? 1000 : this.pageSize,
                    start:  0
                })
            }), 
            autoLoad: true 
        });

    },
    
    
    createPagingToolbar: function() {
        return new Ext.PagingToolbar({
            pageSize: this.pageSize,
            wfsParam: this,
            id: this.id+"_paging",
            store: [],
            displayInfo: true,
            listeners: {
                "beforechange": function(paging,params){
                    paging.store.removeAll(true);
                    paging.store.proxy=new GeoExt.data.ProtocolProxy({ 
                        protocol:
                        this.getProtocol({
                            limit: params.limit,
                            start:  params.start
                        })
                    });
                },
                scope: this
                            
            },
            displayMsg: this.displayMsgPaging,
            emptyMsg: this.emptyMsg
        });
    },
    
    countRecords: function(callback, scope){
        
        var hitCountProtocol = this.getProtocol({
            resultType: "hits",
            outputFormat: "text/xml"
        });
                 
               
        hitCountProtocol.read({
            callback: function(response) {
                var respObj=new OpenLayers.Format.WFST({version: "1.1.0"}).read(
                            response.priv.responseXML, {output: "object"});
                this.countFeature=respObj.numberOfFeatures;
                if(callback)
                    callback.call(scope, this.countFeature);
            },
            scope: this
        });
         
        return this.countFeature;
    },
    
    
    loadSchema: function(callback, scope){
        if(this.featureFields == null){
            this.getSchema(function(schema){
                this.featureFields= new Array();
                var geomRegex = /gml:((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry)).*/;
                    
                schema.each(function(r) {
                    var match = geomRegex.exec(r.get("type"));
                    if (match) {
                        this.geometryType = match[1];
                    } else {
                        var type = this.supportTypes[r.get("type") || "string"];
                        var field = {
                            name: r.get("name"),
                            type: type
                        };
                        this.featureFields.push(field);
                    }
                }, this);
                               
                if(callback)
                    callback.call(scope); 
            }, this); 
       } else if(callback) {
            callback.call(scope);  
       }
        
    },
    
    getSchema: function(callback,scope){
        var schema = new GeoExt.data.AttributeStore({
            url: this.wfsURL, 
            baseParams: {
                SERVICE: "WFS",
                VERSION: "1.1.0",
                REQUEST: "DescribeFeatureType",
                TYPENAME: this.featureType
            },
            autoLoad: true,
            listeners: {
                "load": function() {
                    callback.call(scope, schema);
                },
                scope: this
            }
        });
    },
         
    setFilter: function(filter){
        this.filter=filter;
        this.setPage(1);
    },
    
    update: function (filter, viewParams){
        this.filter=filter;
        this.viewParams=viewParams;
        this.setPage(1);
    },
    

    setAutoRefresh: function(ms){
        var me=this;  
        this.autoRefreshInterval=setInterval(
            function() { 
                me.refresh()
            }, ms);  
    },
    
    
    clearAutoRefresh: function(){
        if(this.autoRefreshInterval)
            clearInterval(this.autoRefreshInterval);
    },
    
    resetFilter: function(){
        this.filter=null;
        this.setPage(1);
    },


    refresh: function(){
        var pagID= this.id+"_paging"; 
        this.countRecords(function(){
            var paging=Ext.getCmp(pagID);
            paging.doRefresh();
        });
    },
    
    getProtocol: function(params){
        var protocol;
        
        var otherParams=""; 
        if(params){
            otherParams+= params.limit ? "&maxFeatures="+params.limit :"";
            otherParams+= params.start ? "&startIndex="+params.start :"";
            otherParams+= params.resultType ? "&resultType="+params.resultType :"";     
        } 
        if(this.filter){
            var filterFormat = new OpenLayers.Format.Filter();
            otherParams+="&filter="+  filterFormat.write(this.filter);
        }
       
        otherParams+= this.sortAttribute ? "&sortBy="+this.sortAttribute :"";
        otherParams+= this.viewParams ? "&viewParams="+encodeURIComponent(this.viewParams) : "";
        otherParams+= this.outputFormat ? "&outputFormat="+this.outputFormat : "&outputFormat=json";
       
        
       
        protocol= new OpenLayers.Protocol.HTTP({
            url: this.wfsURL+"?service=WFS"
            +"&version="+this.version
            +"&request=GetFeature"
            +"&typeName="+this.featureType                
            +"&srs="+this.srsName
            +otherParams,
            format: new OpenLayers.Format.GeoJSON()
        }); 
        
        return protocol;
    },
    
    setPage: function(pageNumber){
        var pagID= this.id+"_paging"; 
        this.countRecords(function(){
            var paging=Ext.getCmp(pagID);
            paging.changePage(pageNumber);
        }); 
    },

    
    loadData: function() {
        var store = new GeoExt.data.FeatureStore({ 
            id: this.id+"_store",
            fields: this.featureFields
            
        });
        
        if(this.columns){
            for(kk=0; kk<this.columns.length; kk++){
                var column = {};
                Ext.apply(column, this.columns[kk]);
                if(column.header instanceof Array) {
                    column.header = new Ext.XTemplate(column.header[GeoExt.Lang.getLocaleIndex()]).apply(this.tplData || {});
                }
                if(column.hidden && typeof column.hidden === 'string') {                    
                    column.hidden = (new Ext.XTemplate(column.hidden).apply(this.tplData || {})) === "true";
                }
                this.wfsColumns.push(column);
            }
        }
        
        this.wfsGrid.reconfigure(
            store, 
            new Ext.grid.ColumnModel({
                columns: this.wfsColumns
            })
        );
        if(this.wfsGrid.getBottomToolbar()) {
            this.wfsGrid.getBottomToolbar().bind(store);   
        }
        
        store.loadData(new OpenLayers.Format.GeoJSON().read(this.data));

    }
    
});

Ext.preg(gxp.plugins.WFSGrid.prototype.ptype, gxp.plugins.WFSGrid);

