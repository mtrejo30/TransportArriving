Ext.define('TransportArriving.store.Case', {
	extend: 'Ext.data.Store',

	/* Almacén para el módelo case */
	requires: [
		'TransportArriving.model.Case'
	],

	/* Se especifica el modelo a usar, definir un id para el store */
	/* Propiedades básicos: 
	       - model: Módelo del cual se alimenta este almacén
	       - storeId: Identificar con el cual se accede desde el controller
	       - autoLoad: Actualiza el almacén cuando haya algún cambio
	       - proxy: se define la url de la fuente de datos:
	           - type: tipo de proxy
	           - url: url de la api que consume
	*/
	config: {
		model: 'TransportArriving.model.Case',
		storeId: 'Case',
		autoLoad : true,
		proxy: {
			type: 'rest',
			url: 'http://localhost:81/api/tbl_case'
		}
	}

});