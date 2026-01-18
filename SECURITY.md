# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of POE Giveaway seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:

- Open a public GitHub issue for security vulnerabilities
- Discuss the vulnerability in public forums or social media
- Attempt to exploit the vulnerability on production systems

### Please DO:

1. **Email us privately** or **open a private security advisory** on GitHub at https://github.com/Path-of-sharing/POE-Giveaway/security/advisories with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Any suggested fixes (if you have them)

2. **Allow time for a fix** - We aim to respond within 48 hours and will work to:
   - Confirm the vulnerability
   - Develop and test a fix
   - Release a security patch
   - Publicly disclose the vulnerability (with credit to you, if desired)

3. **Act responsibly** - Please give us reasonable time to address the issue before any public disclosure

## Security Measures

POE Giveaway implements several security measures:

### Application Security

- **Input Validation** - All user inputs are validated both client-side and server-side
- **SQL Injection Prevention** - Using Supabase ORM with parameterized queries
- **XSS Prevention** - React's built-in XSS protection and sanitized inputs
- **CSRF Protection** - Next.js built-in CSRF protection
- **Password Security** - Creator passwords are stored in database (consider hashing in production)
- **Rate Limiting** - IP-based duplicate entry prevention

### Database Security

- **Row Level Security (RLS)** - Enabled on all Supabase tables
- **Least Privilege Access** - Using anonymous key with limited permissions
- **Secure Connections** - All database connections over HTTPS/TLS
- **Data Validation** - Database constraints and triggers for data integrity

### Infrastructure Security

- **Environment Variables** - Sensitive credentials stored in `.env.local` (gitignored)
- **HTTPS Only** - Production deployments should enforce HTTPS
- **Secure Headers** - Configure security headers in production
- **Dependency Updates** - Regular updates to patch known vulnerabilities

## Security Best Practices for Deployment

When deploying POE Giveaway, please ensure:

1. **Environment Variables**
   - Never commit `.env.local` or similar files
   - Use platform-specific secret management (Vercel Secrets, etc.)
   - Rotate keys if accidentally exposed

2. **Supabase Configuration**
   - Enable RLS policies on all tables
   - Use the anonymous key for client-side code
   - Never expose the service_role key client-side
   - Enable email verification if adding authentication

3. **Production Recommendations**
   - Enable HTTPS/SSL certificates
   - Configure security headers (CSP, HSTS, X-Frame-Options)
   - Set up monitoring and alerting
   - Regularly backup your database
   - Consider adding rate limiting at the API level
   - Hash creator passwords before storing (currently plain text)

## Known Security Considerations

### Password Storage
⚠️ **Current Implementation**: Creator passwords are stored in plain text in the database. For production use, consider implementing:
- Password hashing (bcrypt, argon2)
- Secure password reset flow
- Password complexity requirements

### IP-based Prevention
⚠️ **Current Implementation**: IP addresses are used to prevent duplicate entries. Be aware:
- VPNs and proxies can circumvent this
- Users behind NAT may share IPs
- Consider additional fraud prevention measures for high-value giveaways

### Client-side Validation
⚠️ **Current Implementation**: Form validation happens on both client and server, but:
- Always validate server-side (we do this)
- Client-side validation is for UX only
- Never trust client-submitted data

## Security Update Process

1. **Vulnerability Reported** → We acknowledge within 48 hours
2. **Investigation** → We assess severity and impact
3. **Fix Development** → We develop and test a patch
4. **Security Release** → We release a patch version
5. **Disclosure** → We publicly disclose with credit (if approved by reporter)
6. **Update Documentation** → We update this policy if needed

## Vulnerability Disclosure Timeline

- **Day 0**: Vulnerability reported
- **Day 1-2**: Initial response and triage
- **Day 3-7**: Investigation and fix development
- **Day 7-14**: Testing and validation
- **Day 14+**: Patch release and public disclosure

We appreciate the security research community's efforts in responsible disclosure.

## Contact

For security issues: [GitHub Security Advisories](https://github.com/Path-of-sharing/POE-Giveaway/security/advisories)

For general questions: [GitHub Issues](https://github.com/Path-of-sharing/POE-Giveaway/issues)

## Recognition

We believe in giving credit where credit is due. If you report a valid security vulnerability, we will:
- Acknowledge your contribution (with your permission)
- List you in our security hall of fame (if you wish)
- Consider a bug bounty for critical vulnerabilities (if program exists)

Thank you for helping keep POE Giveaway and our users safe!
