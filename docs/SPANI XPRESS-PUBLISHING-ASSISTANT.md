# SpaniXpress Publishing Assistant

## Purpose
Prepare a human-reviewed opportunity post for the SpaniXpress Facebook Group. This is a copy-and-publish workflow, not an API integration.

Group destination supplied by the administrator: https://www.facebook.com/share/g/1Q8yaPsWVt/

## Workflow
1. Open the employer or programme owner's official source directly.
2. Confirm that the intake is currently open.
3. Enter the opportunity details and both official URLs.
4. Record the date the source was checked.
5. Confirm the source-check attestation.
6. Generate and review the caption.
7. Copy the caption, optionally download the PNG artwork, and open the Facebook group.
8. Paste, review and publish or schedule inside Facebook.

## Verification boundary
The static assistant cannot independently confirm that an opportunity is genuine or open. The person preparing the post must check the official source. The UI makes this limitation explicit. A passed form check is an attestation by the user, not a BACCU verification badge or a provider endorsement.

A future verified-listing integration must use the BACCU opportunity verification standard and must not promote directories or unconfirmed intakes as live vacancies.

## Facebook limitation
This feature does not publish directly to a Facebook Group, schedule on the user's behalf, or use a Facebook access token. It opens the group destination in Facebook. The administrator performs final posting or scheduling in Facebook's own interface. Meta's public Groups API is not available for third-party group publishing.

## Privacy and security
- No Facebook login, password, access token or applicant data is collected.
- No backend or paid service is used.
- Draft content remains in the current browser session and is not sent to BACCU.
- "Mark as shared" is a local session note only; it is not a publication receipt.
- Do not include private applicant information, identity numbers, bank details or private contact details in posts.

## QA checklist
- Required fields and source attestation block incomplete drafts.
- Non-HTTPS and malformed URLs are rejected.
- Past deadlines are rejected; deadline may be left blank when the provider states none.
- Future source-check dates are rejected.
- Caption copy, application-link copy and PNG download work.
- Facebook group link opens separately.
- Editing a field invalidates the prepared caption.
- No direct publication, automatic scheduling or token storage occurs.
