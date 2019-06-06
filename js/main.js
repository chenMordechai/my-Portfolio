console.log('Starting up');


function initPage(){
    creatProjs()
    renderProj()

}


function submit(){
    // var email = $('.input-mail').val()
    var subject = $('.input-subject').val()
    var message = $('.input-text').val()
    // console.log(email , subject , message)
    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chen100030@gmail.com.com&su=${subject}&body=${message}&.com&tf=1`)

}




function renderModal(projId){
var projs = getProjs()
var currProj =projs[projId]
// var currProj = getProjById(projId)
// console.log(currProj)
var htmlStr = `<div  class="portfolio-modal modal fade" id="portfolioModal" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="close-modal" data-dismiss="modal">
      <div class="lr">
        <div class="rl"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="modal-body">
            <h2>${currProj.name}</h2>
            <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            <img class="img-fluid d-block mx-auto" src="img/portfolio/${currProj.id}.jpg" alt="">
            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
              blanditiis
              dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
              cupiditate,
              maiores repudiandae, nostrum, reiciendis facere nemo!</p>
            <ul class="list-inline">
              <li>Date: ${timeConverter(currProj.publishedAt)} </li>
              <li>Client: Threads</li>
              <li>Category: Illustration</li>
            </ul>
            <button type="button" class='btn btn-success'><a href = "http://chenmordechai.github.io/${currProj.id}/" target="_blank" class="Check" >Check it Out</a></button> 
            <button class="btn btn-primary" data-dismiss="modal" type="button">
              <i class="fa fa-times"></i>
              Close Project</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`

    $('.wrapper-modal').html(htmlStr);

}



function renderProj(){
    var projs = getProjs()
    var htmlStr= projs.map(function (proj){
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" onclick="renderModal(${proj.id})" data-toggle="modal" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
    })
$('.Portfolio-items').html(htmlStr);
}





