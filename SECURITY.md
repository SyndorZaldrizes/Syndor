# Security Policy

## Overview

The St. Mary's College of Maryland (SMCM) MSL Project is committed to maintaining the security and privacy of our users and their data. This security policy follows best practices established by academic institutions and research organizations to ensure responsible vulnerability disclosure and timely remediation.

This policy is designed to:
- Provide clear guidelines for security researchers and the academic community
- Establish transparent processes for reporting and handling security vulnerabilities
- Protect the confidentiality, integrity, and availability of institutional resources
- Comply with academic and federal security standards

---

## Scope and Applicability

### In-Scope Systems

This security policy applies to the following components:

- **Production Environment:**
  - The `main` branch of this repository
  - GitHub Pages deployment at the official SMCM MSL website
  - All static assets under `/assets`, `/pages`, and `/docs` directories

- **Infrastructure:**
  - GitHub Actions workflows and CI/CD pipelines
  - Repository configuration and access controls
  - Third-party integrations and dependencies

### Architecture Context

- **Static Site:** This is a static website with no production backend or database
- **Common Vulnerability Types:**
  - Misconfigurations in GitHub Pages or repository settings
  - Exposed secrets or credentials in code/configuration
  - Insecure client-side code (XSS, CSRF, etc.)
  - Vulnerable dependencies in build tools or libraries
  - Access control issues

### Out-of-Scope

- Third-party services or websites linked from our site
- Systems or networks not explicitly owned by the SMCM MSL project
- Physical security of SMCM infrastructure
- Social engineering attacks against project members

---

## Reporting a Vulnerability

### Disclosure Policy

We follow **Coordinated Vulnerability Disclosure (CVD)** principles aligned with academic and federal standards. Security researchers are encouraged to report vulnerabilities responsibly.

### How to Report

**Primary Contact:**
- **Email:** nate.alvarado18@outlook.com
- **Subject Line:** "[SECURITY] Vulnerability Report - [Brief Description]"

### Required Information

To facilitate efficient triage and remediation, please include:

1. **Vulnerability Description:**
   - Clear explanation of the security issue
   - Type of vulnerability (e.g., XSS, exposed credentials, misconfiguration)

2. **Impact Assessment:**
   - Potential impact on confidentiality, integrity, or availability
   - Affected user groups (students, faculty, researchers, public)
   - Severity level (Critical, High, Medium, Low)

3. **Reproduction Steps:**
   - Detailed, numbered steps to reproduce the vulnerability
   - Include specific URLs, files, or configuration settings affected
   - Screenshots or proof-of-concept code (if applicable)

4. **Environment Details:**
   - Browser and version (if client-side vulnerability)
   - Operating system
   - Date and time of discovery

5. **Suggested Remediation:** (optional)
   - Proposed fixes or mitigation strategies
   - References to security standards or best practices

### What to Expect

- **Acknowledgment:** We will acknowledge receipt of your report within **3 business days**
- **Initial Assessment:** We will provide an initial assessment within **7 business days**
- **Status Updates:** Regular updates will be provided as we work toward resolution
- **Credit:** With your permission, we will publicly acknowledge your contribution

---

## Responsible Research Guidelines

### Permitted Activities

Security researchers may:
- Access and analyze publicly available code and assets
- Test the website using non-invasive methods
- Create test accounts using your own credentials
- Report vulnerabilities through the designated channel

### Prohibited Activities

Security researchers must not:
- Access, modify, or delete data belonging to other users
- Perform denial-of-service attacks or load testing
- Conduct social engineering attacks against project members
- Exploit vulnerabilities for personal gain
- Publicly disclose vulnerabilities before coordinated disclosure
- Store or share sensitive data discovered during research

### Safe Harbor

We commit to:
- Not pursue legal action against researchers who comply with this policy
- Work with researchers to understand and resolve security issues
- Recognize and credit security researchers (with permission)

### Data Handling Requirements

**If you discover sensitive data during your research:**
1. **Stop testing immediately**
2. **Do not access, store, or share the data**
3. **Notify us immediately** via the reporting channel
4. **Purge any cached or stored data** from your systems

---

## Vulnerability Handling & Response

### Triage Process

**Priority Levels:**

| Severity | Response Time | Resolution Target | Examples |
|----------|---------------|-------------------|----------|
| **Critical** | < 24 hours | 7 days | Exposed credentials, active exploitation |
| **High** | < 3 days | 14 days | XSS, authentication bypass |
| **Medium** | < 7 days | 30 days | Information disclosure, CSRF |
| **Low** | < 14 days | 90 days | Minor configuration issues |

### Remediation Approach

For confirmed vulnerabilities:

1. **Assessment:** Evaluate impact and affected systems
2. **Mitigation:** Implement temporary controls if needed
3. **Fix Development:** Create and test permanent solution
4. **Deployment:** Release through normal deployment pipeline
5. **Verification:** Confirm fix resolves the vulnerability
6. **Disclosure:** Coordinate public disclosure with reporter

### Typical Mitigation Strategies

For this static site, remediation often involves:
- Removing or rotating exposed secrets/credentials
- Updating vulnerable dependencies
- Adjusting client-side code to prevent XSS/CSRF
- Modifying GitHub repository or Pages configuration
- Implementing additional security headers

---

## Coordinated Disclosure Timeline

### Standard Process

1. **Day 0:** Vulnerability reported
2. **Day 1-3:** Initial acknowledgment and triage
3. **Day 4-7:** Assessment and response plan
4. **Day 8-90:** Fix development and deployment (varies by severity)
5. **Day 90+:** Coordinated public disclosure (if applicable)

### Public Disclosure

- We request **90 days** before public disclosure to allow for remediation
- Early disclosure may be coordinated for urgent threats
- We may share reports with:
  - CISA (Cybersecurity and Infrastructure Security Agency)
  - Affected third-party vendors
  - SMCM Information Security Office
- Your contact information will not be shared without permission

---

## Security Best Practices for Contributors

### For Project Maintainers

- Enable two-factor authentication (2FA) on GitHub accounts
- Use branch protection rules on `main` branch
- Review and approve all pull requests before merging
- Regularly update dependencies and review Dependabot alerts
- Never commit secrets, API keys, or credentials to the repository
- Follow principle of least privilege for access controls

### For Contributors

- Keep dependencies up to date
- Follow secure coding practices
- Sanitize and validate all user inputs
- Use Content Security Policy (CSP) headers
- Implement HTTPS for all external resources
- Report any security concerns immediately

---

## Compliance and Standards

This security policy aligns with:

- **NIST Cybersecurity Framework:** Risk management and incident response
- **OWASP Top 10:** Web application security risks
- **Academic Institutional Standards:** Following practices from universities and research institutions
- **Federal Vulnerability Disclosure Policies:** Aligned with NSF, Department of Education, and Smithsonian guidelines

---

## Contact and Additional Information

### Security Team

- **Primary Contact:** nate.alvarado18@outlook.com
- **Project:** SMCM MSL Website
- **Institution:** St. Mary's College of Maryland

### Additional Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [NIST Vulnerability Disclosure Guidelines](https://www.nist.gov/cybersecurity)

### Policy Updates

This security policy is reviewed and updated periodically. Last updated: December 2025.

---

## Acknowledgments

We are a **student-run academic project** committed to learning and implementing security best practices. We appreciate the security research community's efforts to help us maintain a secure environment for the SMCM community.

**Thank you for helping us keep this project secure.**
