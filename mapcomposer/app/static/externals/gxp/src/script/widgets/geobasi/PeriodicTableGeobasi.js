Ext.namespace('geobasi.periodictable');

geobasi.periodictable = {


    /**
    * i18n Start
    */    
    msgAlertElementsFormTitleText: 'Schede Elementi',
    msgAlertElementsFormMsgText: 'Schede non ancora presenti per l\'elemento selezionato!<BR/>Gli elementi corredati di schede presentano il bordo rosso!',
    elementsFormTabTitleText: "Scheda - Elemento",
    formTabTip: "Scheda",
    foregsFormTabTitleText: "Scheda - Foregs",
    foregsTabTip: "Foregs",
    /**
    * i18n End
    */
    
    createTab : function (data, element) {

        var urlElement;
        var urlForegs;
        var title;

        for (var i = 0; i < data.elements.length; i++) {
            if (data.elements[i][1] === element) {
                urlElement = data.elements[i][2];
                urlForegs = data.elements[i][3];
                title = data.elements[i][0];
            }
        }

        if (typeof urlElement === 'undefined') {
            Ext.MessageBox.show({
                title : this.msgAlertElementsFormTitleText,
                msg : this.msgAlertElementsFormMsgText,
                buttons : Ext.Msg.OK,
                animEl : 'elId',
                icon : Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);
            return;
        }

        var tabPanel = Ext.getCmp(app.renderToTab);

        var elementTab = new Ext.TabPanel({
                border : false,
                activeTab : 0,
                id : "newPanel",
                region : "center",
                width : 340,
                split : true,
                collapsible : false,
                header : false,
                enableTabScroll : true,
                items : []
            });

        var tabs = tabPanel.find('title', title);
        if (tabs && tabs.length > 0) {
            tabPanel.setActiveTab(tabs[0]);
        } else {

            var linkTab = new Ext.Panel({
                    title : title,
                    id : title + "_elementTab",
                    layout : 'fit',
                    tabTip : title,
                    closable : true,
                    items : [
                        elementTab
                    ]
                });

            var urlElementTab = new Ext.Panel({
                    title : this.elementsFormTabTitleText,
                    id : title + "elemento",
                    layout : 'fit',
                    tabTip : this.formTabTip + " - " + title,
                    closable : false,
                    items : [
                        new Ext.ux.IFrameComponent({
                            url : urlElement
                        })
                    ]
                });

            var urlForegsTab = new Ext.Panel({
                    title : this.foregsFormTabTitleText,
                    id : title + "foregs",
                    layout : 'fit',
                    tabTip : this.foregsTabTip + " - " + title,
                    closable : false,
                    items : [
                        new Ext.ux.IFrameComponent({
                            url : urlForegs
                        })
                    ]
                });
            tabPanel.add(linkTab);
            elementTab.add(urlElementTab, urlForegsTab);
            tabPanel.setActiveTab(linkTab.getId());
        }

    }

};