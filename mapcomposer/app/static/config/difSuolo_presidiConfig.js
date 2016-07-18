{
   "scaleOverlayMode": "advanced",
   "actionToolScale": "medium",
   "tab": true,
   "loadingPanel": {
		"width": 100,
		"height": 100,
		"center": true
	},
   "gsSources":{
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
        "geoserver_ds_reticolo": {
			"ptype": "gxp_wmssource",
			"url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/RETICOLO/ows?",
			"title": "Geoserver Reticolo",
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
        "geoserver_ds_censimento": {
			"ptype": "gxp_wmssource",
			"url": "http://geoportale.lamma.rete.toscana.it/geoserver_ds/CENS_OP_IDRO_V1/ows?",
			"title": "Geoserver Censimento Opere Idrauliche",
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
			"url": "http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsperidr&version=1.3.0&map_resolution=91&map_mnt=alluv&",
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
		},
        "arno_rischio_idrogeo": {
			"ptype": "gxp_wmssource",
			"url": "http://dati.adbarno.it/geoserver/adbarno/wms?",
			"title": "AdB Arno rischio idrogeologico",
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
    "cookieConsent":true,
	"map": {
		"projection": "EPSG:3003",
		"displayProjection": "EPSG:3003",
		"units": "m",
		"fractionalZoom": true,
		"center": [1671579.00, 4803992.00],
		"scales": [50, 1000, 2000, 5000, 8000, 10000, 15000, 25000.1, 50000.1, 100000.1, 250000, 500000, 1000000, 1500000.1, 2000000],
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
                "expanded": true,
                "checked": false,
                "attribution": false
            },
            {
                "source": "geoscopio_topogr",
                "group": "Basi cartografiche",
                "title": "Carta Topografica 50k",
                "maxScale": 15000,
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
                "minScale": 15000,
                "displayInLayerSwitcher": true,
                "visibility": false,
                "tiled": false,
                "attribution": false
            },
            {
                "source": "geoscopio_ctr",
                "group": "Basi cartografiche",
                "title": "CTR 1:10.000 Raster GL",
                "minScale": 15000,
                "name": "rt_ctr.ctr10kgreylight",
                "displayInLayerSwitcher": true,
                "visibility": true,
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
				"source": "geoserver_presidi",
				"group": "Allerta Meteo",
				"title": "Zone di allerta",
				"name": "zone_allerta_meteo_idro",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Toscana Nord",
				"name": "gc_toscana_nord_01_02",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Toscana Sud",
				"name": "gc_toscana_sud_01_02",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Centrale",
				"name": "gc_valdarno_centrale_01_02",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Inf. Costa",
				"name": "gc_valdarno_inf_costa_01_02",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Delimitazione Geni Civili",
				"title": "Valdarno Superiore",
				"name": "gc_valdarno_superiore_01_02",
                "opacity": 0.4,
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio bacini interregionali",
				"name": "rt_peridr.rischio_bacini_interregionali",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio bacini regionali",
				"name": "rt_peridr.rischio_bacini_regionali",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio AdB Serchio",
				"name": "rt_peridr.idrischio.serchio.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "arno_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio AdB Arno per elementi a geometria poligonale",
				"name": "PIANIFICAZIONE.SIT.RISCHIO_200760_POLIG",
                "styles": "rischio_polig",
                "style": "rischio_polig",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "arno_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio AdB Arno per elementi a geometria lineare",
				"name": "PIANIFICAZIONE.SIT.RISCHIO_200760_LINE",
                "styles": "rischio_line2",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "arno_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio AdB Arno per elementi a geometria puntuale",
				"name": "PIANIFICAZIONE.SIT.RISCHIO_200760_POINT",
                "styles": "rischio_point",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Rischio",
				"title": "Rischio AdB Serchio",
				"name": "rt_peridr.idrischio.serchio.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Bacini regionali - pericolosità da alluvione fluviale",
				"name": "rt_peridr.pericolosita_fluviale_bacini_regionali",
                "styles": "default",
                "style": "default",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Bacini regionali - pericolosità da alluvione costiera",
				"name": "rt_peridr.pericolosita_costiera_bacini_regionali",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Bacini interregionali - pericolosità da alluvione fluviale",
				"name": "rt_peridr.pericolosita_fluviale_bacini_interregionali",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Pericolosita AdB Tevere",
				"name": "rt_peridr.idpericolosita.tevere.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoscopio_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Pericolosita AdB Serchio",
				"name": "rt_peridr.idpericolosita.serchio.poly",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "arno_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Pericolosita AdB Arno da alluvione fluviale",
				"name": "PIANIFICAZIONE.SIT.PER200760_FLUVIAL",
                "styles": ["peric200760_peric_pianifi_rt"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "arno_rischio_idrogeo",
				"group": "Direttiva alluvioni - Pericolosità",
				"title": "Pericolosita AdB Arno da alluvione costiera",
				"name": "PIANIFICAZIONE.SIT.PER200760_COAST",
                "styles": ["peric200760_peric_pianifi_rt"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
				"attribution": false
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Reticolo Idrografico RT",
                "expanded": true,
                "checked": false,
				"title": "Reticolo idrografico LR 79/2012 approvato con DCRT 57/2013",
				"name": "reticolo_idrografico",
                "styles": ["reticolo_idrografico_dcrt57_2013"],
                "style": ["reticolo_idrografico_dcrt57_2013"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Reticolo Idrografico RT",
                "expanded": true,
                "checked": false,
				"title": "Reticolo idrografico LR 79/2012 aggiornato con DCRT 9/2015",
				"name": "reticolo_lr79_2012",
                "styles": ["reticolo_idrografico_dcrt9_2015"],
                "style": ["reticolo_idrografico_dcrt9_2015"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Reticolo di Gestione RT",
                "expanded": true,
                "checked": false,
				"title": "Reticolo di gestione LR 79/2012 approvato con DCRT 57/2013",
				"name": "retgest_79_2012",
                "styles": ["reticolo_gestione_dcrt57_2013"],
                "style": ["reticolo_gestione_dcrt57_2013"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds_reticolo",
				"group": "Reticolo di Gestione RT",
                "expanded": true,
                "checked": false,
				"title": "Reticolo di gestione LR 79/2012 aggiornato con DCRT 9/2015",
				"name": "reticolo_lr79_2012",
                "styles": ["reticolo_gestione_dcrt9_2015"],
                "style": ["reticolo_gestione_dcrt9_2015"],
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false,
                "queryPanel": true
			},{
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_ds_censimento",
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
				"source": "geoserver_presidi",
				"group": "Rete di monitoraggio CFR",
				"title": "Idrometri",
				"name": "cfr_monitoraggio072014",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoscopio_amb_ammin",
				"group": "Ambiti amministrativi",
				"title": "Province",
				"name": "rt_ambamm.idprovince.rt.poly",
				"displayInLayerSwitcher": true,
				"visibility": true,
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
			},{
				"source": "geoserver_presidi",
				"group": "Ambiti amministrativi",
				"title": "Distretti Idrografici (forniti AdB Arno)",
				"name": "distretti_gb",
				"displayInLayerSwitcher": true,
				"visibility": false,
				"tiled": false
			},{
				"source": "geoserver_presidi",
				"group": "Ambiti amministrativi",
				"title": "Bacini idrografici ai sensi della 183/89",
				"name": "bacini_idro_183_89",
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
			"actionTarget": {"target": "paneltbar", "index": 23},
			"toggleGroup": "toolGroup"
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
                    "title": "Rete di monitoraggio CFR",
                    "folder": [
                        {"name": "Rete di monitoraggio CFR", "title": "Rete di monitoraggio CFR"}
                    ],
                    "expanded": true,
                    "checked": false
                },{
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
                    "title": "Reticolo di Gestione RT",
                    "folder": [
                        {"name": "Reticolo di Gestione RT", "title": "Reticolo di Gestione RT"}
                    ],
                    "expanded": false,
                    "checked": false
                },
                {
                    "title": "Reticolo Idrografico RT",
                    "folder": [
                        {"name": "Reticolo Idrografico RT", "title": "Reticolo Idrografico RT"}
                    ],
                    "expanded": false,
                    "checked": false
                },
                {
                    "title": "Direttiva alluvioni - Pericolosità",
                    "folder": [
                        {"name": "Direttiva alluvioni - Pericolosità", "title": "Direttiva alluvioni - Pericolosità"}
                    ],
                    "expanded": false,
                    "checked": false
                },
                {
                    "title": "Direttiva alluvioni - Rischio",
                    "folder": [
                        {"name": "Direttiva alluvioni - Rischio", "title": "Direttiva alluvioni - Rischio"}
                    ],
                    "expanded": false,
                    "checked": false
                },
                {
                    "title": "Delimitazione Geni Civili",
                    "folder": [
                        {"name": "Delimitazione Geni Civili", "title": "Delimitazione Geni Civili"}
                    ],
                    "expanded": false,
                    "checked": false
                },
                {
                    "title": "Allerta Meteo",
                    "folder": [
                        {"name": "Allerta Meteo", "title": "Allerta Meteo"}
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
