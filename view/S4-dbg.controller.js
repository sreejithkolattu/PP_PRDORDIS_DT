/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.view.S4parent");
jQuery.sap.require("i2d.pp.prdorderissue.details.util.Constants");

i2d.pp.mrpcockpit.reuse.view.S4parent.extend("i2d.pp.prdorderissue.details.view.S4", {

	/**
	 * Initialization of the controller
	 * 
	 * @memberOf i2d.pp.prdorderissue.details.view.S4
	 */
	onInit : function() {

		// Shortcut to the MRP constants
		this.Constants = i2d.pp.prdorderissue.details.util.Constants;

		i2d.pp.mrpcockpit.reuse.view.S4parent.prototype.onInit.call(this);

	},

	onExit : function() {

		i2d.pp.mrpcockpit.reuse.view.S4parent.prototype.onExit.call(this);
	},

	onAfterRendering : function() {

		i2d.pp.mrpcockpit.reuse.view.S4parent.prototype.onAfterRendering.call(this);
	}

});