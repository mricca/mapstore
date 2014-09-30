{
   "header": {
	   "html": ["<div align='center' style='background-image:url(theme/app/img/banner/bgimg1.jpg);background-repeat: repeat;width:100%;height:100%'><a target='_blank'><img src='theme/app/img/banner/geobasi_titolo.png' style='float:left;position:absolute;top:10px;left:20px;z-index: 10'/></a><img src='theme/app/img/banner/header_geobasi_Loghi_fin3.png' style='float:right;position:absolute;top:0px;right:0px;'/></div>"],
	   "container": {
			"border": false,
			"header": false,
			"collapsible": true,
			"collapseMode":  "mini",
			"hideCollapseTool": true,
			"split": true,
			"animCollapse": false,
			"minHeight": 100,
			"maxHeight": 100,
			"height": 100
	   }
   },
   "scaleOverlayMode": "advanced",
   "tab": false,
   "gsSources":{
   		"geobasi": {
			"ptype": "gxp_wmssource",
			"url": "http://159.213.57.108/geoserver/ows",
			"title": "Geobasi",
			"SRS": "EPSG:3003",
			"version":"1.1.1",
			"layersCachedExtent": [
				1547065, 4677785,
				1803065, 4933785
			],				
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
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc",
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
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsctr",
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
			"url": "http://web.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsidrogr&map_resolution=91&language=ita&",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsambamm&",
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
		"restrictedExtent": [
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
				"attribution": false
			},{
				"source": "geoscopio",
				"group": "background",
				"title": "Basi di sfondo",
				"name": "rt_sfondo.hills",
				"displayInLayerSwitcher": false,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio",
				"group": "background",
				"title": "Basi di sfondo",
				"name": "rt_sfondo.intorno_toscana",
				"displayInLayerSwitcher": false,
				"visibility": true,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 2010 col - AGEA",
				"name": "rt_ofc.10k10",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 2007 col - CGR",
				"name": "rt_ofc.10k07",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 1996 bn - AIMA",
				"name": "rt_ofc.10k96",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 1988 bn - RT",
				"name": "rt_ofc.10k88",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 1978 bn - RT",
				"name": "rt_ofc.10k78",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ortofoto",
				"group": "Ortofotocarte 1:10.000",
				"title": "Anno 1954 bn - RT-IGM",
				"name": "rt_ofc.10k54",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ctr",
				"group": "Basi cartografiche",
				"title": "CTR 1:10.000 Raster BW",
				"name": "rt_ctr.10k",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_ctr",
				"group": "Basi cartografiche",
				"title": "CTR 1:10.000 Raster GL",
				"name": "rt_ctr.ctr10kgreylight",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geobasi",
				"group": "Corpi idrici sotterranei",
				"title": "In roccia",
				"name": "geobasi:cis_roccia",
				"displayInLayerSwitcher": true,
				"opacity": 1.0,
				"visibility": false
			},{
				"source": "geobasi",
				"group": "Corpi idrici sotterranei",
				"title": "Alluvionali",
				"name": "geobasi:cis_alluvioni",
				"displayInLayerSwitcher": true,
				"opacity": 1.0,
				"visibility": false
			},{
				"source": "geobasi",
				"group": "Idrografia",
				"title": "Sottobacini corpi idrici superficiali",
				"name": "geobasi:ci_rwtw_bacini",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geobasi",
				"group": "Idrografia",
				"title": "Corpi idrici superficiali",
				"name": "geobasi:ci_rwtw",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geobasi",
				"group": "Idrografia",
				"title": "Bacini di primo ordine",
				"name": "geobasi:bacini_idro",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geoscopio_idrografia",
				"group": "Idrografia",
				"title": "Corsi d'acqua",
				"name": "rt_idrogr.corsi.rt.line",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false
			},{
				"source": "geobasi",
				"group": "Geobasi",
				"title": "Stream Sediment",
				"name": "geobasi:geobasi_sedimenti",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geobasi",
				"group": "Geobasi",
				"title": "Acque",
				"name": "geobasi:geobasi_acque",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Province",
				"name": "rt_ambamm.idprovince.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Comuni",
				"name": "rt_ambamm.idcomuni.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			}
		]
	},
	"customPanels":[
      {
			"xtype": "panel",
			"border": false,
			"split": true,
			"id": "west",
			"border":false,
			"region":"west",
			"layout":"fit",
            "collapsible": true,
            "collapseMode": "mini",
			"enableTabScroll" : true,
            "header": true,
			"width": 340
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
	"customTools": [{
			"ptype": "gxp_layerproperties",
			"id": "layerproperties_plugin",
			"geobasiChart": true,
			"actionTarget": ["tree.tbar", "layertree.contextMenu"]
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
                "index":20
            }
        }, {
			"ptype": "gxp_embedmapdialog",
			"actionTarget": {"target": "paneltbar", "index": 2},
			"embeddedTemplateName": "viewer",
			"showDirectURL": true
		}, {
			"ptype": "gxp_categoryinitializer",
            "silentErrors": true
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
		},{
		  "ptype":"gxp_maingeobasi",
		  "outputConfig":{
			 "id":"westTab",
			 "region":"west",
			 "startTab":"geobasidata"
		  },
		  "outputTarget":"west"
	   },{
		  "ptype":"gxp_geobasidata",
		  "id":"geobasidataToolId",
          "dataUrl":"http://159.213.57.108/geoserver/ows",
		  "rangesUrl": "http://159.213.57.108/geoserver/geobasi/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=geobasi:geobasi_data_analisi&proprtyName='min,max'outputFormat=json",
		  "highChartExportUrl" :"http://84.33.2.75/highcharts-export/",
		  "outputConfig":{
			 "itemId":"geobasidata",
			 "outputSRS": "EPSG:3003",
			 "geodesic": false,
			 "bufferOptions":{
				"minValue": 0,
				"maxValue":100000,
				"decimalPrecision":2
			 }
		  },
		  "outputTarget":"westTab"
	   },{
		  "ptype":"gxp_geobasiinfo",
		  "id":"geobasiinfoToolId",
		  "outputTarget":"westTab"
	   },{
		  "ptype":"gxp_wfsrtsearch",
		  "id":"wfsrtsearch",
		  "outputConfig":{
			 "itemId":"wfsrtsearchID"
		  },
		  "outputTarget":"east"
	   }
	]
}
