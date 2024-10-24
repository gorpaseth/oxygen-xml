<!-- 
  Copyright 2001-2012 Syncro Soft SRL. All rights reserved.
 -->
<xsl:stylesheet version="2.0" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:e="http://www.oxygenxml.com/xsl/conversion-elements"
    xmlns:f="http://www.oxygenxml.com/xsl/functions"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    xmlns:map="http://www.w3.org/2005/xpath-functions/map"
    exclude-result-prefixes="xs f xd map">
    
     <!-- true if we want to wrap element before heading in a section -->
    <xsl:param name="wrapElementsBeforeHeadingInSection" as="xs:boolean" select="false()"/>
    
     <!-- true if we want to convert all class atribute to outputclass.
    This is used by Batch Documents Converter add-on (EXM-48982) -->
    <xsl:param name="convertClassToOutputClass" as="xs:boolean" select="false()"/>
    
    <!-- WA-5742: In batch converter, we generate IDs from the XSLT script while for smart paste
      we generate IDs in the Java code according to user preferences.
      
      WA-5742: When the user pastes over the root of the document, there might be internal links
      whose hrefs and IDs have to be generated by the XSLT. So we are also taking into account
      the "replace.entire.root.contents" parameter when deciding whether to generate an ID.
       -->
    <xsl:param name="generateSectionIds" as="xs:boolean" select="false()"/>
    
    <!-- true if we want to replace all content in document. -->
    <xsl:param name="replace.entire.root.contents" as="xs:boolean" select="false()"/>
    
    
    <xsl:template match="/">
        <xsl:apply-templates mode="nestedSections"/>
    </xsl:template>
    
    <!-- Associates to a heading the lower rank headings after it. -->
    <xsl:key 
        name="kHeadings" 
        match="xhtml:body/*[f:isHeading(.)]"
        use="generate-id(preceding-sibling::*
                        [f:isHeading(.)][substring(name(current()),2) > substring(name(),2)][1])"/>
    
    <!-- Associates to a heading the elements after it.-->
    <xsl:key 
        name="kElements" 
        match="xhtml:body/node()[not(f:isHeading(.))]"
        use="generate-id(preceding-sibling::*[f:isHeading(.)][1])"/>
    
    <!-- Copy template for the not heading nodes. -->
    <xsl:template match="node()|@*" mode="nestedSections">
        <xsl:copy>
            <xsl:apply-templates select="node()|@*" mode="nestedSections"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:html" mode="nestedSections">
        <xsl:copy>
            <xsl:apply-templates mode="nestedSections"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:body" mode="nestedSections">
        <xsl:copy>
            <!-- Takes all elements from the heading maps that do not have 
               a higher rank heading before them. -->
            <xsl:variable name="masterHeadings" select="key('kHeadings', '')"/>
            <xsl:choose>
                <xsl:when test="empty($masterHeadings)">
                    <xsl:choose>
                        <xsl:when test="$wrapElementsBeforeHeadingInSection">
                           <xsl:call-template name="wrapWithSection">
                               <xsl:with-param name="nodes" select="./*"/>
                           </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates mode="nestedSections"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
              <xsl:variable name="beforeFirstMasterHeading" select="*[. &lt;&lt; $masterHeadings[1]]"/>
                    <xsl:choose>
                        <xsl:when test="$wrapElementsBeforeHeadingInSection and not(empty($beforeFirstMasterHeading))">
                            <!--Group the elements before heading in a section-->
                            <xsl:call-template name="wrapWithSection">
                                <xsl:with-param name="nodes" select="$beforeFirstMasterHeading"/>
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates select="$beforeFirstMasterHeading" mode="nestedSections"/>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:apply-templates select="$masterHeadings" mode="nestedSections"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:copy>
    </xsl:template>
    
    <xd:doc>
        <xd:desc>Generates an id for section using the given heading.</xd:desc>
        <xd:param name="heading">The heading node</xd:param>
    </xd:doc>
    <xsl:function name="f:generateSectionId">
        <xsl:param name="heading" as="node()"/>

        <xsl:variable name="id">
            <xsl:choose>
                <xsl:when test="$heading/@id">
                    <xsl:value-of select="$heading/@id"/>
                </xsl:when>
                <xsl:otherwise>
                    <!-- We don't have an ID, use the heading value-->
                    <xsl:variable name="headingVal">
                        <xsl:value-of select="$heading"/>
                    </xsl:variable>
                    <xsl:choose>
                        <!-- Try the heading.-->
                        <xsl:when test="$headingVal and $headingVal != ''">
                            <xsl:value-of select="lower-case($headingVal)"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <!-- No heading; generate a random one. -->
                            <xsl:value-of select="concat('id-', generate-id($heading))"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>   
        
        <xsl:variable name="correctedId" select="f:correctId($id)"/>
        <xsl:choose>
            <xsl:when test="$correctedId and $correctedId != ''">
                <xsl:value-of select="$correctedId"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="concat('id-', generate-id($heading))"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>
    
    <xd:doc>
        <xd:desc>Generates an unique id for section.</xd:desc>
        <xd:param name="heading">The heading node</xd:param>
    </xd:doc>
    <xsl:function name="f:generateUniqueSectionId">
        <xsl:param name="heading" as="node()"></xsl:param>
        <xsl:variable name="idCantidate">
            <xsl:value-of select="f:generateSectionId($heading)"/>
        </xsl:variable>
        
        <xsl:choose>
            <xsl:when test="$heading/(preceding::* | ancestor:: *)[f:isHeading(.)][f:generateSectionId(.) = $idCantidate]">
                <!-- We generated this ID before -->
                <xsl:value-of select="concat($idCantidate, '-',  generate-id($heading))"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="$heading/(following::* | descendant:: *)[f:isHeading(.)][@id = $idCantidate]">
                        <!-- We have this ID on heading in the document-->
                        <xsl:value-of select="concat($idCantidate, '-',  generate-id($heading))"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$idCantidate"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>
    
    <xsl:template match="xhtml:body/*[f:isHeading(.)]" mode="nestedSections">
        <e:section level="{substring(name(),2)}" xmlns="http://www.w3.org/1999/xhtml">
            <xsl:choose>
                <xsl:when test="@id">
                    <xsl:copy-of select="@id"/>
                </xsl:when>
                <xsl:when test="$generateSectionIds or $replace.entire.root.contents">
                    <xsl:attribute name="id" >
                        <xsl:value-of select="f:generateUniqueSectionId(.)"/>
                    </xsl:attribute>
                </xsl:when>
            </xsl:choose>
            
            <xsl:apply-templates select="@class" mode="convertClass"/>
            
            <!-- Copies the header content. -->
            <e:title>
                <xsl:apply-templates mode="nestedSections"/>
            </e:title>
            <!-- Process all elements from its beginning to the next heading (lower or higher rank.)-->
            <xsl:apply-templates select="key('kElements', generate-id())" mode="nestedSections"/>
            <!-- Processes all the headings (lower rank only) recursively-->
            <xsl:apply-templates select="key('kHeadings', generate-id())" mode="nestedSections"/>
        </e:section>
    </xsl:template>
    
    <xsl:template match="@class" mode="convertClass">
        <xsl:if test="$convertClassToOutputClass">
            <xsl:copy-of select="."/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="wrapWithSection">
        <xsl:param name="nodes"/>
        <e:section level="1" xmlns="http://www.w3.org/1999/xhtml">
            <xsl:if test="$generateSectionIds or $replace.entire.root.contents">
                <xsl:attribute name="id">
                    <xsl:choose>
                        <xsl:when test="exists(//*[@id = 'id'])">
                            <xsl:value-of select="concat('id-', generate-id())"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:sequence>id</xsl:sequence>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </xsl:if>
            <e:title>
            </e:title>
            <!-- Copies the nodes. -->
            <xsl:apply-templates select="$nodes" mode="nestedSections"/>
        </e:section>
    </xsl:template>
    
    <xsl:function name="f:isHeading" as="xs:boolean">
        <xsl:param name="n" as="node()"/>
        <xsl:variable name="isHeadingElement" select="xs:boolean(
            local-name($n) = 'h1' or 
            local-name($n) = 'h2' or 
            local-name($n) = 'h3' or 
            local-name($n) = 'h4' or 
            local-name($n) = 'h5' or 
            local-name($n) = 'h6')"/>
        <xsl:sequence select="xs:boolean($isHeadingElement 
            and (string-length(translate(normalize-space($n),'&#160;','')) > 0 or $n/descendant::*[@src or @href][1]))"/>
    </xsl:function>
</xsl:stylesheet>