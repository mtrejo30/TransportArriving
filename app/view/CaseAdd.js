Ext.define('TransportArriving.view.CaseAdd', {
	extend: 'Ext.form.Panel',
	alias: 'widget.caseadd',
	xtype : 'caseadd',
	
    /* Se específica los componentes de la vista a usar*/
	requires: [
		'Ext.field.Hidden',
		'Ext.TitleBar',
		'Ext.field.Select'
	],
	/* Se especifica el tipo de almacén Case, con un diseño de vista Vertical: vbox */
	config: {
		store: 'Case',
		layout: {
			type: 'vbox'
		},
		/* Barra de título con un botón para regresar a la vista principal */
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Add Case',
				items: [
					{
						xtype: 'button',
						action: 'back',
						itemId: 'backid',
						ui: 'back',
                        iconCls: 'arrow_left', 
                        iconMask: true
					}
				]
			},
			/* Barra de herramientas situado en la parte inferior con un botón para el guardado de datos */
			{
				xtype: 'toolbar',
				docked: 'bottom',
				items: [
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						action: 'case-save',
						itemId: 'saveid',
						ui: 'confirm',
						iconAlign: 'right',
						text: 'Add'
					}
				]
			},
			/* Conjunto de campos para el llenado de los casos */
			{
				xtype: 'fieldset',
				itemId: 'newcaseid',
				title: 'New Case',
				/* Especificación de campos */
				items: [
					{
						xtype: 'textfield',
						label: 'User',
						name: 'int_fk_user',
						itemId: 'int_fk_user'
					},/*
					{
						xtype: 'textfield',
						label: 'Company',
						name: 'int_fk_company',
						placeHolder: 'Number'
					},*/
					{
						xtype: 'selectfield',
						label: 'Company',
						name: 'int_fk_company',
						store: 'Company',
						displayField: 'vch_name',
						valueField: 'int_company',
						placeHolder: 'Choice a option'
					},
					{
						xtype: 'textfield',
						label: 'Title',
						name: 'vch_title',
						placeHolder: ''
					},/*
					{
						xtype: 'textfield',
						label: 'Product',
						name: 'int_fk_product',
						placeHolder: 'Number'
					},*/
					{
						xtype: 'selectfield',
						label: 'Product',
						placeHolder: 'Product',
						name: 'int_fk_product',
						store: 'Product',
						displayField: 'vch_name',
						valueField: 'int_product',
						placeHolder: 'Choice a option'
					},
					{
						xtype: 'textfield',
						label: 'Capt. Date',
						name: 'stt_capture_date',
						itemId: 'stt_capture_date',
						placeHolder: ''
					},
					{
						xtype: 'textfield',
						label: 'Description',
						name: 'vch_description',
						placeHolder: ''
					},
					{
						xtype: 'textfield',
						label: 'Solution',
						name: 'vch_solution',
						placeHolder: ''
					},
					{
						xtype: 'textfield',
						label: 'Solution Date',
						name: 'stt_solution_date',
						placeHolder: ''
					},
					{
						xtype: 'hiddenfield',
						name: 'int_case'
					}
				]
			}
		]
	},

	/* Funcion que inicia después de haber creado la vista */
	initialize: function(){
		/*  - Obtengo del objeto actual la propiedad data_UserId que se crea desde controller/Login.js
		    - Obtengo la fecha del ordenador para dar el formato deseado
		*/
		var caseadd = this,
			int_user = caseadd.getInitialConfig().data_UserId,
			currentDate = new Date(),
			currentDateValue = (currentDate.getFullYear()) + '-' + ((currentDate.getMonth()) + 1) + '-' + (currentDate.getDate());
		/* Se obtiene los objetos de los campos deseados*/
        var txt_user = this.down('#int_fk_user');
        var txt_capture_date = this.down('#stt_capture_date');
        /* Setear los campos deseados */
        txt_user.setValue(int_user);
        txt_capture_date.setValue(currentDateValue);
	}
});