Ext.define('TransportArriving.model.CurrentUser', {
	extend : 'Ext.data.Model',

	/* Propiedades para el guarado de sesión local */
	config : {
		fields : [
			{name : 'id', type : 'int'},
			{name : 'name', type : 'string'},
			{name : 'int_user', type : 'int'},
			{name : 'loginTime', type : 'int'}
		],

		proxy : {
			type : 'localstorage',
			id : 'simple-login-data'
		}
	}

});