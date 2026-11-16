# Tanzania Taekwondo Federation (TTF) — Official Content & Placeholder Inventory

This checklist enumerates all placeholder items currently configured in the database, configuration files, and pages. As real TTF information is verified, administrators can update these fields directly via the secure web Admin Portal (`/admin/settings`, `/admin/officials`, `/admin/documents`, etc.) or in the seed file without touching any code.

---

## 1. Secretariat & Contact Information (`/admin/settings`)

| Configuration Key | Current Placeholder Value | Intended Real Value | Update Location |
| :--- | :--- | :--- | :--- |
| **Phone** | `[+255 22 211 XXXX - TTF Official Secretariat Phone]` | Official TTF Secretariat Landline / Mobile | Admin Settings > Secretariat Contacts |
| **Email** | `[info@ttf.or.tz - Official TTF Email]` | Official Incoming Email (e.g., info@ttf.or.tz) | Admin Settings > Secretariat Contacts |
| **Physical Address** | `[Benjamin Mkapa National Stadium Complex, Taifa Road, Dar es Salaam, Tanzania]` | Headquarters Office / Room number | Admin Settings > Secretariat Contacts |
| **Postal Address** | `[P.O. Box XXXXX, Dar es Salaam, United Republic of Tanzania]` | TTF Postal Box number | Admin Settings > Secretariat Contacts |
| **Office Hours** | `[Monday – Friday: 08:30 – 16:30 EAT]` | Public inquiry operating hours | Admin Settings > Secretariat Contacts |

---

## 2. Bank & Mobile Money Payment Guidelines (`/admin/settings` & `/membership/fees`)

| Configuration Key | Current Placeholder Value | Intended Real Value | Update Location |
| :--- | :--- | :--- | :--- |
| **Bank Name & Account Title** | `[CRDB Bank Plc / NMB Bank - Account Name: Tanzania Taekwondo Federation]` | Official Federation Bank & Account Name | Admin Settings > Payment Guidelines |
| **Account Number & Swift** | `[A/C No: 015XXXXXXXXXXX - Swift: CORUTZTZ]` | TTF Bank Account Number & Swift Code | Admin Settings > Payment Guidelines |
| **Mobile Money Merchant** | `[M-Pesa / Tigo Pesa Lipa Namba: 5XXXXXX (TTF Secretariat)]` | TTF Lipa Namba / Merchant Till Number | Admin Settings > Payment Guidelines |

---

## 3. Executive Committee & Leadership (`/admin/officials`)

| Position | Current Placeholder Name | Required Information to Provide |
| :--- | :--- | :--- |
| **President** | `[TTF President name]` | Full Legal Name, Bio, Official Portrait Photo |
| **Vice President** | `[TTF Vice President name]` | Full Legal Name, Bio, Official Portrait Photo |
| **Secretary General** | `[TTF Secretary General name]` | Full Legal Name, Bio, Official Portrait Photo |
| **Honorary Treasurer** | `[TTF Treasurer name]` | Full Legal Name, Bio, Official Portrait Photo |
| **Technical Director** | `[TTF Technical Director name]` | Full Legal Name, Bio, Official Portrait Photo |
| **Referee Committee Chair** | `[TTF Referee Committee Chair]` | Full Legal Name, Dan Rank, Bio |
| **Athletes Committee Chair** | `[TTF Athletes Committee Chair]` | Current or Former National Athlete Name |
| **Women in Taekwondo Lead**| `[TTF Women Committee Chair]` | Full Legal Name, Bio |
| **Para Taekwondo Lead** | `[TTF Para Committee Chair]` | Full Legal Name, Bio |

---

## 4. Official Governing Documents (`/admin/documents`)

The document library is pre-configured with categories matching World Taekwondo and the National Sports Council. Upload the signed, stamped PDF versions:

- [ ] **TTF Constitution & By-Laws (Katiba ya Shirikisho la Taekwondo Tanzania)**: Signed by Secretary General and approved by BMT.
- [ ] **National Ranking & Selection Criteria Regulations**: Outlines points awarded per tournament tier.
- [ ] **Anti-Doping Policy & WADA Prohibited List**: Reference to RADO / WADA guidelines.
- [ ] **Safe Sport & Child Safeguarding Policy**: Mandatory code of conduct for all affiliated coaches and referees.
- [ ] **Dan/Kup Promotion Regulations & Syllabus**: Prescribed forms and technical standards.
- [ ] **Club Affiliation Application Packet**: Fillable registration form.

---

## 5. Official Social Media Channels (`/admin/settings`)

- [ ] **Facebook**: Update URL from placeholder `facebook.com/tanzaniataekwondo` to real page.
- [ ] **Instagram**: Update URL from placeholder `instagram.com/tanzaniataekwondo` to real handle.
- [ ] **Twitter / X**: Update URL from placeholder `twitter.com/tztaekwondo` to real handle.
- [ ] **YouTube Channel**: Update URL from placeholder `youtube.com/@tanzaniataekwondo`.

---

## 6. How to Remove Demo Seed Data

When ready for full production deployment with only authentic federation records:
```bash
npm run seed:wipe
```
This command removes all mock news articles, dummy athletes, and mock tournament podium results while preserving administrator login accounts and core system settings.
