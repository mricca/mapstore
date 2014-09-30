							
Ext4.define('GeoBasi.model.BoxPlotChartModel', {
    extend: 'Ext4.data.Model',
    fields : [{ 
     name: 'experiment', type: 'string'
    }, {
     name: 'min', type: 'float'
    }, {
     name: 'q1', type: 'float'
    }, {
     name: 'med', type: 'float'
    }, {
     name: 'q2', type: 'float'
    }, {
     name: 'max', type: 'float'
    }, {
     name: 'outlier', type: 'auto'
    }, {
     name: 'median', type: 'float'
    }, {
     name: 'sigla', type: 'string'
    }, {
     name: 'totaleRiprova', type: 'float'
    }, {
     name: 'matrice', type: 'string'
    }, {
     name: 'dmgeomattipo_descr', type: 'string'
    }, {
     name: 'startYear', type: 'string'
    }, {
     name: 'endYear', type: 'string'
    }, {
     name: 'nullDate', type: 'string'
    }, {
     name: 'vectorSelectionArea', type: 'string'
    }, {
     name: 'log', type: 'string'
    }, {
     name: 'bbox', type: 'auto'
    }]
});