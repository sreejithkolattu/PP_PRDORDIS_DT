/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/**
 * ==|== Milestone Table Chart (JS) ==========================================================
 * 
 * Custom Control for production Order Milestones (332)
 * 
 * @see /controls/MilestoneChart.css
 * 
 * author: SAP AG version: 30.04.2014 ============================================================
 */

// "use strict";
jQuery.sap.declare("i2d.pp.prdorderissue.details.controls.MilestoneChart");
jQuery.sap.require("i2d.pp.prdorderissue.details.controls.Milestone");

sap.ui.core.Control.extend("i2d.pp.prdorderissue.details.controls.MilestoneChart", {
	/**
	 * @memberOf i2d.pp.prdorderissue.details.controls.MilestoneChart
	 */

	metadata : {
		properties : {
			"visible" : {
				type : "boolean",
				defaultValue : true
			},
			"tooltip" : {
				type : "string",
				defaultValue : null
			},
			"label1" : {
				type : "string",
				defaultValue : "&nbsp;"
			},
			"label2" : {
				type : "string",
				defaultValue : "&nbsp;"
			},
			"tooltipLabel1" : {
				type : "string",
				defaultValue : null
			},
			"tooltipLabel2" : {
				type : "string",
				defaultValue : null
			},
			"tooltipProgress" : {
				type : "string",
				defaultValue : null
			},
			"tooltipDueTo" : {
				type : "string",
				defaultValue : null
			}
		},
		aggregations : {
			items : {
				type : "i2d.pp.prdorderissue.details.controls.Milestone",
				multiple : true,
				singularName : "item"
			}
		}
	},

	init : function() {
		var url = jQuery.sap.getModulePath("i2d.pp.prdorderissue.details") + "/" + "i18n/i18n.properties";
		var oBundle = new sap.ui.model.resource.ResourceModel({
			bundleUrl : url
		});
		oBundle = oBundle.getResourceBundle();
		this.setLabel1(oBundle.getText("MS_PLANNED_DATE"));
		this.setLabel2(oBundle.getText("MS_ACTUAL_DATE"));
	},

	renderer : function(oRm, oControl) {

		var aItems = oControl.getItems();
		if (!oControl.getVisible() || !aItems || aItems.length === 0) {
			// oRm.write('<table><tr><td></td></tr></table>');
			return;
		}

		// read Materials-attribute "AvailabilityChart" = string[32]{0/1/2/3/4/5}
		// dissolve the string, build 32-array status variable Header
		oRm.write("<table");

		oRm.addClass("sapMRPMSChart");
		oRm.writeControlData(oControl);
		oRm.writeClasses();

		if (null !== oControl.getTooltip()) {
			oRm.write(' title="');
			oRm.writeEscaped(oControl.getTooltip());
			oRm.write('"');
		}

		oRm.write(">");

		/* == || == Channel 1 ==================================================== */
		oRm.write('<tr class="sapMRPMSChannel1">');
		/*
		if (aItems[0].getIsDue()) {
			oRm.write('<td>');
			oRm.write('<span class="sapMRPMSArrow" ></span>');
			oRm.write('</td>');
		} else {
			oRm.write('<td></td>');
		}
		*/
		oRm.write('<td></td>');

		for ( var i = 0; i < aItems.length; i++) {
			oRm.write('<td colspan="2">');
			if (aItems[i].getIsDue()) {
				var tooltip = oControl.getTooltipDueTo() ? oControl.getTooltipDueTo() : "";
				oRm.write('<span class="sapMRPMSArrow" title="');
				oRm.writeEscaped(tooltip);
				oRm.write('">');
				oRm.write('</span>');
			}
			oRm.write("</td>");
		}
		oRm.write("</tr>");

		/* == || == Channel 2 ==================================================== */
		oRm.write('<tr class="sapMRPMSChannel2">');
		oRm.write('<td></td>');
		var confirmed;
		var ongoing;

		var tooltip = oControl.getTooltipProgress() ? oControl.getTooltipProgress() : "";
		for ( var i = 0; i < aItems.length - 1; i++) {
			confirmed = aItems[i].isConfirmed();
			if ((i + 1 < aItems.length) && aItems[i + 1].isConfirmed()) {
				ongoing = false;
			} else {
				ongoing = true;
			}

			oRm.write("<td");
			if (confirmed) {
				oRm.write(' title="');
				oRm.writeEscaped(tooltip);
				oRm.write('" ');
				oRm.addClass("sapMRPMSProgress");
				oRm.writeClasses();
			}
			oRm.write(">");
			oRm.write("</td>");

			oRm.write("<td");
			if (confirmed && !ongoing) {
				oRm.write(' title="');
				oRm.writeEscaped(tooltip);
				oRm.write('" ');
				oRm.addClass("sapMRPMSProgress");
				oRm.writeClasses();
			}
			oRm.write(">");
			oRm.write("</td>");
		}
		oRm.write("</tr>");

		/* == || == Channel 3 ==================================================== */

		oRm.write('<tr class="sapMRPMSChannel3">');
		oRm.write("<td></td>");
		for ( var i = 0; i < aItems.length; i++) {
			oRm.write('<td colspan="2"></td>');
		}
		oRm.write("</tr>");

		/* == || == Labels + Tooltip ==================================================== */

		oRm.write('<tr class="sapMRPMSLabels">');
		oRm.write("<th></th>");
		for ( var i = 0; i < aItems.length; i++) {
			var tooltip = (null !== aItems[i].getTooltip()) ? aItems[i].getTooltip() : "";
			var label = aItems[i].getLabel() ? aItems[i].getLabel() : "";
			var colspan = ((i === 0) || (i === aItems.length - 1)) ? 1 : 2;

			oRm.write('<th class="sapMRPMS' + (i + 1) + '" colspan="' + colspan + '">');
			oRm.write('<span title="');
			oRm.writeEscaped(tooltip);
			oRm.write('">');
			oRm.writeEscaped(label);
			oRm.write('</span>');
			oRm.write("</th>");
		}
		oRm.write("</tr>");

		/* == || == Planned + Tooltip ==================================================== */

		var tooltip = oControl.getTooltipLabel1() ? oControl.getTooltipLabel1() : "";
		oRm.write('<tr class="sapMRPMSPlanned">');
		if (aItems && (aItems.length > 0)) {
			oRm.write('<th');
			oRm.write(' title="');
			oRm.writeEscaped(tooltip);
			oRm.write('">');
			oRm.writeEscaped(oControl.getLabel1());
			oRm.write('</th>');
		} else {
			oRm.write('<th/>');
		}
		for ( var i = 0; i < aItems.length; i++) {
			var colspan = ((i === 0) || (i === aItems.length - 1)) ? 1 : 2;
			var tooltip = (null !== aItems[i].getTooltip()) ? aItems[i].getTooltip() : "";
			var plannedDate = aItems[i].getPlannedDate() ? aItems[i].getPlannedDate() : "";

			oRm.write('<td colspan="' + colspan + '"');
			oRm.addClass("sapMRPMS" + (i + 1));
			if (!aItems[i].isValid()) {
				oRm.addClass("sapMRPMSIssue");
			}
			oRm.writeClasses();

			oRm.write('>');
			oRm.write('<span title="');
			oRm.writeEscaped(tooltip);
			oRm.write('">');
			oRm.writeEscaped(plannedDate);
			oRm.write('</span>');

			oRm.write('</td>');
		}
		oRm.write('</tr>');

		/* == || == Actual + tooltip ==================================================== */
		var tooltip = oControl.getTooltipLabel2() ? oControl.getTooltipLabel2() : "";
		oRm.write('<tr class="sapMRPMSActual">');
		if (aItems && (aItems.length > 0)) {
			oRm.write('<th');
			oRm.write(' title="');
			oRm.writeEscaped(tooltip);
			oRm.write('">');
			oRm.writeEscaped(oControl.getLabel2());
			oRm.write('</th>');
		} else {
			oRm.write('<th/>');
		}
		for ( var i = 0; i < aItems.length; i++) {
			var colspan = ((i === 0) || (i === aItems.length - 1)) ? 1 : 2;
			var tooltip = (null !== aItems[i].getTooltip()) ? aItems[i].getTooltip() : "";
			var actualDate = aItems[i].getActualDate() ? aItems[i].getActualDate() : "";

			oRm.write('<td title="');
			oRm.writeEscaped(tooltip);
			oRm.write('" class="sapMRPMS' + (i + 1) + '" colspan="' + colspan + '">');

			oRm.write('<span title="');
			oRm.writeEscaped(tooltip);
			oRm.write('">');
			oRm.writeEscaped(actualDate);
			oRm.write('</span>');
			oRm.write("</td>");
		}
		oRm.write('</tr>');

		/* == || == Control End ==================================================== */
		oRm.write('</table>');

	}

}); // end control
