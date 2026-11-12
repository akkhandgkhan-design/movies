@echo off
title CineStream - Movie & Web Series Portal
cls
echo ========================================================
echo   CINESTREAM - MOVIES & WEB SERIES PORTAL
echo ========================================================
echo.
echo   [1] Open Website (User View - index.html)
echo   [2] Open Admin Panel (Upload Movies/Series - admin.html)
echo   [3] Open Project Folder
echo   [4] Open Supabase Database Schema (SQL)
echo   [5] Exit
echo.
echo ========================================================
set /p choice="Select an option (1-5): "

if "%choice%"=="1" (
    echo Opening Website...
    start "" "%~dp0index.html"
    goto end
)
if "%choice%"=="2" (
    echo Opening Admin Panel...
    start "" "%~dp0admin.html"
    goto end
)
if "%choice%"=="3" (
    echo Opening Project Folder...
    explorer "%~dp0"
    goto end
)
if "%choice%"=="4" (
    echo Opening Supabase Schema...
    start notepad "%~dp0supabase_schema.sql"
    goto end
)
if "%choice%"=="5" (
    exit
)

:end
exit
