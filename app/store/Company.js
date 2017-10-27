Ext.define('TransportArriving.store.Company', {
	extend: 'Ext.data.Store',
	config: {
		model: 'TransportArriving.model.Company',
		storeId: 'Company',
		autoLoad : true,
		proxy: {
			type: 'rest',
			url: 'http://localhost:81/api/tbl_company'
		}
	}
});