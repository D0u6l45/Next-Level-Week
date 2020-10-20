const createProffy = require('./createProffy')
const Database = require('./db');
const Data = require('sqlite-async');




async function executa_insert(db)
{
    //insert data
    
console.log(db)
    
       proffyValue = {
        name: "Douglas",
        avatar: "https://scontent-gig2-1.cdninstagram.com/v/t51.2885-19/s150x150/119685454_322120775532704_2935825516324350778_n.jpg?_nc_ht=scontent-gig2-1.cdninstagram.com&_nc_ohc=kPhO4ZrUz2kAX90NQtR&oh=5c0572655016607fd702432bf378df97&oe=5FA4F339",
        whatsapp: "21990598894",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
        
    }
    

    classValues ={
        subject: 1,
        cost: "20"
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from:720,
            time_to:1220
        },

        {
            weekday: 0,
            time_from:520,
            time_to:1220
        }
    
    ]
    
    //  await createProffy(db, { proffyValue, classValues, classScheduleValues })
    
    const consulta = await db.all(`
    select class_schedule.*
    from class_schedule
    where class_schedule.class_id = 1
    and class_schedule.weekday <= "0" 
    and class_schedule.time_from <= "1300"
    and class_schedule.time_to > "1300"

    
    `)

console.log(consulta)



const selectClassesSchedule = await db.all(`
        select  class_schedule.*
        from class_schedule
        where class_schedule.class_id = 1

    `)

    // console.log(selectClassesSchedule)

}

Data.open(__dirname + "/database.sqlite").then(executa_insert) 
