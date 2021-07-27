import React, { useState , useEffect, useRef } from "react"

function App() {
    const STARTING_TIME = 15

    //creating states to hold text and time displayed on countdown timer
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)

    //storing isTimeRunning as a boolean state variable (false by default) to fire timer upon START button click
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    //storing wordCount as separate state to text (to store for indiv. games vs realtime tracking)
    const [wordCount, setWordCount] = useState(0)

    //secondary calculations based on wordCount
    const [wordsPerMinute, setWordsPerMinute] = useState(0)
    const [relativeSpeed, setRelativeSpeed] = useState("")

    //grabbing textarea dom element in order to be auto-focused in upon START btn click
    //standard practice to set useRef to null.
    const textBoxRef = useRef(null)

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

    function calculateTypingSpeed(number) {
        return wordCount * 4
    }

    function calculateRelativeSpeed(number) {
        if (number === 40) {
            return "avg"
        }
        else if (number > 40) {
            return "fast"
        }
        else if (number < 40) {
            return "slow"
        }
    }

    function colorify(relativeSpeed) {
        if (relativeSpeed === "avg") {
            return (
                <h2 style={{color: "yellow"}}>average</h2>
            )
        }
        else if (relativeSpeed === "fast") {
            return (
                <h2 style={{color: "blue"}}>fast</h2>
            )
        }
        else if (relativeSpeed === "slow") {
            return (
                <h2 style={{color: "red"}}>slow</h2>
            )
        }
    }

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        //refreshing the input box, which updates according to text stored as state
        setText("")
        setWordCount(0)
        setWordsPerMinute(0)
        setRelativeSpeed("")

        //to focus on textarea upon START btn click
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

    function endGame() {
        setIsTimeRunning(false)
        //grabbing text input as string, calculate number of words,
        //then store it to wordCount state
        setWordCount(calculateWordCount(text))
        setWordsPerMinute(calculateTypingSpeed(text))
        setRelativeSpeed(calculateRelativeSpeed(calculateTypingSpeed(text)))
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
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time Remaining: {timeRemaining}</h4>
            <button
                onClick={startGame}
                disabled={isTimeRunning}>START</button>
            <h1>Speed: {wordsPerMinute} wpm</h1>
            {colorify(relativeSpeed)}
            <p5>Word Count: {wordCount}</p5>
        </>
    )
}

export default App
