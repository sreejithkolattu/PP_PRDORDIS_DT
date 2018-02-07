/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.view.S2parent");
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.Helper");
jQuery.sap.require("i2d.pp.prdorderissue.details.util.Formatters");
jQuery.sap.require("i2d.pp.prdorderissue.details.util.Constants");
jQuery.sap.require("sap.ca.ui.model.type.Date");

i2d.pp.mrpcockpit.reuse.view.S2parent.extend("i2d.pp.prdorderissue.details.view.S2", {

	/**
	 * @memberOf i2d.pp.prdorderissue.details.view.S2
	 */
	onInit : function() {
		// default title for the master section
		// we have to set this first because it is used by the parent
		this.masterTitle = "MASTER_TITLE";

		// call parent
		i2d.pp.mrpcockpit.reuse.view.S2parent.prototype.onInit.call(this);

		this.Constants = i2d.pp.prdorderissue.details.util.Constants;

		// Semantic object and action for navigation to monitor app
		// This is evaluated in the parent controller
		this.semanticObject = "MRPProductionOrderItem";
		this.semanticObjectAction = "monitor";

	},

	/**
	 * Returns the UI relevant fields
	 */
	_getSelectFields : function() {
		var select = "";
		select += "MaterialExternalID,";
		select += "MaterialName,";
		select += "UnitOfMeasureTechnicalName,";
		select += "TargetQuantityUnitDcmls,";
		select += "MRPArea,";
		select += "MRPController,";
		select += "MRPAreaText,";
		select += "MaterialID,";
		select += "MRPElement,";
		select += "MRPElementCategory,";
		select += "MRPElementCategoryShortName,";
		select += "MaterialShortageDefinitionID,";
		select += "MaterialShortageDefinitionName,";
		select += "ComponentShortageDefinitionName,";
		select += "DynamicHorizonCode,";
		select += "MRPPlant,";
		select += "MRPElementItem,";
		select += "MRPPlantName,";
		select += "ProductionVersion,";
		select += "StorageLocation,";
		select += "ProductionLine,";
		select += "MaterialBaseUnit,";
		select += "MRPElementAvailyOrRqmtDate,";
		select += "MaximumDelayInDays,";
		select += "MRPPlanningSegmentType,";

		select += "LatenessDurationInWorkDays,";
		select += "MfgOrderPlannedTotalQty,";
		select += "MfgOrderPlannedStartDate,";
		select += "MfgOrderPlannedEndDate,";
		select += "MRPElementOpenQuantity,";
		select += "NumberOfComponentsWithProblems,";
		select += "MaximumDelayInWorkDays,";
		select += "ManufacturingOrderTypeName,";
		select += "ManufacturingOrderType,";
		select += "ProductionSupervisor,";
		select += "ProductionSupervisorName,";
		select += "MfgOrderProgressStatusName,";
		select += "MfgOrderProgressStatus,";
		select += "ComponentShortageDefinitionID,";
		select += "MRPPlanningSegmentNumber,";
		select += "DurnPlndStatusToTodayInWrkdays";
		return select;
	},

	/**
	 * Returns the name of the oData entity for the master list
	 */
	getMasterListEntity : function() {
		return i2d.pp.prdorderissue.details.util.Constants.MASTER_LIST_ENTITY;
	},

	/**
	 * Returns master entity name needed for Interoperability Service Version
	 */
	getMasterServiceEntity : function() {
		return i2d.pp.prdorderissue.details.util.Constants.MASTER_SERVICE_ENTITY;
	},

	getHeaderFooterOptions : function() {
		// execute the getHeaderFooterOptions function of the base class
		var oHeaderFooterOptions = i2d.pp.mrpcockpit.reuse.view.S2parent.prototype.getHeaderFooterOptions.call(this);

		// add app-specific master list title
		oHeaderFooterOptions.sI18NMasterTitle = this.masterTitle;

		return oHeaderFooterOptions;
	},

	/**
	 * Add additional filters for the master call
	 */
	_bindAppFilters : function(parameters, aFilters) {

		var aANDFilters = new Array();

		this._bindGeneralKeyFilters(parameters, aFilters, aANDFilters);

		// add app specific key fields
		// all key fields must be combined in an 'AND' filter
		aANDFilters.push(i2d.pp.mrpcockpit.reuse.util.Helper.getORMultiFilter('MRPElement', parameters.MRPElement));
		aANDFilters.push(i2d.pp.mrpcockpit.reuse.util.Helper.getORMultiFilter('MRPElementCategory',
				parameters.MRPElementCategory));
		aANDFilters.push(i2d.pp.mrpcockpit.reuse.util.Helper.getORMultiFilter('MRPPlanningSegmentNumber',
				parameters.MRPPlanningSegmentNumber));
		aANDFilters.push(i2d.pp.mrpcockpit.reuse.util.Helper.getORMultiFilter('MRPPlanningSegmentType',
				parameters.MRPPlanningSegmentType));

		aANDFilters.push(this._getSimpleFilter('ComponentShortageDefinitionID', parameters.ComponentShortageDefinitionID));

		// change the title of the app
		this._changeAppName(parameters.OrderCategory);

		// finally add the 'AND' filter with all key fields to the overall oData master call filter
		aFilters.push(new sap.ui.model.Filter(aANDFilters, true)); // AND
	},

	/**
	 * get VariantContainer Prefix
	 * 
	 */
	_getVariantContainerPrefix : function() {
		if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
			return i2d.pp.prdorderissue.details.util.Constants.VARIANT_CONTAINER_PREFIX_PRD;
		} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
			return i2d.pp.prdorderissue.details.util.Constants.VARIANT_CONTAINER_PREFIX_PRC;
		}

		return i2d.pp.prdorderissue.details.util.Constants.VARIANT_CONTAINER_PREFIX_PRD;
	},

	/**
	 * This method is used to do App specific coding that is related to the variant e.g. changing the master list title in
	 * 332 app. It is intended to be overwritten in the sub classes.
	 */
	_handleVariantAppSpecific : function() {
		// read the element category
		var mRPElementCategory;
		for ( var i in this.aFilters) {
			if (this.aFilters[i].sPath === "MRPElementCategory") {
				mRPElementCategory = this.aFilters[i].oValue1;
			}
		}

		// change the title of the app
		this._changeAppName(mRPElementCategory);
	},

	/**
	 * Changes the Application naming between Production and Process Order
	 * 
	 */
	_changeAppName : function(mRPElementCategory) {
		// Production Order
		if (mRPElementCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
			this.masterTitle = "MASTER_TITLE_PROD";
		}
		// Process Order
		if (mRPElementCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
			this.masterTitle = "MASTER_TITLE_PROC";
		}
	}
});
