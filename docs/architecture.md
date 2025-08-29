# Architektura

## Opis abstrakcji

Użytkownicy końcowi uzyskują dostęp do aplikacji, która pozwala im na utworzenie przestrzeni dla ich urządzeń we własnych różnych lub tych samych sieciach lokalnych.

Urządzenia łączą się do wspóldzielonej przestrzeni i sieci mesh VPN, co pozwala im na komunikację ze sobą jak i dostęp do usług świadczonych zarówno na poziomie workspace jak i globalnych w chmurze.

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

Przestrzeń aplikacyjna podzielona:

- Obszar użytkownika
- Obszar automatyzacji
- Obszar współdzielonych zasobów

Aplikacje i usługi wszystkich obszarów są zarządzane przez Kubernetesa, a poszczególne obszary są oddzielnymi namespace.

Kubernetes zapewnia skalowalność, odporność na awarię oraz automatyczny i powtarzalny deployment.

#### Obszar użytkownika

Obszar bezpośredniej interakcji użytkownika końcowego z systemem. Za jego pomocą użytkownik może zarządzać swoimi utworzonymi workspace, inicjalizować/podłączać nowe urządzenia oraz zarządzać podłączonymi urządzeniami.

Użytkownik może w tym obszarze zlecać wykonywanie zestawu zadań, przeglądać stany uruchomień zadań, urządzeń w czasie rzeczywistym oraz dane historyczne.

Jest to jedyny obszar dostępy publicznie dla wszystkich - zapewnia to Gateway.

Obszar zawiera klasyczną aplikację złożoną z trzech serwisów:

- frontend
- backend
- baza danych

Aplikacja przetwarza i przesyła żądania użytkownika do obszaru automatyzacji, prezentuje użytkownikowi stan systemu jak i jego przestrzeni oraz zapisuje wszystkie potrzebne dane abstrakcyjne i typowo statyczne (snapshots) do bazy danych.
W aplikacji zaimplementowana jest autoryzacja i autentykacja użytkowników.

#### Obszar automatyzacji

Obszar służy do obsługi wszystkich zleceń użytkownika, umożliwia dynamiczne tworzenie spoke<->workspace użytkownika, przetwarzanie i organizacje przebiegu zadań oraz raportowanie zdarzeń użytkownikowi.

Jest to również obszar zapewniający komunikację z obszarem użytkownika za pomocą kolejki a także częściowo workspacem (orchestrator).

W skład obszaru możemy wyróżnić:
1. Configuration service - dokumentowa baza danych wraz z serwisem obsługującym proste operacje zapisu i odczytu konfiguracji dynamicznie powstałych części systemu
2. Automation service - serwis pozwalający na dynamiczne wdrażanie zmian infrastruktury odwzorowującej workspace użytkownika
3. Job scheduler service - serwis zlecający zadania przeznaczone do wykonania na workspace użytkownika, ściśle współgrający orchestratorami

#### Obszar współdzielonych zasobów

### Spoke

### Agent

## Komunikacja
