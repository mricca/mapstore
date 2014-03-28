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

/** api: (define)
 *  module = gxp.plugins
 *  class = ShapeDownload
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: ShapeDownload(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.ShapeDownload = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_shapedownload */
    ptype: "gxp_shapedownload",
    
    /** api: config[removeMenuText]
     *  ``String``
     *  Text for remove menu item (i18n).
     */
    shapeDownloadSearchText: "Download Shapefile",

    /** api: config[removeActionTip]
     *  ``String``
     *  Text for remove action tooltip (i18n).
     */
    shapeDownloadSearchActionTip: "Download Shapefile",
    
    /** api: method[addActions]
     */
    addActions: function() {
        var selectedLayer;
        
        var actions = gxp.plugins.ShapeDownload.superclass.addActions.apply(this, [{
            menuText: this.shapeDownloadSearchText,
            iconCls: "gxp-icon-savedefaultcontext",
            disabled: true,
            tooltip: this.shapeDownloadSearchActionTip,
            handler: function() {
                var record = selectedLayer;
                
                //window.open(geoUrl + "propertyName=fornitore%2Cnome%2Cid%2Cdata_ora%2Cquota%2C"+attributes+"&service=WFS&version=1.0.0&request=GetFeature&typeName="+evt.features[0].gml.featureNSPrefix+"%3A"+campo.layers+"&outputFormat=CSV&sortby=data_ora&CQL_FILTER=id="+campo.id);
                if(record) {
                    var gnURL = record.get('gnURL');
                    var uuid = record.get('uuid');
                    var title = record.get('title');
                    
                    if(gnURL && uuid && title){
                        this.target.viewMetadata(gnURL, uuid, title);
                    } else {
                        Ext.Msg.show({
                            title: 'View Metadata',
                            msg: "This operation cant be performed for this layer",
                            width: 300,
                            icon: Ext.MessageBox.ALERT
                        });  
                    }
                }
            },
            scope: this
        }]);
        
        var geonetworkSearchAction = actions[0];

        this.target.on("layerselectionchange", function(record) {
            //selectedLayer = record.get('group') === 'background' ? null : (record.get('gnURL') &&  record.get('uuid') && record.get('name') ? record : null);
            selectedLayer = record;
            geonetworkSearchAction.setDisabled(
                 !selectedLayer || this.target.mapPanel.layers.getCount() <= 1 || !record
            );
        }, this);
        
        var enforceOne = function(store) {
            geonetworkSearchAction.setDisabled(
                !selectedLayer || store.getCount() <= 1
            );
        }
        
        this.target.mapPanel.layers.on({
            "add": enforceOne,
            "remove": function(store){
                geonetworkSearchAction.setDisabled(true);
            }
        });
        
        return actions;
    }
        
});

Ext.preg(gxp.plugins.ShapeDownload.prototype.ptype, gxp.plugins.ShapeDownload);
