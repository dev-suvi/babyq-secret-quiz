# BabyQ Secret Quiz 🤫

A private, mobile-friendly pre-party game for BabyQ, built with Next.js and deployed on Vercel.

Guests enter the email address their invitation was sent to, answer three playful personality questions on their first visit, and receive a pre-assigned secret word. They prepare 2–4 clues for that word and bring them to the party without revealing the word to anyone else.

The secret words are deliberately grouped behind the scenes so they can be used for a surprise team activity on the day.

## Guest flow

1. Enter an email from the BabyQ guest list.
2. First-time guests answer three fun personality questions.
3. The guest receives their fixed secret word and clue instructions.
4. Completion is saved in Redis.
5. On future visits, the same email skips the questionnaire and goes straight back to its secret word.

The questionnaire answers are intentionally just for fun; they do not determine the guest's word or team.

## Organizer page

`/organizer` is protected by the `ORGANIZER_PASSWORD` environment variable.

The organizer view shows the private guest assignments grouped by category and includes completion status so it is easy to see who has finished the pre-party flow.

## Persistence

Guest completion state is stored in Redis using the `REDIS_URL` environment variable supplied by the Vercel Redis integration.

Only completion state is persisted. Questionnaire answers are not stored.

## Tech stack

- Next.js 16
- React 19
- Redis
- Vercel

## Environment variables

Create the following environment variables before running the full application:

```text
ORGANIZER_PASSWORD=your-organizer-password
REDIS_URL=your-redis-connection-url
```

Never commit real environment-variable values to the repository.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Next.js URL shown in the terminal.

Without a valid `REDIS_URL`, guest completion checks and persistence will not work.

## Deploy

Import the repository into Vercel and deploy using the default Next.js settings. Connect the Redis integration to the project and configure `ORGANIZER_PASSWORD` for the organizer page.

The production site is:

https://babyq-secret-quiz.vercel.app/

## Party-day note

Keep the organizer page private. The categories and grouping are part of the surprise — guests should only know their own secret word and the clues they prepared until the reveal at BabyQ. 😈
