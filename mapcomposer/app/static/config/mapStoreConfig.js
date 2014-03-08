{
   "advancedScaleOverlay": true,
   "gsSources":{
		"lerici":{
			"ptype": "gxp_wmssource",
			"title": "Lerici GeoServer",
			"projection":"EPSG:3003",
			"url": "http://localhost:8080/geoserver/ows",
			"layerBaseParams": {
			   "format":"image/png8",
			   "TILED": true
			}
		},
		"realvista":{
			"ptype": "gxp_wmssource",
			"title": "RealVista",
			"projection":"EPSG:3003",
			"url": "http://213.215.135.196/reflector/open/service?",
			"layerBaseParams": {
			   "format":"image/png",
			   "TILED": true
			}
		}        
	},
	"map": {
		"projection": "EPSG:3003",
		"units": "m",
		"center": [1573680,4880596],
		"zoom":5,
		"maxExtent": [
			1489082, 4831755,
			1652992, 4936275
		],
		"layers": [
            {
				"source": "lerici",
                "group": "background",
				"title": "SFONDO",
				"name": "lerici:SFONDO_GS",
				"displayInLayerSwitcher":true,
				"visibility": true
			},
            {
				"source": "lerici",
                "group": "Carta Tecnica",
				"title": "QU CTR 5K",
				"name": "lerici:IG-QU5K_PO",
				"displayInLayerSwitcher":true,
				"visibility": true
			},
            {
				"source": "lerici",
                "group": "Carta Tecnica",
				"title": "CTR_5K",
				"name": "lerici:CTR_5K_nbits",
				"displayInLayerSwitcher":true,
				"visibility": true,
                "tiled": false
			},
            {
				"source": "lerici",
                "group": "Confini",
				"title": "Confini Provinciali",
				"name": "lerici:IG-LP_PO",
				"displayInLayerSwitcher":true,
				"visibility": false
			},
            {
				"source": "lerici",
                "group": "Confini",
				"title": "Confine Comuni Provincia La Spezia",
				"name": "lerici:IG-LCP_PO",
				"displayInLayerSwitcher":true,
				"visibility": false
			},
            {
				"source": "lerici",
                "group": "Confini",
				"title": "Confine Comunale Lerici",
				"name": "lerici:IG-LC_L",
				"displayInLayerSwitcher":true,
				"visibility": true
			}            
		]
	},
	"proj4jsDefs": {
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs"
	},    
    "customPanels":[

    ],	
	"scaleOverlayUnits":{
        "bottomOutUnits":"nmi",    
        "bottomInUnits":"nmi",    
        "topInUnits":"m",    
        "topOutUnits":"km"
    },
	"customTools":[
		{
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
