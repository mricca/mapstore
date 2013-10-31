
Ext4.define('GeoBasi.store.BoxPlotChartStore', {
    extend: 'Ext4.data.Store',

    requires: [
        'GeoBasi.model.BoxPlotChartModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'GeoBasi.model.BoxPlotChartModel',
            autoLoad: false,
            autoSync: true/*,
            proxy: {
                type: 'ajax',
				url : '',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }*/
        }, cfg)]);
    }
});
