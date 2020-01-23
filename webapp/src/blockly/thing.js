var Blockly = require('node-blockly');

Blockly.JavaScript['thing'] = function(block) {
  var text_uid = block.getFieldValue('uid');
  var value_prop = Blockly.JavaScript.valueToCode(block, 'prop', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'console.log("thing");\n';
  return code;
};

Blockly.JavaScript['thing_value'] = function(block) {
  var text_uid = block.getFieldValue('uid');
  var value_prop = Blockly.JavaScript.valueToCode(block, 'prop', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'val';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};