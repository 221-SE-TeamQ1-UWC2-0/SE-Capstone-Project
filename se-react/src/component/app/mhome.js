import "./mhome.css"
import { IoMdPerson } from "react-icons/io";

const Dropdown = (props) => {
    const { options, onInputChange } = props;
    return (
        <div className="drop-down">
            <input
                type="text"
                class="form-control"
                placeholder="Search"
                onChange={onInputChange}
            />
            <ul className="list-group">
                {options.map((option) => {
                    return (
                        <button type="button" className="list-group-item">
                            {option}
                        </button>
                    )
                })}
            </ul>
        </div>
    );
};

const defaulOptions = [];

function mhome() {
    return (
        <div className="mhome-container">
            <div className="mhome-wrapper">
                <div className="mhome-hello">
                    <h2>Hi mấy thg ml, </h2>
                    <div className="mhome-hello-icon">
                        <IoMdPerson />
                    </div>
                </div>
                <div className="mhome-calendar">
                    <h2> Calendar here</h2>
                </div>
                <div className="mhome-daily">
                    <h2>Today</h2>
                    <div className="mhome-check">
                        <div className="mhome-checkinside">
                            <button>Checkin</button>
                            <button>Checkout</button>
                        </div>
                    </div>

                </div>
                <div className="mhome-dropdown">
                    <h4>dropdown here</h4>


                </div>
            </div>
        </div>
    )
}
export default mhome;