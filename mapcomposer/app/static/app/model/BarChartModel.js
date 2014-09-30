

Ext4.define('GeoBasi.model.BarChartModel', {
    extend: 'Ext4.data.Model',
    fields: [{
		name: 'uuidelemento', type: 'auto'
		},
		'sigla_el',
		'valore',
		'ossido',
		'uuidanalisi',
		'tipometa',
		'totaleRiprova',
		'tipoMeta',
		'num_classi',
		'ampiezza_classi',
		'sigla',
		'matrice',
		'log',
		'color',
		'viewparams',
		'bbox',
		'spatialFilter',
		'jsonData',
		'classe',
        'dmgeomattipo_descr',
        'startYear',
        'endYear',
        'nullDate', {
            name: 'vectorSelectionArea', type: 'string'
        }
	]
});