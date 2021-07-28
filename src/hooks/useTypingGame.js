import {useState, useEffect, useRef} from "react"

//custom hook defined with default param of value 15 (seconds)
function useTypingGame(startingTime = 15) {

    //creating states to hold text and time displayed on countdown timer
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)

    //storing isTimeRunning as a boolean state variable (false by default) to fire timer upon START button click
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    //storing wordCount as separate state to text (to store for indiv. games vs realtime tracking)
    const [wordCount, setWordCount] = useState(0)

    //secondary calculations based on wordCount
    const [wordsPerMinute, setWordsPerMinute] = useState(0)
    const [relativeSpeed, setRelativeSpeed] = useState("")

    //grabbing reference to textarea dom element in order to be auto-focused in upon START btn click
    //standard practice to initialise useRef passing in null.
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

    //determining the multiplier for the words per minute calculation
    function calculateTypingSpeed(wordCount, startingTime) {
        const secondsToMin = 60 / startingTime
        return wordCount * secondsToMin
    }

    function calculateRelativeSpeed(number) {
        if (number < 45) {
            return "slow"
        }
        else if (number < 60) {
            return "avg"
        }
        else if (number < 80) {
            return "fluent"
        }
        else if (number < 100) {
            return "fast"
        }
        else {
            return "pro"
        }
    }

    function colorify(relativeSpeed) {
        let text = ""
        let color = {}

        if (relativeSpeed === "slow") {
            text = "SLOW"
            color = {color: "red"}
        }

        else if (relativeSpeed === "avg") {
            text = "AVERAGE"
            color = {color: "orange"}
        }

        else if (relativeSpeed === "fluent") {
            text = "FLUENT"
            color = {color: "yellow"}
        }

        else if (relativeSpeed === "fast") {
            text = "FAST"
            color = {color: "cornflowerblue"}
        }

        else if (relativeSpeed === "pro") {
            text = "pro"
            color = {color: "purple"}
        }

        return (
            <h2 style={color}>{text}</h2>
        )
    }

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
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
        const typingSpeed = calculateTypingSpeed(text, startingTime)
        setWordsPerMinute(typingSpeed)
        setRelativeSpeed(calculateRelativeSpeed(typingSpeed))
    }

    //useEffect to run first when component updates,
    //and when ([timeRemaining, isTimeRunning]) states change
    useEffect(() => {
        //if start state value equals true (aka start button is clicked) && time > 0 (i.e. count still running)
        if (isTimeRunning && timeRemaining > 0) {
            //setTimeout to run every 1000ms (1s)
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
        //when count reaches 0, set the isTimeRunning variable back to false
        //and store to state the calculated metrics
        else if (timeRemaining === 0) {
            endGame()
        }

    }, [timeRemaining, isTimeRunning])

    //function (ie. custom useTypingGame hook) to return object {} instead of array []
    // in order to reduce error of altering/misusing the exported state and methods
    return {
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
    }

}

export default useTypingGame
