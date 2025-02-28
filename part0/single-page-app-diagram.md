```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Note right of browser: The browser encounters a reference to the stylesheet on the head, and therefore makes another request to get it
    activate server
    server-->>browser: CSS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Note right of browser: The browser encounters a reference to the script on the head, and therefore makes another request to get it
    activate server
    server-->>browser: JS document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of browser: The browser executes spa.js. The script makes a request to the server to get the notes data.
    activate server
    server-->>browser: JSON document
    Note left of server: The server returns a JSON file with the notes data
    deactivate server

    Note right of browser: The browser finally renders the data by using DOM manipulation.
```