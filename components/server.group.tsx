// import { ServerRow } from './serverRow/server.row'
import { ServerRowComponent } from './serverRow/old.server.row';
import { ServersList } from '../lib/models/server';
import React, { FunctionComponent } from 'react';

export type ServerGroupProps = {
    groupped: ServersList;
};

export const ServerGroup: FunctionComponent<ServerGroupProps> = ({
    groupped
}) => {


    const isPremiumPanel = () => {
        if (groupped.sortOrder === 1 || groupped.sortOrder === 0) {
            return true;
        }

        return false;
    };

    return (

        <div className="relative w-full bg-white rounded-tr-2xl  rounded-bl-2xl shadow-2xl mb-10">
            {
                isPremiumPanel() ? (
                    <>
                        <div className="absolute -mt-4 -ml-4 bg-red-500 w-20 h-20"></div>
                        <div className="absolute bottom-0 right-0 -mb-4 -mr-4 bg-red-500 w-20 h-20"></div>
                    </>
                ) : <></>
            }
            <div className="relative text-center w-full h-full bg-white">


                <p className="text-2xl font-medium my-2" style={{ display: 'inline-block' }}>{groupped.label}</p>
                <div className="w-full divide-y mb-4">
                    {
                        groupped.servers.map((x, i) => {
                            return (<ServerRowComponent key={`${x}.${i}`} server={x} />)
                        })
                    }
                </div>
            </div>
        </div>
    )
}
