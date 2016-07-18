
Ext.namespace('geobasi.getdata');

geobasi.getdata = {
    
    /**
    * i18n Start
    */    
    boxPlotUndefinedAnalyticalMethod: 'Metodo Analitico non specificato',
    barChartUndefinedAnalyticalMethod: 'non specificato',
    /**
    * i18n End
    */            
    
    getFilter: function(me) {
        
        if (me.filter.filterPolygon && me.filter.filterPolygon.value) {
        
            return me.filter.filterPolygon;
        
        } else if (me.filter.filterCircle && me.filter.filterCircle.value) {
            
            return me.filter.filterCircle;
            
        } else if (me.filter.searchWFSComboAlluvioni && me.filter.searchWFSComboAlluvioni.geometry) {
            
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(me.filter.searchWFSComboAlluvioni.geometry);
            
            me.vectorSelectionArea = me.filter.searchWFSComboAlluvioni.lastSelectionText;
            
            return new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            
        } else if (me.filter.searchWFSComboRoccia && me.filter.searchWFSComboRoccia.geometry) {
            
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(me.filter.searchWFSComboRoccia.geometry);
            
            
            me.vectorSelectionArea = me.filter.searchWFSComboRoccia.lastSelectionText;
                        
            return new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            
        } else if (me.filter.searchWFSComboComuniRT && me.filter.searchWFSComboComuniRT.geometry) {
            
            var geoJSON = new OpenLayers.Format.WKT();
            var geoJSONgeometry = geoJSON.read(me.filter.searchWFSComboComuniRT.geometry);
            
            me.vectorSelectionArea = me.filter.searchWFSComboComuniRT.lastSelectionText;
            
            return new OpenLayers.Filter.Spatial({
                type: OpenLayers.Filter.Spatial.INTERSECTS,
                property: "geom",
                value: geoJSONgeometry.geometry
            });
            
        } else {
            
            me.vectorSelectionArea = false;
            return false;
            
        }
        
    },
    
    getBoxPlotData: function(json, metodoElaborazione, me) {

        var arrLength = json.features.length;
        var dataPoints = [];
        var medianaBoxPlot;
        switch (metodoElaborazione) {
            case "1":
                medianaBoxPlot = (arrLength % 2 == 0) ? (Math.log(json.features[((arrLength) / 2) - 1].properties.value) + Math.log(json.features[((arrLength + 2) / 2) - 1].properties.value)) / 2 : Math.log(json.features[((arrLength + 1) / 2) - 1].properties.value);
                break;
            case "2":
                medianaBoxPlot = (arrLength % 2 == 0) ? (json.features[((arrLength) / 2) - 1].properties.value + json.features[((arrLength + 2) / 2) - 1].properties.value) / 2 : json.features[((arrLength + 1) / 2) - 1].properties.value;
                break;
        }
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function(fun) {
                "use strict";
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t)
                        fun.call(thisArg, t[i], i, t);
                }
            };
        }

        function uniqueBy(arr, fn) {
            var unique = {};
            var distinct = [];
            arr.forEach(function(x) {
                var key = fn(x);
                if (!unique[key]) {
                    distinct.push(key);
                    unique[key] = true;
                }
            });
            return distinct;
        }
        var uniqueTipometa = uniqueBy(json.features, function(x) {
            return x.properties.method;
        });
        for (var i = 0; i < uniqueTipometa.length; i++) {
            var minimo;
            var massimo;
            var myValues = [];
            var metodoAnalitico = uniqueTipometa[i] === null ? '-999' : uniqueTipometa[i];
            var b = 0;
            var firstPercentile;
            var thirdPercentile;
            for (var c = 0; c < arrLength; c++) {
                json.features[c].properties.method = json.features[c].properties.method === null ? '-999' : json.features[c].properties.method;
                if (metodoAnalitico === json.features[c].properties.method) {
                    myValues[b] = {
                        metodo: json.features[c].properties.method,
                        valore: metodoElaborazione == '1' ? Math.log(json.features[c].properties.value) : json.features[c].properties.value,
                        bbox: json.features[c].properties.bbox
                    };
                    b++;
                }
            }
            var conteggio = myValues.length;
            var firstPercentileVal = (conteggio + 1) / 4;
            var secondPercentile = (conteggio % 2 == 0) ? (myValues[((conteggio) / 2) - 1].valore + myValues[((conteggio + 2) / 2) - 1].valore) / 2 : myValues[((conteggio + 1) / 2) - 1]['valore'];
            var thirdPercentileVal = (conteggio + 1) * 3 / 4;
            var is_int = function(value) {
                if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
                    return true;
                } else {
                    return false;
                }
            }
            var intval = function(mixed_var, base) {
                var tmp;
                var type = typeof mixed_var;
                if (type === 'boolean') {
                    return +mixed_var;
                } else if (type === 'string') {
                    tmp = parseInt(mixed_var, base || 10);
                    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
                } else if (type === 'number' && isFinite(mixed_var)) {
                    return mixed_var | 0;
                } else {
                    return 0;
                }
            }
            if (is_int(firstPercentileVal)) {
                if (conteggio >= 4) {
                    firstPercentile = myValues[firstPercentileVal - 1].valore;
                } else {
                    firstPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var first = myValues[intval(firstPercentileVal) - 1].valore;
                    var second = myValues[(intval(firstPercentileVal) - 1) + 1].valore;
                    var third = myValues[intval(firstPercentileVal) - 1].valore;
                    var forth = intval(firstPercentileVal);
                    firstPercentile = first + ((second) - third) * (firstPercentileVal - (forth));
                } else {
                    firstPercentile = null;
                }
            }
            if (is_int(thirdPercentileVal)) {
                if (conteggio >= 4) {
                    thirdPercentile = myValues[thirdPercentileVal - 1].valore;
                } else {
                    thirdPercentile = null;
                }
            } else {
                if (conteggio >= 4) {
                    var primo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var secondo = myValues[(intval(thirdPercentileVal) - 1) + 1].valore;
                    var terzo = myValues[intval(thirdPercentileVal) - 1].valore;
                    var quarto = intval(thirdPercentileVal);
                    thirdPercentile = primo + ((secondo) - terzo) * (thirdPercentileVal - (quarto));
                } else {
                    thirdPercentile = null;
                }
            }
            var minimo = myValues[0].valore;
            var massimo = myValues[conteggio - 1].valore;
            var firstPercRecalc = firstPercentile - 1.5 * (thirdPercentile - firstPercentile);
            var thirdPercRecalc = thirdPercentile + 1.5 * (thirdPercentile - firstPercentile);
            var newMin = minimo > firstPercRecalc ? minimo : firstPercRecalc;
            var newMax = massimo < thirdPercRecalc ? massimo : thirdPercRecalc;
            var outlier = [];
            var outlierBbox = [];
            var h = 0
            for (var c = 0; c < conteggio; c++) {
                if (metodoAnalitico == myValues[c].metodo) {
                    if (myValues[c].valore < newMin || myValues[c].valore > newMax) {
                        outlier[h] = [i, Math.round10(myValues[c].valore, -5)];
                        outlierBbox[h] = [i, myValues[c].bbox];
                        h++;
                    }
                }
            }
            var obj = null;
            dataPoints[i] = {
                experiment: metodoAnalitico === '-999' ? this.boxPlotUndefinedAnalyticalMethod : metodoAnalitico,
                min: Math.round10(newMin, -5),
                q1: Math.round10(firstPercentile, -5),
                med: Math.round10(secondPercentile, -5),
                q2: Math.round10(thirdPercentile, -5),
                max: Math.round10(newMax, -5),
                outlier: outlier,
                median: Math.round10(medianaBoxPlot, -5),
                sigla: json.features[0].properties.element,
                totaleRiprova: arrLength,
                matrice: json.features[0].properties.matrix_cod,
                dmgeomattipo_descr: me.form.output.getForm().getValues().tipo_matrice,
                startYear: me.form.output.getForm().getValues().startYear,
                endYear: me.form.output.getForm().getValues().endYear,
                nullDate: me.form.output.getForm().getFieldValues().allownull,
                vectorSelectionArea: me.vectorSelectionArea,
                log: metodoElaborazione,
                bbox: outlierBbox
            };
        }
        return dataPoints;
    },

    getBarChartData: function(json, metodoElaborazione, me) {
        var num_ele = json.features.length;
        var custLog = function(x, base) {
            return (Math.log(x)) / (Math.log(base));
        }
        var numClassi = 1 + (10 / 3) * (custLog(num_ele, 10));
        var resultsLog = [];
        for (var x = 0; x < num_ele; x++) {
            resultsLog[x] = {
                valore: metodoElaborazione == "1" ? Math.round10(Math.log(json.features[x].properties.value), -4) : Math.round10(json.features[x].properties.value, -4)
            };
            me.jsonData2.features[x].attributes = {
                valore: resultsLog[x].valore,
                classe: 0,
                colore: ''
            };
        }
        var conteggio = resultsLog.length;
        var barMinimo = resultsLog[0].valore;
        var barMassimo = resultsLog[conteggio - 1].valore;
        var ampClassiInit = (barMassimo - barMinimo) / Math.round(numClassi);
        var ampClassi = Math.round10(ampClassiInit, -4);
        var numerositaClassi = new Array();
        for (var i = 0; i < Math.round(numClassi); i++) {
            numerositaClassi[i] = {
                classe: i,
                conteggio: 0,
                ampiezza: ampClassi,
                num_ele: num_ele,
                ampiezzaMin: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i)), -4) : Math.round10(barMinimo + (ampClassi * (i)), -4),
                ampiezzaMax: metodoElaborazione == "1" ? Math.round10(barMinimo + (ampClassi * (i + 1)), -4) : Math.round10(barMinimo + (ampClassi * (i + 1)), -4)
            };
        }
        me.columnChartColors = jsgradient.generateGradient(me.colorGradient.start, me.colorGradient.end, numerositaClassi.length);
        for (var x = 0; x < num_ele; x++) {
            if (resultsLog[x].valore < barMinimo + ampClassi) {
                numerositaClassi[0].conteggio++;
                me.jsonData2.features[x].attributes.classe = numerositaClassi[0].classe + 1;
                me.jsonData2.features[x].attributes.colore = me.columnChartColors[numerositaClassi[0].classe];
                resultsLog[x].valore = "undefined";
            } else if (resultsLog[x].valore >= (barMinimo + (ampClassi * (Math.round(numClassi))))) {
                numerositaClassi[Math.round(numClassi) - 1].conteggio++;
                me.jsonData2.features[x].attributes.classe = numerositaClassi[Math.round(numClassi) - 1].classe + 1;
                me.jsonData2.features[x].attributes.colore = me.columnChartColors[numerositaClassi[Math.round(numClassi) - 1].classe];
                resultsLog[x].valore = "undefined";
            }
        }
        for (var y = 1; y < Math.round(numClassi); y++) {
            for (var x = 0; x < num_ele; x++) {
                var aaa = resultsLog[x].valore;
                var bbb = barMinimo + (ampClassi * (y));
                var ccc = barMinimo + (ampClassi * (y + 1));
                if (resultsLog[x].valore >= (barMinimo + (ampClassi * (y))) && resultsLog[x].valore < (barMinimo + (ampClassi * (y + 1)))) {
                    numerositaClassi[y].conteggio++;
                    me.jsonData2.features[x].attributes.classe = numerositaClassi[y].classe + 1;
                    me.jsonData2.features[x].attributes.colore = me.columnChartColors[numerositaClassi[y].classe];
                    resultsLog[x].valore = "undefined";
                }
            }
        }
        var countElem = 0;
        var dataPoints = [];
        var resp;
        var classe;
        var classe_num;
        for (var i = 0; i < numerositaClassi.length; i++) {
            countElem = countElem + numerositaClassi[i].conteggio;
        }
        for (var i = 0; i < numerositaClassi.length; i++) {
            classe_num = numerositaClassi[i].classe + 1;
            classe = numerositaClassi[i].ampiezzaMin + " | " + numerositaClassi[i].ampiezzaMax;
            dataPoints[i] = {
                uuidelemento: classe,
                classe: classe_num,
                color: me.columnChartColors[i],
                valore: numerositaClassi[i].conteggio,
                totaleOriginale: numerositaClassi[i].num_ele,
                totaleRiprova: countElem,
                tipoMeta: !json.features[i].properties.method ? this.barChartUndefinedAnalyticalMethod : json.features[i].properties.method,
                num_classi: numerositaClassi.length,
                ampiezza_classi: metodoElaborazione == "1" ? Math.round10(ampClassi, -4) : ampClassi,
                sigla: json.features[i].properties.element,
                matrice: json.features[i].properties.matrix_cod,
                dmgeomattipo_descr: json.features[i].properties.matrix,
                log: metodoElaborazione,
                viewparams: me.viewparams3,
                bbox: json.bbox,
                spatialFilter: me.xml ? me.xml : null,
                jsonData: me.jsonData2,
                dmgeomattipo_descr: me.form.output.getForm().getValues().tipo_matrice,
                startYear: me.form.output.getForm().getValues().startYear,
                endYear: me.form.output.getForm().getValues().endYear,
                nullDate: me.form.output.getForm().getFieldValues().allownull,
                vectorSelectionArea: me.vectorSelectionArea
            };
        }
        return dataPoints;
    },
    
    getCurvCumulData: function(json, metodoElaborazione, me) {
        var num_ele = json.features.length;
        var cumulata = [];
        var custLog = function(x, base) {
            return (Math.log(x)) / (Math.log(base));
        }
        for (var c = 0; c < num_ele; c++) {
            cumulata[c] = {
                cumX: metodoElaborazione == "1" ? [Math.round10(Math.log(json.features[c].properties.value), -4), Math.round10(((c + 1) - 0.5) / num_ele, -4)] : [Math.round10(json.features[c].properties.value, -4), Math.round10(((c + 1) - 0.5) / num_ele, -4)]
            }
        }
        var dataPoints = [];
        var newNumEle = num_ele;
        for (var i = 0; i < newNumEle; i++) {
            dataPoints[i] = {
                uuidelemento: cumulata[i].cumX,
                totaleRiprova: num_ele,
                sigla: json.features[i].properties.element,
                matrice: json.features[i].properties.matrix_cod,
                log: metodoElaborazione,
                bbox: json.bbox,
                spatialFilter: me.xml ? me.xml : null,
                dmgeomattipo_descr: me.form.output.getForm().getValues().tipo_matrice,
                startYear: me.form.output.getForm().getValues().startYear,
                endYear: me.form.output.getForm().getValues().endYear,
                nullDate: me.form.output.getForm().getFieldValues().allownull,
                vectorSelectionArea: me.vectorSelectionArea,
                jsonData: json
            };
        }
        return dataPoints;
    }  
};

(function() {
    function decimalAdjust(type, value, exp) {
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

(function() {
    jsgradient = {
        inputA: '',
        inputB: '',
        inputC: '',
        gradientElement: '',
        hexToRgb: function(hex) {
            var r, g, b, parts;
            hex = hex.replace('#', '');
            if (hex.length !== 3 && hex.length !== 6) {
                return [255, 255, 255];
            }
            if (hex.length == 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            r = parseInt(hex.substr(0, 2), 16);
            g = parseInt(hex.substr(2, 2), 16);
            b = parseInt(hex.substr(4, 2), 16);
            return [r, g, b];
        },
        rgbToHex: function(color) {
            color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
            color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
            color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];
            return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
        },
        zeroFill: function(number, width) {
            width -= number.toString().length;
            if (width > 0) {
                return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
            }
            return number;
        },
        generateGradient: function(colorA, colorB, steps) {
            var result = [],
                rInterval, gInterval, bInterval;
            colorA = this.hexToRgb(colorA);
            colorB = this.hexToRgb(colorB);
            steps -= 1;
            rStep = (Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0])) / steps;
            gStep = (Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1])) / steps;
            bStep = (Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2])) / steps;
            result.push('#' + this.rgbToHex(colorA));
            var rVal = colorA[0],
                gVal = colorA[1],
                bVal = colorA[2];
            for (var i = 0; i < (steps - 1); i++) {
                rVal = (colorA[0] < colorB[0]) ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
                gVal = (colorA[1] < colorB[1]) ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
                bVal = (colorA[2] < colorB[2]) ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
                result.push('#' + this.rgbToHex([rVal, gVal, bVal]));
            };
            result.push('#' + this.rgbToHex(colorB));
            return result;
        },
        gradientList: function(colorA, colorB, list) {
            var list = (typeof list === 'object') ? list : document.querySelector(list);
            var listItems = list.querySelectorAll('li'),
                steps = listItems.length,
                colors = jsgradient.generateGradient(colorA, colorB, steps);
            for (var i = 0; i < listItems.length; i++) {
                var item = listItems[i];
                item.style.backgroundColor = colors[i];
            };
        }
    };
})();