{
   "header": {
	   "html": ["<div align='center' style='background-color:#02004B;background-position:right center;background-image:url(theme/app/img/banner/Header_geoportale_solo_img.jpg);background-repeat: no-repeat;width:100%;height:100%'></div>"],
	   "container": {
			"border": false,
			"header": false,
			"collapsible": true,
			"collapseMode": "mini",
            "collapsed": true,
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
            "version":"1.1.1",
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
                "group": "Base",
				"title": "Limites Zonas D5",
				"name": "SALVADOR:limites_zonas_d5",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Base",
				"title": "Limites Zonas D6",
				"name": "SALVADOR:limites_zonas_d6",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Base",
				"title": "Parcelario D5",
				"name": "SALVADOR:parcelario_d5",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Base",
				"title": "Parcelario D6",
				"name": "SALVADOR:parcelario_d6",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Base",
				"title": "Ejes Viales",
				"name": "SALVADOR:ejes_viales",
				"displayInLayerSwitcher":true,
				"visibility": true
			},{
				"source": "salvador",
                "group": "Base",
				"title": "Rios San Salvador",
				"name": "SALVADOR:rios_san_salvador",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Comunidad Ubication",
				"title": "Comunidad Ubication",
				"name": "SALVADOR:comunidad_ubicacion",
				"displayInLayerSwitcher":true,
				"visibility": false
			},{
				"source": "salvador",
                "group": "Comunidad Ubication",
				"title": "Comunidad Directivos",
				"name": "SALVADOR:comunidad_directivos",
				"displayInLayerSwitcher":true,
				"visibility": false
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
	          "title": "Query Panel",         
	          "border": false,
	          "id": "east",
	          "width": 400,
	          "height": 500,
	          "region": "east",
	          "layout": "fit",
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
    "removeTools": [
        "gxp_wmsgetfeatureinfo_menu"
    ],    
	"customTools":[{
           "ptype": "gxp_wpsmanager",
           "id": "wpsManager",
           "url": "http://localhost:8080/geoserver/wps",
           "geostoreUrl": "http://localhost:8080/geostore/rest",
           "geostoreUser": "admin",
           "geostorePassword": "admin",
           "geostoreProxy": "/http_proxy/proxy?url="
        }, {
			"ptype": "gxp_embedmapdialog",
			"actionTarget": {"target": "paneltbar", "index": 2},
			"embeddedTemplateName": "viewer",
			"showDirectURL": true
		}, {
			"ptype": "gxp_categoryinitializer",
            "silentErrors": true
		}, {
            "ptype": "gxp_wmsgetfeatureinfo",
            "id": "wmsgetfeatureinfo_plugin",
            "toggleGroup": "toolGroup",
            "closePrevious": true,
            "useTabPanel": true,
            "infoPanelId": "",
            "disableAfterClick": false,
            "loadingMask": true,
            "maxFeatures": 100,
            "actionTarget": {
                "target": "paneltbar",
                "index": 21
            }
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
		}, {
		  "ptype": "gxp_featuremanager",
		  "id": "featuremanager",
          "paging": true,
          "pagingType": 1,
          "autoLoadFeatures": false,
          "maxFeatures": 10
	    }, {
		  "ptype": "gxp_featuregrid",
		  "featureManager": "featuremanager",
          "layout": "form",
		  "outputConfig": {
			  "id": "featuregrid",
			  "title": "Features",
              "height": 240,
              "loadMask": true
		  },
		  "outputTarget": "south",
			"exportFormats": ["CSV","shape-zip","excel", "excel2007"],
			"exportAction": "window",
			"showNumberOfRecords": true
	    }, {
		  "ptype": "gxp_spatialqueryform",
		  "featureManager": "featuremanager",
		  "featureGridContainer": "south",
		  "outputTarget": "east",
		  "showSelectionSummary": true,
		  "actions": null,
		  "id": "bboxquery",
          "filterLayer": false,
          "autoComplete": {
            "sources": ["salvador"],
            "url": "http://localhost:8080/geoserver/wps",
            "pageSize": 10
          },
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
		            "xtype": "gxp_spatial_buffer_selector",
					"bufferOptions": {
						"minValue": 1,
						"maxValue": 10000,
						"decimalPrecision": 2
					}
		        },
		        "circle":{
		            "xtype": "gxp_spatial_circle_selector",
		            "zoomToCurrentExtent": true
		        },
		        "polygon":{
		            "xtype": "gxp_spatial_polygon_selector"
		        },
		        "geocoder":{
		            "xtype": "gxp_spatial_geocoding_selector",
		            "multipleSelection": false,
		            "wfsBaseURL": "http://localhost:8080/geoserver/wfs?",
		            "geocoderTypeName": "salvador:comunidad_equipamiento_p",
		            "geocoderTypeRecordModel":[
		                {
		                    "name":"id",
		                    "mapping":"id_comunidad_equipamiento"
		                },
		                {
		                    "name":"nombre",
		                    "mapping":"properties.nombre"
		                },
		                {
		                    "name":"usuario",
		                    "mapping":"properties.usuario"
		                },
		                {
		                    "name":"geometry",
		                    "mapping":"geometry"
		                }
		            ],
		            "geocoderTypeSortBy":null,
		            "geocoderTypeQueriableAttributes":[
		                "nombre", "usuario"
		            ],
		            "spatialOutputCRS": "EPSG:4326",
		            "geocoderTypePageSize": 10,
		            "zoomToCurrentExtent": false
		        }
	      }
    	},{
            "ptype":"gxp_print",
            "customParams":{
                "outputFilename":"mapstore-print"
            },
            "ignoreLayers": "Google Hybrid,Bing Aerial,Google Terrain,Google Roadmap,Marker,GeoRefMarker",
            "printService":"http://localhost:8080/geoserver/pdf/",
            "legendPanelId":"legendPanel",
            "actionTarget":{
                "target":"paneltbar",
                "index":4
            },
            "addLandscapeControl": true,
            "appendLegendOptions": true,
            "addGraticuleControl": true
        }
	]
}
