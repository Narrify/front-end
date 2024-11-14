import React from "react";
import { Link } from "gatsby";
import logo from "../assets/narrify-logo.png";
import { Dashboard } from "@mui/icons-material";

const DashboardComponent = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-primary">
                <style>
                    {`
                    .typewriter p {
                        overflow: hidden;
                        border-right: .15em solid #8D549D; /* Cursor color */
                        white-space: nowrap;
                        margin: 0 auto;
                        letter-spacing: .05em;
                        animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                        font-size: 1.875rem; /* text-3xl */
                        color: #8D549D;
                        text-align: center;
                    }

                    @keyframes typing {
                        from { width: 0 }
                        to { width: 100% }
                    }

                    @keyframes blink-caret {
                        from, to { border-color: transparent }
                        50% { border-color: #8D549D; } /* Cursor blink color */
                    }
                `}
                </style>

                <div className="flex flex-col items-center justify-start mt-[15vh] md:mt-[20vh] lg:mt-[25vh] mb-[15vh] md:mb-[20vh] lg:mb-[25vh]">
                    <img src={logo} alt="Narrify Logo" className="h-[15vh] w-[15vh]" />
                    <h1 className="text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        Narrify
                    </h1>
                    <div className="typewriter">
                        <p>
                            Generate stories and dialogs for videogames using AI
                        </p>
                    </div>
                </div>

                <div className="flex-grow bg-[#FFE0EF] justify-center items-center rounded-2xl shadow-lg mx-[20vh] md:mx-[25vh] lg:mx-[30vh] mb-[10vh]">
                    <h1 className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 my-11">
                        Start by choosing a generator
                    </h1>
                    <div className="flex justify-center space-x-4 my-10">
                        <Link to="/story">
                            <button className="mx-[8vh] px-8 py-4 text-[#8D549D] text-2xl font-semibold rounded-lg bg-secondary transform transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300">
                                Story Generator
                            </button>
                        </Link>
                        <Link to="/dialog">
                            <button className="mx-[8vh] px-8 py-4 text-[#8D549D] text-2xl font-semibold rounded-xl bg-secondary transform transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300">
                                Dialog Generator
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardComponent;
