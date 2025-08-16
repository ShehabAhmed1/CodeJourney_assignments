import React, { useEffect, useState } from "react";
import { Menu, Code, CheckCircle, X } from "lucide-react";
import { Sparkles } from "lucide-react";
import logo from "./assets/logo_light.png"; // Assuming you have a logo.svg file
import "./App.css"; // Import your CSS file
import allquestions from "./assets/Questions.json"; // Import your questions data

const App = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [id, setId] = useState([]);
  const [showsider, setShowSider] = useState(false);
  // Sample questions
  const [questions, setQuestions] = useState(allquestions["lec1"]);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]); // Initialize with the first question

  const handleShowAnswer = (id) => {
    setShowAnswer(true);
    setId((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  useEffect(() => {
    setId([]);
  }, questions);
  return (
    <div className="min-h-screen bg-gray-900 pb-8  ">
      <div className="main-container">
        <div className="App-content">
          <div className=" mx-auto ">
            <div className="fixed text-gray-100 bg-gray-900 p-1 rounded-full md:hidden">
              {showsider ? (
                <X onClick={() => setShowSider(false)} />
              ) : (
                <Menu onClick={() => setShowSider(true)} />
              )}
            </div>
            {/* Header */}
            <div className="text-center mb-8 leading-loose ">
              <div className="logo  w-fit mx-auto ">
                <img
                  src={logo}
                  alt="codeJourny logo"
                  className="w-28 mx-auto"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-200 mb-2">تدريبات</h1>
              <p className="text-gray-500">
                تدرب على مفاهيم بايثون من خلال تمارين البرمجة التفاعلية
              </p>

              <p className="text-blue-600 text-3xl my-4 flex items-center justify-center gap-2 font-bold">
                <Sparkles /> تحيات فريق <br />
                codeJourney <Sparkles />
              </p>
            </div>

            <div className="flex  gap-4 ">
              {/* Question Selector */}
              <div className="bg-gray-100 rounded-xl shadow-sm p-6  text-center  w-full md:w-full ">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 ">
                  Select a Practice Question:
                </h2>
                <Navigate
                  QuestionNum={currentQuestion.id - 1}
                  setCurrentQuestion={setCurrentQuestion}
                  questions={questions}
                />
                <div className="grid grid-cols-1 gap-4">
                  <div
                    key={currentQuestion.id}
                    // onClick={() => selectQuestion(q)}
                    id={currentQuestion.id}
                    className={`p-4 rounded-lg border-2 border-gray-500  cursor-pointer text-center transition-all hover:border-blue-500 
                      hover:bg-gray-50
                }`}
                  >
                    <div className="flex items-center gap-2  justify-center">
                      <Code className="w-4 h-4 text-blue-600" />
                      <span className="font-medium ">
                        Question {currentQuestion.id}
                      </span>
                    </div>
                    <p
                      className="text-gray-600 mt-4 text-2xl text-left"
                      dir="ltr"
                    >
                      {" "}
                      {breakLine(currentQuestion.question)}
                      {/* {currentQuestion.question} */}
                    </p>

                    {/* Output Section */}
                    <div className="bg-white rounded-xl shadow-sm p-4 my-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h2 className="text-xl font-semibold text-gray-800">
                            Example:
                          </h2>
                        </div>
                      </div>

                      <div
                        className={`p-2 rounded-lg font-mono text-sm min-h-24 active:text-black hover:text-black ${
                          showAnswer && id.includes(currentQuestion.id)
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        <pre className="flex items-center gap-2 text-left whitespace-pre-wrap break-words">
                          {currentQuestion.output}
                        </pre>
                      </div>
                    </div>

                    {/* Code Editor Section */}
                    {/* 
                    <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 min-h-5 text-green-600" />
                          <h2 className="text-xl font-semibold text-gray-800">
                            Code Editor
                          </h2>
                        </div>
                      </div>

                      <div className="relative">
                        <pre
                          className={`hover:text-black active:text-black ${
                            showAnswer && id.includes(currentQuestion.id)
                              ? "text-black"
                              : "text-white"
                          } text-left w-full min-h-48 p-2 cursor-pointer border whitespace-pre-wrap break-words border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                        >
                          {currentQuestion.defaultCode}
                        </pre>
                      </div>
                    </div> */}

                    <button
                      onClick={() => handleShowAnswer(currentQuestion.id)}
                      className=" hover:bg-green-500 cursor-pointer font-bold bg-blue-500 text-white px-4 py-2 rounded-md my-8"
                    >
                      {" "}
                      show Example{" "}
                    </button>
                  </div>
                </div>
              </div>
              {/* Sidebar to change the question according to the lecture */}
              <Sidebar
                allquestions={allquestions}
                setQuestions={setQuestions}
                setCurrentQuestion={setCurrentQuestion}
                showSidebar={showsider}
              />
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-500 text-sm">
              <p>
                Practice makes perfect! Keep coding and exploring Python
                concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Navigate({ questions, QuestionNum, setCurrentQuestion }) {
  //get next question
  const handleNext = () => {
    if (QuestionNum < questions.length - 1) {
      setCurrentQuestion(questions[QuestionNum + 1]);
    }
  };

  //get previous question
  const handlePrevious = () => {
    if (QuestionNum > 0) {
      setCurrentQuestion(questions[QuestionNum - 1]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-8">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={QuestionNum === 0}
          className="px-4 py-2 cursor-pointer text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {QuestionNum + 1} of {questions.length} answered
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Sidebar({
  allquestions,
  setQuestions,
  setCurrentQuestion,
  showSidebar,
}) {
  const [active, setActive] = useState("lec2");
  return (
    <aside
      className={`border-2 border-r-0 md:border-r-2 rounded-tl-xl rounded-bl-xl md:rounded-r-xl border-gray-500  bg-gray-900 shadow-sm p-6 w-3/4 md:w-1/6  transition-all duration-300 ease-in-out ${
        showSidebar ? "right-0" : "-right-full"
      } fixed md:relative md:right-0 top-0  h-screen  md:h-auto z-50`}
    >
      <ul>
        {Object.keys(allquestions).map((q) => {
          return (
            <li
              className={`border-2 cursor-pointer hover:scale-110 transition-all duration-500  bg-gray-200 rounded-lg p-2 text-center mb-4 text-gray-800
                 ${active === q ? "border-green-400 scale-110" : ""}`}
              key={q}
              onClick={() => {
                setActive(q);
                setQuestions(allquestions[q]);
                setCurrentQuestion(allquestions[q][0]);
              }}
            >
              {q}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function breakLine(text) {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}
export default App;
