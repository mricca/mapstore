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
        "geoscopio_topogr": {
            "ptype": "gxp_wmssource",
            "url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmstopogr&version=1.3.0&map_resolution=91&map_mnt=cartoteca&",
            "title": "Geoscopio BASI TOPOGRAFICHE",
            "srs": "EPSG:3003",
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
            "srs": "EPSG:3003",
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
           "geoscopio_idrografia": {
            "ptype": "gxp_wmssource",
            "url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsidrogr&map_resolution=91&language=ita&",
            "title": "Geoscopio idrografia",
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
			697079.00,4989607.00,1730654.00,5717614.00
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
                "opacity": 5,
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Aree Urbane",
				"title": "Aree Urbane",
				"name": "inters_comp_buffer",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": false
			},{
				"source": "geoserver_ds_gwc",
				"group": "Reticolo di gestione",
				"title": "Reticolo di gestione",
				"name": "RETICOLO:ret_gest_manu_2016",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Manutenzione 2016",
				"title": "Manutenzione straordinaria 3 categoria",
				"name": "RETICOLO:manu_stra_2016_3_cat",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Manutenzione 2016",
				"title": "Manutenzione puntuale e vigilanza 2016",
				"name": "RETICOLO:manu_punt_vig_2016",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Manutenzione 2016",
				"title": "Manutenzione ordinaria 2016",
				"name": "RETICOLO:manu_ord_2016",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds_gwc",
				"group": "Manutenzione 2016",
				"title": "Manutenzione ordinaria 2016 tratti principali (2° categoria)",
				"name": "RETICOLO:manu_ord_princ_2016_2_cat",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},
            {
                "source": "geoscopio_topogr",
                "group": "Basi cartografiche",
                "title": "Carta Topografica 50k",
                "maxScale": 15000,
                "name": "rt_topogr.topografica50k.grey.rt",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": true,
                "attribution": false
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
            },
            {
                "source": "geoscopio_ctr",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster GL",
                "minScale": 15000,
                "name": "rt_ctr.ctr10kgreylight",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": true,
                "attribution": false
            },
            {
                "source": "geoscopio_ambcens",
                "group": "Toponimi",
                "title": "Toponimi - Centri e nuclei 2011",
                "name": "rt_amb_cens.centri_nuclei_2011",
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
                "tiled": true,
                "attribution": false
            },{
                "source": "geoscopio_amb_ammin",
                "group": "Ambiti amministrativi",
                "title": "Comuni",
                "name": "rt_ambamm.idcomuni.rt.poly",
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": true,
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
    "customPanels":[
	      {
	          "xtype": "panel",
	          "title": "Risultati Ricerche",      
	          "border": false,
              "collapsedonfull": true,
	          "id": "south",
	          "region": "south",
	          "layout": "fit",
	          "height": 330,
	          "collapsed": true,
	          "collapsible": true,
	          "header": true
	      },{
	          "xtype": "panel",
	          "title": "Pannello Ricerche",         
	          "border": false,
	          "id": "east",
	          "width": 400,
	          "height": 500,
	          "region": "east",
	          "layout": "fit",
	          "collapsed": true,
	          "collapsible": true,
	          "header": true,
              "collapsedonfull": true
	      }
    ],	
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
              "loadMask": true,
              "featureMaxZoomLevel": 15
		  },
		  "outputTarget": "south",
		  "showNumberOfRecords": true
	    }, {
		  "ptype": "gxp_spatialqueryform",
		  "featureManager": "featuremanager",
		  "featureGridContainer": "south",
		  "outputTarget": "east",
		  "showSelectionSummary": true,
		  "actions": null,
		  "id": "bboxquery",
          "spatialSelectorFieldsetCollapsedFirst": true,    
          "spatialSelectorFieldsetHidden": true,    
          "spatialSelectorFieldsetCheckboxToggle": false,        
          "attributeFieldsetCollapsedFirst": false,        
          "attributeFieldsetHidden": false,      
          "attributeFieldsetCheckboxToggle": false,    
          "filterLayer": false,
          "autoComplete": {
            "sources": ["geoserver_ds_gwc"],
            "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/RETICOLO/wps",
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
		        }
	      }
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
                    "title": "Manutenzione 2016",
                    "folder": [
                        {"name": "Manutenzione 2016", "title": "Manutenzione 2016"}
                    ],
                    "expanded": true,
                    "checked": true
                },
                {
                    "title": "Reticolo di gestione",
                    "folder": [
                        {"name": "Reticolo di gestione", "title": "Reticolo di gestione"}
                    ],
                    "expanded": true,
                    "checked": true
                },
                {
                    "title": "Aree Urbane",
                    "folder": [
                        {"name": "Aree Urbane", "title": "Aree Urbane"}
                    ],
                    "expanded": true,
                    "checked": true
                },
                {
                    "title": "Comprensori di bonifica",
                    "folder": [
                        {"name": "Comprensori di bonifica", "title": "Comprensori di bonifica"}
                    ],
                    "expanded": true,
                    "checked": true
                },
                {
                    "title": "Toponimi",
                    "folder": [
                        {"name": "Toponimi", "title": "Toponimi"}
                    ],
                    "expanded": true,
                    "checked": true
                },
                {
                    "title": "Basi cartografiche",
                    "folder": [
                        {"name": "Basi cartografiche", "title": "Basi cartografiche"}
                    ],
                    "expanded": true,
                    "checked": true
                }, {
                    "title": "Ortofotocarte 1:10.000",
                    "folder": [
                        {"name": "Ortofotocarte 1:10.000", "title": "Ortofotocarte 1:10.000"}
                    ],
                    "expanded": false,
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
