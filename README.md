
# NetGuard: Mobile Network Threat Detection System

NetGuard is a sophisticated web-based early warning system designed for mobile users on public Wi-Fi. It utilizes a combination of behavioral analysis, cryptographic validation, and signature-based rules to detect common network threats without requiring native app installations.

## Core Features
- **Traffic Anomaly Analysis**: Detects latency spikes and suspicious protocol timing.
- **SSL Integrity Detection**: Simulates SHA-256 fingerprint validation to prevent SSL stripping.
- **NIDS Rule Engine**: Monitors for ARP spoofing indicators and DNS hijacking patterns.
- **Malware Behavioral Analysis**: Detects unusual background activity and performance degradation.

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, TypeScript.
- **Security Logic**: Custom rule engine based on NIDS signatures.
- **Backend (Simulated)**: The app uses a high-fidelity simulator for network probes to demonstrate real-world detection logic in a sandbox-friendly manner.

## Security Decisions
1. **Zero-Trust UI**: All network status indicators are validated against a central detection engine.
2. **Mobile-First**: Optimized for small screens to ensure usability during travel or public Wi-Fi usage.
3. **Behavioral over Passive**: Since browsers cannot sniff raw packets, the system focuses on side-channel indicators (timing, header integrity, response consistency).

## Limitations & Ethics
- **Browser Sandbox**: This tool cannot perform raw packet capture (PCAP) due to browser security restrictions. It relies on high-level APIs.
- **Privacy**: The application does not log user-specific data; all analysis is performed on network metadata.
- **False Positives**: Network noise on busy public Wi-Fi may trigger low-severity alerts.

## Setup
1. Standard React/TypeScript environment.
2. Run `npm install`.
3. Start development server.
