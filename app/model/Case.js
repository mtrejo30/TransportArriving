Ext.define('TransportArriving.model.Case', {
	extend: 'Ext.data.Model',

	/* Propiedades de la web api Case */
	config: {
        idProperty: 'int_case',
		fields: [
			{name: 'int_case'},
			{name: 'int_fk_user'},
			{name: 'int_fk_company'},
			{name: 'vch_title'},
			{name: 'int_fk_product'},
			{name: 'stt_capture_date'},
			{name: 'vch_description'},
			{name: 'vch_solution'},
			{name: 'stt_solution_date'}
		],

		proxy: {
			type: 'rest',
			url: TransportArriving.util.Config.getCustomersBaseUri()
		}
	}
});