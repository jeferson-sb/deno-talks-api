# Deno Talks API

Create and Explore conferences and talks about science, business, innovation, technology, and so on.
API created with Deno and TypeScript, inspired by TED Talks

## 💡 Project

Share your knowledge, learn something new through small online talks.

## 🛠️ Tools

- [Deno](https://deno.land)
  ### 🦕 Modules
  - [MongoDB Driver](https://deno.land/x/mongo)
  - [Oak](https://deno.land/x/oak)
  - [Denon](https://deno.land/x/denon)
  - [Iro](https://deno.land/x/iro)
- [MongoDB](https://www.mongodb.com/)

## 🚀 Quick start

### Installation

Shell (macOS, Linux)

```bash
$ curl -fsSL https://deno.land/x/install/install.sh | sh
```

Powershell (Windows)

```bash
$ iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Homebrew (macOS)

```bash
$ brew install deno
```

Chocolatey (Windows)

```bash
$ choco install deno
```

### Usage

```bash
$ cd deno-talks-api

$ deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts

$ denon develop
```

## Endpoints

- `GET /api/v1/talks`
- `GET /api/v1/talks?recommended=true`
  - Required header: `user_id`
- `POST /api/v1/talks`
  - Required header: `speaker_id`
  ```json
  {
    "title": "The future we're building -- and boring",
    "description": "Elon Musk discusses his new project digging tunnels under LA, the latest from Tesla and SpaceX and his motivation for building a future on Mars in conversation with TED's Head Curator, Chris Anderson.",
    "link": "https://www.youtube.com/watch?v=zIwLWfaAg-8",
    "duration": "40m",
    "topics": "Future,Energy,Spacecraft"
  }
  ```
- `GET /api/v1/talks/:id`
- `PUT /api/v1/talks/:id`
  - Required header: `speaker_id`
  ```json
  {
    "title": "The new future"
  }
  ```
- `DELETE /api/v1/talks/:id`
  - Required header: `speaker_id`
- `GET /api/v1/users`
- `POST /api/v1/users`
  ```json
  {
    "name": "Elon Musk",
    "topics": "Space,Science,Energy,Future"
  }
  ```
- `GET /api/v1/profile`
  - Required header: `user_id`
- `POST /api/v1/talks/:id/like`
  - Required header: `user_id`
- `POST /api/v1/talks/:id/dislike`
  - Required header: `user_id`

## To-Do

- [ ] Better request error handling

## 📝 License

This project is licensed under the terms of the [MIT](https://github.com/jeferson-sb/deno-talks-api/blob/master/LICENSE) license

> Made with ♥ by Jeferson © 2020
