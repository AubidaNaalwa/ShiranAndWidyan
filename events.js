$(`#searchBtn`).on("click", function () {
    let city = $(`#citys :selected`).val()
    
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")

    let folder = "images/" +city+"/";
    let start = 0;
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

})



$(`.serv-content`).on("click",".card", function () {
    let city = $(this).data("location")
    
    $('#firstPage').css("display", "none")
    $('#secondPage').css("display", "block")

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

})
function goBack() {
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