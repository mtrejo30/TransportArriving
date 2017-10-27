Ext.define('TransportArriving.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        //data_case: null,
        data_UserId: null,
        dataUserId: '',
        data_us: null,
        dataUser: '',
        loggedUserId: null,
        /* Busca elementos a partir de xtypes, id, name o atributos de elementos */
    	refs: {
            usernameCt: 'loginform #user',
            passwordCt: 'loginform #pass',
            keepUserCt: 'loginform [name=keepUserCt]',
            loginForm: {
                selector: 'loginform',
                xtype: 'Ext.form.Panel'
            },
            myViewport: {
                selector: 'myviewport',
                xtype: 'Ext.Container'
            },
            mainPanel: {
                selector: 'mainpanel',
                xtype: 'Ext.Panel'
            },
            myList: 'list[name="myList"]',
            addButton: 'mainpanel button[action=case-add]'           
    	},
        /* Busca elemento con la sintaxis de jquery y asigna función para los eventos disponlibles:
            tap: pulso
            itemtap: pulso por registro
        */
    	control: {
            "loginform #loginbtn": {
                tap: 'onLogInButtonTap'
            },
            "mainpanel #logoutbtn": {
                tap: 'onLogOutButtonTap'
            },
            myList: {
                itemtap: 'onItemTap'
            },
            addButton: {
                tap: 'showCaseAdd'
            }
    	}
    },
    /* Función para crear la vista para crear casos, se envia un obejto con el valor del id del usuario logeado */
    showCaseAdd: function(button, e, eOpts){
        //console.log(this.getDataUserId());
        //console.log(this.getDataUser());
        Ext.Viewport.setActiveItem(Ext.create('TransportArriving.view.CaseAdd', {data_UserId: this.getDataUserId()}));
    },
    /* Función que crea una vista para editar/eliminar el gistro activandose por las pulsaciones de cada registro de la lista enviando el objeto del registro pulsado y el nombre del usuario */
    onItemTap: function(view, index, target, record, event) {
        Ext.Viewport.setActiveItem(Ext.create('TransportArriving.view.CaseDetail', {data_case: record.data, data_us: this.getDataUser()}));
    },

    init: function () {},
    /* Función para validar la existencia de algún guardado de usuario de sesión.
        En caso de no existir envia la vista del logeo.
        En caso de existir una sesión guardada valida el que este dentro del rango del tiempo para la sesión, el tiempo de la duración de una sesión se configura en el archivo app.js en la propiedad: sessionTimeout
     */
    launch: function() {
        var me = this;
        Ext.ModelMgr.getModel('TransportArriving.model.CurrentUser').load(1, {
            scope: this,
            success: function(cachedLoggedInUser){
                delete cachedLoggedInUser.phantom;
                var store = Ext.getStore('CurrentUser');
                store.add(cachedLoggedInUser);
                var prevLoginTime = cachedLoggedInUser.get('loginTime'),
                    now = new Date(),
                    interval = now - prevLoginTime;
                if (interval <= TransportArriving.app.sessionTimeout) {
                    this.logUserIn(cachedLoggedInUser);
                } else {
                    this.fncGoToLogin();
                }              
            },
            failure: function(){
                this.fncGoToLogin();
            }
        });
    },
    /* Función para mostrar la vista de logueo */
    fncGoToLogin: function(){
        var me = this,
            login = me.getLoginForm(),
            myViewport = me.getMyViewport();
        myViewport.animateActiveItem(login, {type: 'slide', direction: 'right'});
    },
    /*  Función que obtiene los valores del usuario, nombre y password, valida campos vacios que 
            en caso de existir retorne un error y muestra un msj en un label.
        Si todo la validación es correcta espera 500 milisegundos para llamar la función: onSignInCommand enviando los parametros name y pass del usuario
    */
    onLogInButtonTap: function(button, e, eOpts) {
        //console.log('onLoginButtonTap: function');
        var form = button.up('loginform'),
            user = this.getUsernameCt(),
            pass = this.getPasswordCt(),
            keepUserCt = form.down('[name=keepUser]'),
            label = form.down('#failmsg'),
            me = this;

        label.hide();

        var userName = user.getValue(),
            password = pass.getValue(),
            keepUser = keepUserCt.getValue();

        if (Ext.isEmpty(password) && Ext.isEmpty(userName)) {
            form.showSignInFailedMessage('Please, insert yours credentials');
            return;
        }

        var task = Ext.create('Ext.util.DelayedTask', function () {
            label.setHtml('');
            me.onSignInCommand(form, userName, password, keepUser);
            user.setValue('');
            pass.setValue('');
        });
        task.delay(500);
    },
    /* Funcion para el botón de salir de la sesión, obtenemos el almacen del usuario actual, y preguntamos si desa salir, en el caso de confirmar se manda a llamar la función doLogout con el paramatro de del user obtenido del almacen*/
    onLogOutButtonTap: function(button, e, eOpts) {
        Ext.ModelMgr.getModel('TransportArriving.model.CurrentUser').load(1, {
                success: function(user) {
                    Ext.Msg.confirm('Confirm', 'Are you sure you want to log out?', function(confirmed) {
                        if (confirmed == 'yes') {
                            this.doLogout(user);
                        }
                    }, this);
                },
                failure: function() {
                    window.location.reload();
                }
            },
            this
        );
    },
    /* Función que borra el almacen el usuario dado como parametro y refresca la aplicación completamente */
    doLogout: function(user) {
        user.erase({
            success: function() {
                window.location.reload();
            }
        });
    },
    // Llama la función: checkCredentials enviándole como parametros los valores del logeo
    onSignInCommand: function(login, username, password, keepUser) {
        login.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });
        var me = this, credentials = this.checkCredentials(login, username, password, keepUser);
    },
    /* Función que hace el llamado directamente de la web api, valida si es los datos coinciden con los usuarios registrados, en caso de existir manda a llamar la función: signInSuccess con parametros del nombre y id del usuario*/
    checkCredentials: function(login, username, password, keepUser) {
        var me = this;
        Ext.Ajax.request({
             url: 'http://localhost:81/api/view_users?vch_user=' + username + '&vch_password=' + password,
             method:'GET',
             scope: this,
             success: function (response) {
                var loginResponse = Ext.JSON.decode(response.responseText);
                me.signInSuccess(loginResponse.vch_user, keepUser, loginResponse.int_user);
             },
             failure: function (response) {
                login.showSignInFailedMessage('Unregistered ' + username + ' user');
                login.setMasked(false);
                return;               
            }
        });
    },
    /* Guardamos el id unico, nombre del usuario, id del usuario y la fecha/hora actual en el almacen local de la aplicación, mandamos a llamar la función: logUserIn con parametro del nombre de usuario */
    signInSuccess: function(username, keepUser, int_user) {
        //console.log(this);
        var user = Ext.create('TransportArriving.model.CurrentUser', {
            id: 1,
            name: username,
            int_user: int_user,
            loginTime: (new Date()).valueOf()
        });
        if(keepUser) {
            user.save({
                success: function() {
                    this.logUserIn(user);
                }
            }, this);
        } else {
            this.logUserIn(user);            
        }
    },
    /* Mostramos la vista mainPanel, guardando los datos del usuario*/
    logUserIn: function(user){
        var me = this,
            login = me.getLoginForm(),
            mainPanel = me.getMainPanel(),
            myViewport = me.getMyViewport();
            
        this.setDataUserId(user.get('int_user'));
        this.setDataUser(user.get('name'));
        login.setMasked(false);
        myViewport.animateActiveItem(mainPanel, {type: 'slide', direction: 'left'});
    }

});