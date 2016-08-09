if(typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F(){}
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined){
    var Grid = {
        init: function(options, elem) {
            var self = this;
            self.elem = elem;
            self.$elem = $(elem);

            if(typeof options !== 'string'){
                self.options = $.extend({}, $.fn.colorGrid.options, options);
                self.gridImgURL = self.options.gridImgURL;
                self.jsonURL = self.options.jsonURL;
                self.selectionImgURL = self.options.selectionImgURL;
                self.selectedIndex = self.options.selectedIndex;

                $.ajax({
                    url: self.jsonURL,
                    dataType: "json",
                    success: function(response) {
                        self.colorGridJsonData = response;
                        self.createGrid();
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            }
        },
        createGrid: function() {
            var self = this;

            var $colorGridImage = $("<img/>", {class: 'color-grid-image', src: self.gridImgURL, usemap: '#colormap', alt: 'colormap'});
            self.$elem.append($colorGridImage);
            self.$elem.css({
                margin: 'auto',
                width: '236px'
            });
            

            var $map = $("<map/>", {id: 'colormap', name: 'colormap'});
            self.$elem.append($map);

            for (var i = 0; i < self.colorGridJsonData.length; i++) {
                var $area = $("<area/>", {
                    shape: "poly",
                    coords: self.colorGridJsonData[i].coords,
                    x: self.colorGridJsonData[i].x,
                    y: self.colorGridJsonData[i].y,
                    index: self.colorGridJsonData[i].index,
                    hexagonColor: self.colorGridJsonData[i].hexagonColor,
                    group: self.colorGridJsonData[i].group
                });
                $map.append($area);
            }

            $map.on('click', 'area', function(event) {

                var $this = $(this);
                var hex = $this.attr("hexagonColor");
                var topOfClickedArea = parseInt($this.attr("y"));
                var leftOfClickedArea = parseInt($this.attr("x"));
                var indexOfClickedArea = parseInt($this.attr("index"));

                var $selectedHexagon = self.$elem.find("#selectedhexagon");
                if ((topOfClickedArea + 200) > -1 && leftOfClickedArea > -1) {
                    $selectedHexagon.css({
                        "top": topOfClickedArea -7,
                        "left": leftOfClickedArea -3,
                        "visibility": "visible"
                    });
                    $selectedHexagon.attr("index", indexOfClickedArea);
                }
                
                //self.$newColorDiv.css("background-color", hex);
                $selectedHexagon.focus();
                self.colorGridSelectedIndex = indexOfClickedArea;
            });

            self.areaArray = $map.find('area');

            var $selectedHexagon = $("<div/>", {id:'selectedhexagon', class: "selected-hexagon", tabindex: "1"});
            $selectedHexagon.attr('index', self.selectedIndex);
            $selectedHexagon.css({
                'background-image': 'url(' + self.selectionImgURL + ')',
                'visibility': 'visible',
                'position': 'relative',
                'width': '25px',
                'height': '27px',
                'top': self.colorGridJsonData[self.selectedIndex - 1].y - 7 + "px",
                'left': self.colorGridJsonData[self.selectedIndex - 1].x - 3 + "px",
                'pointer-events': 'none'
            });
            
            self.$elem.append($selectedHexagon);
            $selectedHexagon.focus();

            $selectedHexagon.on('keydown', function(event) {
                debugger;
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
                        "top": seltop -7,
                        "left": selleft -3,
                        "visibility": "visible"
                    });
                    $this.attr("index", nextIndex);
                }

                //self.$newColorDiv.css("background-color", hex);
                self.colorGridSelectedIndex = nextIndex;
                $this.focus();
                
                event.stopPropagation();
                event.preventDefault();
            });
        }
    };

    $.fn.colorGrid = function(options) {
        return this.each(function() {
            var grid = Object.create(Grid);
            grid.init(options, this);
        });
    };

    $.fn.colorGrid.options = {
        gridImgURL: 'img/img_colormap.png',
        jsonURL: 'data/ColorGridData.json',
        selectionImgURL: 'img/img_selectedcolor.png',
        selectedIndex: '2'
    };
})(jQuery, window, document);