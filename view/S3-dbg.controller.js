/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.view.S3parent");
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.controls.Stock");
jQuery.sap.require("sap.ca.ui.model.type.Date");
jQuery.sap.require("sap.ca.ui.model.type.DateTime");
jQuery.sap.require("i2d.pp.prdorderissue.details.util.Formatters");
jQuery.sap.require("i2d.pp.prdorderissue.details.controls.Milestone");
jQuery.sap.require("i2d.pp.prdorderissue.details.controls.MilestoneChart");

i2d.pp.mrpcockpit.reuse.view.S3parent
		.extend(
				"i2d.pp.prdorderissue.details.view.S3",
				{

					/**
					 * @memberOf i2d.pp.prdorderissue.details.view.S3
					 */
					onInit : function() {

						// this is of the apps which needs the master record highlighted in the supply demand item list
						this.sdItemHighlightingNeeded = true;

						i2d.pp.mrpcockpit.reuse.view.S3parent.prototype.onInit.call(this);

						// local component model for handling counts
						var countModel = new sap.ui.model.json.JSONModel({
							ComponentsCount : ""
						});
						this.getView().setModel(countModel, "componentsModel");
					},

					onExit : function() {
						sap.ca.ui.utils.busydialog.releaseBusyDialog();
						i2d.pp.mrpcockpit.reuse.view.S3parent.prototype.onExit.call(this);
					},

					/**
					 * Returns true if both passed objects have the same keys
					 */
					compareKeys : function(object1, object2) {
						return (object1.MRPElement === object2.MRPElement && object1.MRPElementItem === object2.MRPElementItem && object1.MRPElementCategory === object2.MRPElementCategory);
					},

					/**
					 * Returns the name of the oData navigation property for the detail list
					 */
					getDetailListNavProperty : function() {
						return "ManufacturingOrder_To_SupplyDemandItems";
					},

					/**
					 * Handles the event Model Loaded
					 * 
					 * @param {object}oEvent
					 */
					_onModelLoaded : function(oEvent) {

						// Check if the "requestCompleted" event was related to the S3 detail call. We use the navigation property
						// of
						// the
						// URL (for the ODataCall) as an indicator
						var sParam = oEvent.getParameter("url");
						// TODO: make sure the Quick View do not need a special handling here
						if ((sParam.indexOf(this.getDetailListNavProperty()) < 0) && (sParam.indexOf("QuickViews") < 0)
								&& (sParam.indexOf("ManufacturingOrderComponents") < 0)) { // EXC_JSHINT_024
							// Since the navigation property was not part of the URL, it is definitely NOT the S3 call. Therefore we
							// quit.
							return;
						}

						// call parent
						i2d.pp.mrpcockpit.reuse.view.S3parent.prototype._onModelLoaded.call(this, oEvent);

						// handle loaded component tab content
						if (sParam.indexOf("ManufacturingOrderComponents") > 0) {
							this._updateComponentTabHeader(sParam);
							return;
						}

					},

					onAfterRendering : function() {

						i2d.pp.mrpcockpit.reuse.view.S3parent.prototype.onAfterRendering.call(this);
					},

					/**
					 * Derived from Base Class. This handler is called on matching Routing events. First we check whether the
					 * event is really relevant to S3 views in general. Then we check whether the event belongs to this particular
					 * S3 view. For this purpose we check whether the master list entity matches the first part of the context
					 * path (used for OData). If it matches, the base class functionality is called - otherwise, the routing event
					 * is ignored.
					 * 
					 * @param {object}oEvent
					 */
					_onRoutePatternMatched : function(oEvent) {
						var oView = this.getView();
						// The name of the event is the indicator from where the event is triggered.
						// So this condition ensures that this routing event belongs to (any) S3 view
						if (oEvent.getParameter("name") === i2d.pp.mrpcockpit.reuse.util.CommonConstants.ROUTING.DETAIL) {

							// Extract the path out of the event. It contains the master list entity of the ODataCall that shall be
							// sent
							var sPath = oEvent.getParameter("arguments").contextPath;
							// Check if the routing event is valid for the current app. The indicator is, whether the master list
							// entity
							// can be found at the beginning of the context path.
							// So this condition ensures that this routing event belongs to this particular S3 view
							if (sPath.indexOf(i2d.pp.prdorderissue.details.util.Constants.MASTER_LIST_ENTITY) === 0) {
								// Call the base class method
								i2d.pp.mrpcockpit.reuse.view.S3parent.prototype._onRoutePatternMatched.call(this, oEvent);
							} else {
								jQuery.sap.log.debug("Ignoring the routing event for view " + oView.getControllerName()
										+ " because the path " + sPath + " doesn't contain the required master list entity " // EXC_JSHINT_024
										+ i2d.pp.prdorderissue.details.util.Constants.MASTER_LIST_ENTITY); // EXC_JSHINT_024
								// Detach the handler for 'request completed' if we leave the view...
								oView.getModel().detachRequestCompleted(this._onModelLoaded, this);
							}
						} else {
							// Give the base class a chance to handle the case of leaving the view
							i2d.pp.mrpcockpit.reuse.view.S3parent.prototype._onRoutePatternMatched.call(this, oEvent);
						}
					},

					selectIconTabBarSelect : function(oEvent) {
						if (oEvent.getParameter("selectedKey") === "moComponentsTab") {
							this.byId("btnManageComponents").setVisible(true);
						} else {
							this.byId("btnManageComponents").setVisible(false);
						}
					},

					formatQuantity : function(oQuantity, oDecimalPlaces) {
						return Math.abs(parseFloat(oQuantity)).toFixed(oDecimalPlaces);
					},

					visibilityMissingQuantity : function(oMissingQuantity) {
						return (oMissingQuantity > 0);
					},

					_updateComponentTabHeader : function() {
						var componentsModel = this.getView().getModel("componentsModel");
						if (componentsModel) {
							// update count of all component tab
							var allTable = this.byId("allComponentsTable");
							var allCount = allTable.getBinding("items").iLength;
							componentsModel.setProperty("/ComponentsCount", allCount);
						}
					},

					formatComponentTabCount : function(oMissingComponentsCount) {
						if (!oMissingComponentsCount || (oMissingComponentsCount === 0)) {
							return "";
						}
						return oMissingComponentsCount;
					},

					formatComponentTabIconColor : function(oMissingComponentsCount) {
						if (oMissingComponentsCount && (parseInt(oMissingComponentsCount, 10) > 0)) {
							return sap.ui.core.IconColor.Negative;
						}
						return sap.ui.core.IconColor.Default;
					},

					onComponentsUpdateFinished : function() {
						this._enableOrDisableManageButton();
					},

					onComponentsSelectionChange : function() {
						this._enableOrDisableManageButton();
					},

					_enableOrDisableManageButton : function() {
						var selectedItems = this.byId("allComponentsTable").getSelectedItems();
						var manageComponentsButton = this.byId("btnManageComponents");
						if (!selectedItems || (selectedItems.length === 0)) {
							manageComponentsButton.setEnabled(false);
						} else {
							manageComponentsButton.setEnabled(true);
						}
					},

					formatDelay : function(oDelayInDays, oDelayedQuantity, oMissingQuantity) {
						if (parseFloat(oMissingQuantity) === 0) {
							return this.oApplicationFacade.getResourceBundle().getText("COMPONENT_STATUS_AVAILABLE");
						}
						if (oMissingQuantity !== oDelayedQuantity) {
							return this.oApplicationFacade.getResourceBundle().getText("COMPONENT_STATUS_UNCOVERED");
						}
						if (oDelayInDays > 1) {
							return this.oApplicationFacade.getResourceBundle().getText("COMPONENT_STATUS_LATE_BY_DAYS", oDelayInDays);
						}
						if (oDelayInDays > 0) {
							return this.oApplicationFacade.getResourceBundle().getText("COMPONENT_STATUS_LATE_BY_ONE_DAY");
						}
						return "";
					},

					formatDelayStatus : function(oMissingQuantity) {
						return oMissingQuantity > 0 ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None;
					},

					onManageComponents : function() {
						var fgetService = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
						var oCrossAppNavigator = fgetService && fgetService("CrossApplicationNavigation");
						if (oCrossAppNavigator) {

							// disable button and show busy indicator
							var manageComponentsButton = this.byId("btnManageComponents");
							manageComponentsButton.setEnabled(false);
							sap.ca.ui.utils.busydialog.requireBusyDialog();

							// Fix ID because of problems with the new cross app navigation, must be changed after UI5 fix the
							// property bag
							// bug
							// var bHash = (this._keyGen() + this._keyGen() + "-" + this._keyGen() + "-" + this._keyGen() + "-" +
							// this._keyGen() + "-" + this._keyGen() + this._keyGen() + this._keyGen()).toUpperCase();
							var bHash = "MRPCockpitNavigation.332";

							var oPersonalizationService = sap.ushell.Container.getService("Personalization");
							var sContainerName = bHash;
							if (oPersonalizationService.getContainer) {
								oPersonalizationService.getContainer(sContainerName, {
									validity : i2d.pp.mrpcockpit.reuse.util.CommonConstants.VIEW_STATE_VALIDITY_TIME
								}).fail(function() {
									sap.ca.ui.utils.busydialog.releaseBusyDialog();
									jQuery.sap.log.error("Loading personalization data failed.");
								}).done(function(oContainer) {
									oContainer.setItemValue("Navigation", this.getNavigationParams());
									oContainer.save().done(function() {
										sap.ca.ui.utils.busydialog.releaseBusyDialog();
										// trigger navigation
										oCrossAppNavigator.toExternal({
											target : this.getNavigationTarget(),
											params : {
												"navigationID" : bHash
											}
										});
									}.bind(this));
								}.bind(this));
							}
						}
					},

					// _keyGen : function() {
					// return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
					// },

					getNavigationParams : function() {

						var aSelectedItems = this.byId("allComponentsTable").getSelectedItems();
						var sMatShortDefID = this.byId("componentsObjectHeader").getBindingContext().getProperty(
								"ComponentShortageDefinitionID");
						var sDemandType = this.getDemandType();

						var aMatID = [];
						var aMRPArea = [];
						var aMRPPlant = [];
						var aMRPElement = [];
						var aMRPElementItem = [];
						var aMRPElementScheduleLine = [];
						var aMRPElementCategory = [];
						var aMRPElementAvailyOrRqmtDate = [];

						var i;
						for (i = 0; i < aSelectedItems.length; i++) {
							var aBindingContext = aSelectedItems[i].getBindingContext();
							var sMatID = aBindingContext.getProperty("MaterialID");
							aMatID.push(sMatID);
							var sMRPArea = aBindingContext.getProperty("MRPArea");
							aMRPArea.push(sMRPArea);
							var sMRPPlant = aBindingContext.getProperty("MRPPlant");
							aMRPPlant.push(sMRPPlant);
							var sMRPElement = aBindingContext.getProperty("MRPElement");
							aMRPElement.push(sMRPElement);
							var sMRPElementItem = aBindingContext.getProperty("MRPElementItem");
							aMRPElementItem.push(sMRPElementItem);
							var sMRPElementScheduleLine = "";
							aMRPElementScheduleLine.push(sMRPElementScheduleLine);
							var sMRPElementCategory = aBindingContext.getProperty("MRPElementCategory");
							aMRPElementCategory.push(sMRPElementCategory);
							var sMRPElementAvailyOrRqmtDate = aBindingContext.getProperty("MRPElementAvailyOrRqmtDate");
							aMRPElementAvailyOrRqmtDate.push(sMRPElementAvailyOrRqmtDate);
						}

						var oParams = {
							"MaterialShortageDefinitionID" : sMatShortDefID,
							"DemandType" : sDemandType,
							"MaterialID" : aMatID,
							"MRPArea" : aMRPArea,
							"MRPPlant" : aMRPPlant,
							"MRPElement" : aMRPElement,
							"MRPElementItem" : aMRPElementItem,
							"MRPElementScheduleLine" : aMRPElementScheduleLine,
							"MRPElementCategory" : aMRPElementCategory,
							"MRPElementAvailyOrRqmtDate" : aMRPElementAvailyOrRqmtDate
						};

						return oParams;
					},

					/**
					 * Provide demand type for manufacturing order reservations
					 */
					getDemandType : function() {
						return "8";
					},

					/**
					 * Returns the navigation target for the navigation to the corresponding manage app
					 */
					getNavigationTarget : function() {
						return {
							semanticObject : "MRPProductionRequirement",
							action : "manage"
						};
					},

					formatOpsTabIconColor : function(days) {
						return (days && (days > 0)) ? sap.ui.core.IconColor.Negative : sap.ui.core.IconColor.Default;
					},

					formatOpsColumnHeader : function(oCategory, oColumnProduction, oColumnProcess) {
						if (oCategory === "BR") {
							return oColumnProcess;
						}
						return oColumnProduction;
					}
				});
