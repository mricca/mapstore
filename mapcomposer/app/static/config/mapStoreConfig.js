{
   "header": {
	   "html": ["<div align='center' style='background-color:#02004B;background-position:right center;background-image:url(theme/app/img/banner/Header_geoportale_solo_img.jpg);background-repeat: no-repeat;width:100%;height:100%'></div>"],
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
   "scaleOverlayMode": "advanced",
   "gsSources":{
		"salvador":{
			"ptype": "gxp_wmssource",
			"title": "Salvador GeoServer",
			"projection":"EPSG:900913",
			"url": "http://localhost:8080/geoserver/ows",
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
		"center": [-9930966.24797, 1539441.86367],
		"zoom":12,
		"maxExtent": [
			-20037508.34, -20037508.34,
			20037508.34, 20037508.34
		],
		"layers": [
            {
				"source": "ol",
				"group": "background",
				"fixed": true,
				"type": "OpenLayers.Layer",
				"visibility": false,
				"args": [
					"None", {"visibility": false}
				]
                
            },{
				"source": "mapquest",
				"title": "MapQuest OpenStreetMap",
				"name": "osm",
				"group": "background"
			},{
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
				"source": "salvador",
                "group": "Limites",
				"title": "Municipalidades",
				"name": "salvador:munA_Lambert_NAD27",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Limites",
				"title": "Departamentos",
				"name": "salvador:dptoA_Lambert_NAD27",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Parcelario",
				"title": "parcelario_d5",
				"name": "salvador:parcelario_d5",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Parcelario",
				"title": "parcelario_d6",
				"name": "salvador:parcelario_d6",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Comunidad",
				"title": "comunidad_equipamiento_p",
				"name": "salvador:comunidad_equipamiento_p",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Comunidad",
				"title": "comunidad_proyecto_necesidades_p",
				"name": "salvador:comunidad_proyecto_necesidades_p",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Comunidad",
				"title": "comunidad_ubicacion_p",
				"name": "salvador:comunidad_ubicacion_p",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Comunidad",
				"title": "comunidad_vias_accesso_p",
				"name": "salvador:comunidad_vias_accesso_p",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Comunidad",
				"title": "comunidad_vias_internas_p",
				"name": "salvador:comunidad_vias_internas_p",
				"displayInLayerSwitcher":true,
				"visibility": true
			}
		]
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
			"ptype": "gxp_categoryinitializer",
            "silentErrors": true
		}, {
		   "ptype": "gxp_mouseposition",
		   "displayProjectionCode":"EPSG:4326",
		   "customCss": "font-weight: bold; text-shadow: 1px 0px 0px #FAFAFA, 1px 1px 0px #FAFAFA, 0px 1px 0px #FAFAFA,-1px 1px 0px #FAFAFA, -1px 0px 0px #FAFAFA, -1px -1px 0px #FAFAFA, 0px -1px 0px #FAFAFA, 1px -1px 0px #FAFAFA, 1px 4px 5px #aeaeae;color:#050505 "
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
        }, {
			"ptype": "gxp_languageselector",
			"actionTarget": {"target": "panelbbar", "index": 3}
		}
	]
}
