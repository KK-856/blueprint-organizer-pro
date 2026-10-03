const drawings = [
  {
    id: 'D-1001',
    name: 'Floor Plan A-01.pdf',
    project: 'Green Tower',
    category: 'Architecture',
    status: 'pending_review',
    revision: 'R02',
  },
  {
    id: 'D-1002',
    name: 'MEP-Schedule-01.png',
    project: 'North Hub',
    category: 'MEP',
    status: 'classified',
    revision: 'R01',
  },
  {
    id: 'D-1003',
    name: 'Structural Beam Layout.pdf',
    project: 'Green Tower',
    category: 'Structure',
    status: 'pending_review',
    revision: 'R03',
  },
];

export default function HomePage() {
  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
            <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>Drawing review and classification dashboard</h1>
          </div>
          <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 10, cursor: 'pointer' }}>
            Upload file
          </button>
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

        <section style={{ background: 'white', borderRadius: 18, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
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
                      }}
                    >
                      {drawing.status === 'classified' ? 'Classified' : 'Pending review'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
