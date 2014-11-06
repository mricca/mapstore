{
   "scaleOverlayMode": "advanced",
   "tab": false,
   "gsSources":{
   		"geoserver_centraline": {
			"ptype": "gxp_wmssource",
			"url": "http://159.213.57.108/geoserver/wms",
			"title": "Geoserver Centraline",
			"SRS": "EPSG:3003",
			"version":"1.1.1",
			"layersCachedExtent": [
				1547065, 4677785,
				1803065, 4933785
			],			
			"layerBaseParams":{
				"FORMAT":"image/png8",
				"TILED":false
			}
		},   
   		"geoscopio_osm_b": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsosm_b&map_resolution=91&",
			"title": "Geoscopio OSM stile Bing",
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
   		"geoscopio_osm_g": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsosm_g&map_resolution=91&",
			"title": "Geoscopio OSM stile Google",
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
   		"geoscopio_osm_m": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsosm_m&map_resolution=91&",
			"title": "Geoscopio OSM stile Michelin",
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
   		"geoscopio_osm_d": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsosm_d&map_resolution=91&",
			"title": "Geoscopio OSM stile OSM",
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
   		"geoscopio": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmssfondo&map_resolution=91&",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc&map_resolution=91&",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr&map_resolution=91&",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsidrogr&map_resolution=91&",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsambamm&map_resolution=91&",
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
	"loadingPanel": {
		"width": 100,
		"height": 100,
		"center": true
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
		"layers": [
			{
				"source": "geoscopio",
				"group": "background",
				"title": "Basi di sfondo",
				"name": "rt_sfondo.batimetriche",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio",
				"group": "background",
				"title": "Basi di sfondo",
				"name": "rt_sfondo.hills",
				"displayInLayerSwitcher": false,
				"visibility": true,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio",
				"group": "background",
				"title": "Basi di sfondo",
				"name": "rt_sfondo.intorno_toscana",
				"displayInLayerSwitcher": false,
				"visibility": true,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 2013 col - AGEA",
				"name": "rt_ofc.10k13",
                "styles": "default",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio_osm_b",
				"group": "Toscana OSM Dataset",
				"title": "Stile Bing",
				"name": "default",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_osm_g",
				"group": "Toscana OSM Dataset",
				"title": "Stile Google",
				"name": "default",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_osm_m",
				"group": "Toscana OSM Dataset",
				"title": "Stile Michelin",
				"name": "default",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_osm_d",
				"group": "Toscana OSM Dataset",
				"title": "Stile OSM",
				"name": "default",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_idrografia",
				"group": "Idrografia",
				"title": "Corsi d'acqua",
				"name": "rt_idrogr.corsi.rt.line",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_ctr",
				"group": "Basi cartografiche",
				"title": "CTR 1:10.000 Raster BW",
				"name": "rt_ctr.10k",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio_ctr",
				"group": "Basi cartografiche",
				"title": "CTR 1:10.000 Raster GL",
				"name": "rt_ctr.ctr10kgreylight",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false,
                "queryable": false
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Province",
				"name": "rt_ambamm.idprovince.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Comuni",
				"name": "rt_ambamm.idcomuni.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryable": false
			},{
				"source": "geoserver_centraline",
				"group": "WEB CAM",
				"title": "Consorzio LaMMA",
				"name": "CENTRALINE:lamma_webcam_3003",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "ratio": 3
			}
		]
	},
	"scaleOverlayUnits":{
        "bottomOutUnits":"nmi",    
        "bottomInUnits":"nmi",    
        "topInUnits":"m",    
        "topOutUnits":"km"
    },	
	"proj4jsDefs": {
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84 = -104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
	},
    "removeTools": [
        "gxp_wmsgetfeatureinfo_menu",
        "googleearth_plugin",
        "googleearth_separator"
    ],
    "customPanels":[
        {
            "xtype": "panel",
            "title": "Pannello WEBCAM",
            "border": false,
            "id": "south",
            "region": "south",
            "layout": "fit",
            "split":true,
            "height": 180,
            "collapsed": false,
            "collapsible": true,
            "header": true
        }
    ],
	"customTools": [
        {
            "ptype":"gxp_wmsgetfeatureinfo",
            "id": "wmsgetfeatureinfo_plugin",
            "toggleGroup":"toolGroup",
            "closePrevious": true,
            "useTabPanel": true,
            "infoPanelId": "",
            "pressed": true,
            "disableAfterClick": false,
            "loadingMask": true,
			"maxFeatures": 100,
            "popupHeight": 350,
            "popupWidth": 450,            
            "actionTarget":{
                "target":"paneltbar",
                "index":21
            }
        }, {
		   "ptype": "gxp_mouseposition",
		   "displayProjectionCode":"EPSG:3003",
		   "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505"
		}, {
			"ptype": "gxp_addlayer",
			"showCapabilitiesGrid": true,
			"useEvents": false,
			"showReport": false,
			"directAddLayer": false,
			"id": "addlayer"
		},{
            "ptype":"gxp_nominatimgeocoder",
            "outputConfig":{
                "emptyText":"Nominatim GeoCoder",
                 "vendorOptions":{
                    "bounded":1,
                    "countrycodes":"it",
                    "addressdetails":0
                },
                "boundOption":"max"
            },
            "outputTarget":"paneltbar",
            "index":26
        }, {
			"ptype": "gxp_about",
			"poweredbyURL": "http://www.geo-solutions.it/about/contacts/",
			"actionTarget": {"target": "panelbbar", "index": 1}
		}, {
            "ptype": "gxp_wfsgrid",
            "wfsURL": "http://159.213.57.108/geoserver/wfs",
            "featureType": "lamma_webcam_3003",
            "outputTarget": "south",
            "srsName": "EPSG:3003",
            "paging": false,
            "pageSize": 10,
            "fields": [
                {
                    "name": "localita",
                    "mapping": "localita"
                }
            ],
            "columns": [
                {
                    "header": "LOCALITA'",
                    "dataIndex": "localita"
                }
            ],
            "actionColumns": [{
                "type": "checkDisplay",
                "layerName": "Highlight Layer",
                "sourceSRS": "EPSG:3003"
            },
            {
                "type": "zoom",
                "sourceSRS": "EPSG:3003"
            }]            
        }
	]
}
