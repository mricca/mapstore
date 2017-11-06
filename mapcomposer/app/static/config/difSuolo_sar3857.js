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
				"source": "geoserver_ds_gwc",
				"group": "DATI GEOLOGICI",
				"title": "Elementi franosi (scala massima 1:100.000)",
				"name": "SAR_RT:elementi_franosi_frane_rt",
				"displayInLayerSwitcher": true,
                "minScale": 100000,
                "legendUrl": "http://www502.regione.toscana.it/geoscopio_qg/cgi-bin/qgis_mapserv?map=dbgeologico_rt.qgs&version=1.3.0&LAYERFONTSIZE=10&ITEMFONTSIZE=8&LAYERTITLE=FALSE&RULELABEL=TRUE&map_mnt=geologia&SERVICE=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&sld_version=1.1.0&width=23&height=15&layer=rt_dbg.el_franosi.frane&style=default&legend_options=fontName:Arial;fontSize:11;fontAntiAliasing:true;&rnd=0.1631251497281796&scale=39420.725267529844&SRS=EPSG:3003&BBOX=1689926.0828677,4812510.3960281,1700456.1160779,4818771.1994729&WIDTH=957&HEIGHT=569",
				"visibility": true,
				"tiled": true,
                "queryPanel": false
			},{
				"source": "geoserver_ds_gwc",
				"group": "BENI CULTURALI E DEL PAESAGGIO",
				"title": "Beni architettonici tutelati ai sensi della parte II del D.Lgs. 42/2004",
				"name": "SAR_RT:architettonico_rt",
				"displayInLayerSwitcher": true,
                "legendUrl": "http://www502.regione.toscana.it/ows2/com.rt.wms.RTmap/wms?map=owsbenicult&version=1.3.0&map_resolution=91&map_mnt=benipaa&SERVICE=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&sld_version=1.1.0&width=23&height=15&layer=rt_benicult.idarchitettonico.rt&style=viola_riempimento_contorno&legend_options=fontName:Arial;fontSize:11;fontAntiAliasing:true;&rnd=0.30595092320046546&scale=1035377.3969182747",
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},{
				"source": "geoserver_ds_gwc",
				"group": "BENI CULTURALI E DEL PAESAGGIO",
				"title": "Beni archeologici tutelati ai sensi della parte II del D.Lgs. 42/2004",
				"name": "SAR_RT:archeologico_rt",
				"displayInLayerSwitcher": true,
                "legendUrl": "http://www502.regione.toscana.it/ows2/com.rt.wms.RTmap/wms?map=owsbenicult&version=1.3.0&map_resolution=91&map_mnt=benipaa&SERVICE=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&sld_version=1.1.0&width=23&height=15&layer=rt_benicult.idarcheologico.rt&style=ceruleo_chiaro_riempimento_contorno&legend_options=fontName:Arial;fontSize:11;fontAntiAliasing:true;&rnd=0.5008075348565595&scale=1035377.3969182747",
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},
            {
                "source": "geoserver_ds_gwc",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster BW (scala massima 1:20.000)",
                "name": "SAR_RT:rt_ctr_10k",
                "minScale": 20000,
                "legendUrl": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr&version=1.3.0&map_resolution=91&map_mnt=geologia&SERVICE=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&sld_version=1.1.0&width=23&height=15&layer=rt_ctr.10k&style=&legend_options=fontName:Arial;fontSize:11;fontAntiAliasing:true;&rnd=0.8161292908036417&scale=1767.1750186660258",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": true,
                "attribution": false
            },{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA DESCENDING",
				"title": "Toscana giglio snt t168 D",
				"name": "SAR_RT:toscana_giglio_snt_t168_d",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA DESCENDING",
				"title": "Toscana elba snt t168 D",
				"name": "SAR_RT:toscana_elba_snt_t168_d",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA DESCENDING",
				"title": "Toscana ovest snt t168 D",
				"name": "SAR_RT:toscana_ovest_snt_t168_d",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA DESCENDING",
				"title": "Toscana est snt t95 D",
				"name": "SAR_RT:toscana_est_snt_t95_d",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA DESCENDING",
				"title": "Toscana giglio snt t168 D filter",
				"name": "SAR_RT:toscana_giglio_snt_t168_d_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA DESCENDING",
				"title": "Toscana elba snt t168 D filter",
				"name": "SAR_RT:toscana_elba_snt_t168_d_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA DESCENDING",
				"title": "Toscana ovest snt t168 D filter",
				"name": "SAR_RT:toscana_ovest_snt_t168_d_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA DESCENDING",
				"title": "Toscana est snt t95 D filter",
				"name": "SAR_RT:toscana_est_snt_t95_d_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA ASCENDING",
                "expanded": false,
                "checked": false,
				"title": "Toscana giglio snt t117 A",
				"name": "SAR_RT:toscana_giglio_snt_t117_a",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA ASCENDING",
                "expanded": false,
                "checked": false,
				"title": "Toscana elba snt t15 A",
				"name": "SAR_RT:toscana_elba_snt_t15_a",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA ASCENDING",
                "expanded": false,
                "checked": false,
				"title": "Toscana ovest snt t15 A",
				"name": "SAR_RT:toscana_ovest_snt_t15_a",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "ALL DATA ASCENDING",
                "expanded": false,
                "checked": false,
				"title": "Toscana est snt t117 A",
				"name": "SAR_RT:toscana_est_snt_t117_a",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA ASCENDING",
                "expanded": true,
                "checked": true,
				"title": "Toscana giglio snt t117 A filter",
				"name": "SAR_RT:toscana_giglio_snt_t117_a_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA ASCENDING",
                "expanded": true,
                "checked": true,
				"title": "Toscana elba snt t15 A filter",
				"name": "SAR_RT:toscana_elba_snt_t15_a_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA ASCENDING",
                "expanded": true,
                "checked": true,
				"title": "Toscana ovest snt t15 A filter",
				"name": "SAR_RT:toscana_ovest_snt_t15_a_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
			},{
				"source": "geoserver_ds_gwc",
				"group": "FILTERED DATA ASCENDING",
                "expanded": true,
                "checked": true,
				"title": "Toscana est snt t117 A filter",
				"name": "SAR_RT:toscana_est_snt_t117_a_trim",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false,
                "getGraph": true,
                "graphAttribute": [],
                "cumulative": false,
                "tabCode": "gid"
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
        "EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68 +units=m +no_defs"
	},
    "customTools": [
        {
            "ptype": "gxp_embedmapdialog",
            "actionTarget": {"target": "paneltbar", "index": 2},
            "embeddedTemplateName": "viewer",
            "showDirectURL": true
        }, {
            "ptype": "gxp_categoryinitializer",
            "silentErrors": true
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
        },{
            "ptype": "gxp_wfsgetgraphs",
            "toggleGroup":"toolGroup",
            "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/wfs?",
            "actionTarget":{
                "target":"paneltbar",
                "index":15
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
                    "title": "SAR ASCENDING",
                    "children": [
                        {"name": "FILTERED DATA ASCENDING", "title": "FILTERED DATA (-10 >= vel [mm/hr] >= 10)"},
                        {"name": "ALL DATA ASCENDING", "title": "ALL DATA"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "SAR DESCENDING",
                    "children": [
                        {"name": "FILTERED DATA DESCENDING", "title": "FILTERED DATA (-10 >= vel [mm/hr] >= 10)"},
                        {"name": "ALL DATA DESCENDING", "title": "ALL DATA"}
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
                },
                {
                    "title": "BENI CULTURALI E DEL PAESAGGIO",
                    "folder": [
                        {"name": "BENI CULTURALI E DEL PAESAGGIO", "title": "BENI CULTURALI E DEL PAESAGGIO"}
                    ],
                    "expanded": true,
                    "checked": false
                },
                {
                    "title": "DATI GEOLOGICI",
                    "folder": [
                        {"name": "DATI GEOLOGICI", "title": "DATI GEOLOGICI"}
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
        }, {
            "ptype" : "gxp_help",
            "actionTarget" : "paneltbar",
            "text" : "Help",
            "tooltip" : "Descrizione campi",
            "index" : 24,
            "showOnStartup" : false,
            "fileDocURL" : "SqueeSAR_descrizione_campi.pdf"
        }
    ]
}
