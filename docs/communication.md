# Komunikacja

## Job scheduler service -> Orchestrator

Wystartowanie taska będzie się odbywało poprzez REST API - Job Scheduler zrobi request do Orchestratora.

## Orchestrator -> Backend

Orchestrator będzie wysyłał eventy dotyczące tasków na topic, a backend będzie z tego topicu wszystko zbierał i przetwarzał odpowiednio.

# Backend -> Services -> Backend

## Proces tworzenia workspace

1. Backend wysyła prośbę o stworzenie workspace do Automation Service poprzez REST API
2. Dostaje odpowiedź na temat przyjęcia prośby z id
3. Serwis dodaje to id do każdej wiadomości pushowanej do topica
