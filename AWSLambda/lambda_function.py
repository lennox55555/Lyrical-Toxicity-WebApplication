import json
import requests
import lyricsgenius as lg
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials



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
    
    client_id = 'fc5e07f18cd74c7581d593b7d5790e3d'
    
    client_secret = '7ed2f139d7044c0b8d0ef50bb6835d64'

    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


    results = sp.search(q=f'track:{song} artist:{artist}', type='track')
    
    genius = lg.Genius('rp2cHbcKjKMS5h5oa2o1T8Wpg1ZpPk9qvvT5CnBEInnGDbo1TZ1UvnGJKR5oiNs4')
   
    song1 = genius.search_song(song+ " " + artist)
    
    listOfRequest = []
    
    if results and results['tracks']['items']:
        track = results['tracks']['items'][0]
    
        track_name = track['name']
        
        listOfRequest.append(song)
        
        artist_name = ', '.join([artist['name'] for artist in track['artists']])
        
        listOfRequest.append(artist_name)
        
        track_image_url = track['album']['images'][0]['url']
        
        listOfRequest.append(track_image_url)
        
        listOfRequest.append(song1.lyrics)
    
        return listOfRequest
        
    else:
        
        return "Could Not Find Song"
    

def albumSentiment(album_name, artist):
    client_credentials_manager = SpotifyClientCredentials(client_id='fc5e07f18cd74c7581d593b7d5790e3d', client_secret='7ed2f139d7044c0b8d0ef50bb6835d64')
    
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    results = sp.search(q=f"album:{album_name} artist:{artist}", type='album')

    listOfRequest = []
    
    if results and results['albums']['items']:
        
        album_id = results['albums']['items'][0]['id']

        album_info = sp.album(album_id)
        
        album_image_url = album_info['images'][0]['url']
        
        album_artists = [artist['name'] for artist in album_info['artists']]
        
        listOfRequest.append(album_artists)
        
        listOfRequest.append(album_name)
        
        listOfRequest.append(album_image_url)

        album_tracks = sp.album_tracks(album_id)
        
        songs = [track['name'] for track in album_tracks['items']]
        
        listOfRequest.append(songs)
        
        return listOfRequest
    else:
        return "Could Not Find Album"




def artistSentiment(artist):
    client_id = 'fc5e07f18cd74c7581d593b7d5790e3d'
    
    client_secret = '7ed2f139d7044c0b8d0ef50bb6835d64'

    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    results = sp.search(q=f'artist:{artist}', type='artist')

    listOfRequest = []
    
    listOfRequest.append(artist)

    if results and results['artists']['items']:
        
        artist = results['artists']['items'][0]
        
        artist = results['artists']['items'][0]
    
        followers = artist["followers"]["total"]
    
        listOfRequest.append(followers)
    
        genre = artist["genres"]
    
        listOfRequest.append(genre)
    
        url = artist["images"][0]["url"]
    
        listOfRequest.append(url)
    
        top_tracks = sp.artist_top_tracks(artist["id"])
        
        track_list = []

        for track in top_tracks['tracks']:
            song_name = track['name']
            
            preview_url = track['preview_url']
            
            track_tuple = (song_name, preview_url)
            
            track_list.append(track_tuple)
    
        return listOfRequest + track_list

    else:
        return "Artist not found."

    
