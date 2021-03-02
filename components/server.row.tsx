import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faInfo } from '@fortawesome/free-solid-svg-icons'
import Grow from '@material-ui/core/Grow';

export function ServerRow({ isVip }) {
    const [toggled, setToggled] = useState<boolean>(false);
    const toggle = () => {
        setToggled(!toggled);
    }

    const getInfo = () => {
        return (
            <Grow in={toggled}>
                <div className="flex flex-row justify-around col-span-6" onClick={toggle}>
                    <span >XP: x10</span>
                    <span >SP: x10</span>
                    <span >DROP: x7</span>
                    <span >ADENA: x7</span>
                    <span >SPOIL: x7</span>
                </div>
            </Grow >)
    }

    const getMainContent = () => {
        return (
            <>
                <p className="col-span-2 text-center bg-red-500 border-none" style={{ clipPath: 'polygon(15% 0, 100% 0%, 85% 100%, 0% 100%)' }}>
                    PvP
            </p>
                <p className="col-span-1">
                    x50
            </p>
                <p className="col-span-2">
                    Interlude
            </p>
                <p className="col-span-2">
                    06.03.2021
                </p>
            </>
        )
    }

    return (
        <div className="hover:bg-purple-400 relative grid grid-cols-11 md:h-14 h-16 items-center text-left text-sm md:text-base transition duration-500 ease-in-out   transform  hover:-translate-y-1 hover:scale-105 hover:shadow-xl rounded-md">
            <p className="text-center col-span-1" onClick={toggle}>
                {isVip ?
                    <FontAwesomeIcon className="animate-bounce" icon={faStar} color="orange" size="lg" /> :
                    <FontAwesomeIcon icon={faInfo} color="gray" size="lg" />}
            </p>
            <p className="col-span-3 uppercase underline font-bold">
                L2ESCAPE.COM
            </p>
            { !toggled ? getMainContent() : getInfo()}

        </div>

    )
}
