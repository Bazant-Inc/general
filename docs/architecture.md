# Architektura

## Opis abstrakcji

Użytkownicy końcowi uzyskują dostęp do aplikacji, która pozwala im na utworzenie przestrzeni dla ich urządzeń we własnych dowolnych sieciach lokalnych.

Urządzenia łączą się do współdzielonej przestrzeni i sieci mesh VPN, co pozwala im na komunikację ze sobą jak i dostęp do usług świadczonych zarówno na poziomie workspace jak i globalnych w chmurze.

### Workspace

Przestrzeń dla urządzeń użytkownika, którą współdzielą i w której przeprowadzają komunikację miedzy sobą, udostępniają zasoby i przesyłają dane. Mogą także korzystać z zasobów dostępnych w przestrzeni chmurowej.

## Przestrzenie

Na najwyższym poziomie możemy wyróżnić trzy przestrzenie:

- Hub
- Spoke
- Agent

System oparty na infrastrukturze chmurowej Azure działa w architekturze hub-spoke.

Hub w całym systemie jest jeden, natomiast w ramach abstrakcji przestrzeni dla użytkownika tworzone są dynamicznie spoke.

### Hub

Przestrzeń aplikacyjna jest podzielona na:

- Obszar użytkownika
- Obszar automatyzacji
- Obszar współdzielonych zasobów

Aplikacje i usługi wszystkich obszarów są zarządzane przez Kubernetesa.

Kubernetes zapewnia skalowalność, odporność na awarię oraz automatyczny i powtarzalny deployment.

#### Obszar użytkownika

Obszar bezpośredniej interakcji użytkownika końcowego z systemem. Za jego pomocą użytkownik może zarządzać swoimi utworzonymi workspace, inicjalizować/podłączać nowe urządzenia oraz zarządzać podłączonymi urządzeniami.

Użytkownik może w tym obszarze zlecać wykonywanie zestawu zadań, przeglądać stany uruchomień zadań, urządzeń w czasie rzeczywistym oraz dane historyczne.

Jest to jedyny obszar dostępy publicznie dla wszystkich - zapewnia to Gateway.

Obszar zawiera klasyczną aplikację złożoną z trzech serwisów:

- Frontend
- Backend
- Baza danych

Aplikacja przetwarza i przesyła żądania użytkownika do obszaru automatyzacji, prezentuje użytkownikowi stan systemu jak i jego przestrzeni oraz zapisuje wszystkie potrzebne dane abstrakcyjne i typowo statyczne (snapshots) do bazy danych.
W aplikacji zaimplementowana jest autoryzacja i autentykacja użytkowników.

#### Obszar automatyzacji

Obszar służy do obsługi wszystkich zleceń użytkownika, umożliwia dynamiczne tworzenie spoke<->workspace użytkownika, przetwarzanie i organizacje przebiegu zadań oraz raportowanie zdarzeń użytkownikowi.

Jest to również obszar zapewniający komunikację z obszarem użytkownika za pomocą kolejki a także częściowo workspacem (orchestrator).

W skład obszaru możemy wyróżnić:
- Serwis konfiguracyjny - dokumentowa baza danych wraz z mechanizmem obsługującym proste operacje zapisu i odczytu konfiguracji dynamicznie powstałych części systemu
- Serwis automatyzacji - serwis pozwalający na dynamiczne wdrażanie zmian infrastruktury odwzorowującej workspace użytkownika (dodawanie/usuwanie spoke)
- Serwis orkiestracji zadań - serwis zlecający zadania przeznaczone do wykonania na workspace użytkownika, ściśle współgrający orchestratorami

#### Obszar współdzielonych zasobów

Obszar udostępniający zasoby w postaci obrazów dockerowych potrzebnych do uruchomienia zadań oraz ewentualnie paczek.

Składa się na serwisy chmurowe:
- Azure Container Registry (ACR)
- Azure Artifacts
- Azure Files (prawdopodobne przechowywane plików)

### Spoke

Przestrzeń urządzeń użytkownika, implementacja abstrakcji jaką jest workspace.
W ramach tej przestrzeni następuje obsługa i działanie urządzeń użytkownika.

Zawiera potrzebne elementy do komunikacj i orkiestracji zadań między urządzeniami użytkownika oraz zapewnia dostęp do zasobów współdzielonych.

Serwisy i usługi są skonteneryzowane w Dockerze.

W skład obszaru wchodzą serwisy i usługi:
- Caddy Reverse Proxy
- Headscale VPN (control plane)
- Tailscale VPN client - zachowujący się jako master i hub w sieci VPN
- Docker Swarm (master)
- Orchestrator - rejestracja urządzeń, monitorowanie ich stanu, przydzielanie i monitorowanie stanu zadań

Wszystkie spoke są połączone do systemowego huba.

Urządzenia łączą się w sieć mesh VPN z master/hubem clientem, dzięki temu mają dostęp do zasobów w spoke jak i w hubie.

### Agent

Jest to oprogramowanie działające na urządzeniach użytkownika.

Narzędzia oprogramowania:
- klient VPN
- docker engine

Zadania oprogramowania:
- zarządzanie połączeniem VPN do spoke
- komunikacja z orchestratorem:
    - rejestracja w sieci
    - raportowanie o stanie urządzenia i sieci
    - przyjmowanie zadań
    - zwracanie wyników
    - raportowanie o stanie zadań
- wykonywanie zleconych zadań
- komunikacja z pozostałymi urządzeniami w sieci
- dostarczanie/udostępnianie zasobów
- wystawianie wszelkich potrzebnych informacji