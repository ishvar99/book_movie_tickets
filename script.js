const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)')

const movieSelect=document.getElementById('movie');

let ticketPrice=+movieSelect.value; // '+' converts string to number;

const count= document.getElementById('count');
const total =document.getElementById('total');
const lock =document.getElementById('btn');

populateUI();
function populateUI(){
    const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));
    const occupiedSeats= JSON.parse(localStorage.getItem('occupiedSeats'));
    if(occupiedSeats!=null && occupiedSeats.length>0){
        [...seats].map((seat,i)=>{
            if(occupiedSeats.includes(i)){
                seat.classList.add('occupied');
            }
        })
    }
    if(selectedSeats!=null && selectedSeats.length>0){
    [...seats].map((seat,i)=>{
        if(selectedSeats.includes(i)){
            seat.classList.add('selected');
        }
    })
}
    const movieIndex=JSON.parse(localStorage.getItem('movieIndex'));
    const moviePrice=JSON.parse(localStorage.getItem('moviePrice'));
    if(movieIndex!=null && moviePrice!=null){
    movieSelect.selectedIndex=movieIndex;
    count.innerText=selectedSeats.length;
    total.innerText=selectedSeats.length*moviePrice;
    }

}

function lockSeats(){
    const bookedSeats=container.querySelectorAll('.row .seat.selected');
  const occupiedSeats= [...bookedSeats].map((seat,i)=>{
        seat.classList.remove('selected');
        seat.classList.add('occupied');
        return seat;
    });
    const occupiedIndices=occupiedSeats.map((seat)=>{
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('occupiedSeats',JSON.stringify(occupiedIndices));
    count.innerText=0;
    total.innerText=0;
}

function updateSelectedCount(){
    const bookedSeats=container.querySelectorAll('.row .seat.selected');
    count.innerText=bookedSeats.length;
    total.innerText=bookedSeats.length*ticketPrice;
    const seatsIndex=[...bookedSeats].map((seat)=>{
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
}


movieSelect.addEventListener('change',(e)=>{
    ticketPrice=+e.target.value;
    localStorage.setItem('movieIndex',e.target.selectedIndex)
    localStorage.setItem('moviePrice',e.target.value)
    updateSelectedCount();
})

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
       updateSelectedCount();
    }
})

lock.addEventListener('click',(e)=>{
    lockSeats();
})

