const createTest = (words)=>{
    const tempTest = [];

    const findNext = (words)=>{
        let wordsForQuestion = [];
        let translations = []
        const alreadyUsed = tempTest.map(question => question.rightWord.toString())
    
        for(let i=0; i<8; i++){
          let next = Math.floor(Math.random() * words.length);
          while(wordsForQuestion.includes(words[next]) || translations.includes(words[next].translation 
            || alreadyUsed.includes(words[next].id.toString()))){
    
            next = Math.floor(Math.random() * words.length);
          }
          wordsForQuestion.push(words[next]);
          translations.push(words[next].translation);
        }
        
        return wordsForQuestion;
      }

    for(let i=0; i<25; i++){
      const wordsForQuestion = findNext(words);
      const question = {
        words: wordsForQuestion,
        rightWord: wordsForQuestion[Math.floor(Math.random() * wordsForQuestion.length)].id
      }
      tempTest.push(question);
    }

    return tempTest;
}

export default createTest;