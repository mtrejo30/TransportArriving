Ext.define('TransportArriving.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
		stores: ['Viewcase'],
		models: ['Viewcase'],
		refs: {
		},
		/* Referencia a la vista mainpanel en el campo con id: searchfield, se le agregan funciones a los eventos keyup y clearicontap */
		control: {
			'mainpanel #searchfield': {
				keyup: 'OnSearchFieldKeyup',
				clearicontap : 'OnSearchFieldClear'
			}
		}
	},
	//Función para la búsqueda de casos mediante el valor del campo: searchfield
	//Se obtiene el almacen de Viewcase, se limpia en caso de que se haya usado en algún filtrado
	//Uso de expresiones regulares para 'caso no sensible a mayusculas'
	//Dentro del almacen hace el filtrado por registro
	//Compara la expresión regular con cada columna de record especificando el campo que queremos comparar
	OnSearchFieldKeyup: function(field){
		var queryString = field.getValue();
		var store = Ext.getStore('Viewcase');
		store.clearFilter();
		if(queryString){
			var thisRegEx = new RegExp(queryString, "i");
			store.filterBy(function(record) {
				if (thisRegEx.test(record.get('vch_title')) || thisRegEx.test(record.get('stt_capture_date')) || thisRegEx.test(record.get('name_pr')) ) {
					return true;
				};
				return false;
			});
		}
	},
	//Función que limpia el almacen de todo filtro usado
	OnSearchFieldClear: function(field){
		var store = Ext.getStore('Viewcase');
		store.clearFilter();
	}
});