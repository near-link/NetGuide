"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, X, RotateCcw } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const current = questions[currentIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === current?.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    if (index === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setTransitioning(false);
    }, 150);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setTransitioning(false);
  };

  const getScoreMessage = () => {
    if (score === questions.length) return "Perfect score!";
    if (score >= 3) return "Good effort. Review the steps you missed.";
    return "Consider going through the module again.";
  };

  const getScoreColor = () => {
    if (score === questions.length) return "text-green-600";
    if (score >= 3) return "text-amber-600";
    return "text-zinc-600";
  };

  if (finished) {
    return (
      <div className="border border-zinc-200 rounded-xl p-8 text-center">
        <h3 className="text-lg font-semibold text-zinc-800 mb-2">
          Quiz Complete
        </h3>
        <p className="text-2xl font-bold text-zinc-900 mb-1">
          You got {score} out of {questions.length} correct.
        </p>
        <p className={`text-sm mb-6 ${getScoreColor()}`}>
          {getScoreMessage()}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-sm text-zinc-700 border border-zinc-300 rounded-lg px-4 py-2 hover:bg-zinc-50 transition-colors"
          >
            <RotateCcw size={14} />
            Try Again
          </button>
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-zinc-800 mb-1">Quick Check</h3>
      <p className="text-sm text-zinc-500 mb-6">
        Test what you just learned before moving on.
      </p>


      <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-zinc-400 mb-4">
        Question {currentIndex + 1} of {questions.length}
      </p>

      <div
        className={`transition-opacity duration-150 ${transitioning ? "opacity-0" : "opacity-100"}`}
      >
        <p className="text-zinc-900 font-medium mb-4">{current.question}</p>

        <div className="space-y-2">
          {current.options.map((option, i) => {
            let cardStyle =
              "border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50";

            if (answered) {
              if (i === current.correctIndex) {
                cardStyle = "border-green-400 bg-green-50";
              } else if (i === selectedAnswer && !isCorrect) {
                cardStyle = "border-red-400 bg-red-50";
              } else {
                cardStyle = "border-zinc-200 opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all ${cardStyle} ${
                  answered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-zinc-700">{option}</span>
                  {answered && i === current.correctIndex && (
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                  )}
                  {answered &&
                    i === selectedAnswer &&
                    i !== current.correctIndex && (
                      <X size={16} className="text-red-500 flex-shrink-0" />
                    )}
                </div>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 flex items-center justify-between">
            <p
              className={`text-sm font-medium ${isCorrect ? "text-green-600" : "text-red-500"}`}
            >
              {isCorrect
                ? "Correct!"
                : "Not quite. The correct answer is highlighted."}
            </p>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLastQuestion ? "See Results" : "Next Question"}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
