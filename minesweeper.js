
var randomMines; // array which will contain locations of random mines
var noOfRows = 5; //m as per problem statement
var noOfCellsPerRow = 5; //n as per problem statement
var noOfMines = 10;

//Scalable architecture for minesweeper, use this function to add a row
function addRow(rowNo){
    var mineCanvas = document.getElementById("mine-canvas");
    var mineRow = document.createElement("div");
    mineRow.id = "mine-row-" + rowNo;
    mineRow.className = "div-table-row";

    mineCanvas.appendChild(mineRow);
}

//Scalable architecture for minesweeper, use this function to add a cell to a row
function addCellToRow(rowNo, cellNo, isMineCell){
   
   var outerMineCell = document.createElement("div");
   outerMineCell.className = "card div-table-col";
   outerMineCell.id = "mine-cell-" + rowNo + "-" + cellNo;
   outerMineCell.addEventListener("click", flip);

   var mineCellFront = document.createElement("div");
   mineCellFront.className = "card__face card__face--front";

   var mineCellBack = document.createElement("div");
   mineCellBack.classList = "card__face card__face--back";
   mineCellBack.id = "mine-cell-back-" + rowNo + "-" + cellNo;

   if(isMineCell){
       var mine = document.createElement("img");
       mine.className = "mine";
       mine.src = "mine.png";

       mineCellBack.appendChild(mine);
   }

   outerMineCell.appendChild(mineCellFront);
   outerMineCell.appendChild(mineCellBack);

   var mineRow = document.getElementById("mine-row-"+rowNo);
   mineRow.appendChild(outerMineCell);

}

//Flip the cell to display original number
function flip() {
    var card = document.getElementById(event.target.id);
    var rowNo = parseInt(event.target.id.split("-")[2]);
    var colNo = parseInt(event.target.id.split("-")[3]);
    var cellNo = rowNo*noOfRows + colNo;
    if (randomMines.includes(cellNo)){
        
        for(let i = 0; i < 5; i++){
            for (let j = 0; j < 5; j++){
                if(!document.getElementById("mine-cell-"+i+"-"+j).classList.contains("is-flipped"))
                {
                    document.getElementById("mine-cell-"+i+"-"+j).classList.toggle("is-flipped");
                    document.getElementById("mine-cell-"+i+"-"+j).classList.add("align-to-center");
                }
            }
        }
        var gameOverDiv = document.createElement("div");
        gameOverDiv.innerHTML = "GAME OVER!!!";
        gameOverDiv.className = "game-over";
        document.getElementById("mine-canvas").appendChild(gameOverDiv);
    }
    if(!card.classList.contains("is-flipped"))
    {
        card.classList.toggle("is-flipped");
        card.classList.add("align-to-center");
    }
    
}

function generateRandomMineLocations(noOfMines){
   return Array.from({length: 25}, () => Math.floor(Math.random() * 25)).slice(0, noOfMines).sort();
}

function addMineNumber(rowNo, colNo){

    var mineDisplayNo = 0;

    for (var row = rowNo-1; row <= rowNo + 1; row++){
        for (var col = colNo-1 ; col <= colNo+1; col++){
            if(row>=0 && col>=0 && row<noOfRows && col<noOfCellsPerRow) //check for valid cell
            {
                var adj = row*noOfRows + col;
                if (randomMines.includes(adj)){
                    mineDisplayNo ++;
                }
            }
        }
    }
    if(!randomMines.includes(rowNo*5+colNo))
        document.getElementById("mine-cell-back-" + rowNo + "-" + colNo).innerHTML = mineDisplayNo;
}

//Code flow starts here
function onBodyLoad() {

    randomMines = generateRandomMineLocations(noOfMines); 

    for(let i = 0; i < noOfRows; i++){
        for (let j = 0; j < noOfCellsPerRow; j++){
            addRow(i);
            let cellNo = i*noOfCellsPerRow + j;
            console.log(cellNo);
            addCellToRow(i, j, randomMines.includes(cellNo));
            
        }
    }

    for(let i = 0; i < noOfRows; i++){
        for (let j = 0; j < noOfCellsPerRow; j++){
            addMineNumber(i, j);
        }
    }

}