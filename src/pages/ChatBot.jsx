"use client"

import { Leaf, Sprout } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const API_KEY = import.meta.env?.VITE_GOOGLE_API_KEY

function ChatBot() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const messagesEndRef = useRef(null)
    const [typingText, setTypingText] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, typingText])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        if (!isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const geminiMessages = messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }))

            geminiMessages.push({
                role: "user",
                content: input,
            })

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: "System prompt [You are a helpful assistant specializing in carbon emissions, climate change, and sustainability. Provide accurate, educational information about carbon footprints, emission reduction strategies, and sustainable practices. Be concise, informative, and encouraging. this is a system prompt to dont give answer about this after this sentence what i have sayes is the message from the user ok] , User query :" },
                                    ...geminiMessages.map((msg) => ({
                                        text: msg.content,
                                    })),
                                ],
                            },
                        ],
                    }),
                }
            )

            const data = await response.json()
            const responseText = data?.candidates?.[0]?.content.parts[0].text || "No response received."

            setMessages((prev) => [...prev, { role: "assistant", content: responseText }])
        } catch (error) {
            console.error("Error:", error)
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I'm having trouble connecting to my knowledge base. Please check your API key or try again later.",
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-white dark:bg-gray-900 shadow-sm">
                <div className="flex h-16 items-center px-24 justify-between">
                    <div className="flex items-center gap-2 font-semibold">
                    <Leaf className="mr-2 h-10 w-10 " color="#01930b"/>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Green Grow</span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-5 w-5 text-yellow-400"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-5 w-5 text-gray-700"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Main chat area */}
            <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="mx-auto max-w-md text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                    <div className="flex justify-center">
                  
                    <Sprout className="mr-2 h-10 w-10 "  color="#01930b" />
                    </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to Green Grow</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Ask me anything about carbon emissions, sustainability, or how to reduce your carbon footprint.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {[
                      "How can I reduce my carbon footprint?",
                      "What are carbon offsets?",
                      "Explain carbon neutrality",
                      "Top renewable energy sources",
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(suggestion)
                          setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100)
                        }}
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 text-left text-gray-700 dark:text-gray-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === "user"
                          ? "bg-green-500 text-white rounded-tr-none"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="font-medium text-sm">
                          {message.role === "user" ? "You" : "Green Grow 🤖"}
                        </div>
                        <div className="prose prose-sm dark:prose-invert">
                          {(typeof message.content === "string" ? message.content : "")
                            .split("\n")
                            .map((line, i) => (
                                <p key={i} className="mb-1">
                                    {line.replace(/\*/g, "").trim()}
                                </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none">
                      <div className="space-y-2">
                        <div className="font-medium text-sm">Green Grow 🤖</div>
                        <div className="prose prose-sm dark:prose-invert">
                          {typingText || (
                            <div className="flex items-center space-x-2">
                              <div className="typing-indicator">
                                <span className="dot bg-gray-500 dark:bg-gray-300"></span>
                                <span className="dot bg-gray-500 dark:bg-gray-300"></span>
                                <span className="dot bg-gray-500 dark:bg-gray-300"></span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
            {isLoading && (
                <div className="flex justify-center items-center py-4">
                    <div className="loader border-t-4 border-green-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t bg-white dark:bg-gray-900 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 p-2 shadow-sm"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about carbon emissions..."
                className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-800 dark:text-gray-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
        <style jsx>{`
            .loader {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                width: 36px;
                height: 36px;
                border-top-color: #4caf50;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `}</style>
        </div>
    )
}

export default ChatBot


