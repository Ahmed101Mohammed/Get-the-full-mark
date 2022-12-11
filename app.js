let data = ["who is the best berson in the world ?","Ahmed", 
            "What is the best animy in the world ?", "onepiece", 
            "What is the best buttiful girl in the world", 'Niko robin', 
            'What is your headPhone name?', 'SD_1002']




const findQuestion = (question, data)=>
{
    let dataOfQuestions = splitToQandA(data);
    let listWithDegrees = assessTheData(question,dataOfQuestions);
    let orgnaiseTheData = margeSortQuestionsData(0,listWithDegrees.length-1, listWithDegrees);
    let pureData = cleanTheData(orgnaiseTheData);
    return pureData;
}

const splitToQandA = (arrayOfQandA)=>
{
    let questionOpjectList = [];
    for(let item = 0; item <  arrayOfQandA.length; item += 2)
    {
        questionOpjectList.push({question: arrayOfQandA[item], answer: arrayOfQandA[item+1]})
    }

    return questionOpjectList;
}

const assessTheData = (accourdingData, data)=>
{

    let newViewOfData = [];
    let accourdingDataWords = listOfLowerWords(accourdingData);
    for (let item of data)
    {
        let question = item.question;
        let questionWords = listOfLowerWords(question);
        let theDegree = degreeOfTheSimilarity(accourdingDataWords,questionWords);
        newViewOfData.push([item,theDegree]);
    }

    return newViewOfData;
}

const listOfLowerWords = (line) =>
{
    let words = line.split(" ");
    for (let word = 0; word < words.length; word++)
    {
        words[word] = words[word].toLowerCase();
    }

    return words;
}

const degreeOfTheSimilarity = (listOfWords1, listOfWords2)=>
{
    let degree = 0;
    for (let word of listOfWords2)
    {
        if(listOfWords1.indexOf(word) !== -1)
        {
            degree++;
        }
    }

    return degree;
}


const margeSortQuestionsData = (startIndex, endIndex, array)=>
{
    if (startIndex === endIndex) 
    {
        return [array[startIndex]];
    }

    const halfValue = parseInt((endIndex - startIndex)/2);

    let part1 = margeSortQuestionsData(startIndex, startIndex + halfValue, array);
    let part2 = margeSortQuestionsData((startIndex+ halfValue) + 1, endIndex, array);
    let marging = marge(part1,part2);
    
    return marging;
}

const marge = (array1, array2)=>
{
    let newArray = [];

    let pointer1 = 0;
    let pointer2 = 0;

    while (pointer1 < array1.length || pointer2 < array2.length)
    {
        if(!(pointer2 < array2.length) || (pointer1 < array1.length && array1[pointer1][1] > array2[pointer2][1]))
        {
            newArray.push(array1[pointer1]);
            pointer1++;
        }
        else if( pointer2 < array2.length)
        {
            newArray.push(array2[pointer2]);
            pointer2++;
        }
    }
    return newArray;
}


const cleanTheData = (data)=>
{
    let pureData = [];
    for (let item of data)
    {
        pureData.push(item[0])
    }
    
    return pureData;
}