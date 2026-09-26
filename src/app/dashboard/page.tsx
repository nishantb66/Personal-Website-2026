"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileSearch,
  FileText,
  Gauge,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  Search,
  ShieldAlert,
  UploadCloud,
} from "lucide-react";

type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

type Risk = {
  id: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: string;
  title: string;
  description: string;
  recommendation: string | null;
};

type DocumentRecord = {
  id: string;
  title: string;
  fileName: string | null;
  documentType: string | null;
  status: string;
  summary: string | null;
  riskScore: number;
  createdAt: string;
  risks: Risk[];
  _count?: {
    risks: number;
  };
};

type DashboardStats = {
  documentsAnalysed: number;
  totalRisksDetected: number;
  criticalRisks: number;
  highRisks: number;
  averageRiskScore: number;
  severityCounts: Record<Risk["severity"], number>;
  recentDocuments: Array<
    Pick<DocumentRecord, "id" | "title" | "status" | "riskScore" | "createdAt"> & {
      _count: { risks: number };
    }
  >;
};

type ApiError = {
  error?: string;
};

const documentTypes = [
  "Agreement",
  "Legal notice",
  "Vendor contract",
  "NDA",
  "Policy document",
];

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as ApiError;
  return payload.error || "Request failed. Please try again.";
}

function buildDemoRisks(documentType: string, title: string) {
  return [
    {
      severity: "HIGH",
      category: "Liability",
      title: "Broad liability exposure",
      description: `${title || documentType} may contain obligations that should be reviewed for uncapped liability or one-sided responsibility.`,
      recommendation: "Check indemnity, limitation of liability, and survival clauses before approval.",
    },
    {
      severity: "MEDIUM",
      category: "Termination",
      title: "Termination terms need review",
      description:
        "Termination rights, notice periods, and post-termination obligations should be checked for operational impact.",
      recommendation: "Confirm that exit rights are balanced and compatible with business continuity needs.",
    },
    {
      severity: "LOW",
      category: "Compliance",
      title: "Compliance wording should be validated",
      description:
        "Regulatory, confidentiality, and data handling language should be reviewed against internal policy.",
      recommendation: "Route to legal/compliance if sensitive data, payments, or third-party access is involved.",
    },
  ] as const;
}

function severityClass(severity: string) {
  return `severity-pill ${severity.toLowerCase()}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeDocument = useMemo(() => {
    return documents.find((document) => document.id === activeDocumentId) || documents[0];
  }, [activeDocumentId, documents]);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return documents;
    }

    return documents.filter((document) => {
      return [document.title, document.fileName, document.documentType]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    });
  }, [documents, query]);

  const loadPortal = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const meResponse = await fetch("/api/auth/me", { credentials: "include" });

    if (meResponse.status === 401) {
      router.replace("/");
      return;
    }

    if (!meResponse.ok) {
      setError(await readApiError(meResponse));
      setIsLoading(false);
      return;
    }

    const mePayload = (await meResponse.json()) as { user: User };
    const [statsResponse, docsResponse] = await Promise.all([
      fetch("/api/dashboard/stats", { credentials: "include" }),
      fetch("/api/documents", { credentials: "include" }),
    ]);

    if (!statsResponse.ok || !docsResponse.ok) {
      setError("Unable to load your portal data.");
      setIsLoading(false);
      return;
    }

    const statsPayload = (await statsResponse.json()) as { stats: DashboardStats };
    const docsPayload = (await docsResponse.json()) as { documents: DocumentRecord[] };

    setUser(mePayload.user);
    setStats(statsPayload.stats);
    setDocuments(docsPayload.documents);
    setActiveDocumentId(docsPayload.documents[0]?.id ?? null);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadPortal();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadPortal]);

  async function submitDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice("");
    setError("");

    const title = documentTitle.trim() || selectedFile?.name || `${documentType} review`;
    const risks = buildDemoRisks(documentType, title);
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        fileName: selectedFile?.name,
        documentType,
        status: "COMPLETED",
        summary:
          "AI-ready review record created. The findings below represent the risk workflow structure used by the portal.",
        riskScore: 72,
        risks,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError(await readApiError(response));
      return;
    }

    const payload = (await response.json()) as { document: DocumentRecord };
    setDocuments((current) => [payload.document, ...current]);
    setActiveDocumentId(payload.document.id);
    setDocumentTitle("");
    setSelectedFile(null);
    setNotice("Document review added to your workspace.");
    await refreshStats();
  }

  async function refreshStats() {
    const response = await fetch("/api/dashboard/stats", { credentials: "include" });

    if (response.ok) {
      const payload = (await response.json()) as { stats: DashboardStats };
      setStats(payload.stats);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
  }

  if (isLoading) {
    return (
      <main className="portal-loading">
        <Loader2 className="spin" />
        <span>Loading secure portal</span>
      </main>
    );
  }

  return (
    <main className="portal-page">
      <aside className="portal-sidebar" aria-label="Portal navigation">
        <div className="portal-brand compact">
          <span className="portal-mark">D</span>
          <div>
            <strong>DocRisk</strong>
            <span>Portal</span>
          </div>
        </div>

        <nav className="portal-nav">
          <a className="active" href="#overview">
            <LayoutDashboard aria-hidden="true" />
            Overview
          </a>
          <a href="#workspace">
            <FileSearch aria-hidden="true" />
            Analysis
          </a>
          <a href="#documents">
            <FileText aria-hidden="true" />
            Documents
          </a>
          <a href="#risks">
            <ShieldAlert aria-hidden="true" />
            Risks
          </a>
        </nav>
      </aside>

      <section className="portal-main">
        <header className="portal-topbar">
          <div>
            <p className="section-kicker">Document risk portal</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell aria-hidden="true" />
            </button>
            <div className="user-chip">
              <CircleUserRound aria-hidden="true" />
              <span>{user?.name || user?.email}</span>
            </div>
            <button className="ghost-action" type="button" onClick={logout}>
              <LogOut aria-hidden="true" />
              Logout
            </button>
          </div>
        </header>

        {notice ? (
          <div className="notice success portal-notice">
            <CheckCircle2 aria-hidden="true" />
            <span>{notice}</span>
          </div>
        ) : null}

        {error ? <div className="notice error portal-notice">{error}</div> : null}

        <section id="overview" className="stat-grid">
          <article className="stat-card">
            <FileText aria-hidden="true" />
            <span>Documents analysed</span>
            <strong>{stats?.documentsAnalysed ?? 0}</strong>
          </article>
          <article className="stat-card">
            <AlertTriangle aria-hidden="true" />
            <span>Total risks</span>
            <strong>{stats?.totalRisksDetected ?? 0}</strong>
          </article>
          <article className="stat-card">
            <ShieldAlert aria-hidden="true" />
            <span>High/Critical</span>
            <strong>{(stats?.highRisks ?? 0) + (stats?.criticalRisks ?? 0)}</strong>
          </article>
          <article className="stat-card">
            <Gauge aria-hidden="true" />
            <span>Avg. risk score</span>
            <strong>{stats?.averageRiskScore ?? 0}</strong>
          </article>
        </section>

        <section id="workspace" className="portal-grid">
          <article className="portal-panel intake-panel">
            <div className="panel-head">
              <div>
                <p className="section-kicker">Analysis workspace</p>
                <h2>Upload document for risk review</h2>
              </div>
              <Plus aria-hidden="true" />
            </div>

            <form className="document-form" onSubmit={submitDocument}>
              <label>
                Document title
                <input
                  value={documentTitle}
                  onChange={(event) => setDocumentTitle(event.target.value)}
                  placeholder="Master services agreement"
                />
              </label>

              <label>
                Document type
                <select
                  value={documentType}
                  onChange={(event) => setDocumentType(event.target.value)}
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="upload-zone">
                <UploadCloud aria-hidden="true" />
                <strong>{selectedFile ? selectedFile.name : "Choose a document"}</strong>
                <span>PDF, DOCX, or text-based legal documents</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(event) =>
                    setSelectedFile(event.target.files?.[0] ?? null)
                  }
                />
              </label>

              <button className="primary-action" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="spin" /> : null}
                Run AI review
                <ChevronRight aria-hidden="true" />
              </button>
            </form>
          </article>

          <article className="portal-panel risk-panel" id="risks">
            <div className="panel-head">
              <div>
                <p className="section-kicker">Current risk profile</p>
                <h2>{activeDocument?.title || "No document selected"}</h2>
              </div>
              <BarChart3 aria-hidden="true" />
            </div>

            {activeDocument ? (
              <>
                <div className="risk-score">
                  <span>Risk score</span>
                  <strong>{activeDocument.riskScore}</strong>
                  <div>
                    <i style={{ width: `${Math.min(activeDocument.riskScore, 100)}%` }} />
                  </div>
                </div>

                <div className="risk-list">
                  {activeDocument.risks?.length ? (
                    activeDocument.risks.map((risk) => (
                      <article key={risk.id || risk.title} className="risk-item">
                        <span className={severityClass(risk.severity)}>{risk.severity}</span>
                        <div>
                          <h3>{risk.title}</h3>
                          <p>{risk.description}</p>
                          {risk.recommendation ? <small>{risk.recommendation}</small> : null}
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="muted-text">No risk findings are attached to this document.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <FileSearch aria-hidden="true" />
                <h3>No documents yet</h3>
                <p>Upload a document to start building your risk history.</p>
              </div>
            )}
          </article>
        </section>

        <section id="documents" className="portal-panel document-panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">My documents</p>
              <h2>Personal analysis history</h2>
            </div>
            <label className="search-field">
              <Search aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documents"
              />
            </label>
          </div>

          <div className="document-table" role="table" aria-label="Documents">
            <div className="document-row table-head" role="row">
              <span>Document</span>
              <span>Type</span>
              <span>Risks</span>
              <span>Score</span>
              <span>Status</span>
            </div>
            {filteredDocuments.length ? (
              filteredDocuments.map((document) => (
                <button
                  key={document.id}
                  className={`document-row ${activeDocument?.id === document.id ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveDocumentId(document.id)}
                >
                  <span>
                    <strong>{document.title}</strong>
                    <small>{document.fileName || "Manual record"}</small>
                  </span>
                  <span>{document.documentType || "Document"}</span>
                  <span>{document.risks?.length ?? document._count?.risks ?? 0}</span>
                  <span>{document.riskScore}</span>
                  <span>{document.status}</span>
                </button>
              ))
            ) : (
              <div className="empty-state compact-empty">
                <FileText aria-hidden="true" />
                <p>No matching documents found.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
