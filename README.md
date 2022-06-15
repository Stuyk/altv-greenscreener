
## alt:V Clothing Green Screener

[Support on Patreon. Seriously.](https://patreon.com/stuyk/)

Ever want screenshots of every single clothing item in GTA:V?

Well this is your repository.

It will automatically convert the images to a specific file name format.

```
componentIdentifier-dlcHash-isProp?-isNotShared?-drawableID.png
```

# Installation

* [Install NodeJS 17+](https://nodejs.org/en/download/current/)
* [Install GIT](https://git-scm.com/downloads)

## Clone the Repository

Use the command below in any terminal, command prompt, etc.

```sh
git clone https://github.com/Stuyk/altv-greenscreener
```

## Install the Repository

Use the command below in any terminal, command prompt, etc.

```sh
cd altv-greenscreener
npm install
```

## Download Server Files

Use the command below in any terminal, command prompt, etc. This will download all necessary server files from an additional package used by this project.

```sh
npm run update
```

## Start the Server

Use the command below in any terminal, command prompt, etc. This will build your TypeScript code into JavaScript.

```sh
npm run dev
```

## Connect through alt:V Client

Download the client from [https://altv.mp](https://altv.mp).

Connect through `127.0.0.1:7788`

## In-game

Press `y` and don't touch your computer.

Screenshots will be output to `screenshots`.

# Option 1 - Let Stuyk Process Them

Pay me and I'll process the images for you in a timely manner.

# Option 2 - Further Processing

Not accurate, not great, but it'll work.

## Further Processing

Use the [https://github.com/danielgatis/rembg](https://github.com/danielgatis/rembg) repository to process image backgrounds and remove them.

YOU MUST HAVE THE EXACT PYTHON VERSION `3.9`.

## After installing simply run

```
rembg p ./screenshots ./screenshots-output
```
