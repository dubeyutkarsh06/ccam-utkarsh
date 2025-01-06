const MockData = require('./data.js')

const data = MockData
// console.log(data.questionText0)

const prefill = {
    categories: {
        "Respondent Profile": 1,
        "Pre-Self-Assessment": 2,
        "Policy and Strategy": 3,
        "Mobility Management and Regulation": 4,
        "Organisational und Personnel": 5,
        "Infrastructure and Traffic Management": 6,
        "Stakeholder and Management": 7
    },
    types: {
        "text": 1,
        "checkbox": 2,
        "radio": 3,
        "text+pie": 4,
        "dropdown": 5,
        "instruction": 6,
    }
}


const questionF = () => {
    let questionSql = "INSERT INTO question (id, categoryId, typeId, mandatory, scoringTypeId) VALUES ";
    let questionTranslationSql = "INSERT INTO question__translation (questionId, languageId, subtitle, title) VALUES ";
    let assessmentQ = "INSERT INTO ccam.question__assessments__assessment (`order`, questionId, assessmentTypeId) VALUES ";
    let sectionQ = "INSERT INTO ccam.question_sections_section (`questionId`, sectionId) VALUES ";
    for (let q of data.questionText0.questions) {
        const c = prefill.categories[q.category]
        const t = prefill.types[q.type]
        const scoringId = 1
        const m = 0
        const l = 1
        const sectionId = 1
        const id = q.id

        questionSql += `(${id}, ${c}, ${t}, ${m}, ${scoringId}),\n`
        questionTranslationSql += `(${id}, ${l}, "${q.subTitle}", "${q.title}"),\n`
        assessmentQ += `(${id}, ${id}, 1),\n`
        sectionQ += `(${id}, ${sectionId}),\n`
    }
    questionSql = questionSql.slice(0, -2) + ";"
    questionTranslationSql = questionTranslationSql.slice(0, -2) + ";"
    assessmentQ = assessmentQ.slice(0, -2) + ";"
    sectionQ = sectionQ.slice(0, -2) + ";"

    console.log(questionSql)
    console.log(questionTranslationSql)
    console.log(assessmentQ)
    console.log(sectionQ)
}

const startPageF = () => {
    let translationQ = "INSERT INTO ccam.translation (id) VALUES ";
    let translateStringQ = "INSERT INTO ccam.translatable_string (value, translationsId, languageId, url) VALUES ";
    let startPageQ = "INSERT INTO ccam.startpage (id, translationsId, marker) VALUES ";

    let translationId = 1
    let startPageId = 1
    Object.keys(data.startTexts).forEach((k) => {
        const v = data.startTexts[k]
        const languageId = 1

        translationQ += `(${translationId}),\n`
        translateStringQ += `("${v}", ${translationId}, ${languageId}, ''),\n`
        startPageQ += `(${startPageId}, ${translationId}, "${k}"),\n`
        translationId++
        startPageId++
    })
    translationQ = translationQ.slice(0, -2) + ";"
    translateStringQ = translateStringQ.slice(0, -2) + ";"
    startPageQ = startPageQ.slice(0, -2) + ";"

    console.log(translationQ)
    console.log(translateStringQ)
    console.log(startPageQ)
}

const navigationTextsF = () => {
    let translationId = 11
    let navigationTextsId = 1
    let navigationTextsQ = "INSERT INTO ccam.navigation_translations (id, marker, translationsId) VALUES ";
    let translationQ = "INSERT INTO ccam.translation (id) VALUES ";
    let translateStringQ = "INSERT INTO ccam.translatable_string (value, translationsId, languageId, url) VALUES ";
    Object.keys(data.navigationTexts).forEach((k) => {
        const v = data.navigationTexts[k]
        const languageId = 1

        translationQ += `(${translationId}),\n`
        translateStringQ += `("${v}", ${translationId}, ${languageId}, ''),\n`
        navigationTextsQ += `(${navigationTextsId}, "${k}", ${translationId}),\n`
        translationId++
        navigationTextsId++
    })
    translationQ = translationQ.slice(0, -2) + ";"
    translateStringQ = translateStringQ.slice(0, -2) + ";"
    navigationTextsQ = navigationTextsQ.slice(0, -2) + ";"

    console.log(translationQ)
    console.log(translateStringQ)
    console.log(navigationTextsQ)
}

const answerF = () => {
    let answerQ = "INSERT INTO ccam.answer (id, type, `order`) VALUES ";
    let answerTranslationQ = "INSERT INTO ccam.answer__translation (translation, languageId, answerId) VALUES ";
    let questionAnswerQ = "INSERT INTO ccam.question_answers_answer (questionId, answerId) VALUES ";
    let answerId = 1

    for (let q of data.questionText0.questions) {
        for (a in q.answers) {
            const answer = q.answers[a]
            const text = answer.translation
            const type = 0
            const order = a
            const questionId = q.id
            const languageId = 1

            answerQ += `(${answerId}, ${type}, ${order}),\n`
            answerTranslationQ += `("${text}", ${languageId}, ${answerId}),\n`
            questionAnswerQ += `(${questionId}, ${answerId}),\n`
            answerId++
        }
    }
    answerQ = answerQ.slice(0, -2) + ";"
    answerTranslationQ = answerTranslationQ.slice(0, -2) + ";"
    questionAnswerQ = questionAnswerQ.slice(0, -2) + ";"

    console.log(answerQ)
    console.log(answerTranslationQ)
    console.log(questionAnswerQ)
}

const categoryF = () => {
    let categorySql = "INSERT INTO ccam.category (id) VALUES ";
    let categoryTranslationSql = "INSERT INTO ccam.category__translation (translation, categoryId, languageId, translationShort) VALUES ";

    let categoryId = 1
    let translationId = 1
    Object.keys(prefill.categories).forEach(c => {
        const languageId = 1
        const translation = c
        const translationShort = c

        categorySql += `(${categoryId}),\n`
        categoryTranslationSql += `("${translation}", ${categoryId}, ${languageId}, "${translationShort}"),\n`
        categoryId++
        translationId++
    })
    categorySql = categorySql.slice(0, -2) + ";"
    categoryTranslationSql = categoryTranslationSql.slice(0, -2) + ";"

    console.log(categorySql)
    console.log(categoryTranslationSql)
}

const scoringF = () => {
    const { parse } = require('csv-parse');
    const fs = require('fs');
    const parser = parse({ delimiter: ',', columns: true, trim: true, });
    const records = [];
    let scoringQ = "INSERT INTO ccam.scoring (score, questionId, answerId, assessmentTypeId, categoryId) VALUES ";

    parser.on('readable', function () {
        let record;
        while ((record = parser.read()) !== null) {
            records.push(record);
        }
    });
    parser.on('error', function (err) {
        console.error(err.message);
    });
    parser.on('end', function () {
        let score = 1;
        let questionId = 1;
        const categoryId = 5
        records.forEach(r => {
            const { id, title, answerId, translation } = r
            if(id != questionId) {
                score = 1
                questionId = id
            }
            else score++
            const assessmentTypeId = 5

            scoringQ += `(${score}, ${questionId}, ${answerId}, ${assessmentTypeId}, ${categoryId}),\n`
        })
        scoringQ = scoringQ.slice(0, -2) + ";"
        console.log(scoringQ)

    });
    fs.createReadStream("cat7.csv").pipe(parser);
}

// questionF()
// startPageF()
// navigationTextsF()
// answerF()
// categoryF()
// scoringF()
