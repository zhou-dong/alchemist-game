export const formula = `if (char1 === char2) {
    table[row][col] = table[row - 1][col - 1];
  } else {
    const min = Math.min(
      table[row - 1][col - 1],
      table[row - 1][col],
      table[row][col - 1]
    );
    table[row][col] = min + 1;
  }`;

export const description = `In computational linguistics and computer science, edit distance is a 
  way of quantifying how dissimilar two strings (e.g., words) are to 
  one another by counting the minimum number of operations required to 
  transform one string into the other.
                  - From Wikipedia.
  `;

export const useCases = `1. In natural language processing, where automatic spelling 
  correction can determine candidate corrections for a misspelled 
  word by selecting words from a dictionary that have a low distance 
  to the word in question. 
  
  2. In bioinformatics, it can be used to quantify the similarity 
  of DNA sequences, which can be viewed as strings of the letters 
  A, C, G and T.
                  - From Wikipedia.
  `;

export const example = `The distance between kitten and sitting is 3. 
  A minimal edit script that transforms the former into the latter is: 
  
  1. kitten → sitten (substitution of 's' for 'k') 
  2. sitten → sittin (substitution of 'i' for 'e') 
  3. sittin → sitting (insertion of 'g' at the end). 
                  - From Wikipedia.
  `;