-- ════════════════════════════════════════════════════════
-- SARUX — Tabla de instalaciones PWA
-- Ejecuta en Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS pwa_instalaciones (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha      timestamptz DEFAULT now(),
  user_agent text
);

-- Sin RLS (solo escritura pública, lectura solo desde admin)
ALTER TABLE pwa_instalaciones DISABLE ROW LEVEL SECURITY;

-- Índice para consultas por fecha
CREATE INDEX IF NOT EXISTS idx_pwa_fecha ON pwa_instalaciones(fecha DESC);

-- ¡Listo! Ejecuta este archivo una sola vez.
