/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.CommonConstants");
jQuery.sap.declare("i2d.pp.prdorderissue.details.util.Constants");

// "use strict";

/**
 * Default constructor<br>
 * 
 * @class This is a static class for constants
 * @constructor
 * @public
 */
i2d.pp.prdorderissue.details.util.Constants = function() {
	var me = {};

	for ( var key in i2d.pp.mrpcockpit.reuse.util.CommonConstants) {
		me[key] = i2d.pp.mrpcockpit.reuse.util.CommonConstants[key];
	}

	return me;
}();

/**
 * element is covered
 */
i2d.pp.prdorderissue.details.util.Constants.SupDemCovered = "0";
/**
 * element is uncovered
 */
i2d.pp.prdorderissue.details.util.Constants.SupDemUncovered = "1";
/**
 * element is delayed
 */
i2d.pp.prdorderissue.details.util.Constants.SupDemDelayed = "2";
/**
 * element is partly uncovered and partly delayed
 */
i2d.pp.prdorderissue.details.util.Constants.SupDemBoth = "3";

i2d.pp.prdorderissue.details.util.Constants.MASTER_LIST_ENTITY = "ManufacturingOrders";
i2d.pp.prdorderissue.details.util.Constants.MASTER_SERVICE_ENTITY = "ManufacturingOrder";
i2d.pp.prdorderissue.details.util.Constants.VARIANT_CONTAINER_PREFIX_PRD = "MRPProductionOrderItem";
i2d.pp.prdorderissue.details.util.Constants.VARIANT_CONTAINER_PREFIX_PRC = "MRPProcessOrderItem";
