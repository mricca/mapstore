

Ext.namespace('mobility.chartsbuilder');

    /**CODIFICA SENSORI
    SENSOR_GROUP 17 (Sensori meteo):
    
        2  : Pressione atmosferica - hPa
        3  : Direzione vento - ?
        8  : Velocit?ento - m/s
        9  : Temperatura aria - ?
        10 : Umidit?ria - %
        14 : Raffica vento - m/s
        15 : Punto di rugiada - ?
    
    SENSOR_GROUP 18 (Sensori meteo 2):
       
        1: Tipo di precipitazione
        3: Visibilit?        
    SENSOR_GROUP 19 (Road sensor):
    
        0: Road temperature - ?
        3: Freeze temperature - ?
        4: Salt concentration - %
        6: Water film - ??            7: Road condition
    
    La direzione del vento uguale a -1 indica un dato di direzione del vento non rilevata.

    Il dato tipo di precipitazione ha il seguente significato:
    0 = No precipitation
    60 = Rain
    67 = Freezing rain
    69 = Sleet
    70 = Snow
    90 = Hail

    Il dato Stato del manto stradale ha il seguente significato:
    0  = Dry
    1  = Moist
    2  = Wet
    5  = Residual Salt
    6  = Freezing Wet / Black Ice
    7  = Critical
    > 90  = Undefined        
    **/

mobility.chartsbuilder = {

    mainLoadingMask: "Attendere prego, creazione grafico in corso...",
    
    chartsStyle: {
        titleColor: "#FF0000",
        fontWeight: "bold",
        fontSize: "14px"
    },

    chartsTextAndUnits: {
        pressioneAtmosferica : "Pressione atmosferica - hPa",
        direzioneVento : "Direzione vento - °",
        velocitaVento : "Velocità vento - m/s",
        temperaturaAria : "Temperatura aria - °C",
        umiditaAria : "Umidità aria - %",
        rafficaVento : "Raffica vento - m/s",
        puntoRugiada : "Punto di rugiada - °C",
        tipoPrecipitazione : "Tipo di precipitazione",
        visibilita : "Visibilità - m",
        roadTemperature : "Road temperature - °C",
        freezeTemperature : "Freeze temperature - °C",
        saltConcentration : "Salt concentration - %",
        waterFilm : "Water film - ùm",
        roadCondition : "Road condition"
    },
        
    postRequest: function(codStaz,sdescr){
    
        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();    
        
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
                    this.appMask.hide();
                    return;
                }
                mobility.chartsbuilder.makeChart(mobility.chartsbuilder.makeData(jsonData),sdescr,codStaz);
                this.appMask.hide();
            },
            failure: function ( result, request ) {
                Ext.Msg.alert("Error","Server response error");
                this.appMask.hide();
                return;
            }
        });
    
    },
    
    makeData: function(data){
        
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
        var sensorMeteo2 = {tipoPrecipitazione:[],visibilita:[]};
        var sensorRoad = {roadTemperature:[],freezeTemperature:[],saltConcentration:[],waterFilm:[],roadCondition:[]};
        
        for (var key in sensorGroupObj) {
            if (sensorGroupObj.hasOwnProperty(key)) {
                var obj = sensorGroupObj[key];
                for (var prop in obj) {
                    if(obj.hasOwnProperty(prop)){
                        if(key==="sensorGroupMeteo"){
                            var sensorTimeMeteo = obj[prop].sensorTime;
                            var timeMeteo = Date.parseDate(sensorTimeMeteo, "Y-m-d H:i:s");
                            switch (obj[prop].sensorType){
                                case 2:
                                    sensorMeteo.pressioneAtmosferica.push([timeMeteo.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                     sensorMeteo.direzioneVento.push([timeMeteo.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 8:
                                     sensorMeteo.velocitaVento.push([timeMeteo.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 9:
                                     sensorMeteo.temperaturaAria.push([timeMeteo.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 10:
                                     sensorMeteo.umiditaAria.push([timeMeteo.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 14:
                                     sensorMeteo.rafficaVento.push([timeMeteo.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 15:
                                     sensorMeteo.puntoRugiada.push([timeMeteo.getTime(),obj[prop].sensorValue]);                
                                    break;                                    
                            }                        
                        }
                        if(key==="sensorGroupMeteo2"){
                            var sensorTimeMeteo2 = obj[prop].sensorTime;
                            var timeMeteo2 = Date.parseDate(sensorTimeMeteo2, "Y-m-d H:i:s");                        
                            switch (obj[prop].sensorType){
                                case 1:
                                    sensorMeteo2.tipoPrecipitazione.push([timeMeteo2.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                    sensorMeteo2.visibilita.push([timeMeteo2.getTime(),obj[prop].sensorValue]);                
                                    break;
                            }                        
                        }
                        if(key==="sensorGroupRoad"){
                            var sensorTimeRoad = obj[prop].sensorTime;
                            var timeRoad = Date.parseDate(sensorTimeRoad, "Y-m-d H:i:s");                           
                            switch (obj[prop].sensorType){
                                case 0:
                                    sensorRoad.roadTemperature.push([timeRoad.getTime(),obj[prop].sensorValue]);
                                    break;
                                case 3:
                                    sensorRoad.freezeTemperature.push([timeRoad.getTime(),obj[prop].sensorValue]);                
                                    break;
                                case 4:
                                    sensorRoad.saltConcentration.push([timeRoad.getTime(),obj[prop].sensorValue]);                   
                                    break;
                                case 6:
                                    sensorRoad.waterFilm.push([timeRoad.getTime(),obj[prop].sensorValue]);                   
                                    break;
                                case 7:
                                    sensorRoad.roadCondition.push([timeRoad.getTime(),obj[prop].sensorValue]);                   
                                    break;                                    
                            }                        
                        
                        }
                    }
                }
            }
        }
        var charts = [sensorMeteo, sensorMeteo2, sensorRoad];
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
            mainPanel.setActiveTab(linkTab.getId());

            sensoriMeteoTab.add({
                resizeTabs: true,
                autoScroll: true,
                html:    '<div style="max-width:1000px; height:400px ; margin: 0 auto">'+
                          '<div id="pressioneAtmosferica'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="direzioneVento'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="velocitaVento'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="temperaturaAria'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                            '<div ></div>'+
                          '</div>'+
                          '<div id="umiditaAria'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="rafficaVento'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                            '<div ></div>'+
                          '</div>'+
                          '<div id="puntoRugiada'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+                      
                        '</div>',
                scope: this
            });       
            
            sensoriMeteoTab.doLayout(false,true);
            
            sensoriMeteo2Tab.add({
                resizeTabs: true,
                deferredRender: false,
                autoScroll: true,
                html:    '<div style="max-width:1000px; height:400px ; margin: 0 auto">'+
                          '<div id="tipoPrecipitazione'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="visibilita'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                        '</div>',
                scope: this
            });       
            
            sensoriMeteo2Tab.doLayout(false,true);     

            sensoriStradaTab.add({
                resizeTabs: true,
                deferredRender: false,
                autoScroll: true,              
                html:    '<div style="max-width:1000px; height:400px ; margin: 0 auto">'+
                          '<div id="roadTemperature'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="freezeTemperature'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="saltConcentration'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="waterFilm'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
                          '</div>'+
                          '<div id="roadCondition'+codStaz+'" style="min-width:480px; height:400px ; float:left; padding:4px 0px 4px 4px;">'+
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
                        selected : 3
                    },
                    legend: {
                        enabled: false
                    },
                    title : {
                        text : this.chartsTextAndUnits.pressioneAtmosferica,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("pressioneAtmosferica",codStaz);                
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
                        text : this.chartsTextAndUnits.velocitaVento,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }    
                    },                          
                    series : [{
                        name : "velocitaVento",
                        data: data[0].velocitaVento,
                        type: 'line',
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("velocitaVento",codStaz);                                
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
                        text : this.chartsTextAndUnits.direzioneVento,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("direzioneVento",codStaz);                
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
                        text : this.chartsTextAndUnits.temperaturaAria,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("temperaturaAria",codStaz);                
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
                        text : this.chartsTextAndUnits.umiditaAria,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("umiditaAria",codStaz);                
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
                        text : this.chartsTextAndUnits.rafficaVento,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("rafficaVento",codStaz);                
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
                        text : this.chartsTextAndUnits.puntoRugiada,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
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
                this.setNoChartsData("puntoRugiada",codStaz);                
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
                    plotOptions:{
                        series:{
                            dataGrouping:{
                                enabled: false
                            }
                        }
                    },
                    title : {
                        text : this.chartsTextAndUnits.tipoPrecipitazione,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "tipoPrecipitazione",
                        data: data[1].tipoPrecipitazione,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("tipoPrecipitazione",codStaz);                 
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
                        text : this.chartsTextAndUnits.visibilita,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "visibilita",
                        data: data[1].visibilita,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("visibilita",codStaz);                
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
                        text : this.chartsTextAndUnits.roadTemperature,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "roadTemperature",
                        data: data[2].roadTemperature,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("roadTemperature",codStaz);
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
                        text : this.chartsTextAndUnits.freezeTemperature,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "freezeTemperature",
                        data: data[2].freezeTemperature,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("freezeTemperature",codStaz); 
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
                        text : this.chartsTextAndUnits.saltConcentration,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "saltConcentration",
                        data: data[2].saltConcentration,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{
                this.setNoChartsData("saltConcentration",codStaz);              
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
                        text : this.chartsTextAndUnits.waterFilm,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "waterFilm",
                        data: data[2].waterFilm,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            }else{                
                this.setNoChartsData("waterFilm",codStaz);                
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
                    plotOptions:{
                        series:{
                            dataGrouping:{
                                enabled: false
                            }
                        }
                    },
                    title : {
                        text : this.chartsTextAndUnits.roadCondition,
                        style: {
                            color: this.chartsStyle.titleColor,
                            fontSize: this.chartsStyle.fontSize,
                            fontWeight: this.chartsStyle.fontWeight
                        }
                    },                            
                    series : [{
                        name : "roadCondition",
                        data: data[2].roadCondition,
                        tooltip: {
                            valueDecimals: 0
                        }
                    }]
                });
            }else{
                this.setNoChartsData("roadCondition",codStaz);
            }     
        }
    },
    
    setNoChartsData: function(containerText,codStaz){    
        var doc = document.getElementById(containerText+codStaz);
        doc.style.backgroundImage = "url('../theme/app/img/silk/nograph.png')";
        doc.style.backgroundPosition = "center";
        doc.style.backgroundRepeat = "no-repeat";
        doc.style.textAlign = "center";                
        doc.style.color = this.chartsStyle.titleColor;
        doc.style.fontWeight = this.chartsStyle.fontWeight;
        doc.innerHTML = this.chartsTextAndUnits[containerText];
        doc.innerText = this.chartsTextAndUnits[containerText];
    }

}