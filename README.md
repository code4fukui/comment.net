# comment.net

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

comment.net is an open-source, anonymous comment platform for real-time sharing during meetings, presentations, and events.

## Demo
[comment.net](http://コメント.net)

## Features
- **Real-time Display**: Comments appear instantly for all participants, sorted with the newest first.
- **Anonymous Commenting**: Users can post comments without needing to log in or provide identification.
- **Replies**: Ability to reply to specific comments, creating threaded conversations.
- **Custom Rooms**: Create unique, shareable comment rooms. (A passcode is required for room creation).
- **Projection Mode**: A view-only mode optimized with a larger font size for display on projectors and large screens.
- **Easy Export**: A "Copy All Comments" function exports the entire conversation as plain text.
- **QR Code Sharing**: Automatically generates a QR code for the room URL to help participants join quickly.

## How to Use
1.  **Create a Room**: On the main page, enter a desired room name and the creation passcode, then click "はいる" (Enter).
2.  **Join a Room**: Simply navigate to the room's URL (e.g., `http://コメント.net/#your-room-name`).
3.  **Post a Comment**: Type in the input field and click "送信" (Send).
4.  **Use Tools**: Access the "Projection View" or "Copy All Comments" features via links below the comment list.

## Developer Tools

### Exporting Comments to CSV
A Deno script is included to fetch all comments from a room and save them as `comments.csv`.

Run the script from your terminal:
```sh
deno run --allow-net makecommentscsv.js [room-id]
```

## Technical Details
- This is a client-side application that runs entirely in a web browser, requiring no server-side setup to deploy.
- It relies on the external `commgate` API (`http://sabae.club/commgate/1/`) for real-time data persistence and retrieval.

## Attribution
- CC BY [fukuno.jig.jp](http://fukuno.jig.jp/1368)
- Co-produced by [wakashin.com](http://wakashin.com/)

## License
MIT License — see [LICENSE](LICENSE).