 $(function(){
    $('li[class^="type-"]').mouseover(function(){
      var currentClass = $(this).attr('class').split(' ')[0];
      if(currentClass != 'empty'){
      	$('.main > li').addClass('deactivate');
      	$('.' + currentClass).removeClass('deactivate');
      }
    });
   
   $('li[class^="cat-"]').mouseover(function(){
      var currentClass = $(this).attr('class').split(' ')[0];
      	$('.main > li').addClass('deactivate');
      	$('.' + currentClass).removeClass('deactivate');
    }); 
    
    $('.main > li').mouseout(function(){
      var currentClass = $(this).attr('class').split(' ')[0];
       $('.main > li').removeClass('deactivate');
    });
     $('.main > li').click(function(){
		var app = window.parent.app;
		var Ext = window.parent.Ext;
		var data = window.parent.elementsData;
		var element = this.firstChild.data;
		var urlElement;
		var urlForegs;
		var title;
		
		for (var i = 0;i<data.elements.length;i++){
			if(data.elements[i][1] === element){
				urlElement = data.elements[i][2];
				urlForegs = data.elements[i][3];
				title = data.elements[i][0];
			}
		}
		
		if (typeof urlElement === 'undefined'){
            Ext.MessageBox.show({
                title: 'Schede Elementi',
                msg: 'Schede non ancora presenti per l\'elemento selezionato!<BR/>Gli elementi corredati di schede presentano il bordo rosso!',
                buttons: Ext.Msg.OK,
                animEl: 'elId',
                icon: Ext.MessageBox.INFO
            });
            Ext.MessageBox.getDialog().getEl().setStyle("zIndex", 100000);                    
            return;			
		}
		
        var tabPanel = Ext.getCmp(app.renderToTab);

		var elementTab = new Ext.TabPanel({
			border: false,
			activeTab: 0,
			id: "newPanel",
			region: "center",
			width: 340,
			split: true,
			collapsible: false,
			header: false,
			enableTabScroll: true,
			items: []
		});
		
        var tabs = tabPanel.find('title', title);
        if(tabs && tabs.length > 0){
            tabPanel.setActiveTab(tabs[0]); 
        }else{
            
            var linkTab = new Ext.Panel({
                title: title,
                id:title + "_elementTab", 
                layout:'fit', 
                tabTip: title,
                closable: true,
                items: [
					elementTab
                ]
            });
			
            var urlElementTab = new Ext.Panel({
                title: "Scheda - Elemento",
                id:title + "elemento", 
                layout:'fit', 
                tabTip: "Scheda - "+title,
                closable: false,
                items: [
                    new Ext.ux.IFrameComponent({ 
                        url: urlElement
                    }) 
                ]
            });			
			
            var urlForegsTab = new Ext.Panel({
                title: "Scheda - Foregs",
                id:title + "foregs", 
                layout:'fit', 
                tabTip: "Foregs - "+title,
                closable: false,
                items: [
                    new Ext.ux.IFrameComponent({ 
                        url: urlForegs
                    }) 
                ]
            });				
            tabPanel.add(linkTab);
			elementTab.add(urlElementTab,urlForegsTab);
            tabPanel.setActiveTab(linkTab.getId());
        }	
		
    });
 
}); 