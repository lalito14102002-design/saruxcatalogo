-- ════════════════════════════════════════════════════════
-- SARUX — Catálogo Mayoreo por Categorías
-- Ejecuta este SQL en Supabase → SQL Editor → New query
-- ════════════════════════════════════════════════════════

-- 1. Crear tabla de categorías de mayoreo
CREATE TABLE IF NOT EXISTS mayoreo_categorias (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      text NOT NULL,
  descripcion text,
  emoji       text DEFAULT '🎊',
  imagen_url  text,
  orden       int  DEFAULT 99,
  activa      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- 2. Habilitar acceso público de lectura (igual que mayoreo_productos)
ALTER TABLE mayoreo_categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON mayoreo_categorias
  FOR SELECT USING (true);

CREATE POLICY "Solo autenticados pueden escribir" ON mayoreo_categorias
  FOR ALL USING (auth.role() = 'authenticated');

-- 3. Agregar columna categoria_id a mayoreo_productos (si no existe)
ALTER TABLE mayoreo_productos
  ADD COLUMN IF NOT EXISTS categoria_id uuid REFERENCES mayoreo_categorias(id) ON DELETE SET NULL;

-- 4. Insertar categorías de ejemplo (puedes borrarlas o editarlas desde el admin)
INSERT INTO mayoreo_categorias (nombre, emoji, descripcion, orden) VALUES
  ('Bodas',          '💍', 'Recuerdos personalizados con los nombres de los novios', 1),
  ('XV Años',        '👑', 'Diseños exclusivos con el nombre de la quinceañera',     2),
  ('Graduaciones',   '🎓', 'Playeras y termos con el logo de tu escuela',            3),
  ('Bautizos',       '🕊️', 'Recuerdos personalizados para este día especial',        4),
  ('Fiestas Infantiles','🎈','Diseños divertidos para los más pequeños',             5),
  ('Empresas',       '🏢', 'Artículos promocionales con tu logo corporativo',        6)
ON CONFLICT DO NOTHING;

-- ════════════════════════════════════════════════════════
-- ¡Listo! Después de ejecutar esto, ya puedes usar
-- el admin para gestionar categorías y productos.
-- ════════════════════════════════════════════════════════
