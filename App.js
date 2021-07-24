import React, { useState , useEffect } from "react"

function App() {

    //creating states to hold text and time displayed on countdown timer
    const [text, setText] = useState("")
    //storing the state as 5 (seconds) as initial
    const [timeRemaining, setTimeRemaining] = useState(5)

    function handleChange(event) {
        //destructuring event.target.value to grab input when event is fired:
        const {value} = event.target
        setText(value)
    }

    function calculateWordCount(text) {
        //trim the string of any redundant spaces each side,
        const wordsArr = text.trim().split(" ")
        //preventing spaces between words to count as a word,
        const spaceRemoved = wordsArr.filter(word => word !== "")
        //returning the filtered array of words:
        return spaceRemoved.length
    }

    //useEffect is run when component updates, and then when value of timeRemaining state changes
    useEffect(() => {
        //if value of time state is greater than 0 (i.e. count still running):
        if (timeRemaining > 0) {
            //setTimeout to run every 1000ms (1s)
            setTimeout(() => {
                return setTimeRemaining(prevTime => prevTime - 1)
            }
        }
        //if timeRemaining has reached 0, no more re-rendering (since [timeRemaining] will remain at 0)
    }, 1000)
    }, [timeRemaining])

    return (
        <>
            <h1>Speed Typer</h1>
            <textarea
                onChange={handleChange}
                value={text}
            />
            <h4>Time Remaining: {timeRemaining}</h4>
            <button onClick={() => calculateWordCount(text)}>START</button>
            <h1>Word count: </h1>
        </>
    )
}

export default App
