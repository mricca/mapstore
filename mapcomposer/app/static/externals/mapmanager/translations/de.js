
/**
 * Copyright (c) 2009-2010 The Open Planning Project
 */

GeoExt.Lang.add("de", {
    "MSMGridPanel.prototype": {
        msg: "Loading ...",
        textSearch: "Suchen",
        tooltipSearch: "Karte-zum-Namen-Suche",
        textReset: "R&#252;cksetzen",
        tooltipReset: "Alle Filter entfernen",
        gridResourceId: "Ressourcen-ID",
        gridName: "Name",
        gridOwner: "Eigent&#252;mer",
        gridDescription: "Beschreibung",
        gridDateCreation: "Datum Der Erstellung",
        gridLastUpdate: "Zuletzt Aktualisiert",
        errorTitle: "Die Anforderung ist fehlgeschlagen",
        errorMsg_500: "Der Server gibt HTTP-Status-Code 500! </ br> </ br> Pr&#252;fen Sie das Protokoll!",
        errorMsg_501: "Der Server gibt HTTP-Status-Code 500! </br></br>Der Server konnte Ihre Anforderung nicht ausf&#252;hren!",
        errorMsg_404: "Der Server gibt HTTP-Status-Code 404!</br></br>Die Ressource, die Sie suchen, kann nicht gefunden werden!",
        errorMsg_timeout: "Zeit&#252;berschreitung der Anforderung!",
        textUserManager: "User Management",
        textViewMap: "", // "Karte anzeigen",
        tooltipViewMap: "Karte Anzeigen",
        textEmbedMap: "", //"Embed Map",
        tooltipEmbedMap: "Karte Einbinden",
		textCopyMap: "", //"Clone Karte",
        tooltipCopyMap: "Clone Karte",
        textEditMap: "", //"edit Map",
        tooltipEditMap: "&#196;ndern Map",
        textDeleteMap: "", //"Karte l&#246;schen",
        tooltipDeleteMap: "Karte l&#246;schen",
        textEditMetadata: "", //"Metadaten bearbeiten",
        tooltipEditMetadata: "Bearbeiten Info",
        textSubmitEditMetadata: "Aktualisieren",
        tooltipSubmitEditMetadata: "Aktualisieren Info",
        titleConfirmCloseEditMetadata: "Bestätigung",
        textConfirmCloseEditMetadata: "Schlie&#223;en Sie das Fenster ohne Speichern?",        
        metadataSaveSuccessTitle: "Erfolg",
        metadataSaveSuccessMsg: "Metadaten richtig gelagert",
        metadataSaveFailTitle: "Fehler beim Speichern der Metadaten",
        textClose: "Achlie&#223;en",
        msgSaveAlertTitle: "Bitte beachten Sie,die Karte ist nicht gespeichert",
        msgSaveAlertBody: "Wollen Sie wirklich verlassen ohne zu Speichern?",
        tooltipClose: "Schlie&#223;en Sie die Karte",
        msgDeleteMapTitle: "Achtung",
        msgDeleteMapBody: "Wollen Sie wirklich  die Karte l&#246;schen?",
        msgSuccessDeleteMapTitle: "Erfolg",
        msgSuccessDeleteMapBody: "Die Karte wurde beseitigt",
        msgFailureDeleteMapTitle: "Fehlgeschlagen",
        msgFailureDeleteMapBody: "Etwas falsch passiert",
        IframeViewerTitle: "Map Viewer - ",
        IframeComposerTitle: "Map Editor  - ",
        IframeWaitMsg :"Die Karte wird geladen ...",
		showMapTooltip: "In einem neuen Fenster anzeigen",	
		embedCodeTitle: "Embed Code",
		embedURL: "Direct URL",			
		urlLabel: "URL",
		exportMapText: "Link Map",
        mobileText: "Mobile", 
        installApplicationText: "Install Android-Anwendung", 
        loadThisSourceText: "F&#252;gen Sie diese Quelle zum Mapstore Mobile",
        scanThisApplicationText: "Scannen Sie diesen QR Code Mapstore f&#252;r Android installieren", 
        scanThisSourceText: "Scan diesen QR-Code, um diese Quelle zu deinen Mapstore Mobile-Anwendung hinzuf&#252;gen, m&#252;ssen Sie Mapstore f&#252;r Android installieren, bevor.",
        mapPermissionText: "Berechtigungen",
        tooltipMapPermissionText: "Karte bearbeiten berechtigungen von der gruppe",
        mapPermissionTitleText: "Map-Berechtigungen"
    },
    "MSMPagingToolbar.prototype": {
        desc: "Neue Karte",
        textNewMap: "Neue Karte",
        tooltipNewMap: "Erstellen Sie eine neue Karte",
        textExpandAll: "Zeilen Erweitern",
        tooltipExpandAll: "Erweitert alle Zeilen",
        textCollapseAll: "Zeilen Schlie&#223;en",
        tooltipCollapseAll: "Alle Zeilen schlie&#223;en",
        displayMsg: "Ergebnisse {0} - {1} von {2}",
        emptyMsg: "Keine Ergebnisse zu visualisieren",
        firstText: "Erste Seite",
        lastText: "Letzte Seite",
        nextText: "Nächste Seite",
        prevText: "Vorherige Seite",
        refreshText: "Aufladen",
        beforePageText: "Seite",
		afterPageText : "von {0}",
		resizerText: "Karten f&#252;r Seite"
    },
    "MSMPanel.prototype": {
        title : "MapManager"
    },
    "MSMLogin.prototype": {
        loginText: "Anmeldung",
        logoutText: "Verlassen",
        ruleText: "Angemeldeten Benutzer: {user}",
        loginErrorText: "Der Benutzername oder das eingegebene Kennwort ist falsch.",
        loginErrorTitle: "Authentifizierung fehlgeschlagen",
        userFieldText: "Benutzer",
        passwordFieldText: "Password",
        loginFormTitle: "Authentifizieren"
    },
    "UserManagerView.prototype":{
        textGeneral:"Allgemein",
        textAttributes:"Attribute",
        textGroups:"Gruppen",
		textName: "Name",
		textPassword: "Password",
		textPasswordEdit: "Neues Passwort",
		textPasswordConf: "Passwort Bestätigung",
		textPasswordConfError: "Passwort nicht bestätigt",		
		textBlankUserName: "Name darf nicht null sein",
		textBlankPw: "Kennwort darf nicht null sein",
		textBlankRole: "Rolle sollte gewählt werden",			
		tooltipEdit: "Benutzerdaten bearbeiten",
		textEditUserTitle: "Benutzerdaten Bearbeiten",
		displayMsg: "Ergebnisse {0} - {1} von {2}",
		beforePageText: "Seite",
		afterPageText : "von {0}",
		textRole: "Rolle",
		tooltipDelete: "Diesen Benutzer l&#246;schen",
		textDelete: "L&#246;schen",
		tooltipSave: "Speichern Sie diese Benutzer",
		textSave: "Speichern",
		tooltipCancel: "K&#252;ndigen",
		textCancel: "K&#252;ndigen",
		invalidFormMsg: "Einige Felder sind ung&#252;ltig",
		textAddUser: "", 
		textAddUserTitle: "Benutzer Hinzuf&#252;gen",
		tooltipAddUser: "Erstellen eines neuen Benutzerkontos",
		textTitle: "User Manager",
		tooltipSearch: "Suchen",
		textSelectRole: "W&#228;hlen Sie eine Rolle ...",
		userAlreadyTaken: "Dieser Benutzername",
		titleConfirmDeleteMsg: "L&#246;schen von Benutzerkonten Best&#228;tigen",
		textConfirmDeleteMsg: "Sind Sie sicher, dass Sie diesen Benutzer l&#246;schen wollen?",
        textManageGroups: "Gruppen Verwalten" 
	},
	"MSMUserGroupManager.prototype":{
        textGroupName: "Gruppenname",
        textId: "Id",
        textDescription: "Beschreibung",
        textAddGroupButton: "Erstellen Sie eine neue Gruppe",
        groupNameAlreadyTaken: "Gruppenname bereits vergeben",
        titleConfirmDeleteMsg: "L&#246;schen best&#228;tigen Gruppe",
        textConfirmDeleteMsg: "Sind Sie sicher, dass Sie diese Gruppe l&#246;schen wollen?",
        textName: "Name",
        textRole: "Rolle",
        textGroup: "Gruppe",
        textUsers: "Benutzer",
        textSave: "Speichern",
        textClose: "Schlie&#223;en",
        textDetails: "Details",
        tooltipGroupInfo: "Informationen &#252;ber diese Gruppe",
        tooltipDelete: "Diese Gruppe l&#246;schen"
    },
    "EmbedMapDialog.prototype": {
        publishMessage: "Die Karte ist f&#252;r die WEB-Ver&#246;ffentlichung bereit! Den folgenden HTML-Code kopieren um die Karte auf der eigenen WEB-Seite anzuzeigen:",
        heightLabel: "H&#246;he",
        widthLabel: "Breite",
        mapSizeLabel: "Kartengr&#246;&#223;e",
        miniSizeLabel: "Mini",
        smallSizeLabel: "Klein",
        premiumSizeLabel: "Premium",
        largeSizeLabel: "Gro&#223;",
        loadMapText: "Load this Map (installieren Sie zuerst die Anwendung)", 
        downloadAppText: "Die Anwendung Installieren", 
        loadInMapStoreMobileText: "Mobile",
        openImageInANewTab: "Bild in einem neuen Tab"
    },
    "mxp.plugins.CategoriesInitializer.prototype":{
        geostoreInitializationTitleText: "Initialisierung fehlgeschlagen",
        geostoreInitializationText: "GeoStore nntwort nicht die erwartete",
        notInitializedCategories: "Fehlende kategorien: '{0}'. Haben Sie ihn erstellen?",
        userFieldText: "Benutzer",
        passwordFieldText: "Password",
        acceptText: "Schaffen",
        cancelText: "Annullieren",
        notInitializedCategoriesWithCredentials: "<div class='initCategoriesMessage'>Wenn Sie ein Administrator sind, geben Sie bitte Ihre Anmeldeinformationen, um diese Kategorien erstellen: '{0}'</div>"
    },
    "mxp.form.UserGroupComboBox.prototype":{
        fieldLabel: "Benutzergruppe"
    },
    "mxp.widgets.ResourceGroupPermissionGrid.prototype":{
        refreshText: "Aktualisieren Gitter",
        addText: "Ein neues Sicherheitsregel basierend auf Benutzergruppen",
        addNewSecurityRuleTitleText: "Ein neues Sicherheitsregel",
        editSecurityRuleTitleText: "Edit Sicherheitsregel für die Gruppe '{0}'",
        groupNameTitleText: "Fehler", 
        groupNameExistsText: 'Eine Regel für diese Gruppe Name bereits vorhanden ist, wählen Sie bitte eine andere oder diese Regel zu bearbeiten',
        groupNameIncompleteText: 'Not group selected. Please select one before save.',
        textSave:'Speichern',
        textClose:'Schlie&#223;en',
        textGroupName: 'Gruppe',
        textUserName: 'Benutzer',
        textCanRead: 'Lesen können',
        textCanWrite: 'Können schreiben',
        editText: "Bearbeiten ausgewählt Sicherheitsregel",
        deleteText: "Löschen ausgewählt Sicherheitsregel",
        trueBooleanText: "Ja",
        falseBooleanText: "Nein",
        confirmDeleteTitleText: "Löschen Security-Regel",
        confirmDeleteText: "Glauben Sie wirklich wollen , um die Regel für die Gruppe '{0}' löschen?"
    },
    "mxp.widgets.ResourceGroupPermissionWindow.prototype":{
        title:"Ressourcenberechtigungen"
    },
    "MSMTemplatePanel.prototype":{
        title: "Vorlage-Editor",
        headerTitleText: "Kopfzeile",
        footerTitleText: "Fu&#223;zeile",
        sectionContentTitleText: "{0} Inhalt",
        sectionCSSTitleText: "CSS-Stil",
        sectionLayoutConfigTitleText: "Layout-Konfiguration",
        borderText: "Grenze",
        animeCollapseText: "Anim. Kollaps",
        hideCollapseText: "Verstecken Kollaps",
        splitText: "Split",
        collapsibleText: "Zusammenklappbar",
        collapseModeText: "Zusammenbruch-Modus",
        widthText: "Breite",
        heightText: "H&#246;he",
        minWidthText: "Min Breite",
        maxHeightText: "Max H&#246;he",
        failSuccessTitle: "Fehler",
        mapMetadataTitle: "Speichern Sie eine Vorlage",
        mapMedatataSetTitle: "",
        mapNameLabel: "Name",
        mapDescriptionLabel: "Beschreibung", 
        addResourceButtonText: "Speichern",
        templateSuccessMsgText: "Erfolgreich Gespeichert",
        templateSuccessTitleText: "OK",
	    newTemplateText: "Neu",
	    saveTemplateText: "Speichern"
    },
	"MSMTemplateGridPanel.prototype":{
		textId: "Id",
		textName: "Name",
		textOwner: "Eigent&#252;mer",
		textCreation: "Datum-Erstellung",
		textLastUpdate: "Letzte Aktualisierung", 
	    tooltipSearch: "Geben Sie einen namen zur suche",
	    textReset: "Reset",
	    tooltipReset: "Saubere suche",
	    failSuccessTitle: "Fehler",
	    resizerText: "Vorlagen pro Seite",
	    tooltipDelete: "Vorlage l&#246;schen",
		deleteTemplateTitleText: "Achtung",
		deleteTemplateBodyText: "Wollen Sie diese Vorlage l&#246;schen?"
	},
    "mxp.plugins.MapManager.prototype":{
        buttonText: "Karte-Manager",
        tooltipText: "Offen Karte-Manager"
    },
    "mxp.plugins.TemplateManager.prototype":{
        buttonText: "Vorlagen",
        tooltipText: "Offen Vorlagen-Manager"
    },
	"MSMTemplateManager.prototype":{
		title: "Vorlage-Manager"
	},
    "mxp.widgets.GeoStoreResourceForm.prototype": {
         dataFieldLabel: "Ressource", 
         namelabel: "Name", 
         textAttribute: "Attribute", 
         textGeneral: "Allgemein" ,
         description: "Beschreibung",
         visibilityLabel: "Sichtbarkeit", 
         textSave: "Speichern" ,
         savingMessage: "Saving ...", 
         loadingMessage: "Loading ..." ,
         saveSuccessTitle: "Saved", 
         saveSuccessMessage: "Ressourcen erfolgreich gespeichert",
         failSaveTitle: "Fehler beim Speichern von Ressourcen", 
         resourceNotValid: "Ressourcen nicht gültig", 
         deleteSuccessMessage: "Ressourcen Erfolgreich gelöscht", 
         permissionTitleText: "Berechtigungen" 
     }, 
     "mxp.widgets.GeoStoreCategoryManager.prototype": {
         resourceListTitle: "Ressourcen",
         emptyMessage: "Nein Ressource angezeigt werden", 
         displayMessage: "Zeige {0} - {1} von {2}"
     }
});
