Ext.define('TransportArriving.view.Main', {
	extend: 'Ext.Panel',
	alias: 'widget.mainpanel',
	xtype : 'mainpanel',

    /* Se específica los componentes de la vista a usar*/
	requires : [
		'Ext.dataview.List',
		'TransportArriving.store.Viewcase',
		'TransportArriving.store.Case',
		'Ext.field.Search'
	],
	config: {
		html: '',
		styleHtmlContent: true,
		/* Componentes de la vista título, botón para agregar un nuevo caso y cerrado de sesión */
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Knowledge Base',
				itemId: 'tbrhomid',
				/* Especifica que los componentes se agregarán de manera horizontal */
                layout: {
                    pack: 'end',
                    type: 'hbox'
                },
                items: [
					{
					    xtype: 'button',
					    iconCls: 'refresh',
					    ui: 'plain',
					    align: 'left'
					},
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        action: 'case-add',
                        itemId: 'addbtn',
                        //text: 'Add'
                        iconCls: 'add', 
                        iconMask: true
                    },
                    {
                        xtype: 'button',
                        itemId: 'logoutbtn',
                        align: 'right',
                        text: 'Logout'
                    }
                ]
			},
			{
				xtype: 'label',
				html: '',
				hidden : false,
				itemId: 'lbluserid'
			},
			/* campo para la búsqueda de casos */
            {
            	xtype: 'fieldset',
                name:'searchfieldset',
                items: [                	
		            {
		            	xtype: 'searchfield',
		            	label: 'Search',
		                name:'searchfield',
		                itemId:'searchfield',
		                placeHolder:'Title, Date, Product...'
		            }/*,
	                {
	                	xtype: 'button',
			            itemId: 'searchbtn',
			            text: 'Search',
                		ui: 'action'
	                }*/
                ]
            },
            /* Lista para el mostrado de los casos de tipo scroll, la propiedad onItemDisclosure muestra un ícono para especificar el mostrado de detalle de cada registro */
	        {
	        	xtype: 'list',
	            margin : '10px 10px',
  				name: 'myList',
	            scrollable: true,
	            height: '85%',
     			onItemDisclosure : true,
	            /* Estilos por registro a partir de etiquetas HTML con estilo css, la clase: backgroundSearchBtn está creada en el archivo index.html */
	            itemTpl: '<div class= "">'+ 
        					'<div>{vch_title}</div>' +
        					'<div class="backgroundSearchBtn"><i>{stt_capture_date:date("Y-m-d")}</i></div>' +
        					'<div class="backgroundSearchBtn"><i>{name_pr}</i></div>' +
        				'</div>',
        		/* Se define el tipo de almacén que alimentará la lista */
	            store: {
	            	type : 'viewcase'
	            }
	            /*listeners : {
	            	select : function(view, record){
		            	//Ext.Msg.alert('You selected!', record.get('name_em'));
		            	//console.log(this);
		            	var lbl = this.up('mainpanel');
		            	var lbl2 = lbl.down('#lbluserid');
		            	lbl2.setHtml(record.get('name_co'));
		            	console.log(lbl);
		            	TransportArriving.app.switchMainView('TransportArriving.view.CaseDetail');	            	
		            }
	            }*/
	        }
		]
	},
	/* Función para agregar el título */
	showLabelUser: function(message) {
		//console.log(message);
        var label = this.down('#tbrhomid');
		label.setTitle('Home - ' + message);
	},
	
	refreshList: function(msg){
		console.log('Msg: [' + msg + ']');
		var store = Ext.getStore('Viewcase');
		store.sync();
		store.load();
	}
});