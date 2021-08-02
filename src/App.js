import React from "react"
import useTypingGame from "./hooks/useTypingGame"

function App() {

    //invoking custom hook (separated to isolate business logic from App)
    const {
        textBoxRef,
        handleChange,
        text,
        isTimeRunning,
        timeRemaining,
        startGame,
        wordsPerMinute,
        wordCount,
        colorify,
        relativeSpeed
    } = useTypingGame()

    //NB. useTypingGame ^ to be passed in startingTime as arg
    //if not, startingTime default value of 15s passed in
    //NB.2 distinction between importing as destructured obj vs array, for more precise import

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
                disabled={isTimeRunning}
            >
                START
            </button>
            <h1>Speed: {wordsPerMinute} wpm</h1>
            <p5>Word Count: {wordCount}</p5>
            {colorify(relativeSpeed)}
        </>
    )
}

export default App
