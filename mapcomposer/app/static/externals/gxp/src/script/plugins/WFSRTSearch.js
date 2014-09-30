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
 *  class = WFSRTSearch
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: WFSRTSearch(config)
 *
 *    Plugin for adding MainGeobasi WFSRTSearch Module to a :class:`gxp.Viewer`.
 */   
gxp.plugins.WFSRTSearch = Ext.extend(gxp.plugins.Tool, {

	/** api: ptype = gxp_wfsrtsearch */
    ptype: "gxp_wfsrtsearch",
	selTipo: 'Seleziona',
	selMonitoraggio: 'Monitoraggio',
    selMatrixMethod: 'Metodo selezione Matrice',
	selElabMethod: 'Seleziona tipologia valori',
	dataUrl: null,

	mainLoadingMask: "Caricamento date in corso...",
	
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
					//this.setMinMaxValues();
				}, this);
			}
		});
		return gxp.plugins.WFSRTSearch.superclass.init.apply(this, arguments);
	},	
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {

		this.areaDamage = new gxp.form.WFSRTSearchWidget(Ext.apply({
								map: app.mapPanel.map,
								mapPanel: app.mapPanel
							},this.outputConfig));
		
        var WFSRTSearchData  = {
            xtype:'form',
			id: "wfsrtsearchid",
            title: 'Ricerca',
            layout: "form",
            minWidth:180,
            autoScroll:true,
            frame:true,
            items:[            
 
					this.areaDamage
					]

		};
        
        config = Ext.apply(WFSRTSearchData,config || {});
        
        this.output = gxp.plugins.WFSRTSearch.superclass.addOutput.call(this, config);

    }
 });
 
 Ext.preg(gxp.plugins.WFSRTSearch.prototype.ptype, gxp.plugins.WFSRTSearch);