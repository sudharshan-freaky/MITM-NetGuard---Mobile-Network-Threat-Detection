
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum ThreatType {
  MITM = 'Man-in-the-Middle',
  SSL_ATTACK = 'SSL Attack',
  DNS_HIJACK = 'DNS Hijack',
  MALWARE = 'Malware Behavior',
  ARP_SPOOF = 'ARP Spoofing Indicator'
}

export interface SecurityAlert {
  id: string;
  timestamp: number;
  type: ThreatType;
  severity: Severity;
  description: string;
  source: string;
}

export interface SecurityStatus {
  score: number;
  activeThreats: number;
  lastScan: number;
  sslValid: boolean;
  dnsIntegrity: boolean;
}

export interface NetworkLog {
  domain: string;
  latency: number;
  fingerprint: string;
  protocol: string;
  status: 'secure' | 'suspicious';
}
