const View = function(){
    const source = $('#comments-template').html()
    const template = Handlebars.compile(source)

    const renderComments = function(comments){

        const newHTML = template({comments});
        $('#commentContainer').empty().append(newHTML);
    }

    const renderPosts = function(comments){
        $('#secondPage').css('display', 'none')
        $('#postContainer').css('display', 'grid')
        
        const newHTML = template({comments});
        $('#CommentsContainer').empty().append(newHTML);
    }

    const renderCities= function(city){
        $('#citys').append(`
            <option value="${city}">${city}</option>
        `)
    }
    
    
    return {
        renderComments,
        renderPosts,
        renderCities
    }


}