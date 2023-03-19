import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]
];
let flag = true;

function App() {
    const [sudoku, setSudoku] = useState(getSudokuBox(board));
    const [preSudoku, setPreSudoku] = useState(getSudokuBox(board));

    function getSudokuBox(board) {
        return JSON.parse(JSON.stringify(board));
    }


    // Check that it is safe to fill that number .
    function isSafe(board, row, col, num) {
        // check that number virtically and horizontally.
        for (let i = 0; i < 9; i++) {
            if (board[row][i] == num)  // horizontal
                return false;
            if (board[i][col] == num)  // virtical
                return false;
        }

        // Check that number in grid
        let pr = (Math.floor(row / 3)) * 3;  //find the starting position of that grid
        let pc = (Math.floor(col / 3)) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[pr + i][pc + j] == num)
                    return false;
            }
        }

        return true;
    }

    // recurrsive function using backtracking
    function solveNext(board, row, col) {
        if (row == 9)   // if we solve the entire board
            return true;

        //  defining the next position
        let nextRow, nextCol;
        if (col == 8) {
            nextRow = row + 1;
            nextCol = 0;
        } else {
            nextRow = row;
            nextCol = col + 1;
        }

        // check if the current position is fillable or not
        if (board[row][col] != -1) {
            return solveNext(board, nextRow, nextCol);
        } else {
            for (let num = 1; num <= 9; num++) {
                if (isSafe(board, row, col, num)) {   // checking is this number is safe to fill here
                    board[row][col] = num;
                    if (solveNext(board, nextRow, nextCol)) {
                        return true;
                    } else {
                        board[row][col] = -1;
                    }
                }
            }
        }
        return false;
    }

    function solverSudoku(sudokuboard) {
        if (solveNext(sudokuboard, 0, 0)) {
            console.log("there is solution");
            return sudokuboard;
        } else {
            console.log("not solution");
            return board;
        }
    }

    function checkPosition(board, row, col){
        console.log(row+" "+col+ " check poi")
        let num = board[row][col];
        for(let i=0; i<9; i++){
            if(i != row){
                if(board[i][col] == num){
                    console.log(i+" "+col+" false 1")
                    return false;}
            }
            if(i != col){
                if(board[row][i] == num){
                console.log("false 2")
                    return false}
            }
        }

        let pr = (Math.floor(row/3))*3;
        let pc = (Math.floor(col/3))*3;
        console.log("pr = "+pr+"  pc = "+pc)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[pr + i][pc + j] == num){
                    if(pr+i != row || pc+j != col){
                        console.log(i +" % "+ row);
                        console.log(pr+i+ " @ "+ (pc+j))
                        console.log(board[pr + i][pc + j]+" false-3")
                        return false;
                    }
                }
            }
        }
        console.log("true")

        return true;
    }

    function checkSudoku(checkingsudoku){
        console.log("check")
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                // console.log(i+" "+j+" "+checkingsudoku[i][j])
                if(checkingsudoku[i][j] != -1){
                    console.log(i+" "+j+" ")
                    if(!checkPosition(checkingsudoku, i, j))
                        return false;
                }
            }
        }
        return true
    }

    function solveGrid() {
        if(checkSudoku(sudoku)){
            setPreSudoku(sudoku);
            let newgrid = solverSudoku(getSudokuBox(sudoku));
            if(newgrid[0][0] === -1){
                setSudoku(board);
                setPreSudoku(board);
                console.log("no solution possible");
            }
            setSudoku(newgrid);
        }
        else {
            setSudoku(board);
            setPreSudoku(board);
            console.log("no hehehehe solution possible");
        }
    }

    function onChangeSudoku(e, row, col) {
        let grid = getSudokuBox(sudoku);
        grid[row][col] = -1;
        setSudoku(grid);

        let val = parseInt(e.target.value) || -1;
        // console.log(val)
        if ( val >= 1 && val <= 9) {
            grid[row][col] = val;
            setSudoku(grid);
            // console.log("ok")
        }
    }

    function reset(){
        setSudoku(board);
        setPreSudoku(board);
    }

    return <div className="app">
        <Header />
        <table>
            <tbody>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rindex) => {
                        return <tr key={rindex} className={(row + 1) % 3 === 0 ? "bborder" : ""}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cindex) => {
                                return <td key={rindex + cindex} className={(col + 1) % 3 === 0 ? "rborder" : ""}>
                                    <input 
                                        value={sudoku[row][col] === -1 ? "" : sudoku[row][col]}
                                        disabled={preSudoku[row][col] !== -1}
                                        className="cell"
                                        onChange={(e) => onChangeSudoku(e, row, col)}
                                    />
                                </td>
                            })}
                        </tr>
                    })
                }
            </tbody>
        </table>
        <button onClick={() => solveGrid()}>Solve</button>
        <button onClick={()=> reset()}>Reset</button>
    </div>
}

export default App;