# MyDeepSeek

A standalone DeepSeek desktop application for macOS, built with Electron.

## Features

- Dedicated macOS application window for DeepSeek
- Custom application icon
- No browser tabs or address bar
- Dark system theme by default
- DeepSeek links stay inside the app
- External links open in the system browser
- Apple sign-in tested successfully
- Persistent login session across application restarts

## Known limitations

- Google sign-in is currently blocked by Google's embedded-browser security checks.
- Microsoft sign-in has not been verified.
- Authentication availability may depend on DeepSeek's and identity providers' policies.

## Requirements

- macOS
- Node.js 22.12.0 or newer
- npm

## Development

Install dependencies:

```bash
npm ci
cd ~/MyDeepSeek-Electron

cat >> README.md <<'EOF'

## The Story Behind It 🌧️

It was an autumn evening in Bucharest, Romania.

The weather was absolutely miserable. It was raining outside, the sky was grey, and going anywhere sounded like a terrible idea.

So, naturally, we did what any reasonable person would do in this situation: we built our own DeepSeek desktop app.

No investors.
No business plan.
No startup pitch.
No idea what we were getting ourselves into.

Just Electron, a MacBook, some curiosity, and a questionable amount of free time.

A few hours later, somehow, we had a working macOS application.

Was this necessary? Absolutely not.
Was it a productive use of an autumn evening? Debatable.
Was it fun? Hell yes.

And that's how MyDeepSeek was born.

Built in Bucharest. Inspired by terrible weather. Powered by curiosity and questionable decisions. 😂

*Sometimes the best projects start with absolutely no reason to exist.*
