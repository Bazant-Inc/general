# Komunikacja

## Job scheduler service -> Orchestrator

Wystartowanie taska będzie się odbywało poprzez REST API - Job Scheduler zrobi request do Orchestratora.

Job scheduler będzie robił hc do orchestratorów i na bazie tego informował poprzez Kafke backend. Przykładem będzie gdy vmka padnie lub orchestrator to job scheduler da znać backendowi a on przełączy wszystkie agenty w stan not connected.

Żeby job scheduler service zaczął robić hc to orchestratora to musi się o tym dowiedzieć od automation service bo on to wrzuci zarówno do backendu jak i do job scheduler service.

## Job scheduler service -> Backend

Jeżeli cokolwiek w workspace padnie co trzyma stan agentów to job scheduler service informuje o tym backend.

## Orchestrator -> Backend

Orchestrator będzie wysyłał eventy dotyczące tasków na topic, a backend będzie z tego topicu wszystko zbierał i przetwarzał odpowiednio.

Orchestrator wysyła stany agentów przez Kafkę do backendu (hc na bazie swoich timerów do agentów i stanu w Redisie).


## Agent -> Orchestrator
Jeśli padnie Redis, agent musi się ponownie zarejestrować po tym jak dostanie kod inny niż 200 na /verify

# Backend -> Services -> Backend

## Proces tworzenia workspace

1. Backend wysyła prośbę o stworzenie workspace do Automation Service poprzez REST API
2. Dostaje odpowiedź na temat przyjęcia prośby z id
3. Serwis dodaje to id do każdej wiadomości pushowanej do topica
