{
   "advancedScaleOverlay": true,
   "tab": false,
   "gsSources":{
   		"geobasi": {
			"ptype": "gxp_wmssource",
			"url": "http://172.16.1.139:8080/geoserver/ows",
			"title": "Geobasi",
			"SRS": "EPSG:3003",
			"version":"1.1.1",
			"layersCachedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
			],				
			"layerBaseParams":{
				"FORMAT":"image/png8",
				"TILED":true
			}
		},
   		"geoscopio": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmssfondo&map_resolution=91&language=ita",
			"title": "Geoscopio basi",
			"SRS": "EPSG:3003",
			"version":"1.3.0",
			"layersCachedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		},
   		"geoscopio_ortofoto": {
			"ptype": "gxp_wmssource",
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc",
			"title": "Geoscopio ortofoto",
			"SRS": "EPSG:3003",
			"version":"1.3.0",
			"layersCachedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		},
   		"geoscopio_ctr": {
			"ptype": "gxp_wmssource",
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr",
			"title": "Geoscopio CTR",
			"SRS": "EPSG:3003",
			"version":"1.3.0",
			"layersCachedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		},
   		"geoscopio_idrografia": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/cartografia/wmsraster/com.rt.wms.RTmap/wms?map=wmsidrogr&map_resolution=91&language=ita&",
			"title": "Geoscopio idrografia",
			"SRS": "EPSG:3003",
			"version":"1.3.0",
			"layersCachedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		},
		"mapquest": {
			"ptype": "gxp_mapquestsource"
		}, 
		"osm": { 
			"ptype": "gxp_osmsource"
		},
		"google": {
			"ptype": "gxp_googlesource" 
		},
		"bing": {
			"ptype": "gxp_bingsource" 
		}, 
		"ol": { 
			"ptype": "gxp_olsource" 
		}		
	},
	"map": {
		"projection": "EPSG:3003",
		"displayProjection": "EPSG:3003",
		"units": "m",
		"center": [1648067.222,4755353.958],
		"maxResolution": "auto",
		"zoom": 6,
		"numZoomLevels": 15,
		"maxExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
		],		
		"restrictedExtent": [
				708923.00, 4290035.00,
				2631134.00, 5369149.00
		],			
		"layers": [
			{
				"source": "geoscopio_ortofoto",
				"group": "background",
				"title": "ORTOFOTO RT 2010",
				"name": "rt_ofc.10k10",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geobasi",
				"group": "CIS",
				"title": "Acquiferi in roccia",
				"name": "geosolutions:cis_roccia",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,
				"visibility": true
			},{
				"source": "geobasi",
				"group": "CIS",
				"title": "Acquiferi in alluvione",
				"name": "geosolutions:cis_alluvioni",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,				
				"visibility": true
			},{
				"source": "geoscopio_idrografia",
				"group": "Idrografia",
				"title": "IDROGRAFIA",
				"name": "rt_idrogr.corsi.rt.line",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false
			},{
				"source": "geobasi",
				"group": "Geobasi",
				"title": "Geobasi Campioni",
				"name": "geosolutions:geometria",
				"displayInLayerSwitcher": true,
				"visibility": false
			},{
				"source": "geobasi",
				"group": "Geobasi",
				"title": "Geobasi Analisi",
				"name": "geosolutions:geobasi_analisi",
				"displayInLayerSwitcher": true,
				"visibility": false
			},{
				"source": "geobasi",
				"group": "Geobasi",
				"title": "Geobasi Analisi ARPAT",
				"name": "geosolutions:geobasi_arpat",
				"displayInLayerSwitcher": true,
				"visibility": true
			}
		]
	},
	"customPanels":[
      {
          "xtype": "panel",
          "title": "FeatureGrid",      
          "border": false,
          "id": "south",
          "region": "south",
          "layout": "fit",
          "height": 330,
          "collapsed": true,
          "collapsible": true,
          "header": true
      },{
			"xtype": "panel",
			"border": false,
			"split": true,
			"id": "east",
			"border":false,
			"region":"east",
			"layout":"fit",
            "collapsible": true,
            "collapseMode": "mini",
			"enableTabScroll" : true,
            "header": true,
			"width": 380,
			"minWidth": 380
      }
    ],
	"scaleOverlayUnits":{
        "bottomOutUnits":"nmi",    
        "bottomInUnits":"nmi",    
        "topInUnits":"m",    
        "topOutUnits":"km"
    },	
	"proj4jsDefs": {
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84 = -104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
	},	
	"customTools": [
        {
			"ptype": "gxp_wmsgetfeatureinfo_menu", 
			"regex": "[\\s\\S]*[\\w]+[\\s\\S]*",
			"useTabPanel": true,
            "infoPanelId": "",
            "disableAfterClick": false,
            "format": "html",
			"toggleGroup": "toolGroup",
			"actionTarget": {"target": "paneltbar", "index": 20}
		}, {
			"ptype": "gxp_embedmapdialog",
			"actionTarget": {"target": "paneltbar", "index": 2},
			"embeddedTemplateName": "viewer",
			"showDirectURL": true
		}, {
		   "ptype": "gxp_mouseposition",
		   "displayProjectionCode":"EPSG:4326",
		   "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505 "
		}, {
			"ptype": "gxp_print",
			"customParams":{
				"outputFilename":"mapstore-print"
			},
			"printService": "http://192.168.0.62:8080/geoserver/pdf/",
			"legendPanelId": "legendPanel",
			"appendLegendOptions": true,
			"addGraticuleControl": true,
			"legendOnSeparatePage": true,
			"addLandscapeControl": true,
			"actionTarget":{
			    "target": "paneltbar",
				"index":4
			}
        }, {
			"actions": ["-"], "actionTarget": "paneltbar"
		}, {
			"ptype": "gxp_addlayer",
			"showCapabilitiesGrid": false,
			"id": "addlayer"
		}, {
			"ptype": "gxp_geolocationmenu",
			"actionTarget": {"target": "paneltbar", "index": 23},
			"toggleGroup": "toolGroup"
		}, {
		  "ptype": "gxp_featuremanager",
		  "id": "featuremanager"
	    }, {
		  "ptype": "gxp_featuregrid",
		  "featureManager": "featuremanager",
		  "outputConfig": {
			  "id": "featuregrid",
			  "title": "Features"
		  },
		  "outputTarget": "south",
		  "showExportCSV": true
	    }, {
		  "ptype":"gxp_maingeobasi",
		  "outputConfig":{
			 "id":"eastTab",
			 "region":"east",
			 "startTab":"geobasidata"
		  },
		  "outputTarget":"east"
	   },{
		  "ptype":"gxp_geobasidata",
          "dataUrl":"http://172.16.1.139:8080/geoserver/ows",
		  "rangesUrl": "http://84.33.2.75/geoserver/nrl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nrl:cropdata_ranges&outputFormat=json",
		  "highChartExportUrl" :"http://84.33.2.75/highcharts-export/",
		  "outputConfig":{
			 "itemId":"geobasidata",
			 "outputSRS": "EPSG:3003",
			 "geodesic": false,
			 "bufferOptions":{
				"minValue": 0,
				"maxValue":100000,
				"decimalPrecision":2
			 }
		  },
		  "outputTarget":"eastTab"
	   }
	]
}
