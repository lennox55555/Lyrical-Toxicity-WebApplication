# Music Sentiment Web Application

<img src="https://lennoxanderson.com/portfolio/MusicApp.png" />

#### The web application is a user-friendly and intuitive platform that enables users to interact with a specialized API, offering three distinct requests for retrieving and displaying valuable information directly on the user interface. This application is part of a broader project aimed at providing users with comprehensive access to song-related data and artist insights.

#### The web application boasts an easy-to-navigate and visually appealing user interface, ensuring that users can effortlessly input their requests and access the resulting information. It provides a seamless experience for music enthusiasts, researchers, and anyone interested in exploring song, album, or artist data.

#### Whether you're seeking insights into a beloved song, an artist's entire discography, or in-depth artist profiles, this application empowers users to make informed decisions and explore music in a whole new way.




# Music Sentiment API Documentation
### Base URI: https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws


| Method | Parameters                                               | Description                                                                         | Example Request                                                                                                                                                                                | Expected Output                                                                                                                                                                                           |
| :----- | :------------------------------------------------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `song=Keeper artist=Reignwolf func=songSentiment`       | Retrieve Song, Artist, Image URL, and Lyrics for a given song.                      | `/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment`                                                                                                                                  | Song information, including artist, image URL, and lyrics.                                                                                                                                              |
| GET    | `album=Hear Me Out artist=Reignwolf func=albumSentiment` | Get Artist, Album Name, Image URL, and List of Songs in an Album.                   | `/songWokeApi?album=Hear Me Out&artist=Reignwolf&func=albumSentiment`                                                                                                                            | Artist details, album information, and a list of songs in the album.                                                                                                                                     |
| GET    | `artist=Reignwolf func=artistSentiment`                 | Retrieve Artist Info, Followers, Genres, Image URL, and Top Tracks with Samples.   | `/songWokeApi?artist=Reignwolf&func=artistSentiment`<br>`https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?artist=Reignwolf&func=artistSentiment` | Artist information, follower count, genres, image URL, and a list of top tracks with sample music URLs.                                                                                                 |
