{
   "scaleOverlayMode": "advanced",
   "actionToolScale": "medium",      
   "tab": true,
   "gsSources":{
   		"geoserver_ds": {
			"ptype": "gxp_wmssource",
			"url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/CENS_OP_IDRO_V1/ows?",
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
				"TILED":false
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
		},
        "geoscopio_rischio_idrogeo": {
			"ptype": "gxp_wmssource",
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsperidr&",
			"title": "Geoscopio rischio idrogeologico",
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
	"map": {
		"projection": "EPSG:3003",
		"displayProjection": "EPSG:3003",
		"units": "m",
		"fractionalZoom": true,
		"center": [1671579.00, 4803992.00],
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
                "visibility": true,
                "tiled": false,
                "attribution": false
            },{
				"source": "geoscopio_idrografia",
				"group": "Idrografia",
				"title": "Corsi d'acqua",
				"name": "rt_idrogr.corsi.rt.line",
				"displayInLayerSwitcher": true,
				"visibility": true,
				"tiled": false,
                "attribution": false
			},{
				"source": "geoserver_ds",
				"group": "Reticolo",
				"title": "RD 523/1904",
				"name": "ret_opere_v1",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2' or ci523_1904 = '2D' or ci523_1904 = '2S' or ci523_1904 = '3D-2S' or ci523_1904 = '2D-3S' or ci523_1904 = '3' or ci523_1904 = '3D' or ci523_1904 = '3S' or ci523_1904 = '4' or ci523_1904 = '4D' or ci523_1904 = '4S' or ci523_1904 = '4D-3S' or ci523_1904 = '3D-4S'"
                },                   
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": true,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.A",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                
                "expanded": true,
                "checked": true,
				"title": "Invaso",
				"name": "invaso_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Argine",
				"name": "argine_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa si sponda",
				"name": "difesa_sponda_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Briglie",
				"name": "briglie_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cateratta",
				"name": "cateratta_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cunettone",
				"name": "cunettone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Opere di presa",
				"name": "opera_presa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Pennello",
				"name": "pennello_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sifone",
				"name": "sifone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Soglia",
				"name": "soglia_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate II cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '2'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Traversa",
				"name": "traversa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.A",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                
                "expanded": true,
                "checked": true,
				"title": "Invaso",
				"name": "invaso_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.A",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Casse espansione",
				"name": "cassa_espansione_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Argine",
				"name": "argine_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Attraversamento",
				"name": "attraversamento_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Canale artificiale",
				"name": "canale_artificiale_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa si sponda",
				"name": "difesa_sponda_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Briglie",
				"name": "briglie_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Casello idraulico",
				"name": "casello_idraulico_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cateratta",
				"name": "cateratta_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cunettone",
				"name": "cunettone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa di sponda",
				"name": "difesa_sponda_p_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Idrovoro",
				"name": "idrovoro_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Opere di presa",
				"name": "opera_presa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Pennello",
				"name": "pennello_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Rampa",
				"name": "rampa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sfioratore",
				"name": "sfioratore_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sifone",
				"name": "sifone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Soglia",
				"name": "soglia_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate III cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '3'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Traversa",
				"name": "traversa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Argine",
				"name": "argine_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa si sponda",
				"name": "difesa_sponda_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Briglie",
				"name": "briglie_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cunettone",
				"name": "cunettone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Opere di presa",
				"name": "opera_presa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sifone",
				"name": "sifone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Soglia",
				"name": "soglia_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Classificate IV / V cat.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = '4'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Traversa",
				"name": "traversa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.A",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Casse espansione",
				"name": "cassa_espansione_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Argine",
				"name": "argine_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Attraversamento",
				"name": "attraversamento_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Canale artificiale",
				"name": "canale_artificiale_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.L",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa si sponda",
				"name": "difesa_sponda_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Briglie",
				"name": "briglie_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Casello idraulico",
				"name": "casello_idraulico_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cateratta",
				"name": "cateratta_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Cunettone",
				"name": "cunettone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Difesa di sponda",
				"name": "difesa_sponda_p_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Idrovoro",
				"name": "idrovoro_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Opere di presa",
				"name": "opera_presa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Pennello",
				"name": "pennello_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Rampa",
				"name": "rampa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sfioratore",
				"name": "sfioratore_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Sifone",
				"name": "sifone_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Soglia",
				"name": "soglia_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds",
				"group": "Opere Non Classificate.P",
                "vendorParams":{
                    "cql_filter": "ci523_1904 = 'NC'"
                },                  
                "expanded": true,
                "checked": true,
				"title": "Traversa",
				"name": "traversa_v1",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Province",
				"name": "rt_ambamm.idprovince.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
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
		"EPSG:3003": "+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +units=m +no_defs +towgs84 = -104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
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
	"customTools": [{
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
		}, {
            "ptype": "gxp_about",
            "poweredbyURL": "http://www.geo-solutions.it/about/contacts/",
            "actionTarget": {
                "target": "panelbbar",
                "index": 1
            }
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
          "filterLayer": true,
          "autoComplete": {
            "sources": ["geoserver_ds"],
            "url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/wps",
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
                    "title": "<span style=\"color:#FF0000;font-weight: bold;\">Opere Classificate II cat. - Censimento Febbraio 2015</span>",
                    "children": [
                        {"name": "Opere Classificate II cat.P", "title": "Opere Puntuali"},
                        {"name": "Opere Classificate II cat.L", "title": "Opere Lineari"},
                        {"name": "Opere Classificate II cat.A", "title": "Opere Areali"}
                    ],
                    "expanded": false,
                    "checked": false
                },           
                {
                    "title": "<span style=\"color:#008000;font-weight: bold;\">Opere Classificate III cat. - Censimento Febbraio 2015</span>",
                    "children": [
                        {"name": "Opere Classificate III cat.P", "title": "Opere Puntuali"},
                        {"name": "Opere Classificate III cat.L", "title": "Opere Lineari"},
                        {"name": "Opere Classificate III cat.A", "title": "Opere Areali"}
                    ],
                    "expanded": false,
                    "checked": false
                },                        
                {
                    "title": "<span style=\"color:#FF00FF;font-weight: bold;\">Opere Classificate IV / V cat. - Censimento Febbraio 2015</span>",
                    "children": [
                        {"name": "Opere Classificate IV / V cat.P", "title": "Opere Puntuali"},
                        {"name": "Opere Classificate IV / V cat.L", "title": "Opere Lineari"}
                    ],
                    "expanded": false,
                    "checked": false
                },                      
                {
                    "title": "<span style=\"color:#969696;font-weight: bold;\">Opere Non Classificate - Censimento Febbraio 2015</span>",
                    "children": [
                        {"name": "Opere Non Classificate.P", "title": "Opere Puntuali"},
                        {"name": "Opere Non Classificate.L", "title": "Opere Lineari"},
                        {"name": "Opere Non Classificate.A", "title": "Opere Areali"}
                    ],
                    "expanded": false,
                    "checked": false
                },                         
                {
                    "title": "Reticolo",
                    "folder": [
                        {"name": "Reticolo", "title": "Reticolo"}
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
                    "title": "Toponimi",
                    "folder": [
                        {"name": "Toponimi", "title": "Toponimi"}
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
        }
	]
}