// Compute the edit distance between the two given strings
function getEditDistance(a, b) {
  if (a.length === 0) return b.length; 
  if (b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

let listeningPass = 0;
let limitNumber = 3;
let list, string, stringFormated = [];

// Access the .txt file passed by the user and stores in an array
const input = document.querySelector('input[type="file"]')
input.addEventListener('change', function(e){ 
  const reader = new FileReader()
  reader.onload = function () {    
    list = reader.result.split('\r\n')    
  }
  reader.readAsText(input.files[0])
},false)

const text = document.getElementById('input');
text.addEventListener('input', function(){

  // Makes buttons disappear if empty input
  if(this.value==''){
    document.getElementById("myDiv").style.display = "none";    
  }else{
    document.getElementById("myDiv").style.display = "flex"; 
  }

  string = this.value 
  stringFormated = string.split(' ')
  word = stringFormated[stringFormated.length-1] 

  if(list.indexOf(word)>-1){   
    while(listeningPass<3){
      listeningPass++;
    }
  } else { 
    listeningPass=0;
    for(let i=1; i<20;i++){
      for(let index in list){      
        let cost = getEditDistance(word, list[index]);      
        if (cost == i)
        {         
          if(!(limitNumber==listeningPass)){                        
            listeningPass++;  
            document.getElementById('btn'+listeningPass).innerHTML = list[index];        
          }else{
            i=21;
          }             
        }    
      }                   
    }
  }         
}, false)

// Take the button events
const
      display = document.querySelector(".text"),
      buttons = document.querySelectorAll(".select");
      buttons.forEach(button => button.addEventListener("click", function() { 
      // Write in the input along with the correction        
      if(stringFormated.length>1){  
        stringFormated.pop() 
        let i =0;
        display.value=''
        while(i<(stringFormated.length)){                  
          display.value += stringFormated[i] + " " 
          i++
          document.getElementById("myDiv").style.display = "none"; 
        }
        display.value+= button.innerHTML
      }else{
        display.value = button.innerHTML;
        document.getElementById("myDiv").style.display = "none"; 
      }                       
    }
  )
)

       