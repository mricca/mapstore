/** This file contains the common configuration options 
 *  that can be overridden by the serverConfig objects in templates */
var localConfig = {
	geoStoreBase: "",
	proxy:"/http_proxy/proxy/?url=",
	defaultLanguage: "es",
	header: {
		"html": ["<div align='center' style='background-image:url(theme/app/img/banner/bgimg1.jpg);background-repeat: repeat;width:100%;height:100%;'><a target='_blank'><img src='theme/app/img/banner/header_salvador_title_subtitle.png' style='float:left;position:absolute;top:10px;left:20px;z-index: 10'/></a><img src='theme/app/img/banner/header_salvador_Loghi_min2.png' style='float:right;position:absolute;top:-5px;right:0px;'/></div>"],
		"container": {
			"border": false,
			"header": false,
			"collapsible": true,
			"collapseMode": "mini",
			"hideCollapseTool": true,
			"split": true,
			"animCollapse": false,
			"collapsed": true,
			"minHeight": 100,
			"maxHeight": 100,
			"height": 100
		}
	},
	footer: {}   
};