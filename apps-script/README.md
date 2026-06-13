# Grant Labs CRM Google Sheets API

1. Open the Google Sheet created for Grant Labs leads.
2. Go to Extensions > Apps Script.
3. Replace `Code.gs` with the contents of this folder's `Code.gs`.
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Copy the Web app URL.
8. Paste it into `config.js`:

```js
window.GRANTLABS_CRM_API_URL = "YOUR_WEB_APP_URL";
```

After deployment, homepage form submissions are appended to the `Leads` tab and `/crm` reads the same list.
