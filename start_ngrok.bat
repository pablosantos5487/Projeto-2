@echo off
pushd "%~dp0"
echo Abrindo servidor em nova janela e iniciando ngrok...
start "Servidor" cmd /k "python -m http.server 8000"
echo Aguarde 1-2s e o ngrok sera iniciado nesta janela.
ngrok http 8000
popd
