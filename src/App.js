import React, { useState , useEffect } from "react"

function App() {
    const STARTING_TIME = 5

    //creating states to hold text and time displayed on countdown timer
    const [text, setText] = useState("")
    //storing the state as 5 (seconds) as initial
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    //storing isTimeRunning as a boolean state variable (false by default) to fire timer upon START button click
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    //storing wordCount as separate state to text (to store for indiv. games vs realtime tracking)
    const [wordCount, setWordCount] = useState(0)

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

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        //refreshing the input box, which updates according to text stored as state
        setText("")
        setWordCount(0)
    }

    function endGame() {
        setIsTimeRunning(false)
        //grabbing text input as string, calculate number of words,
        //then store it to wordCount state
        setWordCount(calculateWordCount(text))
    }

    //useEffect is run when component updates,
    //and then when values of timeRemaining and isTimeRunning states change
    useEffect(() => {
        //if start state value equals true (aka start button is clicked) && time > 0 (i.e. count still running)::
        if (isTimeRunning && timeRemaining > 0) {
            //setTimeout to run every 1000ms (1s)
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
        //when count reaches 0, set the isTimeRunning variable back to false:
        else if (timeRemaining === 0) {
                endGame()
        }

    }, [timeRemaining, isTimeRunning])

    return (
        <>
            <h1>Speed Typer</h1>
            <textarea
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time Remaining: {timeRemaining}</h4>
            <button
                onClick={startGame}
                disabled={isTimeRunning}>START</button>
            <h1>Word count: {wordCount}</h1>
        </>
    )
}

export default App

