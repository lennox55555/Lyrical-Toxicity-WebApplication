import json
import requests
import lyricsgenius as lg
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import re


def lambda_handler(event, context):
    try:
        #  queryStringParameters
        song = event.get('queryStringParameters', {}).get('song', None)

        album = event.get('queryStringParameters', {}).get('album', None)

        artist = event.get('queryStringParameters', {}).get('artist', None)

        func = event.get('queryStringParameters', {}).get('func', None)

        # check if api was passed a param
        if func is None:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing parameters'})
            }

        # ensure params are strings
        song = str(song) if song is not None else None

        album = str(album) if album is not None else None

        artist = str(artist)

        # based on func param and no null values calls specified function
        if func == 'songSentiment':
            if song is None:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Missing song parameter for songSentiment'})
                }
            result = songSentiment(song, artist)
        elif func == 'albumSentiment':
            if album is None:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Missing album parameter for albumSentiment'})
                }
            result = albumSentiment(album, artist)
        elif func == 'artistSentiment':
            if artist is None:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'message': 'Missing album parameter for albumSentiment'})
                }
            result = artistSentiment(artist)
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Invalid operation'})
            }

        # body
        res_body = {
            'song': song,
            'album': album,
            'artist': artist,
            'func': func,
            'ans': result
        }

        # http res
        http_res = {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(res_body)
        }

        return http_res

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }


def songSentiment(song, artist):
    # Genius setup
    genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')

    # Search for the song lyrics with Genius
    song_lyrics = genius.search_song(song, artist)

    if song_lyrics:
        # Clean up the lyrics by removing unwanted text (e.g., "Contributors" section)
        pattern = r".*Contributors"
        cleaned_lyrics = re.sub(pattern, "", song_lyrics.lyrics, flags=re.DOTALL)

        return cleaned_lyrics
    else:
        return "Could Not Find Song"


def albumSentiment(album_name, artist):
    # Spotify setup
    client_credentials_manager = SpotifyClientCredentials(client_id='fc5e07f18cd74c7581d593b7d5790e3d',
                                                          client_secret='7ed2f139d7044c0b8d0ef50bb6835d64')
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Genius setup
    genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')

    # Search for the album on Spotify
    results = sp.search(q=f"album:{album_name} artist:{artist}", type='album')

    if results and results['albums']['items']:
        album_id = results['albums']['items'][0]['id']
        album_tracks = sp.album_tracks(album_id)
        songs = [track['name'] for track in album_tracks['items']]

        # Initialize an empty string to store all lyrics
        all_lyrics = ""

        # Fetch and concatenate lyrics for each song in the album
        for song_title in songs:
            song = genius.search_song(song_title, artist)
            if song:
                all_lyrics += f"\n{song_title}\n{song.lyrics}\n"
            else:
                all_lyrics += f"\n{song_title}\nLyrics not found\n"

        return all_lyrics.strip()
    else:
        return "Could Not Find Album"

      


def artistSentiment(artist):
    # Spotify setup
    client_credentials_manager = SpotifyClientCredentials(client_id='fc5e07f18cd74c7581d593b7d5790e3d',
                                                          client_secret='7ed2f139d7044c0b8d0ef50bb6835d64')
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Genius setup
    genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')

    # Fetch artist's information from Spotify
    results = sp.search(q=f"artist:{artist}", type='artist')
    if results['artists']['items']:
        artist_id = results['artists']['items'][0]['id']
    else:
        return "Artist not found"

    all_lyrics = ""
    
    # Function to process albums and singles
    def process_albums(albums):
        nonlocal all_lyrics
        for album in albums:
            album_id = album['id']
            album_tracks = sp.album_tracks(album_id)
            songs = [track['name'] for track in album_tracks['items']]

            # Fetch and concatenate lyrics for each song
            for song_title in songs:
                song = genius.search_song(song_title, artist)
                if song:
                    all_lyrics += f"\n{song_title}\n{song.lyrics}\n"
                else:
                    all_lyrics += f"\n{song_title}\nLyrics not found\n"

    # Fetch and process albums
    albums = sp.artist_albums(artist_id, album_type='album')['items']
    process_albums(albums)

    # Fetch and process singles
    singles = sp.artist_albums(artist_id, album_type='single')['items']
    process_albums(singles)

    return all_lyrics.strip()


