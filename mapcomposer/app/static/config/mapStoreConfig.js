{
   "header": {
	   "html": "<div align='center' style='background-color:#02004B;background-position:right center;background-image:url(theme/app/img/banner/Header_geoportale_solo_img.jpg);background-repeat: no-repeat;width:100%;height:100%'><a href='http://www.lamma.rete.toscana.it' target='_blank'><img src='theme/app/img/banner/logolamma_trasp.png' style='float:left;'/></a></div>",
	   "container": {
			"border": false,
			"header": false,
			"collapsible": true,
			"collapseMode":  "mini",
			"hideCollapseTool": true,
			"split": true,
			"animCollapse": false,
			"minHeight": 90,
			"maxHeight": 90,
			"height": 90
	   }
   },
   "advancedScaleOverlay": false,
   "tab": false,
   "gsSources":{
   		"geobasi": {
			"ptype": "gxp_wmssource",
			"url": "http://159.213.57.108/geoserver_geobasi/ows",
			"title": "Geobasi",
			"SRS": "EPSG:3003",
			"version":"1.1.1",
			"layersCachedExtent": [
				1547065, 4677785,
				1803065, 4933785
			],				
			"layerBaseParams":{
				"FORMAT":"image/png8",
				"TILED":true
			}
		},
		"geobasi_gwc": {
			"ptype": "gxp_wmssource",
			"url": "http://159.213.57.108/geoserver_geobasi/gwc/service/wms",
			"title": "Geobasi_gwc",
			"SRS": "EPSG:3003",
			"version":"1.1.1",
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
				1547065, 4677785,
				1803065, 4933785
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
				1547065, 4677785,
				1803065, 4933785
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
				1547065, 4677785,
				1803065, 4933785
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
				1547065, 4677785,
				1803065, 4933785
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		},
   		"geoscopio_amb_ammin": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsambamm&",
			"title": "Geoscopio ambiti amministrativi",
			"SRS": "EPSG:3003",
			"version":"1.3.0",
			"layersCachedExtent": [
				1547065, 4677785,
				1803065, 4933785
			],			
			"layerBaseParams":{
				"FORMAT":"image/png",
				"TILED":false
			}
		}
	},
	"map": {
		"projection": "EPSG:3003",
		"displayProjection": "EPSG:3003",
		"units": "m",
		"center": [1665000,4807000],
		"maxResolution": 1000,
		"zoom": 1,
		"numZoomLevels": 14,
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
				"source": "geoscopio",
				"group": "background",
				"title": "SFONDO_RT",
				"name": "rt_sfondo.sfumo_paesaggistico.50k",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio",
				"group": "background",
				"title": "SFONDO_RT",
				"name": "rt_sfondo.intorno_toscana",
				"displayInLayerSwitcher": false,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "ORTOFOTO",
				"title": "ORTOFOTO RT 2010",
				"name": "rt_ofc.10k10",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geobasi_gwc",
				"group": "Acquiferi",
				"title": "Acquiferi in roccia",
				"name": "geobasi:cis_roccia",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,
				"visibility": false
			},{
				"source": "geobasi_gwc",
				"group": "Acquiferi",
				"title": "Acquiferi in alluvione",
				"name": "geobasi:cis_alluvioni",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,				
				"visibility": false
			},{
				"source": "geobasi_gwc",
				"group": "Idrografia",
				"title": "Bacini",
				"name": "geobasi:bacini_idro",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geoscopio_idrografia",
				"group": "Idrografia",
				"title": "IDROGRAFIA",
				"name": "rt_idrogr.corsi.rt.line",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false
			},{
				"source": "geobasi_gwc",
				"group": "Geobasi",
				"title": "Geobasi Campioni",
				"name": "geobasi:geobasi_campioni",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geobasi_gwc",
				"group": "Geobasi",
				"title": "Geobasi Analisi",
				"name": "geobasi:geobasi_analisi",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geobasi_gwc",
				"group": "Geobasi",
				"title": "Geobasi Analisi ARPAT",
				"name": "geobasi:geobasi_arpat",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti-Amministrativi",
				"title": "Province",
				"name": "rt_ambamm.idprovince.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti-Amministrativi",
				"title": "Comuni",
				"name": "rt_ambamm.idcomuni.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			}
		]
	},
	"customPanels":[
      {
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
	"customTools": [{
			"ptype": "gxp_layerproperties",
			"id": "layerproperties_plugin",
			"geobasiChart": true,
			"actionTarget": ["tree.tbar", "layertree.contextMenu"]
		},{
            "ptype":"gxp_wmsgetfeatureinfo",
            "id": "wmsgetfeatureinfo_plugin",
            "toggleGroup":"toolGroup",
            "closePrevious": true,
            "useTabPanel": true,
            "infoPanelId": "",
            "disableAfterClick": false,
            "loadingMask": true,
            "actionTarget":{
                "target":"paneltbar",
                "index":20
            }
        }, {
			"ptype": "gxp_embedmapdialog",
			"actionTarget": {"target": "paneltbar", "index": 2},
			"embeddedTemplateName": "viewer",
			"showDirectURL": true
		}, {
		   "ptype": "gxp_mouseposition",
		   "displayProjectionCode":"EPSG:3003",
		   "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505"
		}, {
			"ptype": "gxp_print",
			"customParams":{
				"outputFilename":"mapstore-print"
			},
			"printService": "http://159.213.57.108/geoserver_geobasi/pdf/",
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
			"ptype": "gxp_addlayer",
			"showCapabilitiesGrid": true,
			"useEvents": false,
			"showReport": false,
			"directAddLayer": false,
			"id": "addlayer"
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
		  "id":"geobasidataToolId",
          "dataUrl":"http://159.213.57.108/geoserver_geobasi/ows",
		  "rangesUrl": "http://159.213.57.108/geoserver_geobasi/geobasi/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=geobasi:geobasi_data_analisi&proprtyName='min,max'outputFormat=json",
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
	   }, {
			"ptype": "gxp_languageselector",
			"actionTarget": {"target": "panelbbar", "index": 3}
		}
	]
}
