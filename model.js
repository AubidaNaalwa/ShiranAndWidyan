

const Model = function () {
    let comments = {
        telAviv: [],
        yafoo: [],
        mghar: [],
        nasert: [],
        gatJaleel: [],
        merkaz:[],
        north:[],
        south:[]
    }
    const keys = Object.keys(comments)
    
    const loadComment = function (commentType) {
        const newComments  = JSON.parse(localStorage.getItem('items'))
        if(newComments){
            comments = newComments
        }
        let key = ""
        key = keys.find(element => element == commentType)
        if (!key) {
            return null
        }
        return comments[key]
    }
    const addComment = function (commentType,comment){
        const newComments  = JSON.parse(localStorage.getItem('items'))
        if(newComments){
            comments = newComments
        }
        let key = ""
        key = keys.find(element => element == commentType)
        if (!key) {
            return null
        }
        comments[key].unshift(comment)
        localStorage.setItem('items', JSON.stringify(comments))

    }

    return {
        loadComment,
        addComment
    }
}

