import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const board = [
    [-1, 3, -1, -1, -1, -1, 5, -1, -1],
    [8, -1, 7, -1, 5, -1, -1, -1, -1],
    [5, -1, -1, 8, -1, 7, 4, 3, -1],
    [-1, 9, 6, 2, -1, -1, -1, -1, -1],
    [-1, -1, -1, 6, -1, 1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 9, 7, 8, -1],
    [-1, 2, 3, 1, -1, 4, -1, -1, 7],
    [-1, -1, -1, -1, 8, -1, 9, -1, 1],
    [-1, -1, 9, -1, -1, -1, -1, 6, -1]
];

function App() {
    const [sudoku, setSudoku] = useState(getSudokuBox(board));

    function getSudokuBox(board) {
        return JSON.parse(JSON.stringify(board));
    }

    function onChangeSudoku(e, row, col) {
        let val = parseInt(e.target.value) || -1;
        let grid = getSudokuBox(sudoku);

        if (val != -1 || val <= 1 && val >= 9) {
            grid[row][col] = val;
            setSudoku(grid);
            console.log("ok")
        }
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
                                    <input value={sudoku[row][col] === -1 ? "" : sudoku[row][col]}
                                        disabled={sudoku[row][col] !== -1}
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
    </div>
}

export default App;