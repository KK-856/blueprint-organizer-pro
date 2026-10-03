const drawing = {
  id: 'D-1001',
  name: 'Floor Plan A-01.pdf',
  project: 'Green Tower',
  category: 'Architecture',
  status: 'pending_review',
  revision: 'R02',
  drawingNumber: 'A-01',
  uploadedAt: '2026-10-03',
  detectedText: 'Floor Plan A-01 Green Tower Revision R02 Electrical layout inspection',
  suggestedCategory: 'Architecture / Layout',
  metadata: {
    issueType: 'OCR Error',
    severity: 'High',
    detector: 'Auto OCR',
  },
};

export default function DrawingDetailPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: 32, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
          <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>{drawing.name}</h1>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 18, padding: 24, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Confirm classification</button>
              <button style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Modify metadata</button>
              <button style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Report error</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Project</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{drawing.project}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Category</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{drawing.category}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Drawing number</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{drawing.drawingNumber}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Revision</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{drawing.revision}</div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 style={{ marginBottom: 12 }}>Detected OCR text</h3>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, lineHeight: 1.7, color: '#334155' }}>
                {drawing.detectedText}
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 style={{ marginBottom: 12 }}>Suggested classification</h3>
              <div style={{ background: '#eff6ff', borderRadius: 12, padding: 16, color: '#1d4ed8', fontWeight: 600 }}>
                {drawing.suggestedCategory}
              </div>
            </div>
          </div>

          <aside style={{ background: 'white', borderRadius: 18, padding: 24, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <h3 style={{ marginTop: 0 }}>Auto-identification summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Status</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{drawing.status}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Uploaded</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{drawing.uploadedAt}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Issue type</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{drawing.metadata.issueType}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Severity</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{drawing.metadata.severity}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 12 }}>Detected by</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{drawing.metadata.detector}</div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
