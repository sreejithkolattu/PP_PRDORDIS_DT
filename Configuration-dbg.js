/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("i2d.pp.prdorderissue.details.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("i2d.pp.prdorderissue.details.Configuration",
		{
			oServiceParams : {
				serviceList : [{
					name : "PP_MRP_COCKPIT_SRV",
					masterCollection : "ManufacturingOrders",
					serviceUrl : "/sap/opu/odata/sap/PP_MRP_COCKPIT_SRV/",
					isDefault : true,
					mockedDataSource : "/i2d.pp.prdorderissue.details/model/metadata.xml",
					useBatch : true,
					fRequestFailed : function() {
						// empty function to suppress the error handling of the connectionManager
						// in S2parent controller we register again to the requestFailed for handling
						// special cases for the app. Method: handleRequestFailed
					}
				}]
			},

			getServiceParams : function() {
				return this.oServiceParams;
			},

			/**
			 * @inherit
			 */
			getServiceList : function() {
				return this.getServiceParams().serviceList;
			},

			getMasterKeyAttributes : function() {
				// return the key attribute of your master list item
				return ["ComponentShortageDefinitionID", "MaterialID", "MaterialShortageDefinitionID", "MRPArea",
						"MRPPlanningSegmentNumber", "MRPPlanningSegmentType", "MRPPlant", "MRPElement", "MRPElementCategory",
						"stateID"];
			},
		});
