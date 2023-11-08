# Music Sentiment Web Application & API

<img src="https://lennoxanderson.com/portfolio/MusicApp.png" />

### Base URI: https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws


| Method | Endpoint      | Parameters                                   | Description                                                         | Example Request                                                                      | Expected Output                                          |
| :----- | :------------ | :-------------------------------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :------------------------------------------------------- |
| GET    | /songWokeApi  | `song=Keeper artist=Reignwolf func=songSentiment` | Returns the Song, Artist, URL of the Image associate with song, and the lyrics | `[/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment](https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment)](https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment)` |  ['Keeper', 'Reignwolf', 'https://i.scdn.co/image/ab67616d0000b2733d7eddd9401e833c32809674', "Keeper LyricsLate night\nWhat's your intention?\nGot a bible to swear on\nNot satisfied, oh temptation\nOh no, hold on\n\nI'm a keeper baby\nHonestly\nAll my life, all my days, always\nI'm a keeper baby\nHonestly\nAll my life, all my days, always\n\nSurvive on your footsteps\nJust a cold call away\nYour light, blinding me\nLike a goldmine, unfound\n\nI'm a keeper baby\nHonestly\nAll my life, all my days, always\nI'm a keeper baby\nHonestly\nAll my life, all my days, alwaysYou might also likeEmbed"]    |
| GET    | /songWokeApi  | `song=Imagine&artist=John+Lennon&func=currentWokeLevel` | Returns the woke score calculated from an algorithm                 | `/songWokeApi?song=Imagine&artist=John+Lennon&func=currentWokeLevel`                                    | Woke score based on provided parameters                 |
| GET    | /songWokeApi  | `song=Imagine&artist=John+Lennon&func=wokeSentiment` | Returns the lyrics of the artist that contribute to the highest woke score | `/songWokeApi?song=Imagine&artist=John+Lennon&func=wokeSentiment` | Lyrics contributing to "Imagine's" woke score           |


