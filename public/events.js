
const model = new Model()
const view = new View()
let currentCity 
let currentPage=1
$(`#searchBtn`).on("click", function () {
    currentPage =2
    let city = $(`#citys :selected`).val()
    $('body').css("background-image",`url("https://ae01.alicdn.com/kf/HTB1fA6DNAPoK1RjSZKbq6x1IXXa2/LIFE-MAGIC-BOX-Black-Brick-Wall-Background-Backdrop-Photography-Woodland-Party-Photocall-Wedding.jpg")`)
    $('body').css("background-repeat",` no-repeat`)
    $('body').css("background-size",`cover`)
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")

    let folder = "./images/"+city+"/";
    let start = 0;
    currentCity = city
    $("#imageContainer").empty()
    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    if(start == 0){
                    $("#imageContainer").append("<img class = cityImages src='"  +val + `'onclick = "showSlides()" id = "${i}">`);
                    start = 1;    
                }
                    else{
                        $("#imageContainer").append("<img class = cityImages src='"  +val + `' style="display: none;" onclick = "showSlides()" id = "${i}">`);
                        
                    }
                }
                
            });
        },
        error: err =>{ 
            console.log(err)
        }
    });

    const comments = model.loadComment(city)
    view.renderComments(comments)

})



$(`.serv-content`).on("click",".card", function () {
    let city = $(this).data("location")
    $('body').css("background-image",`url("https://ae01.alicdn.com/kf/HTB1fA6DNAPoK1RjSZKbq6x1IXXa2/LIFE-MAGIC-BOX-Black-Brick-Wall-Background-Backdrop-Photography-Woodland-Party-Photocall-Wedding.jpg")`)

    $('body').css("background-repeat",` no-repeat`)
    $('body').css("background-size",`cover`)
    currentPage =2
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")
    currentCity = city
    let folder = "./images/" +city+"/";
    let start = 0;
    $("#imageContainer").empty()
    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    if(start == 0){
                    $("#imageContainer").append("<img class = cityImages src='"  +val + `'onclick = "showSlides()" id = "${i}" onerror ="showSlides()">`);
                    start = 1;    
                }
                    else{
                        $("#imageContainer").append("<img class = cityImages src='"  +val + `' style="display: none;" onclick = "showSlides()" id = "${i}" onerror ="showSlides()" >`);
                        
                    }
                }
                
            });
        }
    });

    
    const comments = model.loadComment(city)
    view.renderComments(comments)

})
function goBack() {
    $('body').css("background-image",`none`)
    $('#postContainer').css("display",`none`)
    $('body').css("background-repeat",` none`)
    $('body').css("background-size",`none`)
    currentPage =1
    $('#firstPage').css("display", "block")
    $('#secondPage').css("display", "none")
}

let slideIndex = 1;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("cityImages");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";

}


function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "shiranwedian@gmail.com",
	Password : "WeSh1234",
	To : $('#mail').val(),
	From : "shiranwedian@gmail.com",
	Subject : "Information Submited",
	Body : "We recieve your informations,we will bewithyou in touch as soon as possible",
	}).then(
        message => {alert("mail sent successfully")
        $(`textarea`).val("")
        $(`input`).val("")
    }
	);
}


$("#secondPage").on('click','.category',function(){
    const occasion = $(this).attr('name')
    if(!occasion){
        return
    }
    localStorage.setItem('occasion', occasion)
    model.loadComment(currentCity, occasion).then(value => view.renderPosts(value))
    
})


$("#postContainer").on('click','#commentBtn',async function(){

    const name = $('#userName').val()
    const commentText = $('#commentText').val()
    if(!name || !commentText){
        alert('missing name of the comment text')
        return 
    }
    if(!imgSrc){
        alert('Image not uploaded')
        return 
    }
    const occasion = localStorage.getItem('occasion')
    if(!name || !commentText || !occasion){
        return
    }
    await model.addComment(currentCity,occasion,commentText,name)
    model.loadComment(currentCity, occasion).then(value => view.renderPosts(value))
    $('#userName').val("")
    $('#commentText').val("")
})


$('#AddCityToDb').on('click', function(){
    const cit = $('#cityName').val()
    if(!cit){
        return
    }
    model.addNewCityToDb(cit)
    view.renderCities(cit)
   $('#cityName').val("")

})


$(document).ready(function() {
    $("#addImage").click(function() {
      $("#fileinput").click();
    });
  
    $("#fileinput").change(function() {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  
    function imageIsLoaded(e) {
      var x = 'foo';
      imgSrc = e.target.result 

    }
});


$('#CommentsContainer').on('click', '.deletepost', async function(){
    const occasion = localStorage.getItem('occasion')
    const divId = $(this).closest(".comment").data().id
    model.deleteCommentById(divId ,currentCity, occasion)
    model.loadComment(currentCity, occasion).then(value => view.renderPosts(value))
})


$('#CommentsContainer').on('click', '.addComment', async function(){
    const occasion = localStorage.getItem('occasion')
    const divId = $(this).closest(".comment").data().id
    const val = $(this).siblings(".textInputForComments").val()
    if(!val)
        return
    model.addCommentToAPost(divId,currentCity,occasion,val)
    model.loadComment(currentCity, occasion).then(value => view.renderPosts(value))
})

