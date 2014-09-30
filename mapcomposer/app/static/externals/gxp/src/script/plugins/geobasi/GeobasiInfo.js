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
 *  class = GeobasiInfo
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins.geobasi");

/** api: constructor
 *  .. class:: GeobasiInfo(config)
 *
 *    Plugin for adding MainGeobasi GeobasiInfo Module to a :class:`gxp.Viewer`.
 */   
gxp.plugins.geobasi.GeobasiInfo = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = gxp_geobasiinfo */
    ptype: "gxp_geobasiinfo",
    
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
        return gxp.plugins.geobasi.GeobasiInfo.superclass.init.apply(this, arguments);
    },    
    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
        var conf = {
            //TODO year ranges (from available data)            
        }
        
        var html =  (["<p>",
            "<font face='Arial, sans-serif'>Le attivit&agrave; presentate in questo lavoro, finanziate da <em>Regione Toscana</em>, che hanno condotto alla costruzione del <em>Database Geochimico regionale</em>, sono state svolte dal gruppo di lavoro costituito da:</font></p>",
        "<ul>",
            "<li>",
                "<em style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>i dipartimenti di Scienza della Terra di Firenze, Pisa e Siena</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
            "<li>",
                "<em style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>Istituto di Geoscienze e Georisorse del CNR di Pisa</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
            "<li>",
                "<em style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>ARPAT</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>,</span></li>",
            "<li>",
                "<em style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'><span style='font-style: italic;'>Consorzio LAMMA</span>,</em></li>",
            "<li>",
                "<em style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>Sistema Informativo Territoriale ed Ambientale della Regione Toscana</em><span style='font-family: Arial, sans-serif; line-height: 150%; text-indent: 1cm;'>.</span></li>",
        "</ul>",
        "<p>",
            "<font face='Arial, sans-serif'>La banca dati si propone come strumento, fruibile ed accessibile a differenti livelli di utenza, i cui contenuti possano essere liberamente interrogabili e scaricabili e che sia implementabile nel tempo secondo regole e standard condivisi. L&#39;obiettivo &egrave; quello di fornire un importante riferimento conoscitivo nel campo delle informazioni geochimiche relative alle varie matrici geoambientali campionate nel territorio toscano. </font></p>",
        "<p>",
            "<font face='Arial, sans-serif'>Lo sforzo in questa prima fase &egrave; stato orientato non solo a favorire la piena fruizione dei dati disaggregati gi&agrave; disponibili, sulla base di una potente interfaccia webgis, ma anche verso l&rsquo;utilizzo di strumenti grafici e numerici di analisi statistica mediante i quali:</font></p>",
        "<ol>",
            "<li>",
                "<font face='Arial, sans-serif'>comprendere la variabilit&agrave; del fenomeno oggetto di studio nella sua caratterizzazione spaziale;</font></li>",
            "<li>",
                "<font face='Arial, sans-serif'>individuare la posizione geografica di valori anomali;</font></li>",
            "<li>",
                "<font face='Arial, sans-serif'>confrontare gli esiti di diverse metodologie analitiche sperimentali per uno stesso elemento e/o specie chimica;</font></li>",
            "<li>",
                "<font face='Arial, sans-serif'>estrarre dati relativi ad un determinato periodo temporale e/o una determinata area e</font></li>",
            "<li>",
                "<font face='Arial, sans-serif'>verificare l&rsquo;impatto della presenza di informazione numerica con valore inferiore al limite di rilevabilit&agrave; strumentale.</font></li>",
        "</ol>",
        "<p>",
            "<font face='Arial, sans-serif'>Ulteriori sviluppi, in prospettiva geostatistica, di mappatura geochimica del territorio regionale, di valutazione dei valori fondo, informazioni indispensabili per le politiche decisionali, dovranno prevedere la definizione di regole e strumenti finalizzati ad una continua e progressiva implementazione controllata della base dati. Questo anche in previsione di un utilizzo di nuova informazione proveniente da soggetti esterni al gruppo di lavoro.&nbsp;</font></p>"]);
                    
        var geobasiInfo  = {
            xtype:'form',
            preventBodyReset: true,
            id: "geobasiInfoForm",
            title: 'Geobasi Info',
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
        
        config = Ext.apply(geobasiInfo,config || {});
        
        this.output = gxp.plugins.geobasi.GeobasiInfo.superclass.addOutput.call(this, config);
        
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
 
 Ext.preg(gxp.plugins.geobasi.GeobasiInfo.prototype.ptype, gxp.plugins.geobasi.GeobasiInfo);