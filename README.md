# 🔐 ShiftLeft IAC DevSecOps

**An advanced DevSecOps reference platform that embeds security at every layer — from developer workstations to production infrastructure.**

[![CI - Shift-Left Security](https://img.shields.io/github/actions/workflow/status/SimardeepSingh-zsh/ShiftLeft-IAC-DevSecOps/devsecops.yml?label=Shift-Left%20CI&logo=github-actions&logoColor=white)](https://github.com/SimardeepSingh-zsh/ShiftLeft-IAC-DevSecOps/actions)
[![Checkov IaC Scan](https://img.shields.io/badge/IaC%20Scan-Checkov-brightgreen?logo=terraform)](https://www.checkov.io/)
[![Semgrep SAST](https://img.shields.io/badge/SAST-Semgrep-blue?logo=semgrep)](https://semgrep.dev/)
[![Gitleaks](https://img.shields.io/badge/Secrets-Gitleaks-red?logo=git)](https://github.com/gitleaks/gitleaks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Overview](#-overview) · [Architecture](#-architecture) · [Security Layers](#-security-layers) · [Getting Started](#-getting-started) · [CI/CD Pipeline](#-cicd-pipeline) · [Project Structure](#-project-structure) · [Contributing](#-contributing)

</div>

---

## 📌 Overview

**ShiftLeft-IAC-DevSecOps** is a production-grade reference implementation that demonstrates how to integrate security left — early in the development lifecycle — rather than bolting it on at the end.

This project combines two pillars of modern secure engineering:

| Pillar | What it does |
|---|---|
| **Shift-Left Security** | SAST, secrets scanning, and linting integrated into developer workflows and CI pipelines |
| **Infrastructure-as-Code Security** | Terraform and Kubernetes manifests scanned for misconfigurations with policy-as-code enforcement |

Whether you're a security engineer, platform engineer, or DevOps practitioner, this repo gives you a working blueprint you can adapt for real-world projects.

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Workstation                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  ESLint      │  │  Gitleaks    │  │  Pre-commit Hooks │  │
│  │  (Linting)   │  │  (Secrets)   │  │  (Local Gates)    │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │  git push
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions CI/CD                        │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Semgrep     │  │  Checkov     │  │  Gitleaks CI      │  │
│  │  (SAST)      │  │  (IaC Scan)  │  │  (Secrets Scan)   │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │  deploy (if all gates pass)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Infrastructure (IaC)                          │
│  ┌──────────────────────┐   ┌──────────────────────────┐    │
│  │   Terraform (AWS)    │   │  Kubernetes Manifests     │    │
│  │   Policy-as-Code     │   │  OPA / Checkov Policies   │    │
│  └──────────────────────┘   └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Layers

### 1. Shift-Left Application Security

| Tool | Purpose | Stage |
|---|---|---|
| **ESLint** | JavaScript/Node.js static linting and code quality | Local + CI |
| **Semgrep** | Static Application Security Testing (SAST) — detects injection flaws, insecure patterns, and CVEs | CI |
| **Gitleaks** | Scans git history and staged files for hardcoded secrets, API keys, and credentials | Local + CI |

### 2. Infrastructure-as-Code Security

| Tool | Purpose | Targets |
|---|---|---|
| **Checkov** | Misconfiguration scanning and policy-as-code enforcement | Terraform HCL, Kubernetes YAML |
| **OPA / Rego** | Policy-as-code rules for custom compliance requirements | Kubernetes, Terraform |

### 3. CI/CD Gate Enforcement

All security tools run as **blocking gates** in the GitHub Actions pipeline. A failed scan prevents deployment — no exceptions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [Terraform](https://www.terraform.io/) ≥ 1.5
- [Docker](https://www.docker.com/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Checkov](https://www.checkov.io/) — `pip install checkov`
- [Semgrep](https://semgrep.dev/) — `pip install semgrep`
- [Gitleaks](https://github.com/gitleaks/gitleaks) — `brew install gitleaks` or [download binary](https://github.com/gitleaks/gitleaks/releases)

### Installation

```bash
# Clone the repository
git clone https://github.com/SimardeepSingh-zsh/ShiftLeft-IAC-DevSecOps.git
cd ShiftLeft-IAC-DevSecOps

# Install application dependencies
cd app
npm install
```

### Running Security Scans Locally

**Lint the application code:**
```bash
cd app
npm run lint
```

**Run SAST with Semgrep:**
```bash
semgrep --config=auto app/
```

**Scan for secrets with Gitleaks:**
```bash
gitleaks detect --source . --verbose
```

**Scan Terraform IaC:**
```bash
checkov -d iac/terraform
```

**Scan Kubernetes manifests:**
```bash
checkov -d iac/kubernetes
```

---

## ⚙️ CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/`) runs the full security suite on every push and pull request:

```yaml
Trigger: push / pull_request → main

Jobs:
  ├── lint          # ESLint static code analysis
  ├── sast          # Semgrep SAST scan
  ├── secrets       # Gitleaks secrets detection
  ├── iac-scan      # Checkov Terraform + Kubernetes scan
  └── build         # Docker image build (only if all security gates pass)
```

> ⚠️ **All jobs are required to pass before merge.** Security failures are never bypassed.

---

## 📁 Project Structure

```
ShiftLeft-IAC-DevSecOps/
│
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipeline definitions
│
├── app/                    # Application source code (Node.js / JavaScript)
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── iac/                    # Infrastructure-as-Code
│   ├── terraform/          # AWS Terraform modules (HCL)
│   └── kubernetes/         # Kubernetes manifests (YAML)
│
├── security/               # Security policies, configs, and reports
│   ├── semgrep/            # Custom Semgrep rules
│   ├── checkov/            # Custom Checkov policies (OPA/Rego)
│   └── gitleaks/           # Gitleaks configuration
│
└── SECURITY.md             # Security policy and vulnerability reporting
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Application** | Node.js, JavaScript, Docker |
| **Infrastructure** | Terraform (HCL), Kubernetes |
| **SAST** | Semgrep |
| **Secrets Scanning** | Gitleaks |
| **IaC Scanning** | Checkov |
| **Linting** | ESLint |
| **CI/CD** | GitHub Actions |
| **Policy-as-Code** | OPA / Rego |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and ensure all security scans pass locally
4. Commit with a descriptive message: `git commit -m "feat: add XYZ"`
5. Push and open a Pull Request

> Please review [SECURITY.md](SECURITY.md) before submitting any changes that touch security configurations.

---

## 🔏 Security Policy

Found a vulnerability? **Please do not open a public GitHub issue.**

Contact the maintainer privately via [GitHub Security Advisories](https://github.com/SimardeepSingh-zsh/ShiftLeft-IAC-DevSecOps/security/advisories/new) or reach out directly. See [SECURITY.md](SECURITY.md) for full details.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ by [SimardeepSingh-zsh](https://github.com/SimardeepSingh-zsh)

*"Security is not a feature — it's a foundation."*

</div>
