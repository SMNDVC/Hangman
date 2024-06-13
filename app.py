from flask import Flask, render_template
import random

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/random_word', methods=['GET'])
def random_word():
    # Path to your file containing words
    file_path = 'static/words/1000wordsEG.txt'

    try:
        # Read all lines from the file
        with open(file_path, 'r') as file:
            words = file.readlines()

        # Choose a random word
        chosen_word = random.choice(words).strip()

        # Return the chosen word as plain text
        return chosen_word

    except FileNotFoundError:
        return 'File not found', 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

