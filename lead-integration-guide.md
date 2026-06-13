# Grant Labs Lead Intake Guide

All lead sources should end at one Google Apps Script API.

## API URL

```text
https://script.google.com/macros/s/AKfycby5XkNC7Y5g2XPQnIaEo5BUpLNfyo1fmqDSvPpNu2ysmVuCEOsieUjX6b0R5aumtkCaHA/exec
```

## Supported Input Routes

- Homepage consultation form
- CRM `+ LEAD 추가`
- Any external form or automation that can send a POST request
- Simple URL handoff with `action=createLead`
- Manual CSV export/import through CRM when an ad platform cannot post directly

## Recommended POST Body

```json
{
  "action": "createLead",
  "lead": {
    "source": "Meta 광고",
    "name": "홍길동",
    "company": "샘플 제조",
    "phone": "010-0000-0000",
    "email": "sample@example.com",
    "industry": "제조업",
    "region": "수도권",
    "revenue": "1억 이상",
    "credit_score": "800점 이상",
    "interest": "정책자금",
    "message": "상담 요청"
  }
}
```

## Accepted Field Aliases

- Name: `name`, `담당자명`, `이름`, `성함`, `customer_name`, `full_name`
- Company: `company`, `회사명`, `업체명`, `상호`, `business_name`
- Phone: `phone`, `tel`, `mobile`, `연락처`, `전화번호`, `휴대폰`, `휴대폰번호`
- Email: `email`, `이메일`, `mail`
- Source: `source`, `utm_source`, `채널`, `소스`
- Industry: `industry`, `업종`, `business`, `사업분야`
- Region: `region`, `지역`
- Revenue: `revenue`, `매출`, `매출액`
- Credit: `credit`, `credit_score`, `신용`, `신용점수`

## Simple GET Handoff

Use only when a tool cannot send POST. Contact details will appear in the URL, so POST is preferred.

```text
https://script.google.com/macros/s/.../exec?action=createLead&source=Meta%20광고&name=홍길동&phone=010-0000-0000&industry=제조업
```

## Destination

All leads are stored in the `Leads` tab of:

```text
https://docs.google.com/spreadsheets/d/1KCIwResl3vrUdgfIgThNSaPBN0kr_yI_18AsUYgEFHo
```
