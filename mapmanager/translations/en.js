/**
 * Copyright (c) 2009-2010 The Open Planning Project
 */

GeoExt.Lang.add("en", {
    "MSMGridPanel.prototype": {
        msg: "Loading...",
        textSearch: "Search",
        tooltipSearch: "Reset All Filters",
        textReset: "Reset",
        tooltipReset: "Reset All Filters",
        gridResourceId: "Resource Id",
        gridName: "Name",
        gridOwner: "Owner",
        gridDescription: "Description",
        gridDateCreation: "Date Creation",
        gridLastUpdate: "Last Update",
        errorTitle: "Request failure",
        errorMsg_500: "The server returns HTTP status code 500! </br></br>Check the log!",
        errorMsg_501: "The server returns HTTP status code 501! </br></br>The server does not support all that is needed for the request to be completed!",
        errorMsg_404: "The server returns HTTP status code 404! </br></br>The resource you are looking for cannot be found!",
        errorMsg_timeout: "Request Timeout!",
		textUserManager: 'User Manager',
        textViewMap: '', //"View Map",
        tooltipViewMap: "View Map",
        textCopyMap: '', //"Clone Map",
        tooltipCopyMap: "Clone Map",
        textEditMap: '', //"Edit Map",
        tooltipEditMap: "Edit Map",
        textDeleteMap: '', //"Delete Map",
        tooltipDeleteMap: "Delete Map",
        textEditMetadata: '', //"Edit Metadata",
        tooltipEditMetadata: "Edit Info",
        textSubmitEditMetadata: "Update",
        tooltipSubmitEditMetadata: "Update Info",
        titleConfirmCloseEditMetadata: 'Confirm',
        textConfirmCloseEditMetadata: 'Close window without saving?',
        metadataSaveSuccessTitle: "Success",
        metadataSaveSuccessMsg: "Metadata saved succesfully",
        metadataSaveFailTitle: "Metadata not saved succesfully",
        textClose: "Close",
        msgSaveAlertTitle: "Attention, your map is not saved!",
        msgSaveAlertBody: "Do you really want to quit without saving it?",
        tooltipClose: "Close Map",
        msgDeleteMapTitle: "Attention",
        msgDeleteMapBody: "Do You want to delete this map?",
        msgSuccessDeleteMapTitle: "Success",
        msgSuccessDeleteMapBody: "Map has been deleted",
        msgFailureDeleteMapTitle: "Failed",
        msgFailureDeleteMapBody: "Something wrong has appened",
        IframeViewerTitle: "Map Viewer - ",
        IframeComposerTitle: "Map Composer - "        
    },
    "MSMPagingToolbar.prototype": {
        desc: "New Map",
        textNewMap: "New Map",
        tooltipNewMap: "Create New Map",
        textExpandAll: "Expand All",
        tooltipExpandAll: "Expand All records",
        textCollapseAll: "Collapse All",
        tooltipCollapseAll: "Collapse All records",
        displayMsg: "Displaying results {0} - {1} of {2}",
        emptyMsg: "No results to display",
        firstText: "First Page",
        lastText: "Last Page",
        nextText: "Next Page",
        prevText: "Previous Page",
        refreshText: "Refresh",
        beforePageText: "Page",
		afterPageText : "of {0}",
		resizerText: "Maps per page"
    },
    "MSMPanel.prototype": {
        title : "MapManager"
    },
    "MSMLogin.prototype": {
        loginText: "Login",
        logoutText: "Logout",
        ruleText: "USER LOGGED: {user}",
        loginErrorText: "Invalid username or password.",
        loginErrorTitle: "Login failed.",
        userFieldText: "User",
        passwordFieldText: "Password",
        loginFormTitle: "Please Login"
    },
    "UserManagerView.prototype":{
		textName: 'Name',
		textPassword: 'Password',
		textPasswordEdit: 'New Password',
		textPasswordConf: 'Confirm Password',
		textPasswordConfError: 'Password not confirmed', 		
		textBlankUserName: 'Name should not be null',
		textBlankPw: 'Password should not be null',
		textBlankRole: 'Role should be selected',		
		tooltipEdit: 'Edit user data',
		textEditUserTitle: 'Edit user data',
		displayMsg: "Displaying results {0} - {1} of {2}",
		beforePageText: "Page",
		afterPageText : "of {0}",
		textRole: 'Role',
		tooltipDelete: 'Delete this user',
		textDelete: 'Delete',
		tooltipSave: 'Save this user',
		textSave: 'Save',
		tooltipCancel: 'Cancel saving',
		textCancel: 'Cancel',
		invalidFormMsg: 'Some fields are invalid',
		textAddUser: '', 
		textAddUserTitle: 'Add user',
		tooltipAddUser: 'Create a new user',
		textTitle: 'User Manager',
		tooltipSearch: "Search",
		userAlreadyTaken: 'User name has been already taken',
		textSelectRole: 'Select a role...',
		titleConfirmDeleteMsg: "Confirm delete user",
		textConfirmDeleteMsg: "Are you sure you want to delete this user?"	
	}
});
