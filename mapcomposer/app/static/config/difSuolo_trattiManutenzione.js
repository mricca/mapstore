{
   "scaleOverlayMode": "advanced",
   "actionToolScale": "medium",
   "tab": false,
   "gsSources":{
       "geoserver_ds": {
           "ptype": "gxp_wmssource",
           "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/RETICOLO/ows?",
           "title": "Difesa Suolo Reticolo",
           "SRS": "EPSG:3003",
           "version":"1.1.1",
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
       "geoserver_presidi": {
           "ptype": "gxp_wmssource",
           "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/PRESIDI/ows?",
           "title": "Geoscopio Reticolo",
           "SRS": "EPSG:3003",
           "version":"1.1.1",
           "loadingProgress": true,
           "layersCachedExtent": [
               1547065, 4677785,
               1803065, 4933785
           ],
           "layerBaseParams":{
               "FORMAT":"image/png",
               "TILED":true
           }
       },
   		"geoscopio": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmssfondo&map_resolution=91&language=ita",
			"title": "Geoscopio basi",
			"SRS": "EPSG:3003",
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
		"geoscopio_topogr": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmstopogr&version=1.3.0&map_resolution=91&map_mnt=cartoteca&",
			"title": "Geoscopio BASI TOPOGRAFICHE",
			"SRS": "EPSG:3003",
			"version": "1.3.0",
            "loadingProgress": true,
			"layersCachedExtent": [1547065,
			4677785,
			1803065,
			4933785],
			"layerBaseParams": {
				"FORMAT": "image/png",
				"TILED": false
			}
		},
		"geoscopio_ambcens": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsambcens&version=1.3.0&map_resolution=91&map_mnt=cartoteca&",
			"title": "Geoscopio AMBITI_CENSUARI",
			"SRS": "EPSG:3003",
			"version": "1.3.0",
            "loadingProgress": true,
			"layersCachedExtent": [1547065,
			4677785,
			1803065,
			4933785],
			"layerBaseParams": {
				"FORMAT": "image/png",
				"TILED": false
			}
		},
   		"geoscopio_ortofoto": {
			"ptype": "gxp_wmssource",
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc",
			"title": "Geoscopio ortofoto",
			"SRS": "EPSG:3003",
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
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr",
			"title": "Geoscopio CTR",
			"SRS": "EPSG:3003",
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
   		"geoscopio_idrografia": {
			"ptype": "gxp_wmssource",
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsidrogr&map_resolution=91&language=ita&",
			"title": "Geoscopio idrografia",
			"SRS": "EPSG:3003",
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
			"SRS": "EPSG:3003",
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
	"loadingPanel": {
		"width": 100,
		"height": 100,
		"center": true
	},
	"map": {
		"projection": "EPSG:3003",
		"displayProjection": "EPSG:3003",
		"units": "m",
		"fractionalZoom": true,
		"center": [1671579.00,
		4803992.00],
		"scales": [50, 1000, 2000, 5000, 8000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000, 1500000, 2000000],
		"maxExtent": [1328298.3134386, 4554791.501599, 2014859.6865614, 5053192.498401],
		"restrictedExtent": [1550750, 4674330, 1775720, 4929790],
		"layers": [{
                "source": "geoscopio",
                "group": "background",
                "title": "Basi di sfondo",
                "name": "rt_sfondo.batimetriche",
                "displayInLayerSwitcher": true,
                "visibility": true,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio",
                "group": "background",
                "title": "Basi di sfondo",
                "name": "rt_sfondo.intorno_toscana",
                "displayInLayerSwitcher": false,
                "visibility": true,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 2013 col - AGEA",
                "name": "rt_ofc.10k13",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 2010 col - AGEA",
                "name": "rt_ofc.10k10",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 2007 col - CGR",
                "name": "rt_ofc.10k07",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 1996 bn - AIMA",
                "name": "rt_ofc.10k96",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 1988 bn - RT",
                "name": "rt_ofc.10k88",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 1978 bn - RT",
                "name": "rt_ofc.10k78",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ortofoto",
                "group": "Ortofotocarte 1:10.000",
                "title": "Anno 1954 bn - RT-IGM",
                "name": "rt_ofc.10k54",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "expanded": false,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_topogr",
                "group": "Basi cartografiche",
                "title": "Carta Topografica 50k",
                "maxScale": 25000.1,
                "name": "rt_topogr.topografica50k.grey.rt",
                "displayInLayerSwitcher": true,
                "visibility": true,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ctr",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster BW",
                "name": "rt_ctr.10k",
                "minScale": 25000.1,
                "displayInLayerSwitcher": true,
                "visibility": true,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ctr",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster GL",
                "minScale": 25000.1,
                "name": "rt_ctr.ctr10kgreylight",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ambcens",
                "group": "Toponimi",
                "title": "Toponimi - Centri e nuclei 2011",
                "name": "rt_amb_cens.centri_nuclei_2011",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "attribution": false
            },{
				"source": "geoserver_ds",
				"group": "Comprensori",
                "expanded": true,
                "checked": false,
				"title": "Comprensori di bonifica",
				"name": "comprensori_bonifica_20_01_2016",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Toscana Nord",
				"name": "gc_toscana_nord",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Toscana Sud",
				"name": "gc_toscana_sud",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Centrale",
				"name": "gc_valdarno_centrale",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Inf. Costa",
				"name": "gc_valdarno_inf_costa",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Superiore",
				"name": "gc_valdarno_superiore",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_ds",
				"group": "MANUTENZIONE ORDINARIA",
                "expanded": true,
                "checked": false,
				"title": "Reticolo di gestione LR 79/2012 aggiornato con DCRT 9/2015",
				"name": "reticolo_lr79_2012",
                "styles": ["reticolo_gestione_dcrt9_2015_gest_si"],
                "style": ["reticolo_gestione_dcrt9_2015_gest_si"],
                "vendorParams":{
                    "cql_filter": "retgeslr79 = 'SI'"
                },
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "MANUTENZIONE ORDINARIA",
                "expanded": true,
                "checked": false,
				"title": "Tratti classificati in terza categoria idraulica",
                "styles": ["terza_categoria_manutenzione"],
                "style": "terza_categoria_manutenzione",
				"name": "manutenzione_ordinaria_2e3",
                "vendorParams":{
                    "cql_filter": "legenda = '3'"
                },
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "MANUTENZIONE ORDINARIA",
                "expanded": true,
                "checked": false,
				"title": "Tratti classificati in seconda categoria idraulica",
                "styles": ["seconda_categoria_manutenzione"],
                "style": "seconda_categoria_manutenzione",
				"name": "manutenzione_ordinaria_2e3",
                "vendorParams":{
                    "cql_filter": "legenda = '2'"
                },
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "queryPanel": true
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
        "wmsgetfeatureinfo_menu_plugin"
    ],
	"proj4jsDefs": {
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84 = -104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
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
			"showReport": false,
			"directAddLayer": false,
			"id": "addlayer"
		}, {
			"actions": ["-"],
			"actionTarget": "paneltbar"
		}, {
			"ptype": "gxp_geolocationmenu",
			"actionTarget": {"target": "paneltbar", "index": 23},
			"toggleGroup": "toolGroup"
		}
	]
}
