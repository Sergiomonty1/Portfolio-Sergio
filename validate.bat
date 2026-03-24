@echo off
REM Checklist de validación del proyecto para Windows

echo.
echo 🔍 Validando estructura del proyecto Portfolio Sergio...
echo.

REM Verificar archivos principales
echo 📋 Verificando archivos de configuración...
for %%f in (
  "package.json"
  "tsconfig.json"
  "next.config.js"
  "tailwind.config.ts"
  ".env.local"
  ".env.example"
  ".gitignore"
) do (
  if exist %%f (
    echo ✓ %%f
  ) else (
    echo ✗ FALTA: %%f
  )
)

echo.
echo 📁 Verificando directorios...
for /d %%d in (
  "app"
  "app\components"
  "lib"
  "config"
  "types"
  "styles"
  "public"
) do (
  if exist "%%d" (
    echo ✓ %%d\
  ) else (
    echo ✗ FALTA: %%d\
  )
)

echo.
echo 📄 Verificando archivos de aplicacion...
for %%f in (
  "app\layout.tsx"
  "app\page.tsx"
  "app\robots.ts"
  "app\api\contact\route.ts"
) do (
  if exist "%%f" (
    echo ✓ %%f
  ) else (
    echo ✗ FALTA: %%f
  )
)

echo.
echo 📚 Verificando documentacion...
for %%f in (
  "README.md"
  "QUICK_START.md"
  "SETUP.md"
  "DEPLOYMENT.md"
  "ARCHITECTURE.md"
) do (
  if exist "%%f" (
    echo ✓ %%f
  ) else (
    echo ✗ FALTA: %%f
  )
)

echo.
echo ✅ Validación completada
echo.
echo 🚀 Próximos pasos:
echo 1. npm install
echo 2. Configurar .env.local con credenciales Firebase
echo 3. npm run dev
echo 4. Ver QUICK_START.md para instrucciones
echo.
pause
