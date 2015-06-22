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
 *  class = UsoPuntiLegenda
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.usopunti");

/** api: constructor
 *  .. class:: UsoPuntiLegenda(config)
 *
 *    Plugin for adding MainGeobasi UsoPuntiLegenda Module to a :class:`gxp.Viewer`.
 */   
gxp.plugins.usopunti.UsoPuntiLegenda = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = gxp_usopuntilegenda */
    ptype: "gxp_usopuntilegenda",
    
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
        return gxp.plugins.usopunti.UsoPuntiLegenda.superclass.init.apply(this, arguments);
    },    
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }
        
        var html =  ([
        "<ul>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.1.1</b> - Zone residenziali a tessuto continuo</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.1.2</b> - Zone residenziali a tessuto discontinuo e rado</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.2.1</b> - Aree industriali, commerciali e dei servizi pubblici e privati</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.2.2</b> - Reti stradali, ferroviarie e infrastrutture tecniche</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.2.3</b> - Aree portuali</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.2.4</b> - Aeroporti</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.3.1</b> - Aree estrattive</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.3.2</b> - Discariche</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.3.3</b> - Cantieri</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.4.1</b> - Aree verdi urbane</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>1.4.2</b> - Aree ricreative e sportive</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.1.1</b> - Seminativi in aree non irrigue</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.1.2</b> - Seminativi in aree irrigue</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.1.3</b> - Risaie</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.1</b> - Vigneti</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.2</b> - Frutteti e frutti minori</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.3</b> - Oliveti</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.4</b> - Vivai</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.5.1</b> - Impianti di arboricoltura da legno di conifere</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.5.2</b> - Impianti di arboricoltura da legno di latifoglie</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.2.5.3</b> - Pioppeti</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>2.3.1</b> - Prati stabili</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.1_a (80-100%)</b> - Boschi di latifoglie sempreverdi mediterranee (leccete e sugherete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.2_a (80-100%)</b> - Boschi di latifoglie caducifoglie mesofile (querceti, ostrieti, castagneti)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.3_a (80-100%)</b> - Castagneti da frutto</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.4_a (80-100%)</b> - Boschi di latifoglie caducifoglie montane (faggete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.5_a (80-100%)</b> - Boschi azonali di latifoglie e di latifoglie non spontanee (formazioni ripariali e palustri di pioppi e salici, betulleti, ontaneti, robinieti ecc)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.1_a (80-100%)</b> - Boschi di conifere mediterranee (pino d&#8217;Aleppo, domestico, marittimo) e cipressete</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.2_a (80-100%)</b> - Boschi di conifere montane (pino nero, douglasiete, abetine, ecc.)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.1_b (50-80%)</b> - Boschi di latifoglie sempreverdi mediterranee (leccete e sugherete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.2_b (50-80%)</b> - Boschi di latifoglie caducifoglie mesofile (querceti, ostrieti, castagneti)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.3_b (50-80%)</b> - Castagneti da frutto</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.4_b (50-80%)</b> - Boschi di latifoglie caducifoglie montane (faggete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.5_b (50-80%)</b> - Boschi azonali di latifoglie e di latifoglie non spontanee (formazioni ripariali e palustri di pioppi e salici, betulleti, ontaneti, robinieti ecc)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.1_b (50-80%)</b> - Boschi di conifere mediterranee (pino d&#8217;Aleppo, domestico, marittimo) e cipressete</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.2_b (50-80%)</b> - Boschi di conifere montane (pino nero, douglasiete, abetine, ecc.)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.1_c (20-50%)</b> - Boschi di latifoglie sempreverdi mediterranee (leccete e sugherete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.2_c (20-50%)</b> - Boschi di latifoglie caducifoglie mesofile (querceti, ostrieti, castagneti)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.3_c (20-50%)</b> - Castagneti da frutto</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.4_c (20-50%)</b> - Boschi di latifoglie caducifoglie montane (faggete)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.1.5_c (20-50%)</b> - Boschi azonali di latifoglie e di latifoglie non spontanee (formazioni ripariali e palustri di pioppi e salici, betulleti, ontaneti, robinieti ecc)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.1_c (20-50%)</b> - Boschi di conifere mediterranee (pino d&#8217;Aleppo, domestico, marittimo) e cipressete</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.2.2_c (20-50%)</b> - Boschi di conifere montane (pino nero, douglasiete, abetine, ecc.)</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.1.3</b> - Zone boscate temporaneamente prive di vegetazione</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.2.1</b> - Aree a pascolo naturale e praterie</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.2.2</b> - Arbusteti montani e supramediterranei</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.2.3</b> - Macchie e arbusteti mediterranei</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>3.3</b> - Zone aperte con vegetazione rada o assente   </em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",                                 
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>4</b> - Zone umide</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>5.1.1</b> - Corsi d&#8217;acqua, canali e idrovie</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>5.1.2</b> - Bacini d&#8217;acqua</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
"<li>",
"<em style='font-family: Arial, sans-serif; font-size: 14px;  line-height: 150%; text-indent: 1cm; color: #0F26BE;'><b style='color: #C53430'>5.2</b> - Acque marittime</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm; color: #0F26BE;'>,</span></li>",
        "</ul>"]);
                    
        var usoPuntiLegenda  = {
            xtype:'form',
            preventBodyReset: true,
            id: "geobasiInfoForm",
            //title: 'Informazioni',
			header: false,
            layout: "form",
            minWidth:180,
            autoScroll:true,
            frame:false,
            "defaults": {
                "bodyStyle":"padding:10px;background-color:#FFFFFF;",
                "style": "border-color:#b5b8c8"
            },            
            items: [{
                        "id": "testoInfo",
                        "html": html
                }]
        };
        
        config = Ext.apply(usoPuntiLegenda,config || {});
        
        this.output = gxp.plugins.usopunti.UsoPuntiLegenda.superclass.addOutput.call(this, config);
        
        //Enable Disable button when regions are selected
        /*this.output.on('update',function(store){
            var button = this.output.submitButton.getXType();
            
            var values = this.output.getForm().getValues();
            var gran_type = values.areatype;
                
            if (button == "gxp_nrlCropDataButton" || button == 'gxp_nrlCropDataTabButton'){
                this.output.submitButton.setDisabled(store.getCount()<=0 && gran_type != "pakistan");
            }else{
                //map button
                this.output.submitButton.setDisabled(store.getCount()<=0 && gran_type == "province");
            }
            
        },this);
        
        //hide selection layer on tab change
        this.output.on('beforehide',function(){
            var button = this.output.aoiFieldSet.AreaSelector.selectButton;
            button.toggle(false);
            var lyr = button.hilightLayer;
            if(!lyr) return;
            lyr.setVisibility(false);
            
        },this);
        this.output.on('show',function(){
            var button = this.output.aoiFieldSet.AreaSelector.selectButton;
            
            var lyr = button.hilightLayer;
            if(!lyr) return;
            lyr.setVisibility(true);
            
        },this);
        
        return this.output;*/
    }

 });
 
 Ext.preg(gxp.plugins.usopunti.UsoPuntiLegenda.prototype.ptype, gxp.plugins.usopunti.UsoPuntiLegenda);