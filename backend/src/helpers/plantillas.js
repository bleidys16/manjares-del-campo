// =============================================
// src/helpers/plantillas.js
// Genera HTML para facturas y reportes
// =============================================

const metodoPagoLabel = {
  qr:              'Código QR',
  llave_nequi:     'Nequi',
  llave_daviplata: 'Daviplata',
  transferencia:   'Transferencia Bancaria',
}

// ── Factura imprimible ──────────────────────

export function generarHtmlFactura(pedido) {
  const fecha = new Date(pedido.created_at).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const items = pedido.detalle_pedidos?.map(i => `
    <tr>
      <td>${i.productos.nombre}</td>
      <td>${i.productos.unidad}</td>
      <td>${i.cantidad}</td>
      <td>$${i.precio_unitario.toLocaleString('es-CO')}</td>
      <td>$${i.subtotal.toLocaleString('es-CO')}</td>
    </tr>`).join('') || ''

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Factura ${pedido.numero_pedido} — Colombia Verde</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;background:#f5f5f5;color:#1a1a1a}
    .w{max-width:800px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1)}
    .hd{background:linear-gradient(135deg,#2d7a2d,#4caf50);color:#fff;padding:36px;display:flex;justify-content:space-between;align-items:center}
    .hd h1{font-size:28px;font-weight:800}.hd p{opacity:.8;font-size:13px;margin-top:3px}
    .hi{text-align:right}.hi .n{font-size:20px;font-weight:700}.hi .f{opacity:.8;font-size:13px;margin-top:4px}
    .est{display:inline-block;background:rgba(255,255,255,.25);padding:3px 12px;border-radius:20px;font-size:11px;margin-top:8px;text-transform:uppercase}
    .bd{padding:36px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:28px}
    .card{background:#f8fdf8;border:1px solid #ddeedd;border-radius:8px;padding:18px}
    .card h3{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#4caf50;margin-bottom:10px}
    .card p{font-size:14px;margin-bottom:3px}
    table{width:100%;border-collapse:collapse;margin-bottom:20px}
    thead tr{background:#2d7a2d;color:#fff}
    th{padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase}
    td{padding:10px 14px;font-size:14px;border-bottom:1px solid #eee}
    tr:nth-child(even) td{background:#f8fdf8}
    .tot{margin-left:auto;width:270px}
    .row{display:flex;justify-content:space-between;padding:7px 0;font-size:14px;border-bottom:1px solid #f0f0f0}
    .row.total{font-size:17px;font-weight:800;color:#2d7a2d;border-bottom:none;border-top:2px solid #2d7a2d;margin-top:8px;padding-top:10px}
    .nota{background:#fff8e1;border:1px solid #ffd54f;border-radius:8px;padding:16px;margin-top:16px}
    .nota h3{color:#f57c00;font-size:13px;margin-bottom:6px}
    .ft{background:#f5f5f5;padding:22px 36px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee}
    .btn{margin-top:12px;background:#2d7a2d;color:#fff;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-size:14px}
    @media print{.btn{display:none}body{background:#fff}.w{box-shadow:none;margin:0;border-radius:0}}
  </style>
</head>
<body>
<div class="w">
  <div class="hd">
    <div><h1>🌿 Colombia Verde</h1><p>Productos frescos del campo a tu mesa</p><p>Área Metropolitana de Barranquilla</p></div>
    <div class="hi"><div class="n">${pedido.numero_pedido}</div><div class="f">${fecha}</div><div class="est">${pedido.estado}</div></div>
  </div>
  <div class="bd">
    <div class="grid">
      <div class="card">
        <h3>📦 Datos del Pedido</h3>
        <p><strong>N°:</strong> ${pedido.numero_pedido}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Estado:</strong> ${pedido.estado}</p>
        <p><strong>Pago:</strong> ${metodoPagoLabel[pedido.metodo_pago] || pedido.metodo_pago}</p>
        <p><strong>Estado pago:</strong> ${pedido.estado_pago}</p>
      </div>
      <div class="card">
        <h3>👤 Datos del Cliente</h3>
        <p><strong>${pedido.clientes.nombre}</strong></p>
        <p>📞 ${pedido.clientes.telefono}</p>
        ${pedido.clientes.email ? `<p>✉️ ${pedido.clientes.email}</p>` : ''}
        <p>📍 ${pedido.clientes.direccion}</p>
        ${pedido.clientes.barrio ? `<p>🏘️ ${pedido.clientes.barrio}, Barranquilla</p>` : ''}
      </div>
    </div>
    <table>
      <thead><tr><th>Producto</th><th>Unidad</th><th>Cant.</th><th>Precio Unit.</th><th>Subtotal</th></tr></thead>
      <tbody>${items}</tbody>
    </table>
    <div class="tot">
      <div class="row"><span>Subtotal</span><span>$${pedido.subtotal.toLocaleString('es-CO')}</span></div>
      ${pedido.descuento > 0 ? `<div class="row"><span>Descuento</span><span style="color:#e53935">-$${pedido.descuento.toLocaleString('es-CO')}</span></div>` : ''}
      <div class="row total"><span>TOTAL</span><span>$${pedido.total.toLocaleString('es-CO')}</span></div>
    </div>
    ${pedido.notas ? `<div class="nota" style="background:#f3f8f3;border-color:#81c784"><h3 style="color:#2d7a2d">📝 Notas</h3><p>${pedido.notas}</p></div>` : ''}
    <div class="nota"><h3>💳 Pago</h3><p>Método: <strong>${metodoPagoLabel[pedido.metodo_pago] || pedido.metodo_pago}</strong> — Envía el comprobante por WhatsApp para confirmar.</p></div>
  </div>
  <div class="ft">
    <p>¡Gracias por confiar en <strong style="color:#2d7a2d">Colombia Verde</strong>! 🌿</p>
    <p>Barranquilla, Colombia</p>
    <button class="btn" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
  </div>
</div>
</body></html>`
}

// ── Reporte mensual imprimible ──────────────

export function generarHtmlReporte(r) {
  const productosRows = r.productos_top.map((p, i) => `
    <tr><td>${i+1}</td><td>${p.nombre}</td><td>${p.categoria}</td><td>${p.cantidad}</td><td>$${p.ingresos.toLocaleString('es-CO')}</td></tr>
  `).join('')

  const metodosRows = Object.entries(r.ingresos_por_metodo_pago || {}).map(([k, v]) => `
    <tr><td>${metodoPagoLabel[k] || k}</td><td>$${v.toLocaleString('es-CO')}</td></tr>
  `).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte — ${r.periodo.nombre}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;background:#f5f5f5;color:#1a1a1a}
    .w{max-width:900px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .hd{background:linear-gradient(135deg,#1b5e20,#4caf50);color:#fff;padding:36px}
    .hd h1{font-size:26px}.hd p{opacity:.85;margin-top:8px;font-size:15px}
    .bd{padding:36px}
    .kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:32px}
    .kpi{background:#f1f8e9;border:1px solid #c5e1a5;border-radius:10px;padding:18px;text-align:center}
    .kpi .v{font-size:26px;font-weight:800;color:#2e7d32}
    .kpi .l{font-size:11px;color:#666;margin-top:3px;text-transform:uppercase;letter-spacing:.5px}
    h2{font-size:14px;color:#2e7d32;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid #e8f5e9}
    table{width:100%;border-collapse:collapse;margin-bottom:28px}
    th{background:#2e7d32;color:#fff;padding:9px 14px;text-align:left;font-size:12px;text-transform:uppercase}
    td{padding:9px 14px;font-size:13px;border-bottom:1px solid #eee}
    tr:nth-child(even) td{background:#f9f9f9}
    .ft{background:#f5f5f5;padding:20px 36px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee}
    .btn{margin-top:10px;background:#2e7d32;color:#fff;border:none;padding:10px 22px;border-radius:6px;cursor:pointer}
    @media print{.btn{display:none}}
  </style>
</head>
<body>
<div class="w">
  <div class="hd"><h1>🌿 Colombia Verde — Reporte Mensual</h1><p>${r.periodo.nombre}</p></div>
  <div class="bd">
    <div class="kpis">
      <div class="kpi"><div class="v">${r.resumen.total_pedidos}</div><div class="l">Pedidos Totales</div></div>
      <div class="kpi"><div class="v">$${r.resumen.ingresos_totales.toLocaleString('es-CO')}</div><div class="l">Ingresos Totales</div></div>
      <div class="kpi"><div class="v">$${r.resumen.ticket_promedio.toLocaleString('es-CO')}</div><div class="l">Ticket Promedio</div></div>
      <div class="kpi"><div class="v">${r.resumen.pedidos_entregados}</div><div class="l">Entregados</div></div>
      <div class="kpi"><div class="v">${r.resumen.tasa_completados}%</div><div class="l">Tasa Completados</div></div>
    </div>
    <h2>🥇 Top 10 Productos del Mes</h2>
    <table><thead><tr><th>#</th><th>Producto</th><th>Categoría</th><th>Unidades</th><th>Ingresos</th></tr></thead><tbody>${productosRows}</tbody></table>
    <h2>💳 Por Método de Pago</h2>
    <table><thead><tr><th>Método</th><th>Total</th></tr></thead><tbody>${metodosRows}</tbody></table>
  </div>
  <div class="ft">
    <p>Generado el ${new Date(r.generado_en).toLocaleString('es-CO')} · Colombia Verde 🌿</p>
    <button class="btn" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
  </div>
</div>
</body></html>`
}

// ── WhatsApp helper ──────────────────────────

export function generarMensajeWhatsApp(pedido, config) {
  const numero = config?.whatsapp_numero || '573001234567'

  const items = pedido.detalle_pedidos
    ?.map(d => `• ${d.productos.nombre} x${d.cantidad} = $${d.subtotal.toLocaleString('es-CO')}`)
    .join('\n') || ''

  const mensaje =
`🌿 *NUEVO PEDIDO - Colombia Verde*

*Cliente:* ${pedido.clientes?.nombre}
*Teléfono:* ${pedido.clientes?.telefono}
*Dirección:* ${pedido.clientes?.direccion}${pedido.clientes?.barrio ? ', ' + pedido.clientes.barrio : ''}

*PRODUCTOS:*
${items}

*Subtotal:* $${pedido.subtotal?.toLocaleString('es-CO')}
*Total:* $${pedido.total?.toLocaleString('es-CO')}
*Pago:* ${metodoPagoLabel[pedido.metodo_pago] || pedido.metodo_pago}
*N° Pedido:* ${pedido.numero_pedido}
${pedido.notas ? '\n*Notas:* ' + pedido.notas : ''}`

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}