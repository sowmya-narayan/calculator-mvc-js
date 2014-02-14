// Generic View Utility for all Entities(Elements)
var ViewUtility = function(ele, options){
  var element = document.createElement(ele);
  if(options.id) {element.setAttribute('id', options.id)};
  if(options.type) {element.setAttribute('type', options.type)};
  if(options.width) {element.style.width = options.width};
  if(options.height) {element.style.height = options.height};
  if(options.value) {
    var eleValue=document.createTextNode(options.value);
    element.appendChild(eleValue);
  };
  return element;
};


// Display Model
var displayModel= function(options){
    this.id = options.id || '';
    this.type = options.type || '';
    this.width = options.width || '';
};


// Display View
var DisplayView= function(element, options){
  var ele= new ViewUtility(element, options);
  return ele;
};

//Display Panel Controller
var DisplayPanel = function(options){
  var display = new displayModel(options);
  element = 'input';
  var displayElement = new DisplayView(element, display);
  return displayElement
};



// Button Model
var ButtonModel= function(options){
    this.id = options.id || '';
    this.width = options.width || '';
    this.height = options.height || '';
    this.value = options.value || '';
};

// Button View
var ButtonView= function(element, options){
  var ele= new ViewUtility(element, options);
  return ele;
};


// Button Class
var Button = function(options){
  var button = new ButtonModel(options);
  element = 'button';
  var buttonElement = new ButtonView(element, button);
  //handler
  buttonElement.onclick = Calculator.requestHandler;
  return buttonElement;
};

//Calculator Model
var CalculatorModel = {
  display: {
    width: '140px',
    id: 'display',
    type: 'text'
  },
  button: {
    calcBtns: ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'c', '0', '=', '/'],
    width: '35px',
    height: '35px'
  }

};


// Calculator Class
var Calculator = function (element){

  var calcId = element;
  var calcElement = document.createElement('div');
  var panelDiv = document.createElement('div');
  var display = new DisplayPanel(CalculatorModel.display);
  panelDiv.appendChild(display);
  calcElement.appendChild(panelDiv);
  panelDiv = document.createElement('div');
  var calcBtns = CalculatorModel.button.calcBtns;
  var counter=0;
  for(var i=0; i < calcBtns.length; i++){
    if(counter==4){
      var br = document.createElement('br');
      panelDiv.appendChild(br);
      counter = 0;
    }
    counter ++;
    var btnOptions = {
      width: CalculatorModel.button.width,
      height: CalculatorModel.button.height,
      value: calcBtns[i]
    };
    btn = new Button(btnOptions);
    //extending the button functionality to suit the calculator
    btn.onclick = function(){
      if(this.innerHTML == 'c'){
        clearVal(calcId);
      }
      else if(this.innerHTML == '='){
        evaluate(calcId);
      }
      else{
        setVal(this.innerHTML, calcId);
      }
    }
    panelDiv.appendChild(btn);

  }
  calcElement.appendChild(panelDiv);
  document.getElementById(element).appendChild(calcElement);

  setVal= function (val, id) {
    var displayPanel = getDisplayPanel(id);
    displayPanel.value += val;
  },

  clearVal= function (id) {
    var displayPanel = getDisplayPanel(id);
    displayPanel.value = '';
  },

  getDisplayPanel = function(id){
    var panel = document.getElementById(id);
    var textbox = panel.getElementsByTagName("input");
    for (var i = 0; i < textbox.length; i++){
      if (textbox[i].id == "display"){
        return textbox[i];
      }
    }
  },

  evaluate= function (id) {
    var displayPanel = getDisplayPanel(id);
    displayPanel.value = eval(displayPanel.value);
  }


};
