Ext.define('TransportArriving.store.Viewcase', {
	extend : 'Ext.data.Store',
	alias : 'store.viewcase',

	/* Almacén para el módelo  Viewcase */

	requires : [
		'TransportArriving.model.Viewcase'
	],

	config : {
		model : 'TransportArriving.model.Viewcase',
		storeId: 'Viewcase',
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'http://localhost:81/api/view_cases'
		}
	}

});