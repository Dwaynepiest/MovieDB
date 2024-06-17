from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

@app.route('/merge-json', methods=['GET'])
def merge_json():
    # Definieer de paden naar de JSON-bestanden
    genres_path = os.path.join(app.root_path, 'json', 'genres.json')
    movie_types_path = os.path.join(app.root_path, 'json', 'movie_types.json')
    
    # Lees de JSON-bestanden
    with open(genres_path, 'r') as f:
        genres_data = json.load(f)
    
    with open(movie_types_path, 'r') as f:
        movie_types_data = json.load(f)
    
    # Voeg de JSON objecten samen
    merged_json = {**genres_data, **movie_types_data}
    
    return jsonify(merged_json)

if __name__ == '__main__':
    app.run(debug=True)

