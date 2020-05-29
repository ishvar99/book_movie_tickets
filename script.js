const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)')

const movieSelect=document.getElementById('movie');

const ticketPrice=parseInt(movieSelect.value);

const count= document.getElementById('count');
const total =document.getElementById('total');

function updateSelectedCount(){
    const bookedSeats=container.querySelectorAll('.row .seat.selected');
    count.innerText=bookedSeats.length;
    total.innerText=bookedSeats.length*ticketPrice;
}

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
       updateSelectedCount();
    }
})


