Ext.define('TransportArriving.model.Product', {
	extend: 'Ext.data.Model',
	alias: 'model.Product', //
	config: {
		idProperty: 'int_product',
		fields: [
			{name: 'int_product'},
			{name: 'vch_name'}
		]
	}
});