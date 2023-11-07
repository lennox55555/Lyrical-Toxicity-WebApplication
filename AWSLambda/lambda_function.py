import json
import requests
import lyricsgenius as lg
from datetime import datetime, timedelta
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import re



def lambda_handler(event, context):
    try:
        # Extracting queryStringParameters and defaulting to None if not found
        song = event.get('queryStringParameters', {}).get('song', None)
        album = event.get('queryStringParameters', {}).get('album', None)
        artist = event.get('queryStringParameters', {}).get('artist', None)
        func = event.get('queryStringParameters', {}).get('func', None)
        
        # Check if all parameters are provided and if album and artist are not None
        if func is None:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing parameters'})
            }
        
        # Convert to string if not None
        song = str(song) if song is not None else None
        album = str(album) if album is not None else None
        artist = str(artist)

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
            result = artistSentiment(artist)
        elif func == 'wokeConnection':
            result = wokeConnection(song, artist)
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Invalid operation'})
            }

        # Create response body
        res_body = {
            'song': song,
            'album': album,
            'artist': artist,
            'func': func,
            'ans': result
        }

        # Create HTTP response
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
    #genius access
    genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')
    #get lyrics of song and artist
    song1 = genius.search_song(str(song)+ " " + str(artist))
    return song1.lyrics

def albumSentiment(album_name, artist):
    client_credentials_manager = SpotifyClientCredentials(client_id='fc5e07f18cd74c7581d593b7d5790e3d', client_secret='7ed2f139d7044c0b8d0ef50bb6835d64')
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Search for the album by name and artist
    results = sp.search(q=f"album:{album_name} artist:{artist}", type='album')

    if results and results['albums']['items']:
        # Get the album ID from the first item in the 'items' list of the 'albums' key in the 'results' dictionary.
        album_id = results['albums']['items'][0]['id']

        # Retrieve the tracks of the album using the Spotify API, given the album ID.
        album_tracks = sp.album_tracks(album_id)
        
        # Create a list of song names by iterating through the 'items' list in the 'album_tracks' dictionary
        songs = [track['name'] for track in album_tracks['items']]
        allLyrics = []
        genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')
        for i in range(4,6):
            lyrics = genius.search_song(songs[i], artist)
            allLyrics.append(lyrics.lyrics)
        
        return allLyrics
    else:
        return [] 

def artistSentiment(artist):
    client_credentials_manager = SpotifyClientCredentials(client_id='fc5e07f18cd74c7581d593b7d5790e3d', client_secret='7ed2f139d7044c0b8d0ef50bb6835d64')
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Search for the artist by name
    results = sp.search(q=f'artist:{artist}', type='artist')

    if results and results['artists']['items']:
        # Get the artist ID from the first item in the 'items' list of the 'artists' key in the 'results' dictionary.
        artist_id = results['artists']['items'][0]['id']

        # Retrieve the top tracks of the artist using the Spotify API, given the artist ID.
        top_tracks = sp.artist_top_tracks(artist_id)

        # Create a list of track names by iterating through the 'tracks' key in the 'top_tracks' dictionary
        songs = [track['name'] for track in top_tracks['tracks']]

        return songs
    else:
        return []

    
