let randomArray=[];
let count=1;

//clicking random will generate a number
$("#random").click(function(){
    randomArray=RandomNumber();
    count=0;
    $("h2").text("START!")
    $(".card .row:not(#header)").empty();
    $(".form-control").val("");

});

$("#GiveUp").click(function(){
    count=0;
    let number=randomArray.join('').split('').map(Number);
    $("h2").text("The number was "+ number)
    if (randomArray.length==0){
        $("h2").text("generater a number first!!")
        return;
    }
    $(".form-control").val("");

});
//clicking enter will check if a number is generated or not and will call UserNumber function
$(".enter").click(function(){
   if (randomArray.length === 0){
       $("h2").text("generater a number first!!")
       return;
   }
   UserNumber();
});

$(".form-control").keypress(function(event) {
    if (event.which === 13) {
        event.preventDefault();
        if (randomArray.length === 0) {
            $("h2").text("Generate a number first!");
            return;
        }
        UserNumber(); 
    }
});

function RandomNumber() {
    let usedNumbers = [];
    let randomArray = [];
    for (let i = 0; i < 4; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * 10) ;
        } while (usedNumbers.includes(num));
        randomArray.push(num);
        usedNumbers.push(num);
    }
    return randomArray;
};

function UserNumber()
{   count++;
    let userInput= $(".form-control").val();
    if (userInput < 1000 || userInput > 9999) {
        $("h2").text("Enter a 4-digit number!");
        count--;
        return;
    };

    let UserArray = String(userInput).split('').map(Number);//this cahnge the number to a strign separetaed by space then convert it to numbers in an array
    for(let i=0;i<4;i++){
        for(let j=i+1 ;j<4;j++){
           if(UserArray[i]==UserArray[j]){
            $("h2").text("no duplicated numbers allowed");
            count--;
                return;
            }
        }
    }

    if (!/^\d+$/.test(userInput)) {
        $("h2").text("Only numbers (0-9) are allowed!");
        count--;
        return;
    ;}
     
    let result=Compare(UserArray, randomArray);
     addRow(count,UserArray,result);
     $(".form-control").val("");
};

function Compare(user, random) {
    let cow = 0;
    let bull = 0;
    for(let i=0;i<4;i++){
        if(user[i]==random[i])
            {bull++;}
        else {
            for(let j=0;j<4;j++)
                {
                    if(user[i]==random[j] && i !== j)
                    {cow++;}
                }
            }
    }
    if(bull==4){
        $("h2").text("YOU WIN!!")
    }
   let res= cow+ "C "+ bull+"B"
   return res;
};

function addRow(tries,guess,result)
{
   let newRow=$("<div>", {class:"row g-0"}).append(
     $("<div>",{class:"col-sm-4 col-md-4 col-lg-4 hide",text:tries}),
     $("<div>",{class:"col-6 col-sm-4 col-md-4 col-lg-4",text:guess.join('')}),
     $("<div>",{class:"col-6 col-sm-4 col-md-4 col-lg-4",text:result}),
   );
   $(".card").append(newRow);
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if popup was already shown
    if (!localStorage.getItem('popupShown')) {
      // Show your popup
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
      
      // Set flag in localStorage
      localStorage.setItem('popupShown', 'true');
      
      // Optional: Set expiration (e.g., 7 days)
      // localStorage.setItem('popupExpires', Date.now() + 604800000);
    }
  });