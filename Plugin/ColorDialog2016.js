'use strict';
namespace("SIMS.Components2016.Word");

SIMS.Components2016.Word.ColorDialog = SIMS.Components.Word.ColorDialog.extend({
    
    colorGridSelectedIndex: "0",

    RegisterMe: function () {
        this.base();
        this.RegisterAttribute("COLOR_GRID_SELECTED_INDEX", "0", "int", true);
    },

    SetAttribute: function (compid, attrName, value) {
        switch(attrName) {
            case "SELECTED_TAB_NUM":                
                this.$tabControl.setData({"selectedTabIndex":value});
                var callBackData = {selectedTabIndex: value};
                this.tabSelectionChanged("Fill Effects Tab Control", this.$tabControl, callBackData);
                break;
            default:
                this.base(compid, attrName, value);
                break;            
        }
    },

    GetAttribute: function (compid, attrName) {
        var attrValue = "";
        switch(attrName) {
            case "COMP_HEIGHT":
                attrValue = 365;
                break;
            case "COMP_WIDTH":                
                attrValue = 375;
                break;
            case "COLOR_GRID_SELECTED_INDEX":                
                attrValue = this.colorGridSelectedIndex;
                break;
            default:
                attrValue = this.base(compid, attrName);
                break;            
        }       
        return attrValue;
    },

    AttachComponentEvents: function (CompInfo, $Comp){
        var self = this;
        
        $.ajax({
            url: "app/Comps2016/Word/ColorDialog/js/ColorGridJSON.json",
            async: false,
            dataType: "json",
            success: function(response) {
                self.colorGridJSON = response;
            },
            error: function(error) {
                console.log(error);
            }
        });
        /*
        var newJson = self.colorGridJSON;
        for (var i = 0; i < self.colorGridJSON.length; i++) {
            var onClickFunctionArgs = self.colorGridJSON[i].xy;
            newJson[i].x = onClickFunctionArgs[0];
            newJson[i].y = onClickFunctionArgs[1];
            //delete newJson[i].xy;
        }
        console.log(JSON.stringify(newJson));*/
        
        self.base(CompInfo, $Comp);
        
        this.$tabControl.setData({'tabpageHeight': '325px', 'tabpageWidth': '275px'});
    },

    ColorGridHandler:function (controlName, $control, eventArgs) {
        this.$thisCompElement.find("#selectedhexagon").focus();
        this.$OKBtn.setData({enable: true});
    },

    CreateTab1: function($tabPage1){
        var self = this;
        var $wrapperControl = SIMS.Controls.Factory.getControl("wrapperControl", { type: "NonBaseControlWrapper" }, this, this.ColorGridHandler);
        $tabPage1.append($wrapperControl);

        var $page1Div = $("<div class='standard-color-container'></div>");
        $wrapperControl.append($page1Div);
        $wrapperControl.setData({ controls: [$page1Div], functionOnFocalize: "callback", functionOnAccessKey: "" });
        this.AttachKeycodesToControl(this.tabGroup.groupIDStandard, [], $wrapperControl, 1);

        var $colorGridContainer = $("<div class='color-grid-container'></div>");
        $page1Div.append($colorGridContainer);

        var $colorGridImage = $("<img/>", {class: 'color-grid-image', src: 'app/Comps2016/Word/ColorDialog/img/img_colormap.png', usemap: '#colormap', alt: 'colormap'});
        $colorGridContainer.append($colorGridImage);

        var $map = $("<map/>", {id: 'colormap', name: 'colormap'});
        $colorGridContainer.append($map);

        for (var i = 0; i < this.colorGridJSON.length; i++) {
            var $area = $("<area/>", {
                shape: "poly",
                coords: this.colorGridJSON[i].coords,
                x: this.colorGridJSON[i].x,
                y: this.colorGridJSON[i].y,
                index: this.colorGridJSON[i].index,
                hexagonColor: this.colorGridJSON[i].hexagonColor,
                group: this.colorGridJSON[i].group
            });
            $map.append($area);
        }

        $map.on('click', 'area', function(event) {

            self.$OKBtn.setData({enable: true});
            var $this = $(this);
            var hex = $this.attr("hexagonColor");
            var topOfClickedArea = parseInt($this.attr("y"));
            var leftOfClickedArea = parseInt($this.attr("x"));
            var indexOfClickedArea = parseInt($this.attr("index"));

            var $selectedHexagon = self.$thisCompElement.find("#selectedhexagon");
            if ((topOfClickedArea + 200) > -1 && leftOfClickedArea > -1) {
                $selectedHexagon.css({
                    "top": topOfClickedArea -3,
                    "left": leftOfClickedArea -3,
                    "visibility": "visible"
                });
                $selectedHexagon.attr("index", indexOfClickedArea);
            }
            
            self.$newColorDiv.css("background-color", hex);
            $selectedHexagon.focus();
            self.colorGridSelectedIndex = indexOfClickedArea;
        });

        self.areaArray = $map.find('area');

        var $selectedHexagon = $("<div/>", {id:'selectedhexagon', class: "selected-hexagon", tabindex: "1", index: "1"});
        $colorGridContainer.append($selectedHexagon);
        $selectedHexagon.focus();

        $selectedHexagon.on('keydown', function(event) {
            
            var $this = $(this);
            var currentSelectedIndex = parseInt($this.attr('index'));
            var nextIndex;

            var $selectElement = null;
            var seltop = null;
            var selleft = null;
            var hex = null;
            var groupId;
            var customArray;
            var curIndex;
            var $nextElement;

            switch(event.keyCode){
                case 38:
                    $selectElement = $(self.areaArray[currentSelectedIndex - 1]);
                    groupId = $selectElement.attr("group");
                    customArray = self.areaArray.parent().find("area[group='" + groupId + "']");
                    curIndex = customArray.index($selectElement);
                    
                    if(curIndex === 0) {
                        curIndex = 5 - parseInt(groupId);
                        customArray = self.areaArray.parent().find("area[group='" + 13 + "']");
                        $nextElement = $(customArray[curIndex]);
                    }
                    else{
                        $nextElement = $(customArray[curIndex - 1]);
                    }
                    break;
                case 37:
                    $nextElement = $(self.areaArray[currentSelectedIndex - 2]);
                    break;
                case 40:
                    $selectElement = $(self.areaArray[currentSelectedIndex - 1]);
                    groupId = $selectElement.attr("group");
                    customArray = self.areaArray.parent().find("area[group='" + groupId + "']");
                    curIndex = customArray.index($selectElement);
                    
                    if(curIndex === customArray.length - 1) {
                        if(groupId <= 7) {
                            $nextElement = $(self.areaArray[currentSelectedIndex]);
                        }
                        else {
                            curIndex = 13 - parseInt(groupId) + 3;
                            customArray = self.areaArray.parent().find("area[group='" + 1 + "']");
                            $nextElement = $(customArray[curIndex - 1]);
                        }
                    }
                    else{
                        $nextElement = $(customArray[curIndex + 1]);
                    }
                    break;
                case 39:
                    $nextElement = $(self.areaArray[currentSelectedIndex]);
                    break;
                case 9:
                case 13:
                    return true;
                default:
                    break;
            }
            if($nextElement !== undefined && $nextElement.length > 0) {
                hex = $nextElement.attr("hexagonColor");
                seltop = parseInt($nextElement.attr("y"));
                selleft = parseInt($nextElement.attr("x"));
                nextIndex = parseInt($nextElement.attr("index"));
            }

            if(seltop !== null) {
                $this.css({
                    "top": seltop -3,
                    "left": selleft -3,
                    "visibility": "visible"
                });
                $this.attr("index", nextIndex);
            }

            self.$newColorDiv.css("background-color", hex);
            self.colorGridSelectedIndex = nextIndex;
            $this.focus();
            
            event.stopPropagation();
            event.preventDefault();
        });
    }
});

