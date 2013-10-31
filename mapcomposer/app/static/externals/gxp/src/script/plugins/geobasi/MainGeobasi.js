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
 *  module = gxp.plugins.geobasi
 *  class = MainGeobasi
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.geobasi");

/** api: constructor
 *  .. class:: mainGeobasi(config)
 *
 *    Plugin for adding MainGeobasi modules to a :class:`gxp.Viewer`.
 */   
gxp.plugins.geobasi.MainGeobasi = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_maingeobasi */
    ptype: "gxp_maingeobasi",

    
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
		
        var target = this.target, me = this;
		
        config = Ext.apply({
			xtype: 'tabpanel',
			id:'mainGeobasiWrapper',
			border: false,
			split: true,
			deferredRender:true,
            collapseMode: "mini",
			activeItem:0,
			activeTab:0,
			enableTabScroll : true,
            header: false,
			listeners:{
				afterrender: function(tabpanel){
					//set active tab after render
					target.on('ready',function(){
						if(tabpanel.startTab){
							tabpanel.setActiveTab(tabpanel.startTab);
						}else{
							tabpanel.setActiveTab(0);
						}
					});
				}
			}
			
        }, config || {});
        

        var mainGeobasi = gxp.plugins.geobasi.MainGeobasi.superclass.addOutput.call(this, config);
        
        return mainGeobasi;
    },
    enableData: function(){
        var geobasiTab = this.output[0].items;
        for (var i = 0; i<geobasiTab.items.length;i++){
            if (geobasiTab.items[i].outputType.items.items){
                geobasiTab.items[i].outputType.items.items[0].enable();
            }else{
                geobasiTab.items[i].outputType.items[0].disabled = false;
            }
        }
    },
    disableData: function(){
        var geobasiTab = this.output[0].items;
        for (var i = 0; i<geobasiTab.items.length;i++){
            if (geobasiTab.items[i].outputType.items.items){
                geobasiTab.items[i].outputType.items.items[0].disable();
                geobasiTab.items[i].outputType.items.items[1].setValue("chart");                
            }else{
                geobasiTab.items[i].outputType.items[0].disabled = true;
                geobasiTab.items[i].outputType.items[0].inputValue = "chart";
            }
        }
    }
});

Ext.preg(gxp.plugins.geobasi.MainGeobasi.prototype.ptype, gxp.plugins.geobasi.MainGeobasi);
