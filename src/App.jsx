import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App (){
    

    return <div className="app">
        <Header />
        <table>
            <tbody>
                {
                    [1,2,3,4,5,6,7,8,9].map((row, rindex)=>{
                        return <tr key={rindex}>
                        {[1,2,3,4,5,6,7,8,9].map((col, cindex)=>{
                            return <td key={rindex+cindex}>
                                <input className="cell" />
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