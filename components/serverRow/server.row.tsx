import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faInfo } from '@fortawesome/free-solid-svg-icons'
import Grow from '@material-ui/core/Grow';
import { FunctionComponent } from 'react';
import { Server } from '../../lib/models/server'
import { format, parseISO } from 'date-fns'

type ServerRowProps = {
    server: Server
}

export const ServerRow: FunctionComponent<ServerRowProps> = ({
    server
}) => {
    const [toggled, setToggled] = useState<boolean>(false);
    const toggle = () => {
        setToggled(!toggled);
    }

    const getMainRate = () => {
        var xp = server.rates.find(x => x.type.toLowerCase() === 'xp');
        if (!xp || xp.amount <= 0) {
            return server.type;
        }
        return `x${xp.amount}`;
    };
    const getInfo = () => {
        return (
            <Grow in={toggled}>
                <div className="flex flex-row justify-around col-span-6" onClick={toggle}>
                    {
                        server.rates.map(r => {
                            return (<span>{r.type}:{r.amount}</span>)
                        })
                    }
                    {/* <span>XP:10</span>
                    <span >SP:10</span>
                    <span >DROP:7</span>
                    <span >ADENA:7</span>
                    <span >SPOIL:7</span> */}
                </div>
            </Grow >)
    }

    const getMainContent = () => {
        return (
            <>
                <p className="text-xs md:text-base col-span-1 md:col-span-2 text-center md:bg-red-500 border-none" style={{ clipPath: 'polygon(15% 0, 100% 0%, 85% 100%, 0% 100%)' }}>
                    {server.type}
                </p>
                <p className="col-span-1">
                    {getMainRate()}
                </p>
                <p className="col-span-2">
                    {server.chronicles}
                </p>
                <p className="col-span-2">
                    {format(parseISO(server.openDate), 'dd.MM.yyyy')}
                </p>
            </>
        )
    }

    return (
        <div className="md:hover:bg-purple-400 relative grid grid-cols-11 md:h-14 h-16 items-center text-left text-sm md:text-base transition duration-500 ease-in-out   transform  md:hover:-translate-y-1 md:hover:scale-105 hover:shadow-xl rounded-md">
            <p className="text-center col-span-1" onClick={toggle}>
                {server.premium !== 0 ?
                    <FontAwesomeIcon className="animate-bounce" icon={faStar} color="orange" size="lg" /> :
                    <FontAwesomeIcon icon={faInfo} color="gray" size="lg" />}
            </p>
            <p className="col-span-4 md:col-span-3 uppercase underline font-bold">
                {server.name}
            </p>
            { !toggled ? getMainContent() : getInfo()}

        </div>

    )
}
