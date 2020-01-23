var Blockly = require('node-blockly');

Blockly.Blocks['thing'] = {
    init: function() {
      this.jsonInit({
        "message0": "Set Thing %1 uid %2 %3 prop name %4 value %5",
        "args0": [
          {
            "type": "input_dummy",
            "align": "CENTRE"
          },
          {
            "type": "field_input",
            "name": "uid",
            "text": ""
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "prop",
            "check": "String"
          },
          {
            "type": "input_value",
            "name": "value"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 270,
        "tooltip": "Set thing prop values",
        "helpUrl": ""
      });
    }
  };
  
  Blockly.Blocks['thing_value'] = {
    init: function() {
      this.jsonInit({
        "message0": "Thing Value %1 uid %2 %3 prop %4",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_input",
            "name": "uid",
            "text": ""
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "prop",
            "check": "String"
          }
        ],
        "output": null,
        "colour": 230,
        "tooltip": "Get thing prop values",
        "helpUrl": ""
      });
    }
  };
  