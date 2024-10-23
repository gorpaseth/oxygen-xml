<%@ page import="java.io.*"%>
<%@ page import="java.net.URL"%>
<%
    // extract variables for easier development.
    // for eclipse development you will have to replace webapps with wtpwebapps
    String contextName = "oxygen-xml-web-author";
    boolean isRedirectEnabled = true;
    
      
    if (isRedirectEnabled && "activated".equals(System.getProperty("com.oxygenxml.license.server.state"))) {
      response.sendRedirect("/" + contextName + "/app/oxygen.html");
      return;
    }

   File catalinaBase = new File(System.getProperty("catalina.base"));
   // If web author does not use the builtin server, skip this configuration page.
    Properties p = new Properties();
    FileReader fr = null;
    try{
      try {
        fr = new FileReader(new File(catalinaBase, "work/Catalina/localhost/" + contextName + "/options/license.properties"));
        p.load(fr);
      } finally {
        if (fr != null) {
          fr.close();
        }
      }
    } catch (IOException e) {
      // Ignore the error.
    }

    String licenseServerStr = p.getProperty("licensing.server.url");
    URL licenseServerUrl = null;
    try {
      licenseServerUrl = new URL(licenseServerStr);
    } catch (MalformedURLException e) {
      // Ignore the error.
    }

    if (isRedirectEnabled && (licenseServerUrl == null || !"localhost".equals(licenseServerUrl.getHost()))) {
      response.sendRedirect("/" + contextName + "/app/oxygen.html");
      return;
    }

    // Determine the name of the css file which contains a hashcode.
    File cssFolder = new File(catalinaBase, "webapps/" + contextName + "/app/css");
    String[] cssFiles = cssFolder.list(new FilenameFilter() {
      public boolean accept(File dir, String name) {
        return name.startsWith("admin-page-");
      }
    });
    String adminCss = cssFiles[0];

%>
<!DOCTYPE html>
<%@page import="java.net.MalformedURLException"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.util.Properties"%>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

    <!-- No zoom. -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

    <!-- Favicons -->
    <link rel="icon" type="image/png" href="/<%= contextName %>/app/images/gui/favicon.ico">

    <title>Oxygen XML Web Author Configuration Page</title>

    <link rel="stylesheet" type="text/css" href="layout.css?cache-id=<%=System.getProperty("com.oxygenxml.webapp.version")%>" />
    <link rel="stylesheet" type="text/css" href="/<%= contextName %>/app/css/<%= adminCss %>" />
    <script src="/<%= contextName %>/app/<%= System.getProperty("com.oxygenxml.webapp.version") %>-node_modules/jquery/dist/jquery.min.js"></script>
</head>
<body>
    <div id="webapp-admin-page">
        <div id="header-bar" class="ui-layout-north">
            <div class="header-left vertical-align-children">
                <a  href="/<%=  contextName %>/app/oxygen.html" title="Go to Oxygen XML Web Author Dashboard" 
					id="header-logo" class="vertical-align-children">
                	<div class="large-logo logo-container vertical-align-children">
                    	<div class="ui-oxygen-logo"></div>
                	</div>
                </a>
                <span>Configuration Page</span>
            </div>
        </div>
        
        <div class="section-title">
            <div class="title">License configuration</div>
            
            <p>Oxygen XML Web Author is installed. In order to use it, you need to connect it to an 
              Oxygen License Server that serves an Oxygen floating license key.</p>

            <p>Choose one of the options below:</p>
            <div class="options">

              <div id="trial" class="option">
                <div class="preview">
                  <div class="title">Trial</div>
                  <div class="shortdesc">You can try Oxygen XML Web Author for 30 days. No setup required.</div>
                </div>
                <div class="details">
                  <div class="form ihave">
                    <div class="tabs"> 
                      <div class="trial-option option-selected">Request a trial license</div>
                      <div class="trial-option option-not-selected">I already have a trial license</div>
                    </div>
                    
                    <div class="ihave">
                    <div style="margin:15px 0">Please fill-in the form below to start your trial.</div>

                    <div class="col-md-4 text-right label"><label for="email">Email<span class="red">*</span></label></div>
                    <div class="col-md-4"><input type="email" name="email" id="email" value="" class="required form-control"></div>
                    
                    <div class="col-md-4 text-right label"><label for="name">Name</label></div>
                    <div class="col-md-4"><input type="text" id="name" name="name" value="" class="form-control"></div>
                    
                    <div class="col-md-4 text-right label"><label for="company">Company</label></div>
                    <div class="col-md-4"><input type="text" name="company" id="company" value="" class="form-control"></div>
                    
                    <div class="col-md-4 text-right"><label for="country">Country<span class="red">*</span></label></div>
                    <div class="col-md-4"><select name="country" id="country" class="form-control required">
                        <option value="">-- Select --</option>
                        <option value="Afganistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire">Bonaire</option>
                        <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Channel Islands">Channel Islands</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos Island">Cocos Island</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote DIvoire">Cote D'Ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curaco">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">Falkland Islands</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Ter">French Southern Ter</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea Sout">Korea South</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Midway Islands">Midway Islands</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nambia">Nambia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherland Antilles">Netherland Antilles</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Nevis">Nevis</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau Island">Palau Island</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Phillipines">Philippines</option>
                        <option value="Pitcairn Island">Pitcairn Island</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Barthelemy">St Barthelemy</option>
                        <option value="St Eustatius">St Eustatius</option>
                        <option value="St Helena">St Helena</option>
                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="St Maarten">St Maarten</option>
                        <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                        <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Samoa American">Samoa American</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Serbia &amp; Montenegro">Serbia &amp; Montenegro</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Erimates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Uraguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City State">Vatican City State</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                        <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                        <option value="Wake Island">Wake Island</option>
                        <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                    </select></div>
                      <div id="email-consent">
                        <div>Choose the types of notifications you want to receive:</div>
                        <div> <label><input id="subscribe_newrelease" name="subscribe_newrelease" type="checkbox">Oxygen Web Author release announcements and subscription/SMP renewal notifications</label></div>
                        <div> <label><input id="subscribe_newsletter" name="subscribe_newsletter" type="checkbox">Oxygen Web Author-related events, such as webinars, demos, and conferences</label></div>                        
                      </div>
                      <div style="margin-left: 25%;">The personal information requested is used for no other purposes than to keep connected with you regarding Oxygen Web Author updates.</div>
                    </div>
                    <div class="idonthave">
                      <div class="col-md-2"></div>
                      <div class="col-md-8">Paste your Oxygen XML Web Author license key<span class="red">*</span></div>
                      <div class="col-md-2"></div>
                      <textarea id="pasted-license" class="col-md-8" rows="9"></textarea>
                    </div>
                    <div class="text-center">
                      <button id="get-trial" class="oxy-button oxy-button--primary">Start Trial</button>
                    </div>
                  </div>
                  
                  <div class="result">
                    <div class="loading text-center">
                      Activating your trial key...
                    </div>
                    <div class="success text-center">
                      <div style="margin:15px 0">Your trial key was activated.</div>
                      <a class="oxy-button oxy-button--primary" href="/<%= contextName %>/app/oxygen.html" >Go to Dashboard</a>
                    </div>
                    <div class="failure">
                      Failed to use a trial license key.
                      <div>
                      You can go to Oxygen XML Web Author <a href="https://www.oxygenxml.com/webauthor/">web page</a> to get a license
                      and activate it on the <a href="/license-servlet">builtin license server</a>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="simple" class="option">
                <div class="preview">
                  <div class="title">Fast setup</div>
                  <div class="shortdesc">The simplest way to start using the Oxygen XML Web Author with a commercial license.</div>
                </div>
                <div class="details">A floating license server was already installed together with Oxygen XML Web Author.
                Go to the floating license server setup page to activate your license key.
                  <div class="text-center">
                    <a href="/license-servlet/" class="oxy-button oxy-button--primary">License server setup page</a>
                  </div>
                </div>
              </div>

              <div id="advanced" class="option">
                <div class="preview">
                  <div class="title">Flexible setup</div>
                  <div class="shortdesc">Involves setting up the license server on a dedicated machine. This gives you increased 
                    flexibility for more complex deployments.</div>
                </div>
                <div class="details">Instructions:
                  <ul>
                    <li>Install an external license server. You can download it <a href="https://www.oxygenxml.com/license_server.html">here</a>.
                    <li>Activate your license key with the newly installed license server.
                    <li>Connect Oxygen XML Web Author to the newly installed license server using the 
                      <a href="/<%= contextName %>/app/admin.html#License">Administration Page</a>. 
                    <li><a href="/<%= contextName %>/app/oxygen.html">Go to dashboard</a>
                  </ul>
                </div>
              </div>
              
            </div>
        </div>
    </div>
    <script src="config.js?cache-id=<%=System.getProperty("com.oxygenxml.webapp.version")%>"></script>
</body>
</html>
