input_file_path = 'static/words/10000wordsEG.txt'
output_file_path = 'static/words/1000wordsEG.txt'

with open(input_file_path, 'r') as infile, open(output_file_path, 'w') as outfile:
    for line in infile:
        word = line.strip()
        if 3 <= len(word) <= 8:
            outfile.write(word + '\n')
