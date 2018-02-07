/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("i2d.pp.prdorderissue.details.Component");
jQuery.sap.require("i2d.pp.prdorderissue.details.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// check for BSP environment and set reuse library path
(function() {
	var iIndex = window.location.pathname.indexOf("/ui5_ui5/");
	if (iIndex !== -1) {
		var sPath = window.location.pathname.slice(0, iIndex + 8);
		sPath += "/sap/pp_mrp_reuse/i2d/pp/mrpcockpit/reuse";
		jQuery.sap.registerModulePath("i2d.pp.mrpcockpit.reuse", sPath);
	}
}());

sap.ca.scfld.md.ComponentBase
		.extend(
				"i2d.pp.prdorderissue.details.Component",
				{
					metadata : sap.ca.scfld.md.ComponentBase
							.createMetaData(
									"MD",
									{
										"name" : "Manage Production Order",
										"version" : "1.5.1",
										"library" : "i2d.pp.prdorderissue.details",
										"includes" : [],
										"dependencies" : {
											// added reuse project to allow preloading for reuse files
											"libs" : ["sap.m", "sap.me", "i2d.pp.mrpcockpit.reuse"],
											"components" : []
										},
										"config" : {
											"icon" : "sap-icon://Fiori2/F0250",
											"resourceBundle" : "i18n/i18n.properties",
											"titleResource" : "SHELL_TITLE",
											// Todo: change icon
											"favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/F0250_Manage_Uncovered_Sales_Order.ico",
											"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0250_Manage_Uncovered_Sales_Order/57_iPhone_Desktop_Launch.png",
											"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0250_Manage_Uncovered_Sales_Order/114_iPhone-Retina_Web_Clip.png",
											"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0250_Manage_Uncovered_Sales_Order/72_iPad_Desktop_Launch.png",
											"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0250_Manage_Uncovered_Sales_Order/144_iPad_Retina_Web_Clip.png",
										},
										viewPath : "i2d.pp.prdorderissue.details.view",

										detailPageRoutes : {
											// fill the routes to your detail pages in here. The application will navigate from the master
											// page to route "detail" leading to detail screen S3. If this is not desired please
											// define your own route "detail"
											"subDetail" : {
												"pattern" : "subDetail/ComponentShortageDefinitionID/{ComponentShortageDefinitionID}/MaterialID/{MaterialID}/MRPPlant/{MRPPlant}/MRPArea/{MRPArea}/MRPPlanningSegmentType/{MRPPlanningSegmentType}/MRPPlanningSegmentNumber/{MRPPlanningSegmentNumber}/MaterialShortageDefinitionID/{MaterialShortageDefinitionID}/MRPElement/{MRPElement}/MRPElementCategory/{MRPElementCategory}/SelectedSupDemItemDate/{SelectedSupDemItemDate}/ChartScrollPos/{ChartScrollPos}/DetailListNavProperty/{DetailListNavProperty}/DisplayInChart/{DisplayInChart}/stateID/{stateID}",
												"view" : "S4",
												"viewLevel" : 4
											},
											"MRPDetailRoute" : {
												"pattern" : "MRPDetailRoute/{contextPath}/stateID/{stateID}",
												"view" : "S3",
												"viewLevel" : 1
											}
										},
									}),

					/**
					 * Initialize the application
					 * 
					 * @returns {sap.ui.core.Control} the content
					 */
					createContent : function() {

						// add less processor for custom CSS
						jQuery.sap.require("sap.ca.ui.utils.Lessifier");

						if (sap.ca.ui.utils.Lessifier) {

							// general styles
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "styles/sapMRP.css", true);

							// general x30 styles
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "styles/sapMRPx30.css", true);

							// Solution Cards
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "controls/SolutionCards.css", true);

							// Chart
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "controls/Chart.css", true);

							// Stock Button
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "controls/Stock.css", true);

							// Scrollbar (Chrome) (already implemented in UI5)
							// sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "styles/sapMRPScrollbar.css", true);

							// Status Indicator
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "styles/sapMRPStatusIndicator.css", true);

							// Milestone Chart
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.prdorderissue.details", "controls/MilestoneChart.css", true);

							// Object Status Bar (Icons in Master List)
							sap.ca.ui.utils.Lessifier.lessifyCSS("i2d.pp.mrpcockpit.reuse", "controls/ObjectStatusBar.css", true);

						}

						var oViewData = {
							component : this
						};

						return sap.ui.view({
							viewName : "i2d.pp.prdorderissue.details.Main",
							type : sap.ui.core.mvc.ViewType.XML,
							viewData : oViewData
						});
					}
				});
