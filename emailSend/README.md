# emailSend

This folder contains a small client-side EmailJS demo for sending a research gap analysis report by email from the browser.

## What is implemented here

Two HTML-based versions are included:

- `index.html`
  Sends a compact email summary.
  It loads the local JSON analysis file, extracts a few important fields, builds a short list of gap titles, and sends the result through EmailJS.

- `index2.html`
  Sends a richer HTML email body.
  It loads the same JSON file, formats each validated research gap in detail, and sends a more complete report using a different EmailJS template.

- `gap_analysis_8c7c4590_7810_4964_8c5f_e0abb8dfa68a_1753597742.json`
  Sample analysis data used as the email content source.

## API and service used

This project uses the EmailJS browser API/service to send emails directly from the frontend without building a separate backend mail server.

### EmailJS

- Purpose:
  Sends email from the browser using configured EmailJS service and template settings.
- Why it is used:
  It allows the form data and analysis report data to be emailed directly from client-side JavaScript.
- SDK source:
  `https://cdn.jsdelivr.net/npm/@emailjs/browser@3.11.0/+esm`
- Main method used:
  `emailjs.send(serviceId, templateId, templateParams, publicKey)`

### What data is sent to EmailJS

The pages prepare template parameters from:

- user name
- user email
- message entered in the form
- request id
- analysis date
- source paper URL
- total papers analyzed
- processing time
- validated research gap details
- executive summary fields such as frontier overview and risk assessment

### Important note about the API usage

- This folder does not call a custom backend API.
- It uses EmailJS as the external email delivery service.
- The research report data itself is loaded from a local JSON file in this folder using `fetch()`.

## How it works

1. The page shows a simple form for:
   - user name
   - user email
   - optional message
2. On submit, the script fetches the local JSON report.
3. The data is cleaned to avoid broken formatting in the outgoing email.
4. Template parameters are built from the JSON content and form fields.
5. EmailJS sends the email using configured service, template, and public key values.

## EmailJS details used here

Both pages use the EmailJS browser SDK from jsDelivr and call the EmailJS send API from the browser.

- Service ID: `service_1fprxk7`
- Public key: `UIJeF9ozej1og_X2m`

Templates:

- `index.html` uses `template_1nv89px`
- `index2.html` uses `template_4bd8vho`

## Notable behavior

- The recipient email is taken from the form and mapped to `to_email`.
- `index.html` sends a lightweight summary with counts and gap titles.
- `index2.html` builds HTML sections for each validated gap, including:
  - description
  - category
  - source paper
  - validation evidence
  - impact
  - metrics
  - suggested approaches
  - milestones
  - success metrics
  - tags and relevance

## How to run

Because the pages use `fetch()` to load a local JSON file, they should be served through a local web server instead of opening the HTML file directly from the filesystem.

Example options:

```powershell
cd emailSend
python -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/index2.html`

## Notes

- The EmailJS keys and template IDs are currently hardcoded in the HTML files.
- The JSON filename is also hardcoded, so changing the source file requires updating the fetch path in the HTML.
- This is a frontend-only example and does not use a backend mail server.
- In this implementation, EmailJS is the main third-party API/service being integrated.
