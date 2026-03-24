#!/bin/bash
# Checklist de validación del proyecto

echo "🔍 Validando estructura del proyecto Portfolio Sergio..."
echo ""

# Verificar archivos principales
echo "📋 Verificando archivos de configuración..."
files=(
  "package.json"
  "tsconfig.json"
  "next.config.js"
  "tailwind.config.ts"
  ".env.local"
  ".env.example"
  ".gitignore"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file"
  else
    echo "✗ FALTA: $file"
  fi
done

echo ""
echo "📁 Verificando directorios..."
dirs=(
  "app"
  "app/components"
  "app/components/navigation"
  "app/components/sections"
  "app/components/ui"
  "app/components/common"
  "lib"
  "lib/services"
  "lib/hooks"
  "config"
  "types"
  "styles"
  "public"
)

for dir in "${dirs[@]}"; do
  if [ -d "$dir" ]; then
    echo "✓ $dir/"
  else
    echo "✗ FALTA: $dir/"
  fi
done

echo ""
echo "📄 Verificando archivos de aplicación..."
app_files=(
  "app/layout.tsx"
  "app/page.tsx"
  "app/robots.ts"
  "app/sitemap.ts"
  "app/api/contact/route.ts"
  "app/components/navigation/Navbar.tsx"
  "app/components/sections/HeroSection.tsx"
  "app/components/sections/AboutSection.tsx"
)

for file in "${app_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file"
  else
    echo "✗ FALTA: $file"
  fi
done

echo ""
echo "📚 Verificando documentación..."
docs=(
  "README.md"
  "QUICK_START.md"
  "SETUP.md"
  "DEPLOYMENT.md"
  "ARCHITECTURE.md"
  "CUSTOMIZE.md"
  "FIRESTORE_EXAMPLES.md"
  "DELIVERABLES.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "✓ $doc"
  else
    echo "✗ FALTA: $doc"
  fi
done

echo ""
echo "✅ Validación completada"
echo ""
echo "🚀 Próximos pasos:"
echo "1. npm install"
echo "2. Configurar .env.local con credenciales Firebase"
echo "3. npm run dev"
echo "4. Ver QUICK_START.md para instrucciones"
