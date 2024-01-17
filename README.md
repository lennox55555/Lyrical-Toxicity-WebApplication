# Lyrical Toxicity Web Application

![Lyrical Toxicity Web Application](https://lennoxanderson.com/portfolio/musicapp.png)

#### The web application is a user-friendly and intuitive platform that enables users to interact with a specialized API developed through the use of AWS, offering three distinct requests for retrieving valuable information for toxicity analysis through a tensorflowJS machine learning model. This application is part of a broader project aimed at providing users with analytics regarding lyrical toxicity and other lyrical insights.

# Music Sentiment API Documentation
### Base URI: https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws

| Method | Parameters                                               | Example Request                                                                                                                              | Expected Output                                                                                                                       |
| :----- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `song=Keeper artist=Reignwolf func=songSentiment`       | `/songWokeApi?song=Keeper&artist=Reignwolf&func=songSentiment`                                                                               | Returns the lyrics of a specified song given a song and artist name.                                                                  |
| GET    | `album=Hear Me Out artist=Reignwolf func=albumSentiment` | `/songWokeApi?album=Hear Me Out&artist=Reignwolf&func=albumSentiment`                                                                         | Returns the lyrics of a specified album given an album and artist name.                                                               |
| GET    | `artist=Reignwolf func=artistSentiment`                 | `/songWokeApi?artist=Reignwolf&func=artistSentiment`<br>`https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?artist=Reignwolf&func=artistSentiment` | Returns lyrics of 25 songs at random given an artist.                                                                                |
