<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
  
  <sch:pattern id="avoidPercent" is-a="avoidWordInContext">
    <sch:param name="context" value="*" />
    <sch:param name="word" value="percent" />
    <sch:param name="message" value="The '%' symbol should be used instead of spelling out 'percent'." />
  </sch:pattern>

  <sch:pattern id="avoidSemicolonAtEndOfListItem" is-a="avoidEndFragment">
    <sch:param name="element" value="li" />
    <sch:param name="fragment" value=";" />
    <sch:param name="message" value="List items should not end with semicolons." />
  </sch:pattern>

  <sch:pattern id="listsShouldNotContainOnly1Item" is-a="restrictNumberOfChildren">
    <sch:param name="parentElement" value="ol|ul" />
    <sch:param name="element" value="li" />
    <sch:param name="min" value="2" />
    <sch:param name="max" value="9999999" />
    <sch:param name="message" value="Lists should contain at least 2 items." />
  </sch:pattern>
  
  <sch:pattern id="avoidBoldInHeaders" is-a="restrictChildrenElements">
    <sch:param name="parentElement" value="h1|h2|h3|h4|h5|h6" />
    <sch:param name="disallowedChildren" value="strong" />
    <sch:param name="message" value="Headers should not include Bold content." />
  </sch:pattern>

  <sch:pattern id="curencySymbolShouldStayBeforeNumber" is-a="avoidRegExpPattern">
    <sch:param name="context" value="*" />
    <sch:param name="regexp" value="\d[¢$Ξ€£₾¥]" />
    <sch:param name="flags" value="i" />
    <sch:param name="message" value="The currency symbol should be placed before the number, not after." />
  </sch:pattern>
  
  <sch:pattern id="noSpaceBeforePunctuation" is-a="avoidRegExpPattern">
    <sch:param name="context" value="*" />
    <sch:param name="regexp" value=" [,;.:!?]" />
    <sch:param name="flags" value="i" />
    <sch:param name="message" value="There should be no spaces before punctuation." />
  </sch:pattern>

  

  <!-- Pattern definitions -->
  <sch:pattern id="avoidWordInContext" abstract="true">
    <sch:title>Issue a warning if a word or a phrase appears inside a specified
      element</sch:title>
    <sch:p>This pattern allows you to advise users not to use a specific
      word in an element, or in multiple elements, if you separate them using '|'. 
      The check is case insensitive.</sch:p>
    
    <parameters xmlns="http://oxygenxml.com/ns/schematron/params">
      <parameter>
        <name>context</name>
        <desc>Specifies the context we will verify to not contain a specified word. 
          You can specify multiple elements if you separate them using a pipe character, 
          for example title|p will check both title and p elements. </desc>
      </parameter>
      <parameter>
        <name>word</name>
        <desc>Specifies the word or phrase we will look for.</desc>
      </parameter>
      <parameter>
        <name>message</name>
        <desc>The message the end user will see when the specified word appears
          in the specified element.</desc>
      </parameter>
    </parameters>
    
    <sch:rule context="$context">
      <sch:report test="./text()[matches(., '(^|\s)$word([\s,;.:!?]|$)', 'i')]" role="warn" >
        $message
      </sch:report>
    </sch:rule>
  </sch:pattern>
  
  <sch:pattern id="avoidEndFragment" abstract="true">
    <sch:title>Issue a warning if an element ends with a specified fragment
      or character</sch:title>
    <sch:p>This pattern allows you to advise users not to use a specific end
      sequence to end an element.</sch:p>
    
    <parameters xmlns="http://oxygenxml.com/ns/schematron/params">
      <parameter>
        <name>element</name>
        <desc>Specifies the element we will verify to not contain a specified word.</desc>
      </parameter>
      <parameter>
        <name>fragment</name>
        <desc>Specifies the text to check.</desc>
      </parameter>
      <parameter>
        <name>message</name>
        <desc>The message the end user will see when the specified text ends with the given fragment.</desc>
      </parameter>
    </parameters> 
    <sch:rule context="$element">
      <sch:assert test="not(ends-with(normalize-space(.), '$fragment'))" role="warn">
        $message
      </sch:assert>
    </sch:rule>
  </sch:pattern>
  
  <sch:pattern id="restrictNumberOfChildren" abstract="true">
    <sch:title>Restrict the number of children elements in a parent element</sch:title>
    <sch:p>Check the number of children of an element in a parent element to 
      be between specified limits.</sch:p>

    <parameters xmlns="http://oxygenxml.com/ns/schematron/params">
      <parameter>
        <name>parentElement</name>
        <desc>Specifies the element that we should check for nesting.</desc>
      </parameter>
      <parameter>
        <name>element</name>
        <desc>Specifies the element we will look for as child element.</desc>
      </parameter>
      <parameter>
        <name>min</name>
        <desc>The minimum number of occurrences allowed.</desc>
      </parameter>
      <parameter>
        <name>max</name>
        <desc>The maximum number of occurrences allowed.</desc>
      </parameter>
      <parameter>
        <name>message</name>
        <desc>A message we should present to the user in case the number of 
          children elements is not within the specified limits.</desc>
      </parameter>
    </parameters>
    <sch:rule context="$parentElement">
      <sch:let name="children" value="count($element)"/>
      <sch:assert test="$children &lt;= $max" role="warn">
        $message 
      </sch:assert>
      <sch:assert test="$children &gt;= $min" role="warn"> 
        $message
      </sch:assert>
    </sch:rule>
  </sch:pattern>
  
  <sch:pattern id="restrictChildrenElements" abstract="true">
    <sch:title>Restrict the elements that can appear inside a parent element</sch:title>
    <sch:p>You can use this to specify a list of elements to forbit inside an other element.</sch:p>

    <parameters xmlns="http://oxygenxml.com/ns/schematron/params">
      <parameter>
        <name>parentElement</name>
        <desc>Specifies the parent element.</desc>
      </parameter>
      <parameter>
        <name>disallowedChildren</name>
        <desc>Specifies a comma separated list of element local names.</desc>
      </parameter>
      <parameter>
        <name>message</name>
        <desc>An additional message we should display to the user in case the 
          matched element contains children that are not in the list of allowed elements.</desc>
      </parameter>
    </parameters>
    <sch:rule context="$parentElement/*">
      <sch:let name="elements" 
        value="tokenize(translate(normalize-space('$disallowedChildren'), ' ', ''), ',')"/>
      <sch:report test="child::*/local-name() = $elements" role="warn">
        $message
      </sch:report>
    </sch:rule>
  </sch:pattern>

  <sch:pattern id="avoidRegExpPattern" abstract="true">
    <sch:title>Define a Regular Expression that will find unwanted patterns.</sch:title>
    
    <parameters xmlns="http://oxygenxml.com/ns/schematron/params">
      <parameter>
        <name>context</name>
        <desc>The schematron context where this rule will activate.</desc>
      </parameter>
      <parameter>
        <name>regexp</name>
        <desc>The Regular Expression used to match unwanted patterns in the context.</desc>
      </parameter>
      <parameter>
        <name>flags</name>
        <desc>The Regular Expression flags.</desc>
      </parameter>
      <parameter>
        <name>message</name>
        <desc>Message shown to the user when the RegExp matches.</desc>
      </parameter>
    </parameters> 
    
    <sch:rule context="$context">
      <sch:report test="./text()[matches(., '$regexp', '$flags')]" role="warn">
        $message
      </sch:report>
    </sch:rule>
  </sch:pattern>

</sch:schema>
