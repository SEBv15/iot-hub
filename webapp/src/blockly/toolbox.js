import React from 'react';

export default function Toolbox(props) {
    return (
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style={{display: "none"}}>
  <category name="Logic" colour="#5b80a5">
    <block type="controls_if"></block>
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>
  <category name="Loops" colour="#5ba55b">
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="controls_whileUntil">
      <field name="MODE">WHILE</field>
    </block>
    <block type="controls_for">
      <field name="VAR" id="]hF1{gMRi)S1u{dBGDe/">i</field>
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      <value name="BY">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="controls_forEach">
      <field name="VAR" id="Y$v7y!3ga,5,GQK~v*].">j</field>
    </block>
    <block type="controls_flow_statements" disabled="true">
      <field name="FLOW">BREAK</field>
    </block>
  </category>
  <category name="Math" colour="#5b67a5">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
    <block type="math_arithmetic">
      <field name="OP">ADD</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="math_single">
      <field name="OP">ROOT</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">9</field>
        </shadow>
      </value>
    </block>
    <block type="math_trig">
      <field name="OP">SIN</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">45</field>
        </shadow>
      </value>
    </block>
    <block type="math_constant">
      <field name="CONSTANT">PI</field>
    </block>
    <block type="math_number_property">
      <mutation divisor_input="false"></mutation>
      <field name="PROPERTY">EVEN</field>
      <value name="NUMBER_TO_CHECK">
        <shadow type="math_number">
          <field name="NUM">0</field>
        </shadow>
      </value>
    </block>
    <block type="math_round">
      <field name="OP">ROUND</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
    <block type="math_on_list">
      <mutation op="SUM"></mutation>
      <field name="OP">SUM</field>
    </block>
    <block type="math_modulo">
      <value name="DIVIDEND">
        <shadow type="math_number">
          <field name="NUM">64</field>
        </shadow>
      </value>
      <value name="DIVISOR">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="math_constrain">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
      <value name="LOW">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="HIGH">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="math_random_float"></block>
  </category>
  <category name="Text" colour="#5ba58c">
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_append">
      <field name="VAR" id=")c/mv9hE~4kG#SMrUnoL">item</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="kCAAcz}t|joq}!E|r(w8">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_charAt">
      <mutation at="true"></mutation>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="kCAAcz}t|joq}!E|r(w8">text</field>
        </block>
      </value>
    </block>
    <block type="text_getSubstring">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR" id="kCAAcz}t|joq}!E|r(w8">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <mutation type="TEXT"></mutation>
      <field name="TYPE">TEXT</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
  <sep></sep>
  <category name="Variables" colour="#a55b80" custom="VARIABLE"></category>
  <category name="Functions" colour="#995ba5" custom="PROCEDURE"></category>
  <sep></sep>
  <category name="IoT" colour="#a5745b">
    <block type="thing">
      <field name="uid"></field>
    </block>
    <block type="thing_value">
      <field name="uid"></field>
    </block>
  </category>
</xml>
    )
}