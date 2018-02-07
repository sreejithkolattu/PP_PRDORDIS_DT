/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/* global jQuery,util,sap */
jQuery.sap.declare("i2d.pp.prdorderissue.details.util.Formatters");

jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.CommonFormatter");
jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");
jQuery.sap.require("i2d.pp.prdorderissue.details.util.Constants");
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.CommonConstants");

i2d.pp.prdorderissue.details.util.Formatters = function() {
	var me = {};

	for ( var key in i2d.pp.mrpcockpit.reuse.util.CommonFormatter) {
		me[key] = i2d.pp.mrpcockpit.reuse.util.CommonFormatter[key];
	}

	return me;
}();

/**
 * formats two dates into short format
 */
i2d.pp.prdorderissue.details.util.Formatters.formatFromToDateShort = function(startDate, endDate) {
	if (startDate !== null && endDate !== null && startDate !== undefined && endDate !== undefined) {
		var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			style : 'short'
		});
		var dateBeginTxt = oDateFormat.format(startDate);
		var dateEndTxt = oDateFormat.format(endDate);

		return i2d.pp.mrpcockpit.reuse.util.CommonFormatter.getTextPairWithDash.call(this, dateBeginTxt, dateEndTxt);
	}
	return "";
};

/**
 * formats late base material "Material late by 3 days" "Material late by one days" "Material on time"
 */
i2d.pp.prdorderissue.details.util.Formatters.baseMaterialDelayText = function(latenessDurationInWorkDays) {
	// we have base material missing more than one day
	if (latenessDurationInWorkDays >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_X_DAYS",
				[latenessDurationInWorkDays]);
		// we have base material missing one da
	} else if (latenessDurationInWorkDays === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ONE_DAYS");
	} else {
		// base material on time
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ON_TIME");
	}
};

/**
 * formats late base material
 */
i2d.pp.prdorderissue.details.util.Formatters.baseMaterialDelayState = function(latenessDurationInWorkDays) {
	// we have base material missing more than one day
	if (latenessDurationInWorkDays >= 2) {
		return sap.ui.core.ValueState.Warning;
		// we have base material missing one day
	} else if (latenessDurationInWorkDays === 1) {
		return sap.ui.core.ValueState.Warning;
	} else {
		// base material on time
		return sap.ui.core.ValueState.None;
	}
};

/**
 * formats late base material icon on the detail view
 */
i2d.pp.prdorderissue.details.util.Formatters.baseMaterialDelayStateDetail = function(latenessDurationInWorkDays) {
	// we have base material missing more than one day
	if (latenessDurationInWorkDays >= 2) {
		return sap.ui.core.IconColor.Negative;
		// we have base material missing one day
	} else if (latenessDurationInWorkDays === 1) {
		return sap.ui.core.IconColor.Negative;
	} else {
		// base material on time
		return sap.ui.core.IconColor.Default;
	}
};

/**
 * formats missing components "1 missing part" "x missing parts" "No missing components"
 */
i2d.pp.prdorderissue.details.util.Formatters.missingComponentsText = function(numberOfComponentsWithProblems) {
	// we have several components misssing
	if (numberOfComponentsWithProblems >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_X_COMPONENTS_MISSING",
				[numberOfComponentsWithProblems]);
		// we have one component missing
	} else if (numberOfComponentsWithProblems === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_ONE_COMPONENT_MISSING",
				[numberOfComponentsWithProblems]);
	} else {
		// we are <= 0 so no component is missing
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_NO_MISSING_COMPONENTS",
				[numberOfComponentsWithProblems]);
	}
};

/**
 * formats missing components state
 */
i2d.pp.prdorderissue.details.util.Formatters.missingComponentsState = function(numberOfComponentsWithProblems) {
	// we have several components misssing
	if (numberOfComponentsWithProblems >= 2) {
		return sap.ui.core.ValueState.Warning;
		// we have one component missing
	} else if (numberOfComponentsWithProblems === 1) {
		return sap.ui.core.ValueState.Warning;
	} else {
		// we are <= 0 so no component is missing
		return sap.ui.core.ValueState.None;
	}
};

/**
 * formats process delay "Late and Overdue" "Overdue" "On schedule"
 */
i2d.pp.prdorderissue.details.util.Formatters.processDelayText = function(durnPlndStatusToTodayInWrkdays) {
	// we have a delay of several days
	if (durnPlndStatusToTodayInWrkdays >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_X_DAYS",
				[durnPlndStatusToTodayInWrkdays]);
		// we have a delay of one day
	} else if (durnPlndStatusToTodayInWrkdays === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_ONE_DAY");
	} else {
		// we are <= 0 so we are on schedule
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_ON_SCHEDULE");
	}
};

/**
 * formats process delay state
 */
i2d.pp.prdorderissue.details.util.Formatters.processDelayState = function(durnPlndStatusToTodayInWrkdays) {
	// we have a delay of several days
	if (durnPlndStatusToTodayInWrkdays >= 2) {
		return sap.ui.core.ValueState.Warning;
		// we have a delay of one day
	} else if (durnPlndStatusToTodayInWrkdays === 1) {
		return sap.ui.core.ValueState.Warning;
	} else {
		// we are <= 0 so we are on schedule
		return sap.ui.core.ValueState.None;
	}
};

/**
 * Detail Title
 */
i2d.pp.prdorderissue.details.util.Formatters.detailTitle = function(sourceMRPElementCategory, mrpElement) {

	switch (sourceMRPElementCategory) {
		case i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD :
			return this.getModel('i18n').getResourceBundle().getText("DETAIL_TITLE_PROD", [mrpElement]);
			break;
		case i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD :
			return this.getModel('i18n').getResourceBundle().getText("DETAIL_TITLE_PROC", [mrpElement]);
			break;

		default :
			return this.getModel('i18n').getResourceBundle().getText("DETAIL_TITLE");
			break;
	}
};

/**
 * Display mrp area or plant for component in Object header
 */
i2d.pp.prdorderissue.details.util.Formatters.displayAreaOrPlant = function(materialExternalID, mrpArea, mrpAreaText,
		mrpPlant) {
	if (mrpArea === "" || mrpArea === mrpPlant) {
		return this.getModel('i18n').getResourceBundle().getText("DETAIL_MATERIAL_PLANT", [materialExternalID, mrpPlant]);
	} else {
		return this.getModel('i18n').getResourceBundle().getText("DETAIL_MATERIAL_MRPAREA",
				[materialExternalID, mrpAreaText, mrpArea]);
	}
};

i2d.pp.prdorderissue.details.util.Formatters.formatMilestoneConfirmation = function(isMilestone) {
	if (isMilestone) {
		return sap.ui.core.IconPool.getIconURI("map");
	} else {
		return null;
	}
};

i2d.pp.prdorderissue.details.util.Formatters.formatOperation = function(operationId, sequenceId) {
	sequenceId = parseInt(sequenceId);
	if (sequenceId === 0 || isNaN(sequenceId)) {
		return operationId;
	} else {
		return this.getModel('i18n').getResourceBundle().getText("OPERATION_TITLE", [operationId, sequenceId]);
	}
};

i2d.pp.prdorderissue.details.util.Formatters.formatScheduledTimeState = function(isOverdue) {
	return isOverdue === false ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error;
};

i2d.pp.prdorderissue.details.util.Formatters.formatMissingOperationQuantity = function(confirmedQuantity,
		operationQuantity, decimalPlaces) {

	return i2d.pp.mrpcockpit.reuse.util.CommonFormatter.quantity(Math.max(operationQuantity - confirmedQuantity, 0),
			decimalPlaces);
};

i2d.pp.prdorderissue.details.util.Formatters.formatStatusText = function(status) {
	var text;
	switch (status) {
		case "I0001" :
			text = "CRTD_CREATED";
			break;
		case "I0002" :
			text = "REL_RELEASED";
			break;
		case "I0010" :
			text = "PCNF_PARTIALLY_CONFIRMED";
			break;
		case "I0009" :
			text = "CNF_CONFIRMED";
			break;
		default :
			return status;
	}
	return this.getModel('i18n').getResourceBundle().getText(text);
};

i2d.pp.prdorderissue.details.util.Formatters.formatStatusValue = function(status) {
	switch (status) {
		case "I0001" :
			return 0;
		case "I0002" :
			return 1;
		case "I0010" :
			return 2;
		case "I0009" :
			return 3;
	}
	return 0;
};

i2d.pp.prdorderissue.details.util.Formatters.formatMilestoneOverdue = function(status) {
	return status ? 1 : 0;
};

i2d.pp.prdorderissue.details.util.Formatters.formatMilestoneLabel = function(status) {
	var text;
	switch (status) {
		case "I0002" :
			text = "MS_REL_RELEASED";
			break;
		case "I0010" :
			text = "MS_PCNF_PARTIALLY_CONFIRMED";
			break;
		case "I0009" :
			text = "MS_CNF_CONFIRMED";
			break;
		case "I0012" :
			text = "MS_DLR_DELIVERED";
			break;
		default :
			return status;
	}
	return this.getModel('i18n').getResourceBundle().getText(text);
};

i2d.pp.prdorderissue.details.util.Formatters.formatMilestoneTooltip = function(status) {
	var text;
	switch (status) {
		case "I0002" :
			text = "MS_REL_RELEASED_TOOLTIP";
			break;
		case "I0010" :
			text = "MS_PCNF_PARTIALLY_CONFIRMED_TOOLTIP";
			break;
		case "I0009" :
			text = "MS_CNF_CONFIRMED_TOOLTIP";
			break;
		case "I0012" :
			text = "MS_DLR_DELIVERED_TOOLTIP";
			break;
		default :
			return status;
	}
	return this.getModel('i18n').getResourceBundle().getText(text);
};

i2d.pp.prdorderissue.details.util.Formatters.formatOpenPlannedQuantities = function(openQuantity, plannedQuantity,
		unit, precision) {
	var sOpenQuantity = i2d.pp.mrpcockpit.reuse.util.CommonFormatter.quantity(openQuantity, precision);
	var sPlannedQuantity = i2d.pp.mrpcockpit.reuse.util.CommonFormatter.quantity(plannedQuantity, precision);
	return this.getModel('i18n').getResourceBundle().getText('DETAIL_OPEN_PLANNED_QUAN',
			[sOpenQuantity, unit, sPlannedQuantity]);
};

/**
 * This method returns an "_" This is used in masterlist in order to show the status everytime It has to be realized in
 * an formatter because only this way the code check allows it
 */
i2d.pp.prdorderissue.details.util.Formatters.returnUnderscore = function() {
	return "_";
};
