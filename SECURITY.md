# Security Policy

## Reporting a vulnerability

If you discover a security issue in this repository:

- Do not open a public GitHub issue.
- Contact the maintainer privately (email or GitHub Security Advisory).

## Security in this project

- Shift-left security:
  - ESLint and Semgrep for code quality and SAST
  - Gitleaks for secrets scanning
- Infrastructure-as-Code security:
  - Checkov scans for Terraform and Kubernetes manifests
- All security checks are automated via GitHub Actions in `.github/workflows/`.