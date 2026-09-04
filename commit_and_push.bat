@echo off
pushd "%~dp0"
REM Script para adicionar, commitar e dar push para o remoto
if "%~1"=="" (
  set /p MSG=Mensagem de commit: 
) else (
  set MSG=%~1
)
git add -A
git commit -m "%MSG%"
if errorlevel 1 (
  echo Nenhuma alteracao para commitar ou erro no commit.
) else (
  git push
)
popd
pause
