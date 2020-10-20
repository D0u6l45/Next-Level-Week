
const subjects = [
    "Artes",
    "Biologia",
    "Ciência",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
   "Matemática",
    "Português",
    "Química",
    "Tecnologia da Informação"
]

const weekday = [
"Domingo",
"Segunda-feira",
"Terça-feira",
"Quarta-feira",
"Quinta-feira",
"Sexta-feira",
"Sábado"
]




function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}


function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekday,
    getSubject,
    convertHoursToMinutes
}