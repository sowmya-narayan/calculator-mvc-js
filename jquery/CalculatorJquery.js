(function($){

  $.fn.BaseModel = {
    id: '',
    className: '',
    color: '',
    width: '',
    height: ''
  };

  // Display panel Model
  $.fn.DisplayModel = function(options){
    var displayModel = $.extend({}, $.fn.BaseModel, options);

    return displayModel;
  };

  // Button Model
  $.fn.ButtonModel = function(options){
    var buttonModel = $.extend({}, $.fn.BaseModel, options);

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
    var buttonModel = $.fn.ButtonModel(options)
     , buttonTag = 'button'
     , buttonElement = $.fn.ButtonView(buttonTag, buttonModel)

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
    var panelView = $.fn.ViewUtility(element, options);

    return panelView;
  };

  // Button View
  $.fn.ButtonView = function(element, options){
    var buttonView = $.fn.ViewUtility(element, options);

    return buttonView;
  };

  // Calculator Class
  $.fn.Calculator = function(){
    var calcTag = this
     , calcModel = CalculatorModel
     , display = $.fn.DisplayController(calcModel.display)
     , calcBtns = calcModel.button.calcBtns
     , btnOptions = { width: calcModel.button.width, height: calcModel.button.height, className: calcModel.button.className }

    calcTag.append(display);
    for(var i = 0; i < calcBtns.length; i++){
      btnOptions.value = calcBtns[i];
      calcTag.append($.fn.ButtonController(btnOptions));
    }
  };

  // Buttons handler
  $.fn.Calculator.clickHandler = function(){
    var calcId = "#"+$(this).parent().attr('id');

    if(this.innerHTML.toLowerCase() == 'c'){
      $.fn.Calculator.clearVal(calcId);
    }else if(this.innerHTML == '='){
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
