/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("i2d.pp.prdorderissue.details.controls.Milestone");sap.ui.core.Control.extend("i2d.pp.prdorderissue.details.controls.Milestone",{metadata:{properties:{state:"int",label:"string",plannedDate:"string",actualDate:"string",tooltip:"string",isDue:"boolean"}},isValid:function(){return this.getState()===0},isConfirmed:function(){return((this.getActualDate()!=undefined)&&(this.getActualDate()!=null)&&(this.getActualDate().trim().length>0))}});
