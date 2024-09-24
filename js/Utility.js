(function ($) {    
    /*
        Remove class by class prefix
    */
    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, el) {
            var classes = el.className.split(" ").filter(function(c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = classes.join(" ");
        });
        return this;
    };//END Remove class by prefix


    /************ Make all columns in row same height *********/
    /*
        Original Source: https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows
        Then invoke the plugin like so:

        $('.element').responsiveEqualHeightGrid();
        You must select a every element which will be used in the grids calculation, the elements do not need to be siblings of eachother, therefore both of the following are valid:

        <div class="wrapper">
            <div class="element">Content</div>
            <div class="element">Content</div>
            <div class="element">Content</div>
        </div>
        <div class="wrapper">
            <div class="wrap-element">
                <div class="element">Content</div>
            </div>
            <div class="wrap-element">
                <div class="element">Content</div>
            </div>
        </div>
    */

    /*
     Set all elements within the collection to have the same height.
     */
    $.fn.equalHeight = function () {
        var heights = [];
        $.each(this, function (i, element) {
            $element = $(element);
            var element_height;
            // Should we include the elements padding in it's height?
            var includePadding = ($element.css('box-sizing') == 'border-box') || ($element.css('-moz-box-sizing') == 'border-box');
            if (includePadding) {
                element_height = $element.innerHeight();
            } else {
                element_height = $element.height();
            }
            heights.push(element_height);
        });
        this.height(Math.max.apply(window, heights));
        return this;
    };

    /*
     Create a grid of equal height elements.
     */
    $.fn.equalHeightGrid = function (columns) {
        var $tiles = this;
        $tiles.css('height', 'auto');
        for (var i = 0; i < $tiles.length; i++) {
            if (i % columns === 0) {
                var row = $($tiles[i]);
                for (var n = 1; n < columns; n++) {
                    row = row.add($tiles[i + n]);
                }
                row.equalHeight();
            }
        }
        return this;
    };

    /*
     Detect how many columns there are in a given layout.
     */
    $.fn.detectGridColumns = function () {
        var offset = 0, cols = 0;
        this.each(function (i, elem) {
            var elem_offset = $(elem).offset().top;
            if (offset === 0 || elem_offset == offset) {
                cols++;
                offset = elem_offset;
            } else {
                return false;
            }
        });
        return cols;
    };

    /*
     Ensure equal heights now, on ready, load and resize.
     */
    $.fn.responsiveEqualHeightGrid = function () {
        var _this = this;
        function syncHeights() {
            var cols = _this.detectGridColumns();
            _this.equalHeightGrid(cols);
        }
        $(window).bind('resize load', syncHeights);
        syncHeights();
        return this;
    };
    //END

}(jQuery))