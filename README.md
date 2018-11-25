# codaisseur-homework-wk-6
A basic API backend for games, written in TypeScript

The API has 3 endpoints:


## `GET /games`

This will return a list of games:


    ```$bash
    $ http :3000/games
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 481
    Content-Type: application/json; charset=utf-8
    Date: Sun, 25 Nov 2018 20:37:19 GMT
    Server: Cowboy
    Via: 1.1 vegur
    
    {
        "games": [
            {
                "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]",
                "color": "yellow",
                "id": 2,
                "name": "Yellow Submarine"
            },
            {
                "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]",
                "color": "blue",
                "id": 3,
                "name": "Blue Skye"
            },
            {
                "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]",
                "color": "magenta",
                "id": 4,
                "name": "Green Grass"
            },
            {
                "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]",
                "color": "red",
                "id": 1,
                "name": "Red Nose"
            }
        ]
    }
    ```
    

# `POST /games`

This will create a game with:
 * the default board
 * a random color
 * the name according to the one given

This is what it looks like when it succeeds:


    ```$bash
    $ http :3000/games name="Green Grass"
    HTTP/1.1 201 Created
    Connection: keep-alive
    Content-Length: 118
    Content-Type: application/json; charset=utf-8
    Date: Sun, 25 Nov 2018 20:38:52 GMT
    Server: Cowboy
    Via: 1.1 vegur
    
    {
        "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]",
        "color": "magenta",
        "id": 4,
        "name": "Green Grass"
    }
    ```
    

## `PUT /games/:id`
 
This endpoint is meant to transition the game to a new state.

Before doing the transition, it will validate these values:
 * color (which should be one of: red, blue, green, yellow, magenta)
 * board (which should make the transition a valid move)
 
 
    ```$bash
    $ http put :3000/games/4 color=green board="[[\"o\",\"o\",\"o\"],[\"o\",\"x\",\"o\"],[\"o\",\"o\",\"o\"]]"
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 117
    Content-Type: application/json; charset=utf-8
    Date: Sun, 25 Nov 2018 20:40:18 GMT
    Server: Cowboy
    Via: 1.1 vegur

    {
        "board": "[[\"o\",\"o\",\"o\"],[\"o\",\"x\",\"o\"],[\"o\",\"o\",\"o\"]]",
        "color": "green",
        "id": 4,
        "name": "Green Grass"
    }
    ```
