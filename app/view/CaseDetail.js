Ext.define('TransportArriving.view.CaseDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.casedetail',
    xtype: 'casedetail',
    /* Se específica los componentes de la vista a usar*/
    requires: [
        'Ext.field.Text',
        'Ext.field.Email',
        'Ext.field.Url'
    ],
    /* Vista de los componentes en forma vertical */
    config: {
        layout: {
            type: 'vbox'
        },
        /* Conjunto de campos para el llenado de los casos */
        items: [
            {
                xtype: 'fieldset',
                itemId: 'casedetailviewform',
                title: 'Update',
                items: [
                    /*{
                        xtype: 'textfield',
                        label: 'Case Id',
                        name: 'int_case',
                        itemId: 'int_case'
                    },*/
                    {
                        xtype: 'textfield',
                        label: 'Employee',
                        name: 'name_em',
                        itemId: 'name_em',
                        placeHolder: 'Employee name'
                    },/*
                    {
                        xtype: 'textfield',
                        label: 'Company',
                        name: 'name_co',
                        itemId: 'name_co',
                        placeHolder: 'Company name'
                    },*/
                    {
                        xtype: 'selectfield',
                        label: 'Company',
                        name: 'name_co',
                        itemId: 'name_co',
                        store: 'Company',
                        displayField: 'vch_name',
                        valueField: 'int_company',
                        placeHolder: 'Choice a option'
                    },
                    /*
                    {
                        xtype: 'textfield',
                        label: 'Product',
                        name: 'name_pr',
                        itemId: 'name_pr',
                        placeHolder: 'Product name'
                    },*/
                    {
                        xtype: 'selectfield',
                        label: 'Product',
                        placeHolder: 'Product',
                        name: 'name_pr',
                        itemId: 'name_pr',
                        store: 'Product',
                        displayField: 'vch_name',
                        valueField: 'int_product',
                        placeHolder: 'Choice a option'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Capture date',
                        name: 'stt_capture_date',
                        itemId: 'stt_capture_date',
                        placeHolder: 'Capture date'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Title',
                        name: 'vch_title',
                        itemId: 'vch_title',
                        placeHolder: 'Title'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Solution date',
                        name: 'stt_solution_date',
                        itemId: 'stt_solution_date',
                        placeHolder: 'Solution date'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Solution',
                        name: 'vch_solution',
                        itemId: 'vch_solution',
                        placeHolder: 'Solution'
                    },
                    {
                        xtype: 'textareafield',
                        label: 'Description',
                        name: 'vch_description',
                        itemId: 'vch_description',
                        placeHolder: 'Description'
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'int_case',
                        name: 'int_case'
                    }
                ]
            }, 
            /* Barra de título con un botón para regresar a la vista principal */           
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '',
                itemId: 'tbrhomid',
                layout: {
                    pack: 'left',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backbtn',
                        //text: 'Back',
                        iconCls: 'arrow_left', 
                        iconMask: true
                    }
                ]
            },
            /* Barra de herramientas situado en la parte inferior con botones para la eliminación del registro seleccionado o para la actualización */
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'deletebtn',
                        action: 'case-delete',
                        //text: 'Delete',
                        ui: 'action',
                        iconCls: 'trash', 
                        iconMask: true
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'savebtn',
                        action: 'case-save',
                        ui: 'confirm',
                        //text: 'Save'
                        iconCls: 'compose', 
                        iconMask: true
                    }
                ]
            }
        ]
    },

    /* Funcion que inicia después de haber creado la vista */
    initialize: function(){
        /*  - Obtengo del objeto actual la propiedad data_case que se crea desde controller/Login.js tras hacer click en algún registro
        */
        var me = this,
            config = me.getInitialConfig().data_case;

        /* Se obtiene los objetos de los campos deseados*/
        var name_em_ = this.down('#name_em');
        var name_co_ = this.down('#name_co');
        var name_pr_ = this.down('#name_pr');
        var stt_capture_date_ = this.down('#stt_capture_date');
        var vch_title_ = this.down('#vch_title');
        var stt_solution_date_ = this.down('#stt_solution_date');
        var vch_solution_ = this.down('#vch_solution');
        var vch_description_ = this.down('#vch_description');
        var int_case_ = this.down('#int_case');

        /*  Setear los campos deseados
            stt_capture_date_: se especifica que solo se se va a tomar la primera parte de la fecha que contiene el año, mes y día
        */
        name_em_.setValue(config.name_em);
        name_co_.setValue(config.name_co);
        name_pr_.setValue(config.name_pr);
        stt_capture_date_.setValue(config.stt_capture_date.split('T')[0]);
        vch_title_.setValue(config.vch_title);
        stt_solution_date_.setValue(config.stt_solution_date);
        vch_solution_.setValue(config.vch_solution);
        vch_description_.setValue(config.vch_description);
        int_case_.setValue(config.int_case);
        console.log(config.int_case);
    }
});