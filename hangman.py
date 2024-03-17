import random
import unicodedata
import platform
import os

def clear_screen():
    if platform.system() == 'Windows':
        os.system('cls')  # Clear the screen for Windows
    else:
        os.system('clear')  # Clear the screen for Linux/MacOS

class StartingWord:
    @staticmethod
    def generate_starting_word(file_path):
        with open(file_path, "r", encoding='utf-8') as file:
            lines = [line.strip() for line in file if line.strip()]
            return random.choice(lines)

    @staticmethod
    def split_word_to_letters(starting_word):
        return [StartingWord.remove_diacritics(char) for char in starting_word]

    @staticmethod
    def remove_diacritics(char):
        return ''.join(c for c in unicodedata.normalize('NFD', char) if unicodedata.category(c) != 'Mn')

    @staticmethod
    def split_word_to_letters_only(word):
        return [char for char in word]

class GenerateQuestions:
    @staticmethod
    def print_spaces(starting_word_len):
        return '_ ' * starting_word_len

def get_input():
    while True:
        user_input = input("Enter a letter: ").strip()
        if len(user_input) == 1 and user_input.isalpha():
            return user_input
        else:
            print("Please enter a single letter: ")

def find_positions(lst, target_letter):
    positions = []
    for i, letter in enumerate(lst):
        if letter == target_letter:
            positions.append(i)
    return positions

def sort_wrong_letters(wrong_letters):
    unique_letters = set(wrong_letters)  # Remove duplicates
    sorted_letters = sorted(unique_letters)  # Sort alphabetically
    return sorted_letters



def append_letter_to_list(underscores, positions, unformated_word, user_letter):
    underscores_list = list(underscores)  # Convert underscores to a list of characters
    for pos in positions:
        underscores_list[pos * 2] = unformated_word[pos]  # Adjust indexing
    if not positions:
        return ''.join(underscores_list),user_letter 
    return ''.join(underscores_list), None


def main():
    file_path = "words.txt"
    starting_word = StartingWord.generate_starting_word(file_path)
#    print(f'Starting word is: "{starting_word}" with length of {len(starting_word)}')
#    starting_word = ""
    underscores = GenerateQuestions.print_spaces(len(starting_word))
#    print("Underscores:", underscores)

    formated_word = StartingWord.split_word_to_letters(starting_word)
    formated_word = [char.lower() for char in formated_word]
#    print("Starting word split into letters without diacritics:", formated_word)
    unformated_word = StartingWord.split_word_to_letters_only(starting_word)

    wrong_letter = None
    wrong_letters = []
    str_wrong_letters = None
    underscores_list = None
    while True:
        clear_screen()
        print(underscores,"\n")
        if wrong_letters != []:
            print("Wrong letters are:",str_wrong_letters, "\n")

        user_letter = get_input()
        user_letter = StartingWord.remove_diacritics(user_letter)
#        print("User entered letter:", user_letter)

        positions = find_positions(formated_word, user_letter)
        underscores, wrong_letter = append_letter_to_list(underscores, positions, unformated_word, user_letter)  # Update underscores
        if wrong_letter is not None:
            wrong_letters.append(wrong_letter)

        wrong_letters = sort_wrong_letters(wrong_letters)
        str_wrong_letters = ' '.join(wrong_letters).upper()

        # End program if needed
        underscores_list = [char for char in underscores.replace(' ', '')]
        if underscores_list == unformated_word:
            clear_screen()
            print(f'''GJ, the word was \"{starting_word}\"''')
            break


if __name__ == "__main__":
    main()

