'use strict'

initGallery()
eventListiners()

function eventListiners(){


}

function initGallery(){

    renderProjects()
    // renderModals()
}


function renderProjects(){

    const projs = getProjects()

    var strHtml = projs.map(proj =>    
        `<div class="col-md-4 col-sm-6 portfolio-item" onclick=renderModal(${proj.id})>
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
            </div>
            </div>
            <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt=${proj.name}>
            </a>
            <div class="portfolio-caption">
             <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            </div>
             </div>`
    )

    $('.projects').html(strHtml.join(''))
         
}

function renderModal(projId) {

const proj = getProjectById(projId)

// var $elModal = $('.portfolio-modal')

$('.portfolio-modal h2').text(proj.name)
$('.portfolio-modal p').text(proj.desc)
$('.modals-buttons').html(`<button class="btn btn-success to-project" onclick=openProject('${proj.url}') type="button">
                       🎬 Check This out!</button>`)

            
}

function onSubmitForm() {

    const email = $('email').value
    console.log(email)
    

}


