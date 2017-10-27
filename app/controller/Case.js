Ext.define('TransportArriving.controller.Case', {
	extend: 'Ext.app.Controller',
	config: {
		/* Se hace referencia a las vistas caseadd y mainpanel*/
		refs: {
			addCase: 'caseadd',
			mainPanel: 'mainpanel'
		},
		/* Se hace referencia a los botones de backid y saveid de la vista de caseadd*/
		control: {
			"caseadd #backid": {
				tap: 'onBackBtnTap'
			},
			"caseadd #saveid": {
				tap: 'onSaveBtnTap'
			}
		}
	},
	//Regresa a la pagina principal
	onBackBtnTap: function(button, e, eOpts){
		Ext.Viewport.setActiveItem(Ext.Viewport.add({xtype: 'mainpanel'}));
	},
	//Funcion que guarda un registro caso
	//Obtenemos los valores del formulario contenido en el objeto addCase
	//Obtenemos el almacen de Case
	//Se guarda los valores con el metodo add y actualizamos el almacen
	//Regresa a la vista principal
	onSaveBtnTap: function(button, e, eOpts){		
		var addCase = this.getAddCase(),
			values = addCase.getValues(),
			store = Ext.getStore('Case');
		store.add(values);
		store.sync();
		this.getMainPanel().refreshList('Enviado desde: controller.Case > onSaveBtnTap');
		Ext.Viewport.setActiveItem(Ext.Viewport.add({xtype: 'mainpanel'}));
	}
});