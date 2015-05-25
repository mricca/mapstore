/**
 *  Copyright (C) 2007 - 2012 GeoSolutions S.A.S.
 *  http://www.geo-solutions.it
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
 * @requires plugins/Tool.js
 */
/**
 * @author Riccardo Mari
 */
/** api: (define)
 *  module = gxp.plugins
 *  class = UsoPuntiStat
 */
/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.usopunti");

/** api: constructor
 *  .. class:: UsoPuntiStat(config)
 *
 *    Plugin for adding MainGeobasi UsoPuntiStat Module to a :class:`gxp.Viewer`.
 */
gxp.plugins.usopunti.UsoPuntiStat = Ext.extend(gxp.plugins.Tool, {
    ptype: "gxp_usopuntistat",
    selTipo: 'Seleziona',
    selMonitoraggio: 'Monitoraggio',
    selMatrixMethod: 'Metodo selezione Matrice',
    selElabMethod: 'Seleziona tipologia valori',
    dataUrl: null,
    mainLoadingMask: "Caricamento date in corso...",
    init: function(target) {
        target.on({
            scope: this,
            'ready': function() {
                this.output.on("show", function() {}, this);
            }
        });
        return gxp.plugins.usopunti.UsoPuntiStat.superclass.init.apply(this, arguments);
    },
    addOutput: function(config) {
        var me = this;

        Ext.Panel.prototype.buttonAlign = 'left';
        this.areaSelection = new gxp.form.SelDamageArea(Ext.apply({
            localeGeoserverUrl: "http://geoportale.lamma.rete.toscana.it/geoserver_ds/ows?",
            remoteGeoserverUrl: "http://www502.regione.toscana.it:80/wfsvector/com.rt.wfs.RTmap/wfs",
            map: app.mapPanel.map,
            mapPanel: app.mapPanel
        }, this.outputConfig));

        var usoPuntiStat = new Ext.form.FormPanel({
            id: "geobasiDataForm",
            layout: "form",
            autoScroll: true,
            frame: false,
            forceLayout: true,
            items: [{
                            xtype: "fieldset",
                            id: "updateCountID",
                            ref: "updateCount",
                            title: '<span style="color:#C53430;">Informazioni</span>',
                            checkboxToggle: false,
                            collapsed : false,
                            hidden: false,
                            forceLayout : true,
                            cls: 'selected-query-layer',
							iconCls: "getfeatureinfo-icon",
                            listeners: {
                                scope: this,
                                expand: function(panel){
                                    panel.doLayout();
                                },
                                collapse: function(panel) {
                                    //this.spatialSelector.reset();
                                },
                                afterlayout: function(panel){
                                    panel.body.update('La presente funzionalità permette, sulla base dei limiti comunali e provinciali, la generazione di grafici riguardanti statistiche sulla superficie in ettari delle varie classi di uso del suolo per gli anni 2007 - 2010 - 2013.');
                                }
                            }
                        },this.areaSelection]
        });
        config = Ext.apply(usoPuntiStat, config || {});
        this.output = gxp.plugins.usopunti.UsoPuntiStat.superclass.addOutput.call(this, config);
    }
});

Ext.preg(gxp.plugins.usopunti.UsoPuntiStat.prototype.ptype, gxp.plugins.usopunti.UsoPuntiStat);