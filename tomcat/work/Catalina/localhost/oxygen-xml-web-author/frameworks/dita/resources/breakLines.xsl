<!-- 
  Copyright 2001-2012 Syncro Soft SRL. All rights reserved.
 -->
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:f="http://www.oxygenxml.com/xsl/functions"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    exclude-result-prefixes="f xs">

    
    <xsl:template match="/" mode="breakLines">
        <xsl:variable name="removeSpans">
            <xsl:apply-templates select="." mode="removeSpans"/>
        </xsl:variable>
        <xsl:apply-templates select="$removeSpans/*" mode="breakLines"/>
    </xsl:template>

    <xsl:template match="node() | @*" mode="removeSpans">
        <xsl:copy>
            <xsl:variable name="childDirAttributes" 
                select="for $e in xhtml:span return ($e/@DIR|$e/@dir)"/>
            <xsl:if test="not(@DIR) and not(@dir) 
                     and count($childDirAttributes) = 1 
                     and count(xhtml:span) = 1">
                <xsl:attribute name="dir" select="$childDirAttributes"/>
            </xsl:if>
            <xsl:apply-templates select="node() | @*" mode="removeSpans"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:span[f:ignorableElement(.)]" 
                  mode="removeSpans">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*" mode="removeSpans"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:span" mode="removeSpans">
        <xsl:apply-templates mode="removeSpans"/>
    </xsl:template>
    
    <xsl:function name="f:ignorableElement" as="xs:boolean">
        <xsl:param name="element" as="node()"/>
        <xsl:sequence select="exists(
              $element/self::xhtml:span[contains(string-join(descendant-or-self::*/@style, ' '), 'mso-list:Ignore')]
            | $element/self::xhtml:span[contains(string-join(descendant-or-self::*/@style, ' '), 'mso-list: Ignore')]
            | $element/self::xhtml:span[contains(string-join(ancestor-or-self::*/@style, ' '), 'mso-list:Ignore')]
            | $element/self::xhtml:span[contains(string-join(ancestor-or-self::*/@style, ' '), 'mso-list: Ignore')]
            | $element/self::xhtml:span[@class = 'indexTerm' or @class = 'indexSee'] 
            )"></xsl:sequence>
    </xsl:function>
    
    <xsl:template match="node() | @*" mode="breakLines">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*" mode="breakLines"/>
        </xsl:copy>
    </xsl:template>

    <!-- Replace <br/> element with a space -->
    <xsl:template match="xhtml:br[parent::xhtml:code | parent::xhtml:pre | parent::xhtml:blockquote]" 
                  mode="breakLines">
        <xsl:text>&#xA;</xsl:text>
    </xsl:template>
    
    <xsl:template match="xhtml:li[xhtml:br]" mode="breakLines">
        <xhtml:li>
            <xsl:apply-templates select="@*"  mode="breakLines"/>
            <xsl:call-template name="brContent">
                <xsl:with-param name="shouldHandleAttributes" select="false()"/>
            </xsl:call-template>
        </xhtml:li>
    </xsl:template>

    <!--
        Checks if the sequence of nodes has meaningful conent - either some elements or non-whitespace text.
    -->
    <xsl:function name="f:hasMeaningfulContent" as="xs:boolean">
        <xsl:param name="seq" as="node()*"/>
        <xsl:sequence select="($seq/*)[1] or string-length(normalize-space(string-join($seq//text(), ''))) > 0"/>
    </xsl:function>
    
    <!-- 
        Split a sequence of nodes that contains at least one <br/> element
        in adjacent sequences separated by <br/>, filter the <br/> and wrap
        each sequence as a para.
    -->
    <xsl:template match="xhtml:div[descendant::xhtml:br] 
                       | xhtml:p[descendant::xhtml:br]" 
                  mode="breakLines">
        <xsl:call-template name="brContent">
            <xsl:with-param name="shouldHandleAttributes" select="true()"/>
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="brContent">
        <xsl:param name="shouldHandleAttributes" as="xs:boolean" select="false()"></xsl:param>
        <!--<xsl:param name="content" as="node()*"/>-->
        <xsl:variable name="preceding-content">
            <xsl:apply-templates 
                select="node()[not(preceding-sibling::xhtml:br)]
                              [local-name() != 'br']" 
                mode="breakLines"/>
        </xsl:variable>
        <xsl:variable name="attributes" select="@*"/>
        <xsl:if test="f:hasMeaningfulContent($preceding-content)">
            <xhtml:p>
                <xsl:if test="$shouldHandleAttributes">
                    <xsl:apply-templates select="$attributes"  mode="breakLines"/>
                </xsl:if>
                <xsl:copy-of select="$preceding-content"/>
            </xhtml:p>
        </xsl:if>
        <xsl:for-each select="xhtml:br">
            <xsl:variable name="following-content">
                <xsl:apply-templates 
                    select="parent::*[1]/node()
                             [current() is preceding-sibling::xhtml:br[1]]
                             [local-name() != 'br']" 
                    mode="breakLines"/>
            </xsl:variable>
            <xsl:if test="f:hasMeaningfulContent($following-content)">
                <xhtml:p>
                    <xsl:if test="$shouldHandleAttributes">
                        <xsl:apply-templates select="$attributes[not(local-name() = 'id')]"  mode="breakLines"/>
                    </xsl:if>
                    <xsl:copy-of select="$following-content"/>
                </xhtml:p>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
