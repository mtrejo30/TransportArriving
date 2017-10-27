Ext.define('TransportArriving.util.Config', {
	singleton: true,
	alias: 'widget.appConfigUtil',
	
	config: {
		systemName			: 'Transport Arriving',
		authenticationBaseUri			: 'https://mobile.nemak.com/Smart/API/api/security/authenticate/',
		sideBarBaseUri					: 'https://mobile.nemak.com/Smart/API/api/cps/sidebar/',
		statusReportBaseUri				: 'https://mobile.nemak.com/Smart/API/api/cps/statusreport/',
		qualityReportBaseUri			: 'https://mobile.nemak.com/Smart/API/api/cps/qualityreport/',
		builQualityReportFormBaseUri	: 'https://mobile.nemak.com/Smart/API/api/cps/buildqualityreportform/',		
		suppliersBaseUri				: 'https://mobile.nemak.com/Smart/API/api/cps/suppliers/',
		customersBaseUri				: 'https://mobile.nemak.com/Smart/API/api/cps/customers/',
		programsBaseUri					: 'https://mobile.nemak.com/Smart/API/api/cps/programs/',
		sitesBaseUri					: 'https://mobile.nemak.com/Smart/API/api/cps/sites/',
		suppliersCapacityBaseUri		: 'https://mobile.nemak.com/Smart/API/api/cps/suppliercapacity/',
		defectsBaseUri					: 'https://mobile.nemak.com/Smart/API/api/cps/defects/',
		defaultProductBaseUri			: 'https://mobile.nemak.com/Smart/API/api/cps/defaultproduct/',
		qualityReportDeleteBaseUri		: 'https://mobile.nemak.com/Smart/API/api/utilities/deletequalityreport/'
	},
	
	/**
	 * Methods
	 */
	constructor: function(config) {
		var me = this;
	
        me.initConfig(config);
        me.callParent([config]);
    }
});