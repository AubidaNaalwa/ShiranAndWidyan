const View = function(){
    const source = $('#comments-template').html()
    const template = Handlebars.compile(source)
   
    const renderComments = function(comments){
        const newHTML = template({comments});
        $('#commentContainer').empty().append(newHTML);
    }

    return {
        renderComments
    }
}