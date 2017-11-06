{
   "scaleOverlayMode": "advanced",
   "actionToolScale": "medium",
   "tab": false,
   "loadingPanel": {
        "width": 100,
        "height": 100,
        "center": true
    },
   "gsSources":{
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
           },
        "geoserver_ds_reticolo": {
            "ptype": "gxp_wmssource",
            "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/RETICOLO/ows?",
            "title": "Reticolo Difesa Suolo",
            "srs": "EPSG:3857",
            "projection": "EPSG:3857",
            "version":"1.1.1",
            "loadingProgress": true,
            "layersCachedExtent": [
                -20037508.34, -20037508.34,
    			20037508.34, 20037508.34
            ],
            "layerBaseParams":{
                "FORMAT":"image/png8",
                "TILED":true,
                "TILESORIGIN":"-20037508.34,-20037508.34"
            }
        },
            "geoserver_ds_gwc": {
            "ptype": "gxp_wmssource",
            "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/gwc/service/wms?",
            "title": "Reticolo Difesa Suolo GWC",
            "srs": "EPSG:3857",
            "projection": "EPSG:3857",
            "version":"1.1.1",
            "loadingProgress": true,
            "layersCachedExtent": [
                -20037508.34, -20037508.34,
    			20037508.34, 20037508.34
            ],
            "layerBaseParams":{
                "FORMAT":"image/png8",
                "TILED":true,
                "TILESORIGIN":"-20037508.34,-20037508.34"
            }
        },
           "geoscopio_ortofoto": {
            "ptype": "gxp_wmssource",
            "url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc",
            "title": "Geoscopio ortofoto",
            "srs": "EPSG:3003",
            "version":"1.3.0",
            "loadingProgress": true,
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
            "url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr",
            "title": "Geoscopio CTR",
            "srs": "EPSG:3003",
            "version":"1.3.0",
            "loadingProgress": true,
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
            "srs": "EPSG:3003",
            "version":"1.3.0",
            "loadingProgress": true,
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
    "cookieConsent":false,
    "map": {
        "projection": "EPSG:3857",
		"units": "m",
		"center": [1250000.000000, 5370000.000000],
		"zoom":8,
		"maxExtent": [
			-20037508.34, -20037508.34,
			20037508.34, 20037508.34
		],
        "restrictedExtent": [
			630210,5023962,1833427,5751969
		],
        "layers": [{
				"source": "osm",
				"title": "Open Street Map",
				"name": "mapnik",
				"group": "background"
			},{
				"source": "bing",
				"title": "Bing Aerial",
				"name": "Aerial",
				"group": "background"
			},{
				"source": "bing",
				"title": "Bing Aerial With Labels",
				"name": "AerialWithLabels",
				"group": "background"
			},{
				"source": "google",
				"title": "Google Roadmap",
				"name": "ROADMAP",
				"group": "background"
			},{
				"source": "google",
				"title": "Google Terrain",
				"name": "TERRAIN",
				"group": "background"
			},{
				"source": "google",
				"title": "Google Hybrid",
				"name": "HYBRID",
				"group": "background"
			},{
				"source": "ol",
				"group": "background",
				"fixed": true,
				"type": "OpenLayers.Layer",
				"visibility": false,
				"args": [
					"None", {"visibility": false}
				]
			},
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 2013 col - AGEA",
                "name": "rt_ofc.10k13",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": true,
                "checked": false,
                "attribution": false
            },{
				"source": "geoserver_ds_reticolo",
				"group": "Comprensori di bonifica",
				"title": "Comprensori 20/01/2016",
				"name": "comprensori_bonifica_20_01_2016",
                "styles": "comprensori_2016_manu",
                "style": "comprensori_2016_manu",
				"displayInLayerSwitcher": true,
                "maxScale": 100000,
                "opacity": 0.8,
				"visibility": true,
				"tiled": false,
                "queryPanel": false
			},{
				"source": "geoserver_ds_gwc",
				"group": "Reticolo di gestione RT",
				"title": "Reticolo di gestione LR 79/2012 aggiornato con DCRT 101/2016",
				"name": "RETICOLO:reticolo_dcrt_101_2016",
                "styles": ["reticolo_gestione_dcrt9_2015"],
                "style": ["reticolo_gestione_dcrt9_2015"],
				"displayInLayerSwitcher": true,
                "format":"image/png8",
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Reticolo idrografico RT",
				"title": "Reticolo idrografico LR 79/2012 aggiornato con DCRT 101/2016",
				"name": "RETICOLO:reticolo_dcrt_101_2016",
                "styles": ["reticolo_idrografico_dcrt9_2015"],
                "style": ["reticolo_idrografico_dcrt9_2015"],                
				"displayInLayerSwitcher": true,
                "format":"image/png8",
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Idrografia",
				"title": "Reticolo irriguo 2016",
				"name": "RETICOLO:reticolo_irriguo_2016",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Idrografia",
				"title": "Specchi d'acqua",
				"name": "area_bagnata",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},
            {
                "source": "geoscopio_ctr",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster BW",
                "name": "rt_ctr.10k",
                "minScale": 15000,
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": true,
                "attribution": false
            },{
                "source": "geoscopio_amb_ammin",
                "group": "Ambiti amministrativi",
                "title": "Province",
                "name": "rt_ambamm.idprovince.rt.poly",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "attribution": false
            },{
                "source": "geoscopio_amb_ammin",
                "group": "Ambiti amministrativi",
                "title": "Comuni",
                "name": "rt_ambamm.idcomuni.rt.poly",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "attribution": false
            }
        ]
    },
    "scaleOverlayUnits":{
        "bottomOutUnits":"nmi",
        "bottomInUnits":"nmi",
        "topInUnits":"m",
        "topOutUnits":"km"
    },
    "removeTools": [
        "wmsgetfeatureinfo_menu_plugin","layertree_plugin"
    ],
    "proj4jsDefs": {
        "EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84 = -104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68",
		"EPSG:3857": "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
	},
    "customTools": [
        {
            "ptype": "gxp_embedmapdialog",
            "actionTarget": {"target": "paneltbar", "index": 2},
            "embeddedTemplateName": "viewer",
            "showDirectURL": true
        },{
            "ptype":"gxp_wmsgetfeatureinfo",
            "id": "wmsgetfeatureinfo_plugin",
            "toggleGroup":"toolGroup",
            "closePrevious": true,
            "useTabPanel": true,
            "infoPanelId": "",
            "disableAfterClick": false,
            "loadingMask": true,
            "maxFeatures": 100,
            "actionTarget":{
                "target":"paneltbar",
                "index":14
            }
        }, {
           "ptype": "gxp_mouseposition",
           "displayProjectionCode":"EPSG:3003",
           "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505"
        }, {
            "ptype": "gxp_addlayer",
            "showCapabilitiesGrid": true,
            "useEvents": false,
            "showReport": "never",
            "directAddLayer": false,
            "id": "addlayer"
        }, {
            "actions": ["-"],
            "actionTarget": "paneltbar"
        }, {
            "ptype": "gxp_geolocationmenu",
            "actionTarget": {"target": "paneltbar", "index": 20},
            "toggleGroup": "toolGroup"
        }, {
            "actions": ["-"],
            "actionTarget": "paneltbar"
        }, {
            "ptype": "gxp_nestedlayertree",
            "id": "nestedlayertree_plugin",
            "unshift":true,
            "groupConfig": [
                {
                    "title": "Ambiti amministrativi",
                    "folder": [
                        {"name": "Ambiti amministrativi", "title": "Ambiti amministrativi"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "Idrografia",
                    "folder": [
                        {"name": "Idrografia", "title": "Idrografia"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "Reticolo di gestione RT",
                    "folder": [
                        {"name": "Reticolo di gestione RT", "title": "Reticolo di gestione RT"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "Reticolo idrografico RT",
                    "folder": [
                        {"name": "Reticolo idrografico RT", "title": "Reticolo idrografico RT"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "Comprensori di bonifica",
                    "folder": [
                        {"name": "Comprensori di bonifica", "title": "Comprensori di bonifica"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "Basi cartografiche",
                    "folder": [
                        {"name": "Basi cartografiche", "title": "Basi cartografiche"}
                    ],
                    "expanded": true,
                    "checked": false
                }, {
                    "title": "Ortofotocarte 1:10.000",
                    "folder": [
                        {"name": "Ortofotocarte 1:10.000", "title": "Ortofotocarte 1:10.000"}
                    ],
                    "expanded": true,
                    "checked": false
                }
            ],
            "outputConfig": {
                "id": "layertree"
            },
            "outputTarget": "tree"
            }, {
            "actions": ["->"],
            "actionTarget": "paneltbar"
        }
    ]
}
