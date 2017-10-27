Ext.define('TransportArriving.store.CurrentUser', {
	extend : 'Ext.data.Store',

	/*Almacén local para el guardado de sesión */
	config : {
		model : 'TransportArriving.model.CurrentUser',
		autoLoad : false
	}

});