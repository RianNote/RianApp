(function($) {
    $.fn.caret = function(position) {
        var caret = new Caret(this[0]);
        if (position) {
            caret.setPosition(position);
            return this;
        } else {
            return caret.getPosition();
        }
    };

    var features = {
        Selection: Boolean(window.getSelection),
        TextRange: Boolean(document.selection)
    };

    /**
     * @name Caret
     */
    function Caret(element) {
        this._element = element;

        if (this._element.contentEditable === "true") {
            this._isCEE = true;
        }
    }

    /**
     * Get caret position in element.
     *
     * @returns {Number}
     */
    Caret.prototype.getPosition = function() {
        if (this._isCEE) {
            return this._getPositionForCEE();
        }
        return this._getPosition();
    };

    Caret.prototype._getPositionForCEE = function() {
        this._element.focus();

        var range, rangeClone;

        if (features.Selection) {
            range = window.getSelection().getRangeAt(0);
            rangeClone = range.cloneRange();

            rangeClone.selectNodeContents(this._element);
            rangeClone.setEnd(range.endContainer, range.endOffset);

            return rangeClone.toString().length;
        } else if (features.TextRange) {
            this._element.focus();

            range = document.selection.createRange();
            rangeClone = document.body.createTextRange();

            rangeClone.moveToElementText(this._element);
            rangeClone.setEndPoint("EndToEnd", range);

            return rangeClone.text.length;
        }
        return -1;
    };

    Caret.prototype._getPosition = function() {
        if (features.Selection) {
            return this._element.selectionStart;
        } else if (features.TextRange) {
            this._element.focus();
            this._element.focus();

            var range = this._element.createTextRange(),
                bookmark = document.selection.createRange().getBookmark(),
                text = this._element.textContent.replace(/\r\n/g, "\n");

            range.moveToBookmark(bookmark);

            return range.moveStart("character", -text.length);
        }
        return -1;
    };

    /**
     * Set caret at position in element.
     *
     * @param {Number} position
     */
    Caret.prototype.setPosition = function(position) {
        if (position < 0) {
            position = this._element.textContent.length + position;
        }
        if (this.getPosition() === position) {
            return;
        }

        if (document.activeElement !== this._element) {
            this._element.focus();
        }

        if (this._isCEE) {
            return this._setPositionForCEE(position);
        }
        return this._setPosition(position);
    };

    Caret.prototype._setPositionForCEE = function(position) {
        var relativePosition = getRelativePosition(this._element, position),
            range;
        if (relativePosition) {
            if (features.Selection) {
                window.getSelection().collapse(relativePosition.node, relativePosition.position);
            } else if (features.TextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(relativePosition.node);
                range.move("character", relativePosition.position);
                range.collapse(true);
                range.select();
            }
        }
    };

    Caret.prototype._setPosition = function(position) {
        if (features.Selection) {
            this._element.setSelectionRange(position, position);
        } else if (features.TextRange) {
            var range = this._element.createTextRange();
            range.move("character", position);
            range.select();
        }
    };

    /**
     * @typedef {Object} RelativePosition
     * @property {HTMLElement} node
     * @property {Number} position
     */

    /**
     * Get relative position (relative to node of maximal nesting) of caret
     * by absolute position in any parent node.
     *
     * @param {HTMLElement} node
     * @param {Number} position
     * @returns {RelativePosition} relativePosition
     */
    function getRelativePosition(node, position) {
        var currentChildOffset = 0,
            childs = node.childNodes,
            i, child, relativePosition;
        for (i = 0; i < childs.length; i++) {
            child = childs[i];
            if (child.childNodes.length > 0) {
                relativePosition = getRelativePosition(child, position - currentChildOffset);
                if (relativePosition) {
                    return relativePosition;
                }
            } else if (position <= currentChildOffset + child.textContent.length) {
                return {
                    node: child,
                    position: position - currentChildOffset
                };
            }
            currentChildOffset += child.textContent.length;
        }
    }
})(jQuery);
