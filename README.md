# Music Sentiment Web Application & API

<img src="https://lennoxanderson.com/portfolio/MusicApp.png" />

### Base URI: https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws


| Method | Endpoint      | Parameters                                   | Description                                                         | Example Request                                                                      | Expected Output                                          |
| :----- | :------------ | :-------------------------------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :------------------------------------------------------- |
| GET    | /songWokeApi  | `song=Keeper artist=Reignwolf func=songSentiment` | Returns the Song, Artist, URL of the Image associate with song, and the lyrics | `[/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment](https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment)](https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment)` |  2012     |
| GET    | /songWokeApi  | `song=Imagine&artist=John+Lennon&func=currentWokeLevel` | Returns the woke score calculated from an algorithm                 | `/songWokeApi?song=Imagine&artist=John+Lennon&func=currentWokeLevel`                                    | Woke score based on provided parameters                 |
| GET    | /songWokeApi  | `song=Imagine&artist=John+Lennon&func=wokeSentiment` | Returns the lyrics of the artist that contribute to the highest woke score | `/songWokeApi?song=Imagine&artist=John+Lennon&func=wokeSentiment` | Lyrics contributing to "Imagine's" woke score           |


