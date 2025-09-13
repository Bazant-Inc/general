# Przypadki użycia

## Konto użytkownika

### Tworzenie konta
Użytkownik może stworzyć konto używając emaila i hasła.

Będzie miał do dyspozycji standardowy formularz rejestracyjny.

### Autentykacja
Użytkownik autentykuje się emailem i hasłem. Wykorzystywany mechanizm sesji.

### Zarządzanie kontem
Soon

### Usuwanie konta
Soon

## Workspace

### Tworzenie
Użytkownik może stworzyć workspace i widzi go w swoich zasobach. Po otrzymaniu żądania i pomyślnej autentykacji i autoryzacji użytkownika, backend przesyła żądanie na kolejkę. Na tą samą kolejkę nasłuchuje automation service, który reaguje na żądanie i tworzy infrastrukturę. Po pomyślnym utworzeniu infrastruktury, serwis zapisuje informacje o niej do configuration service.

Automation service podczas wykonywania żądania wysyła na odpowiednią kolejkę informację o statusie operacji. Backend nasłuchuje na kolejkę, zapisuje je do bazy danych, oraz jeżeli klient obserwuję tą operację, wysyła je na żywo przez websocket/SSE.

### Usuwanie
Soon

### Zarządzanie
Soon

## Agenci

### Dodawanie agenta do workspace
Użytkownik na panelu workspace może dodać agenta, tworzy się takie żądanie, przechodzi ono przez backend oraz do automation service.

Automation service w ramach tego żądania potrzebuje stworzyć użytkownika na VPN oraz wygenerować mu authkey. 

Wygenerowane dane serwis przesyła do backendu, gdzie są zapisane oraz jeżeli użytkownik nasłuchuje na zmiany żądania, jest on powiadamiany wraz z jego rezultatem.

Backend składa w całość plik konfiguracyjny dla użytkownika (jego agenta) wraz ze skryptem instalacyjnym oraz kluczem.

### Usuwanie
Soon

### Rejestracja agenta w orchestratorze
Soon

## Taski

### Uruchomienie

### Monitorowanie przebiegu

### Zebranie wyników

### Przerwanie
