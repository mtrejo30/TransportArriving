Ext.define('TransportArriving.store.Product', {
	extend: 'Ext.data.Store',
	alias: 'store.Product',
	requires: [
		'TransportArriving.model.Product'
	],
	config: {
		model: 'TransportArriving.model.Product',
		storeId: 'Product',
		autoLoad : true,
		proxy: {
			type: 'rest',
			url: 'http://localhost:81/api/tbl_product'
		}
	}
});