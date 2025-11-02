This README serves as your primary reference and documentation, focusing heavily on your ethical authorization and the proper use of the PoC files.

### 🛡️ Psykeeper's Private Security Research Hub

> **STATUS: PRIVATE & AUTHORIZED USE ONLY**
> 
> This repository hosts dynamic Proof-of-Concept (PoC) generators for ethical web security research. All testing is conducted with **explicit, written authorization** under the scope of active Bug Bounty Programs or formal penetration testing agreements.

---

### 🚨 Ethical & Authorization Mandate

**The owner of this repository confirms:**

- **Explicit Scope:** All testing is restricted **only** to assets explicitly listed as in-scope by the target program's rules.
    
- **Non-Malicious Intent:** Tools are used solely for vulnerability confirmation and reporting. No further exploitation, data destruction, or Denial-of-Service (DoS) will be performed.
    
- **Immediate Reporting:** All confirmed vulnerabilities are reported immediately through the authorized channel.
    

**_If a vulnerability is found, the testing stops at the point of confirmed PoC._**

---

### 🗺️ Repository Structure & Contents

|**File/Folder**|**Description**|**Relevant PoCs**|
|---|---|---|
|**`index.html`**|The main dashboard and launchpad for all dynamic PoC generators.|All|
|**`cors_test.html`**|Dynamic attacker-side PoC to test for **CORS Misconfigurations**.|CORS|
|**`csrf_attack.html`**|Dynamic attacker-side PoC to perform a **CSRF** attack via POST form submission.|CSRF|
|**`xss_poc.html`**|Static HTML page for testing/triaging XSS payloads. _Not the payload itself._|XSS|
|**`xss_payload.js`**|The actual JavaScript payload for **XSS Cookie Exfiltration**. Requires `?log=` parameter.|XSS|
|**`ssrf_trigger.html`**|PoC that uses an HTML-based redirect (302) to trigger a **Blind SSRF** out-of-band call.|SSRF|
|`/targets/`|_(Recommendation)_ Dedicated folder for notes, screenshots, and custom scripts for **each** active engagement.|N/A|

### 🛠️ PoC Usage Guide (By Vulnerability)

This is a quick-reference guide for the specific usage of the dynamic files.

| **Vulnerability** | **PoC File**        | **Critical Parameters**          | **Confirmation Check**                                                          |
| ----------------- | ------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| **CSRF**          | `csrf_attack.html`  | `?url=VULN_ENDPOINT&param=value` | Check **target site** (e.g., successful email change).                          |
| **CORS**          | `cors_test.html`    | `?target=VULN_API_URL`           | Look for **STOLEN DATA** to be displayed on the `cors_test.html` page.          |
| **XSS**           | `xss_payload.js`    | `?log=WEBHOOK_URL`               | Check your **Webhook/Beeceptor log** for the incoming request with cookie data. |
| **SSRF (OOB)**    | `ssrf_trigger.html` | `?log=WEBHOOK_URL`               | Check your **Webhook/Beeceptor log** for a request from the target server's IP. |

### 🔗 External Logging Requirement

Since this repository is hosted statically (e.g., GitHub Pages), it cannot receive incoming requests for data exfiltration PoCs.

- **Required Tool:** You **must** use an external logging endpoint (e.g., **Webhook.site, Beeceptor**) to capture stolen data from XSS and the out-of-band connection from SSRF.
    
- **Parameter:** Always replace the `WEBHOOK_URL` placeholder with your unique endpoint.
