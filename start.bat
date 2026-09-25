@echo off
echo Starting SanjuClass1 backend...
cd backend
start "Backend" cmd /k "npm start"
cd ..\app
echo Starting SanjuClass1 frontend...
start "Frontend" cmd /k "npm run dev"
echo Both servers started.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
