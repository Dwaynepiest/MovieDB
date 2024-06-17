from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/merge-json', methods=['POST'])
def merge_json():
    # Ontvang de JSON-gegevens van de request body
    data = request.get_json()
    
    # Haal de JSON objecten uit de request body
    json1 = data.get('../json/genres.json', {})
    json2 = data.get('../json/', {})
    
    # Voeg de JSON objecten samen
    merged_json = {**json1, **json2}
    
    return jsonify(merged_json)

if __name__ == '__main__':
    app.run(debug=True)