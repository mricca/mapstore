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
 *  class = GeobasiElementsInfo
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.geobasi");

/** api: constructor
 *  .. class:: GeobasiElementsInfo(config)
 *
 *    Plugin for adding MainGeobasi GeobasiElementsInfo Module to a :class:`gxp.Viewer`.
 */   
gxp.plugins.geobasi.GeobasiElementsInfo = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = gxp_geobasielementsinfo */
    ptype: "gxp_geobasielementsinfo",
    
    title: "Geobasi Elements Info",
    
    buttonLinkIconPath: 'theme/app/img/silk/page_white_acrobat.png',      
    
    /** START i18n*/
    
    elementGridHeader: 'Nome elemento',
    siglaGridHeader: 'Sigla elemento',
    schedaGridHeader: 'Scheda',
    schedaGridHeaderTooltip: 'Visualizza scheda elemento',
    
    /** END i18n*/
    
    /** private: method[init]
     *  :arg target: ``Object``
     * 
     *  Provide the initialization code defining necessary listeners and controls.
     */
    init: function(target) {
        target.on({
            scope: this,
            'ready' : function(){
                //
                // Show the Time Slider only when this tool is activated 
                //
                this.output.on("show", function(){
                }, this);
            }
        });
        return gxp.plugins.geobasi.GeobasiElementsInfo.superclass.init.apply(this, arguments);
    },    
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }

        var self = this;   
        this.elementsInformationData = this.target.elementsData.elements;

		var elementsInformationDataReader = new Ext.data.ArrayReader({}, [
			   {name: 'elementsName', type: 'string'},
               {name: 'elementsSigla', type: 'string'},
               {name: 'link', type: 'string'}			   
		]);

        this.elementsInformationStore = new Ext.data.Store({
                reader: elementsInformationDataReader,
                data: this.elementsInformationData
            });

        var xg = Ext.grid;
        
        this.elementsGrid = new xg.GridPanel({
            id: 'id_elementsInformation',
            flex:1,
            split: true,
            store: this.elementsInformationStore,
            title: this.title,            
			cm: new xg.ColumnModel({
                columns: [
                      {
                        header: this.elementGridHeader,
                        sortable : true,
                        dataIndex: 'elementsName'
                      },{
                        header: this.siglaGridHeader,
                        sortable : true,
                        dataIndex: 'elementsSigla'
                      },{
                        xtype: 'actioncolumn',
                        width: 50,
                        header: this.schedaGridHeader,
						listeners: {
							scope: this,
							click: function(column, grd, row, e){
								grd.getSelectionModel().selectRow(row);
							}
						},
						items: [{
                            tooltip: this.schedaGridHeaderTooltip,
                            icon: this.buttonLinkIconPath,
                            scope: this,
                            handler: function(gpanel, rowIndex, colIndex) {
                                    var store = gpanel.getStore();		
                                    var record = store.getAt(rowIndex);
                                    var link = record.get("link");
                                    var title = record.get("elementsName");
                                    this.target.viewElementsInfo(link, this.schedaGridHeader + " - " + title);
                                }
                            }]
                      }
                  ]                
            }),
            viewConfig: {
                forceFit: true
            }            
        });
        
        var cpanel = new Ext.Panel({
            id: 'id_elementsDatabasePanel',
            xtype: 'panel',
            layout: 'fit',
			autoScroll: true,
            title: this.title,
            header: false,
			items: [this.elementsGrid]
        });
        
        var geobasiElementsInfo  = {
            xtype:'panel',
            preventBodyReset: true,
            id: "geobasiElementsInfoForm",
            title: this.title,
            layout: "fit",
            minWidth:180,
            autoScroll:true,
            frame:false,
            "defaults": {
                "bodyStyle":"padding:10px;background-color:#FFFFFF;",
                "style": "border-color:#b5b8c8"
            },            
            items: [cpanel]
        };
        
        config = Ext.apply(this.elementsGrid,config || {});
        
        this.output = gxp.plugins.geobasi.GeobasiElementsInfo.superclass.addOutput.call(this, config);

    }

 });
 
 Ext.preg(gxp.plugins.geobasi.GeobasiElementsInfo.prototype.ptype, gxp.plugins.geobasi.GeobasiElementsInfo);