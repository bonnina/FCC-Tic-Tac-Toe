$(function() {
  
  let count = 0;
  let comp = "o";
  let user = "o";
  let userPlayed = false;
  let first = false;
  let yes = true;
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let pass;
  let rand;
  
  // performs computer's move
  let go = function(val) {
    $('#' + val).text(comp);
    $('#' + val).addClass(comp);
    $('#' + val).addClass("dis");
    arr[val] = 4;
    count++;
    userPlayed = false;
    pass = val;
    if (count > 4) won()
  }
  
  // chooses a place for computer's move
  let comPlay = function() {
    if (userPlayed || first) { 
      if (count >= 2) {
        function where(i) {
          // check row 
          for (let r = 0; r < 7; r += 3) {
            let sumRow = arr[r] + arr[r + 1] + arr[r + 2];
            if (sumRow === i) {
              yes = false;
              if(arr[r] == 0) go(r)
              else if (arr[r + 1] == 0) go(r + 1)
              else go(r + 2)
              return;
            }
          }
          // check column
          for (let c = 0; c < 3; c++) {
            let sumCol = arr[c] + arr[c + 3] + arr[c + 6];
            if (sumCol === i) {
              yes = false;
              if(arr[c] === 0) go(c)
              else if (arr[c + 3] === 0) go(c + 3)
              else go(c + 6)
              return;
            }
          }  
          // check diagonals
          let d1 = arr[0] + arr[4] + arr[8];
          if (d1 === i) {
            yes = false;
            if (arr[0] === 0) go(0)
            else if (arr[4] === 0) go(4)
            else go(8)
            return;
          }
          
          let d2 = arr[2] + arr[4] + arr[6];
          if (d2 === i) {
            yes = false;
            if (arr[2] === 0) go(2)
            else if (arr[4] === 0) go(4)
            else go(6)
            return;
          }
        }
        // first check if a computer can complete a row/column/diagonal to win
        where(8);
        // then (if winning is not possible right now) check if computer can block the user from winning
        if (yes) where(2)
        // if neither completing nor blocking is possible
        rand = arr.indexOf(0);
        if(yes && first && count === 2) {
          if (arr[0] === 1) {
             go(rand + 1);
             return;
           }
          else {
             go(rand);
             return;
          }
        }
        else if(yes) {
          go(rand);
          return;
         }
        
      }
      else if (count === 0) go(4) 
      else {
        rand = arr.indexOf(0); 
        arr[4] === 0 ? go(4) : go(rand);
      }
    }
  }
  
  // automatic reset when a game is over
  let reset = function(y, z) {
    $(".buttons").css({'display' : 'none'});
    $(".end").css({'display' : 'block'});
    $("#p1").text(y);
    $("#p2").text(z);
    setTimeout(() => {
      $(".end").css({'display' : 'none'});
      $(".buttons").css({'display' : 'inline-block'});
      $(".btn").text('');
      $(".board").css({'background-color' : '#39ac73'});
      $(".btn").removeClass("dis");
      $(".btn").removeClass(user);
      $(".btn").removeClass(comp);
      count = 0;
      userPlayed = false;
      yes = true;  
      arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      if(first) go(4);
    }, 1000);
  }
    
  // check if we already have a winner
  function won() { 
    function check(a) {
      // if user won
       if (arr[a[0]] === 1 && arr[a[1]] === 1 && arr[a[2]] === 1) {
         $('#' + pass).text(comp);
         setTimeout(() => {
           reset("You", "won");
           return;
         }, 500);
       }
      // if computer won
       if (arr[a[0]] === 4 && arr[a[1]] === 4 && arr[a[2]] === 4) {
         $('#' + pass).text(comp);
         setTimeout(() => {
           reset("You", "lost");
           return;
         }, 500);
       }
      // if there's a tie
       if (arr.indexOf(0) === -1) {  
         setTimeout(() => reset("It's", "a tie"), 500);
       } 
     }
     let winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
     winPos.forEach((option) => check(option));
  }
  
  // user's move
  $(".btn").click(function() {
    if (!$(this).hasClass("dis")) {
      $(this).text(user);
      $(this).addClass(user);
      count++;
      userPlayed = true;
      yes = true;
      $(this).addClass("dis");
      arr[this.value] = 1;
      if (count > 4) won()
      setTimeout(function() {
        comPlay();
      }, 500); 
    }
  }); 
  
  // user chooses to play X or O
  $("#x, #o").click(function() {
    $(".ask").css({'display' : 'none'});
    $(".board").css({'background-color' : '#39ac73'});
    $(".buttons").css({'display' : 'inline-block'});
      if (this.value === "x") {user = "x"; comp = "o";}
      else {
        comp = "x";
        user = "o";
        first = true;
        comPlay();
      } 
   });
  
  // hard reset
  $("#reset").click(() => {
    $(".buttons").css({'display' : 'none'});
    $(".end").css({'display' : 'none'});
    $(".ask").css({'display' : 'block'});
    $(".board").css({'background-color' : '#3d5c5c'});
    $(".btn").removeClass("dis");
    $(".btn").removeClass(user);
    $(".btn").removeClass(comp);
    $(".btn").text('');
    count = 0;
    comp = "o";
    user = "o";
    userPlayed = false;
    yes = true;  
    first = false;
    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }); 
  
 })