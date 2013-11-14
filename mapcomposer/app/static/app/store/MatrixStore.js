

Ext4.define('GeoBasi.store.MatrixStore', {
    extend: 'Ext4.data.Store',

    requires: [
        'GeoBasi.model.MatrixModel'
    ],

    constructor: function(cfg) {
        var me = this;
        //Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);        
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'GeoBasi.model.MatrixModel',
            autoLoad: false,
            autoSync: true
        }, cfg)]);
    }
});