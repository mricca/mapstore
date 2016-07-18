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
    xtype: 'gxp_geobasiDataDownloadButton',
    
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
    /**
    * i18n Start
    */
    
    form: null,
    url: null,
    filter: null,
    barchart_layer: this.typeNameBarChart,
    boxplot_layer: this.typeNameBoxPlot,
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
        this.tipometaStatQuery = false;
        if (data2.Metodo_analitico == '-999') {
            this.tipometaStatQuery = "IS NULL";
        } else if (this.addedLayer) {
            this.tipometaStatQuery = data2.Metodo_analitico;
        } else if (data2.Metodo_analitico === "") {
            this.tipometaStatQuery = false;
        } else {
            this.tipometaStatQuery = "= " + "\\'" + data2.Metodo_analitico + "\\'";
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
        
        if (this.tipometaStatQuery) {
            var viewparams2 = data2.Metodo_analitico == '-999' ?
                                "monitoraggio:" + monitoraggioValue + ";" +
                                "tygeomat:" + data2.tipo_matrice + ";" +
                                "sigla:" + data2.elemento + ";" +
                                "tipometa:" + this.tipometaStatQuery + ";" +
                                "type:" + elementType.replace(/,/g, '\\,') :
                                "monitoraggio:" + monitoraggioValue + ";" +
                                "tygeomat:" + data2.tipo_matrice + ";" +
                                "sigla:" + data2.elemento + ";" +
                                "tipometa:" + this.tipometaStatQuery + ";" +
                                "type:" + elementType.replace(/,/g, '\\,');
        } else {
            var viewparams2 = "monitoraggio:" + monitoraggioValue + ";" +
                                "tygeomat:" + data2.tipo_matrice + ";" +
                                "sigla:" + data2.elemento + ";" +
                                "type:" + elementType.replace(/,/g, '\\,');
        }
        
        this.appMask = new Ext.LoadMask(Ext.getBody(), {
            msg: this.mainLoadingMask
        });
        this.appMask.show();
        
        geobasi.bacinifilter.buildFilter(myFilter, data.startYear, data.endYear, data2.allownull, data2.baciniintersect, function(dateFilter) {
            
            me.makeChart(dateFilter, data, data2, viewparams2);
            
        }, this);
        
    },
    
    doDownloadPost: function(url, data, outputFormat) {
        if (document.getElementById(this.downloadFormId)) {
            document.body.removeChild(document.getElementById(this.downloadFormId));
        }
        if (document.getElementById(this.downloadIframeId)) {
            document.body.removeChild(document.getElementById(this.downloadIframeId));
        }
        var iframe = document.createElement("iframe");
        iframe.setAttribute("style", "visiblity:hidden;width:0px;height:0px;");
        this.downloadIframeId = Ext.id();
        iframe.setAttribute("id", this.downloadIframeId);
        iframe.setAttribute("name", this.downloadIframeId);
        document.body.appendChild(iframe);
        iframe.onload = function() {
            if (!iframe.contentWindow) return;
            var error = "";
            var body = iframe.contentWindow.document.getElementsByTagName('body')[0];
            var content = "";
            if (body.textContent) {
                content = body.textContent;
            } else {
                content = body.innerText;
            }
            try {
                var serverError = Ext.util.JSON.decode(content);
                error = serverError.exceptions[0].text
            } catch (err) {
                error = body.innerHTML || content;
            }
            Ext.Msg.show({
                title: me.invalidParameterValueErrorText,
                msg: "outputFormat: " + outputFormat + "</br></br>" + "</br></br>" + "Error: " + error,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
        var me = this;
        var form = document.createElement("form");
        this.downloadFormId = Ext.id();
        form.setAttribute("id", this.downloadFormId);
        form.setAttribute("method", "POST");
        var urlregex = /^https?:\/\//i;
        var iframeURL = (!urlregex.test(url) || url.indexOf(location.host) > 0) ? url : proxy + encodeURIComponent(url);
        form.setAttribute("action", iframeURL);
        form.setAttribute("target", this.downloadIframeId);
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("name", "filter");
        hiddenField.value = data;
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
        this.appMask.hide();
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
        var url = this.url;
        var service = "?service=WFS";
        var version = "&version=1.1.0";
        var geometryName = "&geomtryName=geom";
        var request = "&request=GetFeature";
        var filter = "&filter=" + this.xml;
        var typeName = this.tipometaStatQuery ? "&typeName=" + this.typeNameBarChart : "&typeName=" + this.typeNameBoxPlot;
        var outputFormat = "&outputformat=CSV";
        var exception = "&exceptions=application/json";
        var propertyName = "&propertyName=source,site_id,year,month,day,monitoring,matrix,matrix_cod,toponym,municipal_id,element,value,method,x_coord,y_coord";
        var sortBy = "&sortBy=value";
        this.viewParams = "&viewparams=" + viewparams2;
        this.stringURLTot = url + service + version + geometryName + request + typeName + outputFormat + propertyName + sortBy + exception + encodeURIComponent(this.viewParams);
        
        Ext.Ajax.request({
            scope: this,
            url: this.stringURLTot,
            method: 'POST',
            data: this.xml,
            success: function(result, request) {
                try {
                    var stringa = result.responseText;
                    if (stringa.length > 200) {
                        this.doDownloadPost(this.stringURLTot, this.xml, "CSV");
                    } else {
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
                } catch (e) {
                    Ext.Msg.alert("Error", "Error parsing data from the server");
                    this.appMask.hide();
                    return;
                }
            },
            failure: function(result, request) {
                Ext.Msg.alert("Error", "Server response error");
                this.appMask.hide();
            }
        });
        
    }
});

Ext.reg(gxp.widgets.button.GeobasiDataDownloadButton.prototype.xtype, gxp.widgets.button.GeobasiDataDownloadButton);