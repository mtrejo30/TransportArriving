Ext.define('TransportArriving.view.Login', {
	extend: 'Ext.form.Panel',
    alias: 'widget.loginform',
    xtype: 'loginform',
    id: 'loginform',
    
    requires: [
        'Ext.Img',
        'Ext.field.Toggle'
    ],
	config: {
        padding: '10px',
        styleHtmlContent: true,
        items: [
            {
                xtype: 'image',
                src: 'resources/icons/neitek_logo_login.png',
                style: 'width:100%;height:200px;margin:auto'
            },
            {
                xtype: 'label',
                hidden: true,
                hideAnimation: 'fadeOut',
                html: 'Error',
                itemId: 'failmsg',
                showAnimation: 'fadeIn',
                style: 'color: #990000; margin:5px 0px;'
            },
            {
            	xtype: 'label',
            	itemId: 'systemLbl',
            	text: TransportArriving.util.Config.getSystemName()
            },
            {
                xtype: 'fieldset',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'user',
                        required: true,
                        placeHolder: 'User',
                        label: 'User'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'pass',
                        required: true,
                        placeHolder: 'Password',
                        label: 'Password'
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'toog',
                        label: 'Save Session',
                        labelWidth: '60%',
                        name: 'keepUser'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'loginbtn',
                padding: '10px',
                ui: 'action-round',
                text: 'Login'
            }
        ]
	},
    /* Función para mostrar el mensaje de error del inicio de sesión */
    showSignInFailedMessage: function(message){
        //console.log('=== showSignInFailedMessage ===');
        var label = this.down('#failmsg');
        label.setHtml(message);
        label.show();
        //Ext.Msg.alert('Error', message, Ext.emptyFn);
    }
});