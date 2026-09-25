@echo off
REM Vite cannot serve from a folder path containing "#".
REM This maps the PARENT folder to a virtual drive (default Q:) and runs the
REM dev server from Q:\<project folder>. Rename the folder to drop the "#"
REM and you can use plain "npm run dev" instead.
setlocal
set DRIVE=Q:
for %%I in ("%~dp0.") do set PROJ=%%~nxI
for %%I in ("%~dp0..") do set PARENT=%%~fI
if not exist "%DRIVE%\%PROJ%\package.json" (
  subst %DRIVE% /D >nul 2>&1
  subst %DRIVE% "%PARENT%"
)
pushd "%DRIVE%\%PROJ%"
if not exist node_modules call npm install
call npm run dev -- --open
popd
