### Caret Manipulation Plugin

JQuery.Caret is JQuery plugin, which provide usefull interface to mainpulate caret position in any inputs, textareas or content ediatables elements.

Get position of caret:
```js
var element = $('div[contenteditable]');
// Return current caret position.
element.caret();
```

Set position of caret:
```js
var element = $('div[contenteditable]');
element.caret(2);
// If negative, it is treated as sourceLength + position
// where sourceLength is the length of the string.
element.caret(-1);
```

### Support or Contact

Having trouble with Jquery.Caret? Contact alt-j@yandex-team.ru and we’ll help you sort it out.
