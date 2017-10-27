Ext.define('TransportArriving.model.Viewcase', {
	extend: 'Ext.data.Model',

	/* Propiedades de la web api Viewcase */
	config: {
        idProperty: 'int_case',
		fields: [
			{name: 'int_case', type: 'int'},
			{name: 'int_user', type: 'int'},
			{name: 'name_co', type: 'string'},
			{name: 'name_em', type: 'string'},
			{name: 'name_pr', type: 'string'},
			{name: 'stt_capture_date', type: 'string'},
			{name: 'stt_solution_date ', type: 'string'},
			{name: 'vch_description', type: 'string'},
			{name: 'vch_lastname', type: 'string'},
			{name: 'vch_second_lastname', type: 'string'},
			{name: 'vch_solution', type: 'string'},
			{name: 'vch_title', type: 'string'}
		],

		proxy: {
			type: 'rest',
			url: 'http://localhost:81/api/view_cases'
		}
	}
});