/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/**
 * ==|== Milestone Item (JS) ==========================================================
 * 
 * JS Class for production Order Milestones (332)
 * 
 * @see controls/MilestoneChart.js
 * 
 * author: SAP AG version: 30.04.2014 ============================================================
 */

// "use strict";
jQuery.sap.declare("i2d.pp.prdorderissue.details.controls.Milestone");
sap.ui.core.Control
		.extend("i2d.pp.prdorderissue.details.controls.Milestone",
				{

					metadata : {
						properties : {
							state : "int", // for the color code
							label : "string",
							plannedDate : "string",
							actualDate : "string",
							tooltip : "string", // optional tooltip value
							isDue : "boolean"
						}
					},

					isValid : function() {
						return this.getState() === 0;
					},

					isConfirmed : function() {
						return ((this.getActualDate() != undefined) && (this.getActualDate() != null) && (this.getActualDate()
								.trim().length > 0));
					}
				});
