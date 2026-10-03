const drawings = [
  { id: 'D-1001', name: 'Floor Plan A-01.pdf', project: 'Green Tower', category: 'Architecture', status: 'pending_review', revision: 'R02' },
  { id: 'D-1002', name: 'MEP-Schedule-01.png', project: 'North Hub', category: 'MEP', status: 'classified', revision: 'R01' },
  { id: 'D-1003', name: 'Structural Beam Layout.pdf', project: 'Green Tower', category: 'Structure', status: 'pending_review', revision: 'R03' },
];

const reportReasons = ['OCR Error', 'Classification Error', 'Missing Data', 'File Issue', 'Other'];

export default function HomePage() {
  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
            <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>Drawing review and classification dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 10, cursor: 'pointer' }}>
              Upload file
            </button>
            <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 10, cursor: 'pointer' }}>
              My reports
            </button>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            ['Projects', '12'],
            ['Pending review', '7'],
            ['Classified', '96'],
            ['Users', '18'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ color: '#64748b', fontSize: 13 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{value}</div>
            </div>
          ))}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr', gap: 20, marginBottom: 30 }}>
          <div style={{ background: 'white', borderRadius: 18, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ margin: 0 }}>Pending review queue</h2>
              <span style={{ color: '#64748b' }}>Auto-recognition + manual confirmation</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 8px' }}>Drawing</th>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Revision</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {drawings.map((drawing) => (
                  <tr key={drawing.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <strong>{drawing.name}</strong>
                      <div style={{ color: '#64748b', fontSize: 12 }}>{drawing.id}</div>
                    </td>
                    <td>{drawing.project}</td>
                    <td>{drawing.category}</td>
                    <td>{drawing.revision}</td>
                    <td>
                      <span
                        style={{
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: drawing.status === 'classified' ? '#dcfce7' : '#fef3c7',
                          color: drawing.status === 'classified' ? '#166534' : '#92400e',
                          fontSize: 12,
                          fontWeight: 700,
                          display: 'inline-block',
                        }}
                      >
                        {drawing.status === 'classified' ? 'Classified' : 'Pending review'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside style={{ background: 'white', borderRadius: 18, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ marginTop: 0 }}>Report an issue</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: '#334155' }}>
                Drawing
                <select style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff' }} defaultValue={drawings[0].id}>
                  {drawings.map((drawing) => (
                    <option key={drawing.id} value={drawing.id}>{drawing.name}</option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: '#334155' }}>
                Issue type
                <select style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff' }} defaultValue={reportReasons[0]}>
                  {reportReasons.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: '#334155' }}>
                Description
                <textarea
                  rows={5}
                  defaultValue="OCR extracted the wrong revision number and the drawing was assigned to the wrong project."
                  style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', resize: 'vertical' }}
                />
              </label>

              <button style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', fontWeight: 700 }}>
                Submit report
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
