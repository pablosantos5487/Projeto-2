@echo off
pushd "%~dp0"
echo Iniciando servidor HTTP Python na porta 8000 (Ctrl+C para parar)
python -m http.server 8000
popd
