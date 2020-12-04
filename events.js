const model = new Model()
const view = new View()
let currentCity 
let currentPage=1
$(`#searchBtn`).on("click", function () {
    currentPage =2
    let city = $(`#citys :selected`).val()
    $('body').css("background-image",`url("/images/banner1.jpg")`)
    $('body').css("background-repeat",` no-repeat`)
    $('body').css("background-size",`cover`)
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")

    let folder = "images/" +city+"/";
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
        }
    });

    const comments = model.loadComment(city)
    view.renderComments(comments)

})



$(`.serv-content`).on("click",".card", function () {
    let city = $(this).data("location")
    $('body').css("background-image",`url("/images/banner1.jpg")`)
    $('body').css("background-repeat",` no-repeat`)
    $('body').css("background-size",`cover`)
    currentPage =2
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")
    currentCity = city
    let folder = "images/" +city+"/";
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

$("#insertyComments").on("click","button",function(){
    const text = $("#commentText").val()
    if(!text ){
        return
    }
    model.addComment(currentCity,text)
    view.renderComments(model.loadComment(currentCity))
    $("#commentText").val("")
})
