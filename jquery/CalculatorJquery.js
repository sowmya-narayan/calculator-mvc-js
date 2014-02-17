(function($){
  $.fn.BaseModel = function(options){
    this.id = options.id || '';
    this.className = options.className || '';
    this.color = options.color || '';
    this.width = options.width || '';
    this.height = options.height || '';

    return this;
  }

  // Display Model
  $.fn.DisplayModel = function(options){
    var displayModel = $.fn.BaseModel(options);
    displayModel.type = options.type || '';

    return displayModel;
  };

 // Button Model
$.fn.ButtonModel = function(options){
  var buttonModel = $.fn.BaseModel(options);
  buttonModel.value = options.value || '';
  return buttonModel;
};

//Calculator Model
var CalculatorModel = {
  display: {
    className: 'displayPanel',
    width: '140px',
    height: '35px'
  },
  button: {
    calcBtns: ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'],
    className: 'button',
    width: '35px',
    height: '35px'
  }
};


//Display Panel Controller
$.fn.DisplayController = function(options){
  var display = $.fn.DisplayModel(options)
    , inputTag = 'input'
    , displayElement = $.fn.DisplayView(inputTag, display)

  return displayElement;
};

// Button Class
$.fn.ButtonController = function(options){
  var button = $.fn.ButtonModel(options)
    , buttonTag = 'button'
    , buttonElement = $.fn.ButtonView(buttonTag, button)

  //handler
  buttonElement.onclick = $.fn.Calculator.clickHandler;
  return buttonElement;
};


// Generic View Utility for all Entities(Elements)
$.fn.ViewUtility = function(ele, options){
  var element = document.createElement(ele);

  if(options.id) {$(element).attr('id', options.id);}
  if(options.className) {$(element).attr('class', options.className);}
  if(options.type) {$(element).attr('type', options.type);}
  if(options.width) {$(element).css('width',options.width);}
  if(options.height) {$(element).css('height',options.height);}
  if(options.value) {$(element).html(options.value);}

  return element;
};

// Display View
$.fn.DisplayView = function(element, options){
  var ele = $.fn.ViewUtility(element, options);

  return ele;
};

// Button View
$.fn.ButtonView = function(element, options){
  var ele = $.fn.ViewUtility(element, options);

  return ele;
};

// Calculator Class
$.fn.Calculator = function(){
  var calcTag = this
    , calcModel = CalculatorModel
    , display = $.fn.DisplayController(calcModel.display)
    , calcBtns = calcModel.button.calcBtns
    , btnOptions = { width: calcModel.button.width, height: calcModel.button.height }

  calcTag.append(display);
  for(var i = 0; i < calcBtns.length; i++){
    btnOptions.value = calcBtns[i];
    calcTag.append($.fn.ButtonController(btnOptions));
  }
};

$.fn.Calculator.clickHandler = function(){
  var calcId = "#"+$(this).parent().attr('id');

  if(this.innerHTML.toLowerCase() == 'c'){
    $.fn.Calculator.clearVal(calcId);
  }
  else if(this.innerHTML == '='){
    $.fn.Calculator.evaluate(calcId);
  }
  else{
    $.fn.Calculator.setVal(this.innerHTML, calcId);
  }
};

$.fn.Calculator.setVal = function(val, id){
  var displayPanel = $.fn.Calculator.getDisplayPanel(id);
  oldVal = displayPanel.val();
  displayPanel.val(oldVal+val);
};

$.fn.Calculator.clearVal = function(id){
  $.fn.Calculator.getDisplayPanel(id).val('');
};

$.fn.Calculator.getDisplayPanel = function(id){
  return $(id).find('input.displayPanel');
};

$.fn.Calculator.evaluate = function(id){
  var displayPanel = $.fn.Calculator.getDisplayPanel(id);
  displayPanel.val(eval(displayPanel.val()));
};

})(jQuery);
