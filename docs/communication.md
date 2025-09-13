# Komunikacja

## Job scheduler service -> Orchestrator
Wystartowanie taska będzie się odbywało poprzez REST API - Job Scheduler zrobi request do Orchestratora. 

## Orchestrator -> Backend
Orchestrator będzie wysyłał eventy dotyczące tasków na topic, a backend będzie z tego topicu wszystko zbierał i przetwarzał odpowiednio. 
