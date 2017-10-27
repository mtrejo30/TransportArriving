Ext.define('TransportArriving.controller.CaseDetail', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			casedetailform: {
                selector: 'casedetail',
                xtype: 'Ext.form.Panel'
            },
            mainPanel: {
                selector: 'mainpanel',
                xtype: 'Ext.Panel'
            },
            data_us: 'casedetail #tbrhomid'
		},
		/* Hacemos referencia de los botones de regresar, eliminar y guardar, asignandoles una función en su evento tap respectivo*/
		control: {
			"casedetail #backbtn": {
				tap: 'OnBackButtonTap'
			},
			"casedetail #deletebtn": {
				tap: 'OnDeleteButtonTap'
			}
		}
	},
	/* Regresa a la vista principal */
	OnBackButtonTap: function(button, e, eOpts){
		var mainPanel = this.getMainPanel();
		Ext.Viewport.setActiveItem(Ext.Viewport.add({xtype: 'mainpanel'}));
	},
	/* Función para eliminar un caso, obtenemos el almacen de los casos, busca a traves de ella con el id de caso, encontrando el indice del almacén, la eliminación se hace en el almacen local y este actualiza los datos de la web api */
	OnDeleteButtonTap: function(button, e, eOpts){
		var mainPanel = this.getMainPanel();
		var casedeta = this.getCasedetailform(),
			values = casedeta.getValues(),
			store = Ext.getStore('Case'),
			record = store.getById(values.int_case),
			recordIndex = store.findExact('int_case', record.data.int_case);
		Ext.Msg.confirm(
			"Delete Case",
			"Are you sure want to delete?",
			function(btn){
				if (btn == 'yes') {
					store.removeAt(recordIndex);
					store.sync();
					Ext.Viewport.setActiveItem(Ext.Viewport.add({xtype: 'mainpanel'}));
					mainPanel.refreshList('Enviado desde: controller.CaseDetail > OnDeleteButtonTap');
				}
			}
		);
	}
});