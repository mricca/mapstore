

Ext4.define('GeoBasi.store.BarChartStore', {
    extend: 'Ext4.data.Store',

    requires: [
        'GeoBasi.model.BarChartModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'GeoBasi.model.BarChartModel',
            autoLoad: false,
            autoSync: true
        }, cfg)]);
    }
});