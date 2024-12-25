#!/usr/bin/env sh

# Detener el script si ocurre un error
set -e

# Build
npm run build

# Navegar al directorio de salida
cd dist

# Si estás desplegando en un repositorio personalizado
echo 'https://asierwave.github.io/BCNecommerce/' > CNAME

git init
git add -A
git commit -m 'deploy'

# Desplegar a gh-pages
git push -f git@github.com:asierwave/BCNecommerce.git master:gh-pages

cd -