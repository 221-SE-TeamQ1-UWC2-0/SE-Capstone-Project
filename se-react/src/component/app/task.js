import './task.css'
import { FaClock, FaHome, FaTasks } from 'react-icons/fa';
// import { BsFillChatLeftDotsFill } from "react-icons/bs";
// import { IoSettingsSharp } from "react-icons/io";



function task() {

    // const task = {
    //     name: "Meet up",
    //     date: "date",
    //     description: "finish before ...",
    //     finish: "confirmed",
    //     Time: "Time",
    // }
    return (
        <div className='task-container'>
            <div className='task-wrapper'>
                <div className='blank'>

                </div>
                <h1>Tasks</h1>
                <div className='task-status'>
                    <button className='task-button'>Upcoming</button>
                    <button className='task-button'>Completed</button>
                    <button className='task-button'>Canceled</button>
                </div>
                <h4>Today</h4>
                <div className='task-board'>
                    <div className='task-board-up'>
                        <div className='task-board-date'>
                            <h4>12</h4>
                            <h5>May</h5>
                        </div>
                        <div className='task-name'>
                            <h5 className='div'>Task</h5>
                            <h5 className='div'>Description</h5>
                        </div>
                        <div className='task-board-status'>
                            <h5>Confirmed</h5>
                            <h4><FaClock /> 3:30PM</h4>
                        </div>
                    </div>
                    <div className='task-board-decision'>
                        <button style={{ marginLeft: '6em' }}>Accept</button>
                        <button>Mark as done</button>
                    </div>
                </div>

                <div className='task-board'>
                    <div className='task-board-up'>
                        <div className='task-board-date'>
                            <h4>12</h4>
                            <h5>May</h5>
                        </div>
                        <div className='task-name'>
                            <h5 className='div'>Task</h5>
                            <h5 className='div'>Description</h5>
                        </div>
                        <div className='task-board-status'>
                            <h5>Confirmed</h5>
                            <h4><FaClock /> 3:30PM</h4>
                        </div>
                    </div>
                    <div className='task-board-decision'>
                        <button style={{ marginLeft: '6em' }}>Accept</button>
                        <button>Mark as done</button>
                    </div>
                </div>

                <div className='task-board'>
                    <div className='task-board-up'>
                        <div className='task-board-date'>
                            <h4>12</h4>
                            <h5>May</h5>
                        </div>
                        <div className='task-name'>
                            <h5 className='div'>Task</h5>
                            <h5 className='div'>Description</h5>
                        </div>
                        <div className='task-board-status'>
                            <h5>Confirmed</h5>
                            <h4><FaClock /> 3:30PM</h4>
                        </div>
                    </div>
                    <div className='task-board-decision'>
                        <button style={{ marginLeft: '6em' }}>Accept</button>
                        <button>Mark as done</button>
                    </div>
                </div>

                <div className='app-tool'></div>

            </div>
        </div>
    )
}
export default task;