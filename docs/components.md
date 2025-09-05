# Komponenty

## Hub

### Frontend

Punkt wejścia dla użytkownika. Prezentuje workspace'y użytkownika, pozwala na ich tworzenie i edycję. Prezentuje stan zadań, pozwala na ich tworzenie, uruchamianie oraz prezentację rezultatów.

Technologie - React (SPA)

### Backend

Bezpośrednia obsługa żądań użytkownika, komunikacja z innymi komponentami systemu w celu wcielenia ich w życie, zbieranie wydarzeń z systemu i zapisywanie ich w bazie danych, prezentacja wydarzeń historycznych oraz przekazywanie wydarzeń aktualnych na żywo podłączonym klientom (Websocket), autoryzacja.

Technologie - jeszcze w 100% nie wiadomo, cokolwiek co jest dobre w CRUDa - jakiś framework backendowy plus ORM (NestJS + TypeORM, Spring Kotlin + JPA).

### Baza danych

Relacyjna baza danych (najpewniej Postgres), w której zapisywane są informacje o użytkownikach, workspace'ach (abstrakcji) i urządzeniach (ich stanie), oraz wszystkie dotychczasowe wydarzenia w systemie. Bezpośredni dostęp ma tylko backend.

### Configuration service (+ baza danych)

Serwis odpowiedzialny za przechowywanie informacji o infrastrukturze. Zawiera dane o konfiguracji sieciowej (nazwy, przydział itp.), sprzętu (klucze SSH potrzebne Ansiblowi), pozwala na odczyt oraz aktualizację konfiguracji (jej abstrakcji).

Technologie - NodeJS, TypeScript, Azure Function, baza danych - MongoDB

### Automation service

Serwis odpowiedzialny za wcielanie w życie zmian konfiguracji systemu (dodawanie i usuwanie workspace'ów). Nasłuchuje żądań zmiany konfiguracji i wprowadza je w życie, po czym wysyła żądanie zmiany reprezentacji konfiguracji do Configuration service. W reakcji na dodanie agenta do workspace podłącza się do VMki na spoke'u, wykonuje komendy na kontenerze z headscalem w celu dodania użytkownikia i wygenerowania klucza, który zapisuje do Configuration service.

Technologie - Python, Terraform, Ansible

### Job scheduler service

Dostaje informacje o uruchomieniu zadania w workspace, zbiera potrzebne dane z Configuration service (np. ID spoke'a/orkestratora), wysyła informacje o zadaniu do orkestratora danego workspace'u, monitoruje stany spoke'ów (heartbeat orkerstratorów) i raportuje o błędach, (ostatecznie) implementacja silnika tasków.

Technologie - Python

## Spoke - orchestrator

Heartbeat, tworzenie Docker Swarma, zarządzanie i zwracanie informacji o Swarmie, nasłuchiwanie na zadania przydzielane do workspace, inicjacja zadania w Swarmie, monitorowanie stanu agentów, zbieranie informacji o agentach i przesyłanie ich dalej, zbieranie wyników zadania i odsyłanie ich, udostępnianie wszelkich aktualnych informacji o workspace serwisom w hubie.

Technologie - NestJS (TBC)

## Agent - daemon

Udostępnianie informacji o urządzeniu na którym działa, podłączanie do sieci VPN workapace, dołączanie do Swarma w workspace, monitorowanie przebiegu zadania, hearbeat z orkestratorem.

Technologie - Golang + libka Docker client
