{
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
				708923.00, 4290035.00,
				2631134.00, 5369149.00
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
   		"geoscopio_amb_ammin": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsambamm&",
			"title": "Geoscopio ambiti amministrativi",
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
		"maxResolution": 1000,
		"zoom": 6,
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
				"source": "geoscopio_ortofoto",
				"group": "background",
				"title": "ORTOFOTO RT 2010",
				"name": "rt_ofc.10k10",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geobasi_gwc",
				"group": "CIS",
				"title": "Acquiferi in roccia",
				"name": "geobasi:cis_roccia",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,
				"visibility": true
			},{
				"source": "geobasi_gwc",
				"group": "CIS",
				"title": "Acquiferi in alluvione",
				"name": "geobasi:cis_alluvioni",
				"displayInLayerSwitcher": true,
				"opacity": 0.6,				
				"visibility": true
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
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti-Amministrativi",
				"title": "Comuni",
				"name": "rt_ambamm.idcomuni.rt.poly",
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
				"visibility": true,
				"tiled": true
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
      },{
            "xtype": "panel",
            "title": "WFSGrid Panel",
            "border": false,
            "id": "gridcontainer",
            "region": "south",
            "layout": "fit",
            "split":true,
            "height": 330,
            "collapsed": true,
            "collapsible": true,
            "header": true
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
			"maxFeatures": 100,
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
		  "ptype":"gxp_maingeobasi",
		  "outputConfig":{
			 "id":"eastTab",
			 "region":"east",
			 "startTab":"geobasidata"
		  },
		  "outputTarget": "south",
		  "exportFormats": ["CSV","shape-zip"]
	    }, {
          "ptype": "gxp_spatialqueryform",
          "featureManager": "featuremanager",
          "featureGridContainer": "south",
          "outputTarget": "east",
          "showSelectionSummary": true,
          "actions": null,
          "id": "bboxquery",
          "outputConfig":{
                  "outputSRS": "EPSG:900913",
                  "selectStyle":{
                          "strokeColor": "#ee9900",
                          "fillColor": "#ee9900",
                          "fillOpacity": 0.4,
                          "strokeWidth": 1
                  },
                  "spatialFilterOptions": {    
                          "lonMax": 20037508.34,  
                          "lonMin": -20037508.34,
                          "latMax": 20037508.34,  
                          "latMin": -20037508.34  
                  },
                  "bufferOptions": {
                        "minValue": 1,
                        "maxValue": 1000,
                        "decimalPrecision": 2,
                        "distanceUnits": "m"
                  }
          },
          "spatialSelectorsConfig":{
                "bbox":{
                    "xtype": "gxp_spatial_bbox_selector"
                },
                "buffer":{
                    "xtype": "gxp_spatial_buffer_selector"
                },
                "circle":{
                    "xtype": "gxp_spatial_circle_selector",
                    "zoomToCurrentExtent": true
                },
                "polygon":{
                    "xtype": "gxp_spatial_polygon_selector"
                }
              }
        }, {
			"ptype": "gxp_about",
			"poweredbyURL": "http://www.geo-solutions.it/about/contacts/",
			"actionTarget": {"target": "panelbbar", "index": 1}
		}, {
			"ptype": "gxp_languageselector",
			"actionTarget": {"target": "panelbbar", "index": 3}
		}
	]
}
