<div align="center">

# @karstenn/brackets

## Table of Contents

1. [Basic Overview](#basic-overview)
2. [Getting Started](#getting-started)
3. [Basic Usage](#basic-usage)
4. [Demo](#demo)

</div>

Specifically crafted with Next.js in mind but versatile enough for standard React applications, this package is for tournament enthusiasts. Within its framework, users will find a single-elimination tournament bracket for a clear depiction of the competition structure, complemented by an interactive bracket that facilitates user predictions. For a seamless integration with Next.js, server-side rendering can be implemented through imports from @karstenn/brackets/server. Conversely, when dealing with client-side rendering, @karstenn/brackets/client must be employed with a client-side rendering (CSR) methodology. With inherent adaptability, the package is poised for future expansions to incorporate varied bracket formats to accommodate any sporting event.

## Basic Overview

**Usage Overview:**

**1. SingleBracket:**
Designed primarily for visualizing tournament brackets, whether empty or filled, the **`SingleBracket`** component requires an array of predetermined matches and the number of rounds in the event. Upon provision, it meticulously slots the matches in their appropriate positions and populates the remainder with vacant pairings. The optional **`showScores`** prop allows for the display of **`homeScore`** and **`awayScore`** properties on the bracket's right-hand side, showcasing the match scores.

**2. SinglePicks:**
The **`SinglePicks`** component is tailored for user predictions. Similar to its counterpart, it necessitates matches and rounds input. The matches array should comprise all the first-round matches, with subsequent round matches being excluded from the display. An essential attribute is the **`onPicksUpdate`** prop - a callback function that returns a user's picks in real-time upon each selection.

**Styling & Layout:**
Both **`SinglePicks`** and **`SingleBracket`** natively adapt their parent container's styles. However, for those desiring a bespoke look, optional props like **`bgColor`** (background color), **`textColor`**, **`accentColor`** (border color), **`matchColor`** (match pairing color), and **`rounded`** (to enable rounded corners) are available. The components responsively inherit the width and height properties of their parent containers and facilitate scrolling when content overflows. Yet, for optimal user experience, it's recommended to avoid setting the parent container's height to a fixed value.

**Additional Functions:**

**clientMatchesKey & serverMatchesKey:**
These functions are tailored to extract match arrays from objects structured as: **`{id:, name:, sport:, league:, rounds:, year:, startDate:, createdAt:, updatedAt:, [unspecified name]: array}`**. It's important to note that they strictly cater to this specific structure. While they were designed for my particular use case, they've been included in the package for potential utility to others. If your objects deviate from this format, refrain from using these functions.

## Getting Started

**Installation with npm**

```bash
  npm install @karstenn/brackets
```

## Basic Usage

Components have been separated into `@karstenn/brackets/server` and `@karstenn/brackets/client` to prevent component poisoning in Next.js.

### Data Format

```javascript
const matches =  [
	{
		homeTeamId?: 136811,
		awayTeamId?: 136819,
		homeTeamScore?: 0,
		awayTeamScore?: 2,
		round: 1,
		gameNumber: 2,
		advanceTo: 9,
		homeTeam: { teamId: 136811, teamName: "England Women", },
		awayTeam: { teamId: 136819, teamName: "USA Women",}
		},
]
```

### Server Components

```javascript
import { SingleBracket, serverMatchesKey } from "@karstenn/brackets/server";
```

#### SingleBracket Properties

| Property    | Type    | Description                                                 |
| ----------- | ------- | ----------------------------------------------------------- |
| matches     | Array   | Array of predetermined matches.                             |
| rounds      | Number  | Number of rounds in the event.                              |
| showScores  | Boolean | Displays `homeTeamScore` and `awayTeamScore` on right side. |
| bgColor     | String  | Background color.                                           |
| textColor   | String  | Text color.                                                 |
| accentColor | String  | Border color.                                               |
| matchColor  | String  | Match pairing color.                                        |
| rounded     | Boolean | Enables rounded corners on container.                       |

### Client Components

```javascript
import { SinglePicks, clientMatchesKey } from "@karstenn/brackets/client";
```

#### SinglePicks Properties

| Property      | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| matches       | Array    | Array of first-round matches.         |
| rounds        | Number   | Number of rounds in the event.        |
| onPicksUpdate | Function | Callback returning user's picks.      |
| bgColor       | String   | Background color.                     |
| textColor     | String   | Text color.                           |
| accentColor   | String   | Border color.                         |
| matchColor    | String   | Match pairing color.                  |
| rounded       | Boolean  | Enables rounded corners on container. |

_Note: Both components inherit width and height properties of their parent container and support scrolling on overflow. It's advisable not to set a fixed height for the parent container._

## Demo

#### Component with all Attributes applied.

```javascript
<SinglePicks
  matches={matches}
  rounds={curEvent.rounds}
  bgColor={"rgb(117, 196, 242)"}
  accentColor={"white"}
  textColor={"white"}
  matchColor={"black"}
  rounded={true}
  onPicksUpdate={(val) => {
    setPicks(val);
  }}
/>
```

![All Attributes](https://i.ibb.co/6stmhzT/All-Attributes.png)

#### Component inheriting Attributes.

```javascript
<SingleBracket matches={matches} rounds={3} />
```

![No attributes](https://i.ibb.co/LN9pWzT/Inherit.png)

### End Note

This package is being developed for use in another project of mine that will eventually require brackets for just about any sporting event. As a result, you can expect frequent updates to this package. Any input or suggestions would be appreciated.
