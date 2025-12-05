# Projekt Bestellsystem IT01

## Funktionen
### Login / Check-in (Kellner)
Ablauf:
•	Der Kellner startet die App auf einem Arbeitsgerät (z. B. Tablet oder Smartphone).
•	Es erscheint eine Login-Maske zur Eingabe Anmeldenamen und des Passworts.
•	Nach erfolgreichem Login wird der Kellner auf das Haupt-Dashboard weitergeleitet.
 
### Tisch-Auswahl oder -Erstellung
Ablauf:
•	Im Dashboard wird eine Übersicht aller vorhandenen Tische angezeigt.
•	Jeder Tisch ist mit einer festen Nummer gekennzeichnet, die vom Betrieb vergeben wurde.
•	Wenn ein Tisch neu besetzt wird, kann der Kellner diesen Tisch aktivieren oder eine neue Bestellung für diesen Tisch starten.
•	Es ist nicht möglich, neue Tischnummern zu vergeben – nur bereits vorhandene Tische können ausgewählt werden.
•	In dieser Maske können Tische gelöscht und erstellt werden
 
### Bestellung aufnehmen
Ablauf:
•	Nach Auswahl eines Tisches öffnet sich die digitale Speisekarte.
•	Die Speisekarte ist in Kategorien unterteilt (z. B. Getränke,  Hauptgerichte).
•	Der Kellner hat eine Übersicht aller Artikel der Kategorie und kann bei den Artikeln die Menge einstellen.
•	Der Gesamtpreis der Bestellung wird Live berechnet und dem Kellner angezeigt.
•	Optional kann pro Artikel ein Kommentar ergänzt werden (z. B. „ohne Zwiebeln“). 
•	Die aktuelle Bestellung wird im Warenkorb gesammelt und dort verwaltet (Anzahl ändern, Artikel entfernen, Kommentar hinzufügen).
•	Nachdem hinzufügen der Artikel kann der Kellner, die das Fenster für die Bestellung schließen. Die Bestellung wird dann auf dem Server gespeichert.
 
 
### Bestellung absenden
Ablauf:
•	Nach dem Absenden wird die Bestellung auf dem Server gespeichert.
•	Der Status der Bestellung wechselt zu „In Bearbeitung“.
•	Der Kellner kann kontrollieren, ob die Bestellung richtig aufgenommen wurde in dem er den Tisch nochmal öffnet.
 
### Bearbeitung durch die Küche
Ablauf:
•	Die Küche bzw. Theke erhält eine Übersicht aller nicht erledigter Bestellungen.
•	Für jede Bestellung wird angezeigt:
•	Tisch-Nummer
•	Liste der bestellten Artikel mit Kommentaren
•	Nach der Fertigstellung wir die Bestellung als „fertig“  markiert werden. 

### Benachrichtigung an den Kellner
Ablauf:
•	Nach Fertigstellung kann der Kellner sehen, dass die Bestellung abgeholt oder serviert werden kann.
•	Bei einer Ablehnung der Bestellung wird der Kellner ebenfalls informiert und erhält den Grund angezeigt.

### Stornieren und Nachbearbeiten
Ablauf:
•	Eine bereits abgesendete Bestellung kann vom Kellner storniert werden, z. B. wenn der Gast seine Meinung ändert.
•	Beim Stornieren muss ein Grund angegeben werden, entweder aus einer Liste (z. B. „Gast umentschieden“, „Artikel nicht mehr verfügbar“) oder manuell eingetragen. 
•	Nach einer Stornierung kann eine neue Bestellung für denselben Tisch aufgenommen werden.
•	Alle Stornierungen werden in der Bestellhistorie dokumentiert. 
 
### Bestellhistorie (optional)
Ablauf:
•	Der Kellner (oder ein Administrator) kann die Bestellhistorie eines bestimmten Tisches einsehen.
•	In der Historie sind alle abgeschlossenen und stornierten Bestellungen aufgelistet.
•	Diese Funktion dient ausschließlich zur Nachverfolgung und Übersicht – eine Bearbeitung von abgeschlossenen Bestellungen ist nicht möglich.


## ER-Diagramm
```mermaid
erDiagram

    ARTIKEL {
        int ARTNR
        string ARTEXT
        string PICT
        int KATID
        string LOEKZ
    }

    PREIS {
        float PRWRT
        int ARTNR
        date PRDAT
    }

    KATEG {
        string KATEXT
        int PARENTID
        int KATID
    }

    BESTELLPOSITION {
        int ARTIKEL
        int MENGE
    }

    BESTELLUNG {
        string READY
        int ORDERID
        date DATE
        int PERSNR
    }

    USR01 {
        string UNAME
        string NAME1
        string NAME2
        string PWCODE
        int ROLEID
    }

    TISCHE {
        int TISCHID
    }

    ROLES {
        string ROLEKZ
        string ROLNAM
    }

    ARTIKEL ||--o{ PREIS : ARTIKEL_PREIS
    ARTIKEL ||--o{ KATEG : ARTIKEL_KATEG
    ARTIKEL ||--o{ BESTELLPOSITION : ARTIKEL_BESTELLPOSITION

    BESTELLUNG ||--o{ BESTELLPOSITION : BESTELLUNG_BESTELLPOSITION

    USR01 ||--o{ ROLES : USER_ROLE
