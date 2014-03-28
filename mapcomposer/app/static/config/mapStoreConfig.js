{
   "advancedScaleOverlay": true,
   "gsSources":{
		"lerici":{
			"ptype": "gxp_wmssource",
			"title": "Lerici GeoServer",
			"projection":"EPSG:900913",
			"url": "http://159.213.57.108/geoserver/ows",
            "version":"1.1.1",
		    "layersCachedExtent": [
				-20037508.34,-20037508.34,
				20037508.34,20037508.34
			],            
			"layerBaseParams": {
			   "format":"image/png8",
			   "TILED": true
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
		"projection": "EPSG:900913",
		"units": "m",
        "center": [1104457.00,5477000.00],
		"zoom":13,
		"extent": [
			-20037508.34,-20037508.34,
			20037508.34,20037508.34
		],        
		"maxExtent": [
			-20037508.34,-20037508.34,
			20037508.34,20037508.34
		],
        "animatedZooming":{
            "transitionEffect": "null"
        },
		"layers": [
			{
				"source": "bing",
				"title": "Bing Aerial",
				"name": "Aerial",
				"group": "background"
			},{
				"source": "ol",
				"title": "Vuoto",
				"group": "background",
				"fixed": true,
				"type": "OpenLayers.Layer",
				"visibility": false,
				"args": [
					"None", {"visibility": false}
				]
		    },{
				"source": "osm",
				"title": "Open Street Map",
				"name": "mapnik",
				"group": "background"
			},{
				"source": "mapquest",
				"title": "MapQuest OpenStreetMap",
				"name": "osm",
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
				"source": "geosolutions",
				"title": "World Countries",
				"name": "geosolutions:WorldCountries"
			},{
				"source": "lerici",
                "group": "Ortofoto",
				"title": "SFONDO",
				"name": "lerici:ortofoto",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Permeabilità",
				"name": "lerici:PER_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Autorità di bacino - Ambiti di competenza",
				"name": "lerici:AAC_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Subunità idrologiche",
				"name": "lerici:SUI_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Interferenza fra Reticolo Idrografico e Viabilità",
				"name": "lerici:INT_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Unità Idrologiche",
				"name": "lerici:UIE_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Reticolo Idrografico Secondario",
				"name": "lerici:RIS_LI",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Reticolo Idrografico Regionale",
				"name": "lerici:RIR_LI",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "IDROGRAFIA",
				"title": "Punto di collegamento fra reticolo tombato e non tombato",
				"name": "lerici:NINT_P",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "STRUTTURE ANTROPICHE",
				"title": "Viabilità principale",
				"name": "lerici:VPR_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "STRUTTURE ANTROPICHE",
				"title": "Viabilità secondaria",
				"name": "lerici:VSE_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "STRUTTURE ANTROPICHE",
				"title": "Edificato",
				"name": "lerici:EDIFICATO_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Coperture detritiche in condizioni di stabilità e metastabilità",
				"name": "lerici:CD_PO",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Pendenza",
				"name": "lerici:PEN_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Formazione geologica",
				"name": "lerici:GEO-FOR_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Frana areale",
				"name": "lerici:GEO-FRA_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Conoide",
				"name": "lerici:GEO-CO_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Dolina",
				"name": "lerici:GEO-DO_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Cave",
				"name": "lerici:GEO-CV_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Falda artesiana a profondità inferiore a 20m",
				"name": "lerici:GEO-FAC_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Scarpata morfologica",
				"name": "lerici:GEO-SM_L",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Faglie e lineazioni principali",
				"name": "lerici:GEO-FA_L",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Ruscellamento concentrato",
				"name": "lerici:GEO-RC_L",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Misure di strato",
				"name": "lerici:GEO-MS_P",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "CARTOGRAFIA GEOLOGICO - GEOMORFOLOGICA",
				"title": "Frana puntuale",
				"name": "lerici:GEO-FP_P",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "SUSCETTIVITA",
				"title": "Suscettività al dissesto",
				"name": "lerici:SUD_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "SUSCETTIVITA",
				"title": "Suscettività d'uso",
				"name": "lerici:SUU_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "LIMITI AMMINISTRATIVI",
				"title": "Inquadramento 5K",
				"name": "lerici:IG-QU5K_PO",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": false
			},{
				"source": "lerici",
                "group": "LIMITI AMMINISTRATIVI",
				"title": "Confine Comunale Lerici",
				"name": "lerici:IG-LC_L",
				"displayInLayerSwitcher":true,
				"visibility": true,
                "tiled": true
			},{
				"source": "lerici",
                "group": "LIMITI AMMINISTRATIVI",
				"title": "CTR 5K",
				"name": "lerici:ctr5_tif",
				"displayInLayerSwitcher":true,
				"visibility": false,
                "tiled": true
			},{
				"source": "lerici",
                "group": "SEGNALAZIONI",
				"title": "Segnalazioni",
				"name": "lerici:segnalazioni",
				"displayInLayerSwitcher":true,
				"visibility": true,
                "tiled": false
			}
		]
	},
	"proj4jsDefs": {
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs"
	},    
    "customPanels":[
        {
            "xtype": "tabpanel",
            "border": false,
            "activeTab": 0,
            "id": "east",
            "region": "east",
            "width": 308,
            "split": true,
            "collapsible": true,
            "header": false,
            "items":[
                {
                    "id": "segnalazioni_id",
                    "xtype": "panel",
                    "border": false,
                    "layout": "form",
                    "title": "Segnalazioni",
                    "autoScroll": true,
                    "closable": false,
                    "labelWidth": "10px",
                    "items":[{
                        "xtype": "fieldset",
                        "title": "Inserimento, Modifica Segnalazioni",
                        "id": "editorfieldset",
                        "autoHeight": true,
                        "autoScroll": true,
                        "bbar": [],
                        "defaults": {
                            "bodyStyle":"padding:5px;background-color:#0099FF;",
                            "style": "border-color:#b5b8c8"
                        },
                        "items": 
                            [{
                                "id": "acces.jpg",
                                "html": "<img src='http://159.213.57.108/mapstore/theme/app/img/banner/logo_home.gif'/>"
                        }]
                    }]
                }            
            ]
        } 
    ],	
	"scaleOverlayUnits":{
        "bottomOutUnits":"nmi",    
        "bottomInUnits":"nmi",    
        "topInUnits":"m",    
        "topOutUnits":"km"
    },
	"customTools":[{
            "ptype":"gxp_wfssearchbox",
            "outputConfig":{
             "url":"http://159.213.57.108/geoserver/lerici/ows?",
             "typeName":"lerici:GEO-FOR_PO",
             "recordModel":[
                {
                   "name":"DESCRIZION",
                   "mapping":"properties.DESCRIZION"
                },
                {
                   "name":"geometry",
                   "mapping":"geometry"
                }
             ],
             "sortBy":"DESCRIZION",
             "queriableAttributes":[
                "DESCRIZION"
             ],
             "displayField":"DESCRIZION",
             "pageSize":10,
             "width":250,
             "tpl":"<tpl for=\".\"><div class=\"search-item\"><h3>{DESCRIZION}</span></h3>Descrizione</div></tpl>"
            },
            "updateField":"geometry",
            "zoom":18,
            "outputTarget":"paneltbar",
            "index":30
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
			"ptype": "gxp_print",
			"customParams":{
				"outputFilename":"mapstore-print"
			},
			"printService": "http://159.213.57.108/geoserver/pdf/",
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
            "ptype": "gxp_featuremanager",
            "id": "featuremanager",
            "wfsUrl":"http://159.213.57.108/geoserver/ows",
            "paging": false,
            "layer": {
                "source": "lerici",
                "name": "lerici:segnalazioni"
            }
        }, {
            "ptype": "gxp_featureeditor",
            "featureManager": "featuremanager",
            "autoLoadFeatures": true,
            "actionTarget":"editorfieldset.bbar",
            "toggleGroup": "toolGroup"
        }, {
			"ptype": "gxp_embedmapdialog",
			"actionTarget": {"target": "paneltbar", "index": 2},
			"embeddedTemplateName": "viewer",
			"showDirectURL": true
		}, {
		   "ptype": "gxp_mouseposition",
		   "displayProjectionCode":"EPSG:3003",
		   "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505 "
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
		}, {
			"actions": ["->"], 
			"actionTarget": "paneltbar"
		}, {
			"ptype": "gxp_help",
			"actionTarget": "paneltbar",
			"text": "Help",
			"tooltip":"MapStore Guide",
			"index": 24,
			"showOnStartup": false,
			"fileDocURL": "MapStore-Help.pdf"
        }
	]
}
