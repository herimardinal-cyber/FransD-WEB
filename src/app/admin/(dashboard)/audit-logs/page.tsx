import prisma from '@/lib/prisma';

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#222]">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
          Security & Traceability
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
          Audit Logs
        </h1>
        <p className="text-xs font-mono text-[#717171] mt-1">
          Immutable event log tracking authentication, content mutations, and uploads.
        </p>
      </div>

      {/* Logs Table */}
      <div className="bg-[#121212] border border-[#222] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#171717] border-b border-[#222] text-[#A7A7A7] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity</th>
              <th className="py-3 px-4">Entity ID</th>
              <th className="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1C] text-[#D4D4D4]">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#717171]">
                  No audit log entries recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#161616] transition-colors">
                  <td className="py-3 px-4 text-[#717171] whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded-none text-[9px] ${
                        log.action.includes('DELETE')
                          ? 'bg-red-950/70 text-red-400 border border-red-800/40'
                          : log.action.includes('CREATE') || log.action.includes('UPLOAD')
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                          : log.action === 'LOGIN'
                          ? 'bg-blue-950/70 text-blue-400 border border-blue-800/40'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#C6AA7B] whitespace-nowrap">
                    {log.entityType}
                  </td>
                  <td className="py-3 px-4 text-[#717171] max-w-[120px] truncate">
                    {log.entityId || '—'}
                  </td>
                  <td className="py-3 px-4 text-[#A7A7A7] max-w-md truncate">
                    {log.details || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
