


const Database = require('./databases/db')

const {getSubject,weekday,subjects, convertHoursToMinutes} = require('./utils/format')

let cont = 0

 function pageLanding(req, res){
    cont += 1
    let result = cont
    
    return res.render("index.html", {result});
   
}
async function pageStudy(req, res){
    const filters = req.query

    



    if (!filters.subject || !filters.weekday || !filters.time) {
        console.log("N passou")
        return res.render("study.html", {filters,subjects, weekday})
    
    }
    

    const timeToMinutes = convertHoursToMinutes(filters.time)
    console.log(timeToMinutes)

    const query = `
        select classes.*, proffys.*
        from proffys
        join classes on (classes.proffy_id = proffys.id)
        where exists(
            select class_schedule.*
            from class_schedule
            where class_schedule.class_id = classes.id
            and class_schedule.weekday = ${filters.weekday} 
            and class_schedule.time_from <= ${timeToMinutes}
            and class_schedule.time_to > ${timeToMinutes}
        )
        and classes.subject = '${filters.subject}'
    `

    try {
        const db = await Database
        
        const proffys = await db.all(query)
        // console.log("aqui")

        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })


        return res.render('study.html', {proffys, subjects, filters, weekday})

    } catch (error) {
        console.log(error)
    }



}

function pageGiveClasses(req, res){
    
    return res.render("give-classes.html", {subjects, weekday});
}




async function saveClasses(req, res){
        const createProffy = require('./databases/createProffy')
        
     const proffyValues = {
            name: req.body.name,
            avatar: req.body.avatar,
            whatsapp: req.body.whatsapp,
            bio: req.body.bio
        }
    
    const classValues = {
        subject: req.body.subject,
        cost : req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
    (weekday, index) => {
        return{
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
       
    try{
        const db = await Database
        await createProffy(db, {proffyValues, classValues, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
            

        // const data = req.body

        res.redirect("/sucess")

        // res.redirect("/study" + queryString)
        


        
        }catch(error){
            console.log(error)
        }
    }

function sucess(req, res){
       return  res.render("sucess.html")
}

module.exports = {pageLanding, pageStudy, pageGiveClasses, saveClasses,sucess}