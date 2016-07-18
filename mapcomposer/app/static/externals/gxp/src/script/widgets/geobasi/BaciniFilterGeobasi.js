
Ext.namespace('geobasi.bacinifilter');

geobasi.bacinifilter = {
    
    /**
    * i18n Start
    */    
    catchmentAreaLayerName: 'Bacini selezionati',
    msgAlertCatchmentAreaTitle: 'Bacini selezionati',
    msgAlertNOCatchmentAreaText: 'Nessun sottobacino presente nell\'area prescelta!',
    msgAlertTooManyCatchmentAreaText: 'Numero sottobacini selezionato al momento troppo elevato, riprova con un\'altra selezione',
    /**
    * i18n End
    */            
    
    buildFilter: function(filter, startDate, endDate, checked, baciniFilter, callback, me) {
        if (baciniFilter) {
            
            var app = window.app;
            var map = app.mapPanel.map;
            var baciniWfsLayer = app.mapPanel.map.getLayersByName(this.catchmentAreaLayerName)[0];
            if (baciniWfsLayer) {
                app.mapPanel.map.removeLayer(baciniWfsLayer);
            }
            var layerBacini = new OpenLayers.Layer.Vector(this.catchmentAreaLayerName);
            
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
                        title: this.msgAlertCatchmentAreaTitle,
                        msg: this.msgAlertNOCatchmentAreaText,
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
                    url: me.url, //'http://www506.regione.toscana.it/geoserver/wfs',
                    method: 'POST',
                    params: {
                        service: "WFS",
                        version: "1.1.0",
                        geometryName: "geom",
                        request: "GetFeature",
                        typeName: 'bacini_decod',
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
                                title: this.msgAlertCatchmentAreaTitle,
                                msg: this.msgAlertTooManyCatchmentAreaText,
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
                url: me.url, //"http://www506.regione.toscana.it/geoserver/wfs",
                version: "1.1.0",
                featureType: "ci_rwtw_bacini",
                //featureNS: "http://geobasi",
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
    }
    
};