Ext.define('TransportArriving.view.MyViewport', {
    /* Tipo de la vista */
    extend: 'Ext.Container',
    /* Identificar con el cual se accede desde el controller */
    alias: 'widget.myviewport',
    /* Referencias a las vista que contendra embebido esta vista
            Login y Main se encuentran en la misma vista, su llamado específico será a travez de desplazamiento de las vistas hijas
     */
    requires: [
        'TransportArriving.view.Login',
        'TransportArriving.view.Main'
    ],

    config: {
        layout: {
            type: 'card'
        },
        /* Emebebido de las vista a traves de la propiedad xtype específicas de las vistas */
        items: [
            {
                xtype: 'loginform'
            }, 
            {
                xtype: 'mainpanel'
            }
        ]
    }

});
