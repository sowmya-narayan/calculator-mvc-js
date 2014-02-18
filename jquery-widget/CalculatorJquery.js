$.widget("simplest.calculator", {

  options: {
  },
 
  baseModel: {
    id: '',
    className: '',
    color: '',
    width: '',
    height: ''
  },

  // Display panel Model
  displayModel: function(options){
    var displayModel = $.extend({}, this.baseModel, options);

    return displayModel;
  },

  // Button Model
  buttonModel: function(options){
    var buttonModel = $.extend({}, this.baseModel, options);

    return buttonModel;
  },

  //Calculator Model
  calculatorModel: {
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
  },

  //Display Panel Controller
  displayController: function(options){
    var display = this.displayModel(options)
      , inputTag = 'input'
      , displayElement = this.displayView(inputTag, display)

    return displayElement;
  },

  // Button Class
  buttonController: function(options){
    var buttonModel = this.buttonModel(options)
     , buttonTag = 'button'
     , buttonElement = this.buttonView(buttonTag, buttonModel)
  
    //handler    
    buttonElement.onclick = this.clickHandler;
    return buttonElement;
  },


  // Generic View Utility for all Entities(Elements)
  viewUtility: function(ele, options){
    var element = document.createElement(ele);

    if(options.id) {$(element).attr('id', options.id);}
    if(options.className) {$(element).attr('class', options.className);}
    if(options.type) {$(element).attr('type', options.type);}
    if(options.width) {$(element).css('width',options.width);}
    if(options.height) {$(element).css('height',options.height);}
    if(options.value) {$(element).html(options.value);}

    return element;
  },

  // Display View
  displayView: function(element, options){  
    var panelView = this.viewUtility(element, options);

    return panelView;
  },

  // Button View
  buttonView: function(element, options){
    var buttonView = this.viewUtility(element, options);

    return buttonView;
  },

  // Calculator constructor
  _init: function(){    
    var calcTag = this.element
     , calcModel = this.calculatorModel
     , display = this.displayController(calcModel.display)
     , calcBtns = calcModel.button.calcBtns
     , btnOptions = { width: calcModel.button.width, height: calcModel.button.height, className: calcModel.button.className }

    calcTag.append(display);
    for(var i = 0; i < calcBtns.length; i++){
      btnOptions.value = calcBtns[i];    
      calcTag.append(this.buttonController(btnOptions));
    }
  },

  // Buttons handler
  clickHandler: function(){
     $.simplest.calculator.prototype.toDo(this);     //TODO remove widget static fullName!!!
  },

  toDo: function(thisParams){
    var calcId = "#"+$(thisParams).parent().attr('id'),
      value = thisParams.innerHTML.toLowerCase();

    if(value == 'c'){
      this.clearVal(calcId);
    }else if(value == '='){
      this.evaluate(calcId);
    }else{
      this.setVal(value, calcId);
    }
  },

  setVal: function(val, id){
    var displayPanel = this.getDisplayPanel(id);
    oldVal = displayPanel.val();
    displayPanel.val(oldVal+val);
  },

  clearVal: function(id){
    this.getDisplayPanel(id).val('');
  },

  getDisplayPanel: function(id){
    return $(id).find('input.displayPanel');
  },

  evaluate: function(id){
    var displayPanel = this.getDisplayPanel(id);
    displayPanel.val(eval(displayPanel.val()));
  }

});