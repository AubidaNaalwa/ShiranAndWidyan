let imgSrc
const Model = function () {
    localStorage.clear()
    let id = 0
    let commentId = 0
    let comments = {
        telAviv: {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        yafoo: {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        mghar: {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        nasert: {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        gatJaleel: {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        merkaz:{
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        north:{
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        },
        south:{
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[]
        }
    }
    const keys = Object.keys(comments)
    
    const loadComment = async function (commentType,occasion) {
        const newComments  = JSON.parse(localStorage.getItem('items'))
        if(newComments){
            comments = newComments
        }
        let key = ""
        key = keys.find(element => element == commentType)
        if (!key) {
            return null
        }
        return comments[key][occasion]
    }

    const addComment = async function (commentType,occasion,comment,name){
        let key = ""
        key = keys.find(element => element == commentType)
        if (!key) {
            return null
        }
        comments[key][occasion].unshift({id:id,comment,name,  imgSrc : imgSrc, commentspost:[]})
        id++
        localStorage.clear()    
        localStorage.setItem('occasion', occasion)
    }

    const addNewCityToDb= function(cityName){
        keys.push(cityName)
        comments[cityName] = {
            cityHistory:[],
            married:[],
            stories:[],
            histPlaces:[],
            holyPlaces:[],
        }
    }

    const deleteCommentById = function(id,commentType,occasion){
        const index = comments[commentType][occasion].findIndex(element => element.id == id)
        if(index != -1)
            comments[commentType][occasion].splice(index,1)
    }
    
    const loadCities = function(){
        keys = Object.keys(comments)
        return keys
    }

    const addCommentToAPost = function(id,commentType,occasion,text){
        const index = comments[commentType][occasion].findIndex(element => element.id == id)
        if(index != -1)
            comments[commentType][occasion][index]["commentspost"].push({
                id:commentId++,
                comment:text
            })
    }
    return {
        loadComment,
        addComment,
        addNewCityToDb,
        loadCities,
        deleteCommentById,
        addCommentToAPost
    }
}


