# SoundPlus redesign concept

**Redesign concept by DC Tech, not the official site.** An unofficial concept for the owner of [SoundPlus](https://music.graphikrafts.com/). SoundPlus belongs to GraphiKrafts. Nothing here is affiliated with or endorsed by them.

Live: https://soundplus-redesign-concept.vercel.app

- `/` landing page: hero, six features, six app screens, install, spec block, FAQ
- `/system` design system: colour, type, spacing, radii and core components with their states

The download and web player buttons go to the real URLs on the current site. The pages are `noindex`, so the concept can't compete with the real site in search.

## Stack

Next.js (App Router, TypeScript, Tailwind v4), Framer Motion. Fully static, no backend.

```bash
npm install
npm run dev
```

## Design notes

- Colour: indigo surfaces and a single amber accent. Amber always means playing, active or selected.
- Type: Anybody (condensed, heavy) for titles, Instrument Sans for UI.
- The idea: five bands. Five amber EQ bars sit behind the hero phone and keep moving when the phone's screen turns off, which is the product's main promise. Press the phone's side button to try it.
- The phone screens are HTML and CSS on a fixed 360px canvas, scaled with one CSS variable. Now playing and Equalizer are interactive (play/pause, seek, band drag, presets, keyboard support).
- Tracks, artists and album art are fictional.

## What the current site contradicts

| Item | Current site says | Concept uses |
|---|---|---|
| Version | `1.6.0 (Build 17)` in the hero, `v1.0.8` in the guides section ("Direct APK Mirror") | 1.6.0 (build 17) |
| Minimum Android | `Android 8.0+` in the hero, `Android 5.0+` in two CTA blocks and the architecture section | 8.0+ |
| APK size | `18.5 MB` throughout | 19.7 MB |

Checked against the APK served on 2026-11-05 (19,716,697 bytes): the manifest reports version 1.6.0, build 17 and `minSdkVersion 24`, which is Android 7.0, so the real minimum matches neither number on the site. The concept keeps 8.0+ as the hero's stated figure.

## Content changes

Removed as unverifiable: 100M+ songs, 99.9% uptime, "hardware DSP", "1,500 dB headroom", "safe and legal". The mod and ReVanced sections are gone too. Feature copy is rewritten from the current site's claims and was not tested against the app. The non-affiliation disclaimer is kept word for word.

---

Demo by [DC Tech](https://dctechltd.com)
