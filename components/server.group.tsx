import Head from 'next/head'
import { ServerRow } from './server.row'


export function ServerGroup({ isVip, count }) {

    return (

        <div className="relative w-full bg-white rounded-tr-2xl  rounded-bl-2xl shadow-2xl mb-10">
            {
                isVip ? (
                    <>
                        <div className="absolute -mt-4 -ml-4 bg-red-500 w-20 h-20"></div>
                        <div className="absolute bottom-0 right-0 -mb-4 -mr-4 bg-red-500 w-20 h-20"></div>
                    </>
                ) : <></>
            }
            <div className="relative text-center w-full h-full bg-white">


                <p className="text-2xl font-medium my-2" style={{ display: 'inline-block' }}>СКОРО ОТКРОЮТСЯ ПРЕМИУМ СЕРВЕРА</p>
                <div className="w-full divide-y mb-4">
                    {
                        new Array(count).fill(1).map((x,i) => {
                            return (
                                <ServerRow key={`${x}.${i}`} isVip={isVip} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

{/* <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"></div> */}


{/* <div className="relative w-full py-3 sm:mx-auto">
    <div className="absolute inset-0 bg-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative  w-full h-full px-4 py-4 bg-white shadow-lg sm:rounded-3xl ">

         <p className="text-2xl font-medium " style={{ display: 'inline-block' }}>СКОРО ОТКРОЮТСЯ ПРЕМИУМ СЕРВЕРА</p>
        {
            Array.from([1, 2, 3, 4, 5]).map(x => {
                return (
                    <ServerRow />
                )
            })
        }

    </div>
</div> */}